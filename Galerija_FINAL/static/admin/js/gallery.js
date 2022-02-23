
function init()
{
    const cookies = document.cookie.split('=');
    const token=cookies[1];

    if(token=="" || token==undefined)
        {
            window.location.href='login.html'
            alert("Nemate pristup! Ulogujte se !")
            return;
        }

    fetch('http://localhost:7000/gallery', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then( res => res.json())
        .then( data => {

            if(!data.msg){
            var tbody = document.createElement("tbody");
            data.forEach( el => {
                replaceTbody(el,9,tbody)
            });
            }else{
                window.location.href = 'login.html';
                alert("You are not admin user!")
            }
        }).catch( err => {
            alert("You are not admin user!")
            window.location.href = 'login.html';
        });

        function replaceTbody(el,x,tbody){
            var table = $('tabela');
            table.appendChild(tbody);

            var elId=el.id;var elName=el.name;
            var elDesc=el.desc;var elTags=el.tags;
            var elMedtyp=el.media_type;var elUsrid=el.user_id;
            var elThbRef=el.thumbnail_ref;var elCat=el.createdAt;
            var elUat=el.updatedAt;

            niz=[elId,elName,elDesc,elTags,elMedtyp,elUsrid,elThbRef,elCat,elUat]

            var tr = document.createElement('tr');
                for(var i=0;i<x;i++){
                    var td = document.createElement('td');
                    td.innerHTML = niz[i]
                    tr.appendChild(td);
                }
                tbody.innerHTML+=tr.innerHTML
        }function $(id){ 
            return document.getElementById(id);
        }


        document.getElementById('createGallery').addEventListener('click', e => {
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-3 adminText ">Create gallery</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="name" type="text" placeholder="Enter gallery name" class="form-control mb-2" required name="name"/>
                            <input id="desc" type="text" placeholder="Enter description" class="form-control mb-2" name="Description"/>
                            <input id="tags" type="text" placeholder="Add tags" class="form-control mb-2"  name="Tags"/>
                            <select  class="form-control mb-2" name="mediatyp" id="mediatype" placeholder="Image type">
                                <option value="" disabled selected>Select media type!</option>
                                <option value="wallpaper">Wallpaper</option>
                                <option value="image">Image</option>
                                <option value="icon">Icon</option>
                             </select>
                            <select  class="form-control mb-2" name="userId" id="userId" placeholder="userid">
                            <option value="" selected>Select user id!</option>
                            </select>
                        </div>
                        <button class="btn btn-primary mb-1" id="btn">Create</button>
                </div>
            </div>
        </div>
            `
            fetch('http://localhost:7000/gallery/fillUsers', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'User-type':'2'
                     },
                })
                    .then( res => res.json() )
                    .then( data => {
                        var bigChild=document.getElementById('userId');
                        data.forEach( el => {
                            bigChild.innerHTML+='<option value="'+el.id+'">'+el.id+'</option>'
                        });
                    });

            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();

                const data = {
                    name: document.getElementById('name').value,
                    desc: document.getElementById('desc').value,
                    tags: document.getElementById('tags').value,
                    media_type: document.getElementById('mediatype').value,
                    user_id:document.getElementById('userId').value
                };
            
                if(validFr())
                {
                 fetch('http://localhost:7000/gallery/create', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( el => {
                        if(el)
                        {
                            console.log(el.msg)
                            if(el.msg)
                                alert("Validation error!")
                            else
                            {
                                window.location.href = 'galleries.html';
                            }
                        }
                        else
                            alert("Greska prilikom unosa!")
                    });
                }
                else
                    alert("Popunite prazna polja!");
            });
        
            function validFr()
            {
                isValid=true;
                ids=['name','mediatype','userId'];
                for(let i=0;i<3;i++)
                {
                        let check=document.getElementById(ids[i]).value;
                        if(check=="")
                        {
                            document.getElementById(ids[i]).classList.add('greska')
                            isValid=false
                        }
                }
                return isValid;
            }
            document.getElementById('name').addEventListener('click',e=>{
                document.getElementById('name').classList.remove('greska');
            })
            document.getElementById('mediatype').addEventListener('click',e=>{
                document.getElementById('mediatype').classList.remove('greska');
            })
            document.getElementById('userId').addEventListener('click',e=>{
                document.getElementById('userId').classList.remove('greska');
            })
        });

        document.getElementById('setThumbnail').addEventListener('click', e => {
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-3 adminText ">Set gallery thumbnail</h4></div>
                        <div class="row mb-2 p-2">
                            <select  class="form-control mb-2" name="galleryId" id="galleryId" placeholder="userid">
                            <option value="" selected>Select gallery !</option>
                            </select>
                            <input class="form control mb-2" type="file" id="fileUpload" />
                        </div>
                        <button class="btn btn-primary mb-1" id="btn">Set</button>
                </div>
            </div>
        </div>
            `
            fetch('http://localhost:7000/gallery', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                 },
            })
                .then( res => res.json() )
                .then( data => {
                    var bigChild=document.getElementById('galleryId');
                    data.forEach( el => {
                        bigChild.innerHTML+='<option value="'+el.id+'">'+el.name+'</option>'
                    });
                });

                file=document.getElementById("fileUpload").files;
                fileLen=file.length;
                const formData=new FormData()

                    const handleImageUpload = event=>
                    {
                        const files=event.target.files
                        formData.append('fajl',files[0])
                    }
                    document.getElementById("fileUpload").addEventListener('change',event=>{
                        handleImageUpload(event);
                    })

            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();

                const data = {
                    galleryId: document.getElementById('galleryId').value,
                };

                if(validFr())
                {

                fetch('http://localhost:7000/gallery/create/thumbnailPath',
                {
                    method:'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'GalleryId': `${data.galleryId}`
                     },
                    body:formData
                }).then(res =>res.json())
                .then(data=>{
                    console.log(data.path+"putanjaa")
                    insertToDb(data.path)
                })
                .catch(err =>{
                    console.log(err);
                })

                function insertToDb(putanja)
                {
                const data2 = {
                    galleryId: document.getElementById('galleryId').value,
                    thumbnail_ref:putanja
                };
                console.log(data2)
                
                 fetch('http://localhost:7000/gallery/setThumbnail', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                     },
                    body: JSON.stringify(data2)
                })
                    .then( res => res.json() )
                    .then( el => {
                        if(el)
                        {
                            if(el.msg)
                                alert("Validation error!")
                            else
                            {
                                alert("Uspesan upload thumbnail slike!")
                                window.location.href = 'galleries.html';
                            }
                        }
                        else
                            alert("Greska prilikom unosa!")
                    });}
                }
                else
                    alert("Popunite prazna polja!");
                    
                });
                function validFr()
                {
                    isValid=true;
                    ids=['galleryId'];
                    for(let i=0;i<1;i++)
                    {
                            let check=document.getElementById(ids[i]).value;
                            if(check=="")
                            {
                                document.getElementById(ids[i]).classList.add('greska')
                                isValid=false
                            }
                    }
                    if(document.getElementById("fileUpload").files.length==0)
                    {
                        document.getElementById("fileUpload").classList.add('greskaUpload')
                        isValid=false
                    }
                    return isValid;
                }
                document.getElementById('galleryId').addEventListener('click',e=>{
                    document.getElementById('galleryId').classList.remove('greska');
                })
                document.getElementById('fileUpload').addEventListener('click',e=>{
                    document.getElementById('fileUpload').classList.remove('greskaUpload');
                })  
        });

        document.getElementById('updateGallery').addEventListener('click', e =>{
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-4 adminText ">Update gallery</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="galleryId" type="text" placeholder="Enter gallery id" class="form-control mb-2" required name="name"/>
                            <input id="name" type="text" placeholder="Change gallery name" class="form-control mb-2" required name="name"/>
                            <input id="desc" type="text" placeholder="Change description" class="form-control mb-2" name="Description"/>
                            <input id="tags" type="text" placeholder="Change/Add tags" class="form-control mb-2"  name="Tags"/>
                            <select  class="form-control mb-2" name="mediatyp" id="mediatype" placeholder="Image type">
                                <option value="" disabled selected>Change media type!</option>
                                <option value="wallpaper">Wallpaper</option>
                                <option value="image">Image</option>
                                <option value="icon">Icon</option>
                             </select>
                        </div>
                        <button class="btn btn-primary mb-1" id="btn">Update</button>
                </div>
            </div>
        </div>
            `
            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();
        
                if(validFr())
                {
                    const data = {
                        gallery_id:document.getElementById('galleryId').value,
                        name: document.getElementById('name').value,
                        desc: document.getElementById('desc').value,
                        tags: document.getElementById('tags').value,
                        media_type: document.getElementById('mediatype').value
                    };
                 fetch('http://localhost:7000/gallery/update/'+data.gallery_id, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                     },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( el => {
                        if(el.msg)
                                alert("Validation error!")
                        else
                        {
                        if(el==1)
                            {
                                alert("Uspesan update galerije!")
                                window.location.href = 'galleries.html';
                            }
                        else
                            {
                              alert("Galerija sa datim id nepostoji!")
                              window.location.href = 'galleries.html';
                            }
                        }
                    });
                }
                else
                    alert("Popunite prazna polja!");
            });

            function validFr()
            {
                isValid=true;
                ids=['galleryId','name','mediatype'];
                for(let i=0;i<3;i++)
                {
                        let check=document.getElementById(ids[i]).value;
                        if(check=="")
                        {
                            document.getElementById(ids[i]).classList.add('greska')
                            isValid=false
                        }
                }
                return isValid;
            }
            document.getElementById('galleryId').addEventListener('click',e=>{
                document.getElementById('galleryId').classList.remove('greska');
            })
            document.getElementById('name').addEventListener('click',e=>{
                document.getElementById('name').classList.remove('greska');
            })
            document.getElementById('mediatype').addEventListener('click',e=>{
                document.getElementById('mediatype').classList.remove('greska');
            })
        });    

        document.getElementById('deleteGallery').addEventListener('click', e =>{

            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row mt-5 ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-5 adminText ">Delete gallery</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="delId" type="text" placeholder="Enter gallery id" class="form-control mb-3" required name="delId"/>
                        </div>
                        <button class="btn btn-primary mb-4" id="deleteUsr">Delete</button>
                </div>
            </div>
        </div>
            `

            document.getElementById('deleteUsr').addEventListener('click', e => {
                e.preventDefault();
                if(validFr())
                {
                    id= document.getElementById('delId').value;
                    
                 fetch('http://localhost:7000/gallery/delete/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'deletion_id': `${id}`
                    },
                })
                    .then( res => res.json() )
                    .then( el => {
                        console.log(el)
                        if(el.msg)
                            {
                                alert("Morate uneti id!")
                                window.location.href='galleries.html'
                            }
                        else
                        {    
                        if(el==1)
                        {
                            alert("Uspesno brisanje galerije!")
                            window.location.href = 'galleries.html';
                        }
                        else
                        {
                            alert("Galerija sa zadatim id ne postoji!")
                            window.location.href = 'galleries.html';
                        }
                        }

                        // document.cookie = `token=${el.token};SameSite=Lax`;
                        
                    })
                }
                else
                    alert("Popunite prazna polja!");
            });

            function validFr()
            {
                isValid=true;
                ids=['delId'];
                for(let i=0;i<1;i++)
                {
                        let check=document.getElementById(ids[i]).value;
                        if(check=="")
                        {
                            document.getElementById(ids[i]).classList.add('greska')
                            isValid=false
                        }
                }
                return isValid;
            }
            document.getElementById('delId').addEventListener('click',e=>{
                document.getElementById('delId').classList.remove('greska');
            })

        });

    
        document.getElementById('logout').addEventListener('click', e => {
            document.cookie = `token=;SameSite=Lax`;
            window.location.href = 'login.html';
        });

}