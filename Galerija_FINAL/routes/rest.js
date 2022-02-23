const express = require('express');
const { sequelize,Users,Gallery,Privileges,Photo} = require('../models');
const path = require('path');
const bcrypt = require('bcrypt');
const fs=require('fs');
const fsXtra=require('fs-extra')
const resizeImg = require('resize-image-buffer');
const sizeOf = require('image-size');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const Joi = require('joi');
const fileupload = require('express-fileupload')
const route = express.Router();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}
route.use(cors(corsOptions));
route.use(fileupload())
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    console.log(req.method)
        const authHeader = req.headers['authorization'];
        console.log(authHeader)
        const velikiCookie =authHeader.split(' ');
        const token=velikiCookie[1];
        
        if(authHeader && !token)
        {
            next();
            return
        }

        if (token == null) return res.status(401).json({ msg: "error" });
  
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ msg: err });
            req.user = user;
            next();
         });
   
}
route.use(authToken);

// USER REST API

route.get('/profile',(req,res)=>
{

    console.log(req.user)

    Users.findAll({ where: { id: req.user.id } })
        .then( rows => res.json(rows))
        .catch( err => {
            res.status(400).json({ msg: ""}); 
        });
});

route.get('/users', (req, res) => {

    if(req.user.user_type==1)
    {
    Users.findAll()
        .then( rows => res.json(rows))
        .catch( err => {
            res.status(500).json(err)} );
    }
    else
        res.status(400).json({ msg: "You are not admin!"});
});

route.put('/user/update/',(req,res)=>{
    const data = {
        email: req.body.email,
        username: req.body.username,
        bio: req.body.bio,
    };
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','net','rs'] } }),
        bio:Joi.string().max(255)
    })

    const { error, value } = schema.validate({ username: data.username, email:data.email,
        bio:data.bio
    });

    if(error)
        res.status(400).json({ msg: "Error"+error}); 
    else
    {
    Users.update(
        {
            username:data.username,
            email:data.email,
            bio:data.bio
        }
        ,{where: {id:req.user.id}}
    ).then( rows =>{res.json(rows)})
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
            res.status(400).json({ msg: "Greska sa bazom"}); 
        });
    }
});

route.put('/user/update/:id',(req,res)=>{

    console.log("cao");
    console.log(req.body)
    if(req.user.user_type!=1)
        res.json({ msg: "You are not admin!"})
    
    const data = {
        userId:req.body.userId,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        bio: req.body.bio,
        admin: req.body.admin
    };

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','net','rs'] } }),
        userId: Joi.number(),
        bio:Joi.string().max(255)
    })

    const { error, value } = schema.validate({ username: data.username, email:data.email,
        bio:data.bio,userId:data.userId
    });

    if(error)
        res.status(400).json({ msg: "Error"+error}); 
    else
    {
    Users.update(
        {
            id:data.userId,
            username:data.username,
            password:data.password,
            user_type:data.admin,
            email:data.email,
            bio:data.bio
        }
        ,{where: {id:data.userId}}
    ).then( rows =>{res.json(rows)})
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
            res.status(400).json({ msg: "Greska sa bazom"}); 
        });
    }
});

route.delete('/user/delete/', (req, res) => {

    let deletionId=req.headers['deletion_id']
    Users.destroy({where:{id:deletionId}})
    .then( rows => res.json(rows))
            .catch( err => {
                    res.status(404).json({ msg: "Greska sa bazom"}); 
                });
});


route.delete('/user/delete/:id', (req, res) => {

        if(req.user.user_type!=1)
            res.json({ msg: "You are not admin!"})

        let deletionId=req.headers['deletion_id']

        if(isNaN(deletionId))
            res.status(400).json({ msg: "Validation Error!"}); 

        Users.destroy({where:{id:deletionId}})
        .then( rows => res.json(rows))
                .catch( err => {
                        console.log("usao u error za fetch")
                        console.log(err);
                        res.status(404).json({ msg: "Greska sa bazom"}); 
                    });
});

