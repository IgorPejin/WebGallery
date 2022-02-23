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


    fetch('http://localhost:7000/photos', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then( res => res.json())
        .then( data => {

            if(!data.msg){
            var tbody = document.createElement("tbody");
            data.forEach( el => {
                replaceTbody(el,10,tbody)
            });
            }else{
                console.log(data)
                window.location.href = 'login.html';
                alert("You are not admin user!")
            }
        }).catch( err => {
            console.log(err)
            alert("You are not admin user!")
            window.location.href = 'login.html';
        });

        function replaceTbody(el,x,tbody){
            var table = $('tabela');
            table.appendChild(tbody);

            var elId=el.id;var elName=el.name;
            var elTags=el.tags;var elOrSize=el.original_size;
            var elOrRef=el.original_ref;var elThbRef=el.thumbnail_ref;
            var elExt=el.extension;var elgId=el.gallery_id;
            var elCat=el.createdAt;var elUat=el.updatedAt;

            niz=[elId,elName,elTags,elOrSize,elOrRef,elThbRef,elExt,elgId,elCat,elUat]

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

        document.getElementById('uploadPhoto').addEventListener('click', e =>{
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-3 adminText ">Upload new photo!</h4></div>
                        <div class="row mb-2 p-2">
                            <select  class="form-control mb-2" name="galleryId" id="galleryId" placeholder="galleryid">
                            <option value="" selected>Select gallery!</option>
                            </select>
                            <input id="name" type="text" placeholder="Enter photo name" class="form-control mb-2" required name="name"/>
                            <input id="tags" type="text" placeholder="Add tags" class="form-control mb-2"  name="Tags"/>
                            <input class="form control mb-2" type="file" id="fileUpload" />
                        </div>
                        <button class="btn btn-primary mb-1" id="btn">Upload</button>
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
                    gallery_id:document.getElementById('galleryId').value,
                };
        
                if(validFr())
                {
                    fetch('http://localhost:7000/photos/upload/photoPath',
                    {
                        method:'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'GalleryId': `${data.gallery_id}` 
                         },
                        body:formData
                    }).then(res =>res.json())
                    .then(data=>{
                        resizeImage(data.resizePath,data.resizePath3)
                        insertToDb(data.path,data.resizePath2,data.original_size)
                    })
                    .catch(err =>{
                        alert("Fajl nije podrzan!")
                    })

                    function resizeImage(resizePath,resizePathAps)
                    {
                        const data = {
                            resizePath:resizePath,
                            resizePathAps:resizePathAps
                        };

                        fetch('http://localhost:7000/photos/resizePhoto', {
                            method: 'POST',
                            headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(data)
                        })
                        .then( res => res.json() )
                        .then( el => {
                            if(el.msg)
                                {
                                    console.log("prosaoo")
                                }
                        });

                    }

                    function insertToDb(putanja,putanjaResize,dimenzije)
                    {
                        let spliter=putanja.split('.');
                        let ext=spliter[1];

                        const data2 = {
                            name:document.getElementById('name').value,
                            tags:document.getElementById('tags').value,
                            original_size:dimenzije,
                            original_ref:putanja,
                            thumbnail_ref:putanjaResize,
                            extension:ext,
                            gallery_id: document.getElementById('galleryId').value
                        };

                        fetch('http://localhost:7000/photos/uploadPhoto', {
                            method: 'POST',
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
                                    alert("Uspesan upload slike!")
                                    window.location.href = 'photos.html';
                                }
                            }
                            else
                                alert("Greska prilikom unosa!")
                        });
                    }
                }
                else
                    alert("Popunite prazna polja!");
            });

            function validFr()
            {
                isValid=true;
                ids=['galleryId','name','fileUpload'];
                for(let i=0;i<3;i++)
                {
                        let check=document.getElementById(ids[i]).value;
                        if(i==2 && check=="")
                        {
                            document.getElementById(ids[i]).classList.add('greskaUpload')
                            isValid=false;
                            continue
                        }
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
            document.getElementById('fileUpload').addEventListener('click',e=>{
                document.getElementById('fileUpload').classList.remove('greskaUpload');
            })
        });   


        document.getElementById('updatePhoto').addEventListener('click', e =>{
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                    
                        <div class="row mb-2 "><h4 class=" mb-5 adminText ">Update photo info</h4></div>
                        <div class="row  p-2">
                            <input id="photoId" type="text" placeholder="Enter photo id" class="form-control mb-3" required name="id"/>
                            <input id="name" type="text" placeholder="Change photo name" class="form-control mb-3" required name="id"/>
                            <input id="tags" type="text" placeholder="Add/change tags" class="form-control mb-5" required name="email"/>
                        </div>
                        <button class="btn btn-primary mb-5" id="btn">Update</button>
                
                </div>
            </div>
        </div>
            `
            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    photo_id:document.getElementById('photoId').value,
                    name: document.getElementById('name').value,
                    tags: document.getElementById('tags').value,
                };
        
                if(validFr())
                {
                 fetch('http://localhost:7000/photos/update/'+data.photo_id, {
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
                            alert("Validation Error!")
                        else{
                        if(el==1)
                        {
                            alert("Uspesan update fotografije!")
                            window.location.href = 'photos.html';
                        }
                        else
                        {
                            alert("Fotografija sa unetim id nepostoji!")
                            window.location.href = 'photos.html';
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
                ids=['photoId','name','tags'];
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
            document.getElementById('photoId').addEventListener('click',e=>{
                document.getElementById('photoId').classList.remove('greska');
            })
            document.getElementById('name').addEventListener('click',e=>{
                document.getElementById('name').classList.remove('greska');
            })
            document.getElementById('tags').addEventListener('click',e=>{
                document.getElementById('tags').classList.remove('greska');
            })
        });    

        document.getElementById('deletePhoto').addEventListener('click', e =>{

            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row mt-5 ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-5 adminText ">Delete photo</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="delId" type="text" placeholder="Enter photo id" class="form-control mb-3" required name="delId"/>
                        </div>
                        <button class="btn btn-primary mb-4" id="deletePht">Delete</button>
                </div>
            </div>
        </div>
            `

            document.getElementById('deletePht').addEventListener('click', e => {
                e.preventDefault();
                if(validFr())
                {
                 id= document.getElementById('delId').value;
                 fetch('http://localhost:7000/photos/delete/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'deletion_id': `${id}`
                    },
                })
                    .then( res => res.json() )
                    .then( el => {
                        console.log(el)
                        if(el==1)
                        {
                            alert("Uspesno brisanje fotografije!")
                            window.location.href = 'photos.html';
                        }
                        else
                        {
                            alert("Fotografija sa zadatim id ne postoji!")
                            window.location.href = 'photos.html';
                        }
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