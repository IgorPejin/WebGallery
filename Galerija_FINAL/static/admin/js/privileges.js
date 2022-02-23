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

    fetch('http://localhost:7000/privileges', {
        headers: {
            'Authorization': `Bearer ${token}`,
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

            var elId=el.id;var elcU=el.canUpload;
            var elcD=el.canDelete;var elcUpd=el.canUpdate;
            var elccU=el.canCreateUser;var elcdU=el.canDeleteUser;
            var elcmU=el.canModifyUser;var elCat=el.createdAt;var elUat=el.updatedAt;

            niz=[elId,elcU,elcD,elcUpd,elccU,elcdU,elcmU,elCat,elUat]

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


        document.getElementById('createPrivileges').addEventListener('click', e => {
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-3 adminText ">Create user privilege</h4></div>
                        <select  class="form-control mb-2" name="canUpload" id="canUpload">
                                <option value="" disabled selected>Can upload?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canDelete" id="canDelete">
                                <option value="" disabled selected>Can delete?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canUpdate" id="canUpdate">
                                <option value="" disabled selected>Can update?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canCreateUsr" id="canCreateUsr">
                                <option value="" disabled selected>Can creat user?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canDeleteUsr" id="canDeleteUsr">
                                <option value="" disabled selected>Can delete user?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-3" name="canModifyUsr" id="canModifyUsr">
                                <option value="" disabled selected>Can modify user?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <button class="btn btn-primary mb-2" id="btn">Create privilege</button>
                </div>
            </div>
        </div>
            `

            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();

                const data = {
                    canUpload: document.getElementById('canUpload').value,
                    canDelete: document.getElementById('canDelete').value,
                    canUpdate: document.getElementById('canUpdate').value,
                    canCreateUser: document.getElementById('canCreateUsr').value,
                    canDeleteUser: document.getElementById('canDeleteUsr').value,
                    canModifyUser: document.getElementById('canModifyUsr').value
                };
        
                if(validFr())
                {
                 fetch('http://localhost:7000/privileges/create/', {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                     },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( el => {
                        // document.cookie = `token=${el.token};SameSite=Lax`;
                        window.location.href = 'privileges.html';
                    });
                }
                else
                    alert("Popunite prazna polja!");
            });
        
            function validFr()
            {
                isValid=true;
                ids=['canUpload','canDelete','canUpdate','canCreateUsr','canDeleteUsr','canModifyUsr'];
                for(let i=0;i<6;i++)
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
            document.getElementById('canUpload').addEventListener('click',e=>{
                document.getElementById('canUpload').classList.remove('greska');
            })
            document.getElementById('canDelete').addEventListener('click',e=>{
                document.getElementById('canDelete').classList.remove('greska');
            })
            document.getElementById('canUpdate').addEventListener('click',e=>{
                document.getElementById('canUpdate').classList.remove('greska');
            })
            document.getElementById('canCreateUsr').addEventListener('click',e=>{
                document.getElementById('canCreateUsr').classList.remove('greska');
            })
            document.getElementById('canDeleteUsr').addEventListener('click',e=>{
                document.getElementById('canDeleteUsr').classList.remove('greska');
            })
            document.getElementById('canModifyUsr').addEventListener('click',e=>{
                document.getElementById('canModifyUsr').classList.remove('greska');
            })
        });

        document.getElementById('managePrivileges').addEventListener('click', e => {
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-3 adminText ">Manage user privileges</h4></div>
                        <select  class="form-control mb-2" name="userId" id="userId" placeholder="userid">
                        <option value="" selected>Select privilege id!</option>
                        </select>
                        <select  class="form-control mb-2" name="canUpload" id="canUpload">
                                <option value="" disabled selected>Can upload?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canDelete" id="canDelete">
                                <option value="" disabled selected>Can delete?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canUpdate" id="canUpdate">
                                <option value="" disabled selected>Can update?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canCreateUsr" id="canCreateUsr">
                                <option value="" disabled selected>Can creat user?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-2" name="canDeleteUsr" id="canDeleteUsr">
                                <option value="" disabled selected>Can delete user?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <select  class="form-control mb-3" name="canModifyUsr" id="canModifyUsr">
                                <option value="" disabled selected>Can modify user?</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                        </select>
                        <button class="btn btn-primary mb-2" id="btn">Update privileges</button>
                </div>
            </div>
        </div>
            `
            fetch('http://localhost:7000/privileges/fillUsers', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
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
                    user_id: document.getElementById('userId').value,
                    canUpload: document.getElementById('canUpload').value,
                    canDelete: document.getElementById('canDelete').value,
                    canUpdate: document.getElementById('canUpdate').value,
                    canCreateUser: document.getElementById('canCreateUsr').value,
                    canDeleteUser: document.getElementById('canDeleteUsr').value,
                    canModifyUser: document.getElementById('canModifyUsr').value,
                };
        
                if(validFr())
                {
                 fetch('http://localhost:7000/privileges/manage/'+data.user_id, {
                    method: 'PUT',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                     },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( el => {
                        // document.cookie = `token=${el.token};SameSite=Lax`;
                        window.location.href = 'privileges.html';
                    });
                }
                else
                    alert("Popunite prazna polja!");
            });
        
            function validFr()
            {
                isValid=true;
                ids=['userId','canUpload','canDelete','canUpdate','canCreateUsr','canDeleteUsr','canModifyUsr'];
                for(let i=0;i<7;i++)
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
            document.getElementById('userId').addEventListener('click',e=>{
                document.getElementById('userId').classList.remove('greska');
            })
            document.getElementById('canUpload').addEventListener('click',e=>{
                document.getElementById('canUpload').classList.remove('greska');
            })
            document.getElementById('canDelete').addEventListener('click',e=>{
                document.getElementById('canDelete').classList.remove('greska');
            })
            document.getElementById('canUpdate').addEventListener('click',e=>{
                document.getElementById('canUpdate').classList.remove('greska');
            })
            document.getElementById('canCreateUsr').addEventListener('click',e=>{
                document.getElementById('canCreateUsr').classList.remove('greska');
            })
            document.getElementById('canDeleteUsr').addEventListener('click',e=>{
                document.getElementById('canDeleteUsr').classList.remove('greska');
            })
            document.getElementById('canModifyUsr').addEventListener('click',e=>{
                document.getElementById('canModifyUsr').classList.remove('greska');
            })
        });

        document.getElementById('deletePrivileges').addEventListener('click', e =>{

            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row mt-5 ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-5 adminText ">Delete privilege</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="delId" type="text" placeholder="Enter privilege id" class="form-control mb-3" required name="delId"/>
                        </div>
                        <button class="btn btn-primary mb-4" id="deletePrv">Delete</button>
                </div>
            </div>
        </div>
            `

            document.getElementById('deletePrv').addEventListener('click', e => {
                e.preventDefault();
                if(validFr())
                {
                    id= document.getElementById('delId').value;
                    
                 fetch('http://localhost:7000/privileges/delete/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'deletion_id': `${id}`
                    },
                })
                    .then( res => res.json() )
                    .then( el => {
                        if(el==1)
                        {
                            alert("Uspesno brisanje privilegije!")
                            window.location.href = 'privileges.html';
                        }
                        else
                        {
                            alert("Privilegija sa zadatim id ne postoji!")
                            window.location.href = 'privileges.html';
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