//GALLERY REST API

route.get('/gallery', (req, res) => {
    if(req.user.user_type!=2)
    {
    Gallery.findAll()
        .then( rows => res.json(rows))
        .catch( err => {
            console.log("usao u error za fetch galerije")
            console.log(err);
            res.status(400).json({ msg: ""+error}); 
        });
    }
    else
        res.status(400).json({ msg: "Log in as an admin or mod!"});
});

route.get('/userGalleries', (req, res) => {

    console.log(req.user.id)

    Gallery.findAll({ where: { user_id: req.user.id } })
    .then( rows => res.json(rows))
    .catch( err => {
        res.status(400).json({ msg: ""}); 
    });
    
});

route.get('/getGalleryImages/:id', (req, res) => {
    
    let galleryId=req.headers['galleryid']

    Photo.findAll({ where: { gallery_id: galleryId } })
    .then( rows => res.json(rows))
    .catch( err => {
        res.status(400).json({ msg: ""}); 
    });


    
});

route.get('/gallery/fillUsers', (req, res) => {

    Users.findAll({ where: { user_type: req.headers['user-type'] } })
        .then( rows => res.json(rows))
        .catch( err => {
            console.log("usao u error za fetch galerije")
            console.log(err);
            res.status(400).json({ msg: ""+error}); 
        });

});

route.post('/gallery/create', (req, res) => {

    console.log("heloo")
    console.log(req.body)
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        tags:req.body.tags,
        media_type: req.body.media_type,
        user_id:req.body.user_id
    };
    if(obj.user_id==undefined)
        obj.user_id=req.user.id

    const schema = Joi.object({
        name: Joi.string().min(3).max(90).required(),
        desc: Joi.string().max(255),
        tags: Joi.string().max(255)
    })

    const { error, value } = schema.validate({ name: obj.name, desc: obj.desc, tags: obj.tags });

    if(error)
        res.status(400).json({ msg: ""+error}); 
    else
    {
    Gallery.create(obj)
    .then( rows => {
        let putanja=path.join(__dirname,'..')+'/storage/g'+rows.id+'/g_thumbnail/';
        fs.mkdirSync(putanja,{recursive:true});
        res.json(rows)
    })
    .catch( err => {
            res.status(500).json(err) 
        });
    }
});

route.post('/gallery/create/thumbnailPath', (req, res) => {

    if(req.user.user_type==2)
        return;

    const fileName=req.files.fajl.name
    let galleryId=req.headers['galleryid'];
    
    let putanja=path.join(__dirname,'..')+'/storage/g'+galleryId+'/g_thumbnail/'+fileName
    let putanja2='storage/g'+galleryId+'/g_thumbnail/'+fileName;
    let putanja3=path.join(__dirname,'..')+'/storage/g'+galleryId+'/g_thumbnail/';

    let image=req.files.fajl;


    fsXtra.emptyDirSync(putanja3)
    image.mv(putanja,(error)=>{
        if(error){
            res.json({path:"greska"})
            return
        }
        else res.json({path:putanja2})
    })
});

route.get('/gallery/getThumbnail', (req, res) => {
    
    let putanjaThumb=req.headers['putanja']
        fs.readFile(putanjaThumb, function(err, data) {
            if (err)
                res.status(404).json({msg:"Error"})
            else
                res.json(data)     
     });
});


route.put('/gallery/setThumbnail', (req, res) => {
    
    if(req.user.user_type==2)
        return;


    const data = {
        galleryId:req.body.galleryId,
        thumbnail_ref:req.body.thumbnail_ref,
    };

    const schema = Joi.object({
        thumbnail_ref: Joi.string()
    })

    const { error, value } = schema.validate({ thumbnail_ref: data.name});

    if(error)
        res.status(400).json({ msg: ""+error}); 
    else
    {
    Gallery.update(
        {
            thumbnail_ref:data.thumbnail_ref,
        }
        ,{where: {id:data.galleryId}}
    ).then( rows => {console.log(rows);res.json(rows)})
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
        });
    }
    
    // const fileName=req.files.fajl.name
    // let putanja=path.join(__dirname,'../..')+'/storage/'+fileName
    // res.json({path:putanja})
});


route.delete('/gallery/delete/:id', (req, res) => {

    let deletionId=req.headers['deletion_id']

    if(isNaN(deletionId))
        res.json({msg:"Greska! nije broj"})
    else
    {    
    Gallery.destroy({where:{id:deletionId}})
    .then( rows => {
        let putanja=path.join(__dirname,'..')+'/storage/g'+deletionId;
        fs.rmdir(putanja,{recursive:true},(err)=>{
            if(err){
                res.status(400).json({ msg: ""}); 
            }
            else
                res.json(rows)
        })
        
    })
            .catch( err => {
                    console.log("usao u error za fetch")
                    console.log(err);
                    res.status(400).json({ msg: ""}); 
                });
            }
});

route.put('/gallery/update/:id',(req,res)=>{

    if(req.user.user_type==2)
        return;


    const data = {
        gallery_id:req.body.gallery_id,
        name: req.body.name,
        desc: req.body.desc,
        tags: req.body.tags,
        media_type: req.body.media_type
    };

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(90).required(),
        desc: Joi.string().max(255),
        tags: Joi.string().max(255)
    })

    const { error, value } = schema.validate({ name: data.name, desc: data.tags, tags: data.tags });

    if(error)
        res.status(400).json({ msg: ""+error}); 
    else
    {
    Gallery.update(
        {
            name:data.name,
            desc: data.desc,
            tags: data.tags,
            media_type: data.media_type
        }
        ,{where: {id:data.gallery_id}}
    ).then( rows => res.json(rows))
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
        });
    }
});

// PRIVILEGES REST API

route.get('/privileges', (req, res) => {
    if(req.user.user_type==1)
    {
    Privileges.findAll()
        .then( rows => res.json(rows))
        .catch( err => {
            console.log("usao u error za fetch galerije")
            console.log(err);
        });
    }
    else
        res.status(400).json({ msg: "Log in as an admin or mod!"});
});

route.get('/privileges/fillUsers', (req, res) => {
    Privileges.findAll()
        .then( rows => res.json(rows))
        .catch( err => {
            console.log("usao u error za fetch galerije")
            console.log(err);
        });
});

route.post('/privileges/create', (req, res) => {
    
    if(req.user.user_type!=1)
        return;

    const obj = {
        canUpload: req.body.canUpload,
        canDelete: req.body.canDelete,
        canUpdate: req.body.canUpdate,
        canCreateUser: req.body.canCreateUser,
        canDeleteUser: req.body.canDeleteUser,
        canModifyUser: req.body.canModifyUser
    };

    Privileges.create(obj)
    .then( rows => {
        res.json(rows)
    })
    .catch( err => {
            res.status(500).json(err) 
    }); 
});

route.put('/privileges/manage/:id',(req,res)=>{
    if(req.user.user_type!=1)
        return;

    const data = {
        user_id: req.body.user_id,
        canUpload:  req.body.canUpload,
        canDelete:  req.body.canDelete,
        canUpdate:  req.body.canUpdate,
        canCreateUser:  req.body.canCreateUser,
        canDeleteUser:  req.body.canDeleteUser,
        canModifyUser:  req.body.canModifyUser
    };
    Privileges.update(
        {
            canUpload:  data.canUpload,
            canDelete:  data.canDelete,
            canUpdate:  data.canUpdate,
            canCreateUser:  data.canCreateUser,
            canDeleteUser:  data.canDeleteUser,
            canModifyUser:  data.canModifyUser
        }
        ,{where: {id:data.user_id}}
    ).then( rows => res.json(rows))
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
        });
});

route.delete('/privileges/delete/:id', (req, res) => {

    if(req.user.user_type!=1)
        return;


    let deletionId=req.headers['deletion_id']

    Privileges.destroy({where:{id:deletionId}})
    .then( rows => res.json(rows))
            .catch( err => {
                    res.status(500).json({ msg: ""}); 
                });
});


//PHOTOS REST API

route.get('/searchApi',(req,res)=>{
    let query=req.headers['query']

    Photo.findAll({where:{name:query}})
    .then(images=>{
        res.json(images)
    })
})


route.get('/photos', (req, res) => {
    if(req.user.user_type!=2)
    {
    Photo.findAll()
        .then( rows => res.json(rows))
        .catch( err => {
            console.log("usao u error za fetch galerije")
            console.log(err);
        });
    }
    else
        res.status(400).json({ msg: "Log in as an admin or mod!"});
});

route.put('/photos/update/:id',(req,res)=>{

    const data = {
        photo_id:req.body.photo_id,
        name: req.body.name,
        tags:req.body.tags
    };

    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(90).required(),
        photo_id: Joi.number(),
        tags: Joi.string().max(255)
    })

    const { error, value } = schema.validate({ name: data.name, photo_id: data.photo_id, tags: data.tags });

    if(error)
        res.status(400).json({ msg: ""+error}); 
    else
    {

    Photo.update(
        {
            name:data.name,
            tags: data.tags,
        }
        ,{where: {id:data.photo_id}}
    ).then( rows => res.json(rows))
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
        });
    }
});

route.delete('/photos/delete/:id', (req, res) => {


    let deletionId=req.headers['deletion_id']

    if(isNaN(deletionId))
         res.json({msg:"Greska! nije broj"})

    else
    {
    Photo.findAll({where:{id:deletionId}})
    .then(delImg=>{
        Photo.destroy({where:{id:deletionId}})
        .then( rows =>{ 
            let spliter=delImg[0].original_ref.split('/')
            let filename=spliter[2];
            let putanja=path.join(__dirname,'..')+'/storage/g'+delImg[0].gallery_id+'/'+filename;
            fs.unlink(putanja, (err) => {
                if (err) 
                    res.json(err);
                else
                    res.json(rows)
            });
        })
        .catch( err => {
                 console.log("usao u error za fetch")
                 console.log(err);
        });
    })
    .catch( err => {
        console.log("usao u error za fetchaa")
        console.log(err);
});
    }
});

route.post('/photos/upload/', (req, res) => {
    
    console.log(req.files.file)
    let image=req.files.file
    let imageName=image.name
    let imageType=image.mimetype
    let jpeg="image/jpeg"
    let png ="image/png"
    let galleryId=req.headers['galleryid'];
    let putanja=path.join(__dirname,'..')+'/storage/g'+galleryId+'/'+imageName
    let putanja2='storage/g'+galleryId+'/'+imageName;
    let putanjaResize=path.join(__dirname,'..')+'/storage/g'+galleryId+'/'+'t_'+imageName
    let putanjaResize2='storage/g'+galleryId+'/'+'t_'+imageName

    if(imageName.endsWith(".jpg") || imageName.endsWith(".png"))
    {
        if( (imageType==jpeg || imageType==png) && image.size<3000000 )
        {
            image.mv(putanja,(error)=>{
                if(error){
                    res.json({path:"greska"})
                    return
                }
                else{
                    var sizeOf = require('image-size');
                    var dimensions = sizeOf(putanja);
                    const dbPodaci={
                        original_ref:putanja2,
                        name:imageName,
                        original_size:dimensions.width+"x"+dimensions.height,
                        thumbnail_ref:putanjaResize2,
                        extension:"."+dimensions.type,
                        galleryId:galleryId
                    }
                    res.json(dbPodaci)
                }
            })
        }
        else
            res.status(500).json({msg:"Error"})
    }
    else
    {
        res.status(500).json({msg:"Error"})
    }

});


route.post('/photos/upload/photoPath', (req, res) => {

    console.log(req.files)
    console.log(req.body)
    
    let fileName=req.files.fajl.name
   
    let galleryId=req.headers['galleryid'];
    let putanja=path.join(__dirname,'..')+'/storage/g'+galleryId+'/'+fileName
    let putanja2='storage/g'+galleryId+'/'+fileName;
    let putanjaResize=path.join(__dirname,'..')+'/storage/g'+galleryId+'/'+'t_'+fileName
    let putanjaResize2='storage/g'+galleryId+'/'+'t_'+fileName
    // let putanja3=path.join(__dirname,'..')+'/storage/g'+galleryId+'/g_thumbnail/';

    if(fileName.endsWith(".jpg")|| fileName.endsWith(".png") |fileName.endsWith(".ico") ){
    let image=req.files.fajl;
    image.mv(putanja,(error)=>{
        if(error){
            res.json({path:"greska"})
            return
        }
        else{
            var sizeOf = require('image-size');
            var dimensions = sizeOf(putanja);
         res.json({
             path:putanja2,
             resizePath:putanja,
             resizePath2:putanjaResize2,
             resizePath3:putanjaResize,
             original_size:dimensions.width+"x"+dimensions.height,
             fileName:fileName
            })
        }
    })
    }
    else{
        res.status(400).json({ msg: "Greska , nije podrzan format"}); 
    }
});

route.post('/photos/uploadPhoto', (req, res) => {

    const data = {
        name:req.body.name,
        tags:req.body.tags,
        original_size:req.body.original_size,
        original_ref:req.body.original_ref,
        thumbnail_ref:req.body.thumbnail_ref,
        extension:"."+req.body.extension,
        gallery_id: req.body.gallery_id
    };
    if(data.gallery_id==null)
    {
        data.gallery_id=req.body.galleryId
        data.extension=req.body.extension
    }

    const schema = Joi.object({
        original_ref: Joi.string(),
        name:Joi.string().max(255),
        tags:Joi.string().allow(null, ''),
        extension:Joi.string().max(10)
    })

    const { error, value } = schema.validate({ 
        original_ref: data.name,
        name:data.name,
        tags:data.tags,
        extension:data.extension
    });

    if(error)
        res.status(400).json({ msg: "Error"+error}); 
    else
    {
    Photo.create(data)
    .then( rows => {res.json(rows)})
    .catch( err => {
            console.log("usao u error za fetch")
            console.log(err);
        });
    }
});


route.post('/photos/resizePhoto', (req, res) => {

    let putanjaResize=req.body.resizePath
    let putanjaResizeAps=req.body.resizePathAps
    let fajl=fs.readFileSync(putanjaResize);
    var sizeOf = require('image-size');
    var dimensions = sizeOf(putanjaResize);

    var qt=dimensions.height/dimensions.width; //maintain aspect ratio

    resizeImg(fajl, {
        width: 120,
        height: qt*120, //maintain aspect ratio
    })
    .then(image=>{
        fs.writeFileSync(putanjaResizeAps, image);
    });

});
route.post('/photos/resizePhoto2', (req, res) => {

        

});


route.get('/gallery/getImageThumbnail', (req, res) => {
    
    let putanjaThumb=req.headers['putanja']
        fs.readFile(putanjaThumb, function(err, data) {
            if (err)
                res.status(404).json({msg:"Error"})
            else
                res.json(data)     
     });
});

route.get('/gallery/getOriginal', (req, res) => {
    
    console.log("USAOOOOOOOOOOOO")
    let showId=req.headers['showid']

    Photo.findAll({ where: { id: showId } })
        .then( rows =>{
            let prom = JSON.stringify(rows)
            let slice=prom.slice(1,-1)
            let prom2=JSON.parse(slice)
            console.log(prom2.original_ref)
            fs.readFile('./'+ prom2.original_ref, function(err, data) {
                if (err)
                    res.status(404).json({msg:"Error"})
                else
                {
                    console.log(data)
                    res.json(data)
                }
        })  
     });
});


module.exports = route;