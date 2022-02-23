function init()
{
    const cookies = document.cookie.split('=');
    const token=cookies[1];

    if(token=="" || token==undefined)
        {
            window.location.href='login.html'
            alert("Nemate pristup! Ulogujte se !")
            return
        }


    fetch('http://localhost:7000/users', {
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

            var elId=el.id;var elUsr=el.username;
            var elPass=el.password;var elTyp=el.user_type;
            var elEmail=el.email;var elBio=el.bio;
            var elPrivId=el.privilege_id;
            var elCat=el.createdAt;var elUat=el.updatedAt;

            niz=[elId,elUsr,elPass,elTyp,elEmail,elBio,elPrivId,elCat,elUat]

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


        document.getElementById('registerUser').addEventListener('click', e => {
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                    <form method="post" action="/register">
                        <div class="row mb-2 "><h4 class=" mb-5 adminText ">Register user</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="email" type="text" placeholder="Enter email" class="form-control mb-3" required name="email"/>
                            <input id="username" type="text" placeholder="Enter username" class="form-control mb-3" required name="username"/>
                            <input id="password" type="password" placeholder="Enter password" class="form-control mb-1" required name="password"/>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input id="admin" type="radio" class="form-check-input" name="optradio">Admin
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input id="moderator" type="radio" class="form-check-input" name="optradio">Moderator
                            </label>
                        </div>
                        <div class="form-check ">
                            <label class="form-check-label">
                                <input id="user" type="radio" class="form-check-input mb-3 " checked name="optradio">User
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary mb-4" id="btn">Register</button>
                    </form>
                </div>
            </div>
        </div>
            `
            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    email: document.getElementById('email').value,
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    admin: document.getElementById('admin').checked,
                    moderator: document.getElementById('moderator').checked,
                    user: document.getElementById('admin').checked
                };
        
                if(validFr())
                {
                 fetch('http://localhost:9000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( el => {
                        if(el.msg)
                            alert(el.msg)
                        else
                        // document.cookie = `token=${el.token};SameSite=Lax`;
                        window.location.href = 'users.html';
                    });
                }
                else
                    alert("Popunite prazna polja!");
            });
        
            function validFr()
            {
                isValid=true;
                ids=['email','username','password','admin'];
                for(let i=0;i<4;i++)
                {
                        let check=document.getElementById(ids[i]).value;
                        if(check=="" && i!=3)
                        {
                            document.getElementById(ids[i]).classList.add('greska')
                            isValid=false
                        }
                }
                return isValid;
            }
            document.getElementById('email').addEventListener('click',e=>{
                document.getElementById('email').classList.remove('greska');
            })
            document.getElementById('username').addEventListener('click',e=>{
                document.getElementById('username').classList.remove('greska');
            })
            document.getElementById('password').addEventListener('click',e=>{
                document.getElementById('password').classList.remove('greska');
            })
        });

        document.getElementById('updateUser').addEventListener('click', e =>{
            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row ">
                <div class="col formColor">
                    
                        <div class="row mb-2 "><h4 class=" mb-2 adminText ">Update user</h4></div>
                        <div class="row  p-2">
                            <input id="userId" type="text" placeholder="Enter user id" class="form-control mb-1" required name="id"/>
                            <input id="email" type="text" placeholder="Change email" class="form-control mb-1" required name="email"/>
                            <input id="username" type="text" placeholder="Change username" class="form-control mb-1" required name="username"/>
                            <input id="password" type="password" placeholder="Change password" class="form-control mb-1" required name="password"/>
                            <textarea id="bio" class="textArea" name="bio" placeholder="Update user bio/details..." rows="3" cols"30"></textarea>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" value="off" class="form-check-input" id="admin" name="admin">
                            <label class="form-check-label adminText" for="admin">Make admin</label>
                        </div>
                        <button class="btn btn-primary mb-4" id="btn">Update</button>
                
                </div>
            </div>
        </div>
            `
            document.getElementById('btn').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    userId:document.getElementById('userId').value,
                    email: document.getElementById('email').value,
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    bio: document.getElementById('bio').value,
                    admin: document.getElementById('admin').checked
                };
        
                if(validFr())
                {
                 fetch('http://localhost:7000/user/update/'+data.userId, {
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
                        {
                            alert("Validation error!")
                        }
                        else
                            {
                            if(el==1)
                            {
                                alert("Uspesan update korisnika!")
                                window.location.href = 'users.html';
                            }
                            else
                            {
                                if(!el.msg){
                                alert("Korisnik sa id "+userId+" ne postoji u bazi")
                                window.location.href = 'users.html';
                                }else{alert("Nemate admin privilegiju!"); window.location.href = 'login.html';}
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
                ids=['userId','email','username','password','bio','admin'];
                for(let i=0;i<6;i++)
                {
                        let check=document.getElementById(ids[i]).value;
                        if(check=="" && i!=5 && i!=4)
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
            document.getElementById('email').addEventListener('click',e=>{
                document.getElementById('email').classList.remove('greska');
            })
            document.getElementById('username').addEventListener('click',e=>{
                document.getElementById('username').classList.remove('greska');
            })
            document.getElementById('password').addEventListener('click',e=>{
                document.getElementById('password').classList.remove('greska');
            })
        });    

        document.getElementById('deleteUser').addEventListener('click', e =>{

            let mainPanelGenerate=document.getElementById('mainPanel');
            mainPanelGenerate.innerHTML=
            `
            <div class=" d-flex justify-content-center align-items-center text-center">
            <div class="row mt-5 ">
                <div class="col formColor">
                        <div class="row mb-2 "><h4 class=" mb-5 adminText ">Delete user</h4></div>
                        <div class="row mb-2 p-2">
                            <input id="delId" type="text" placeholder="Enter id" class="form-control mb-3" required name="username"/>
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
                    
                 fetch('http://localhost:7000/user/delete/'+id, {
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
                            alert("Uspesno brisanje korisnika!")
                            window.location.href = 'users.html';
                        }
                        else
                        {
                            if(el.msg)
                            {
                                if(el.msg=="Validation Error!")
                                {
                                    window.location.href = 'users.html';
                                    alert("Validation Error!")
                                }
                                else
                                {    
                                    window.location.href = 'login.html';
                                    alert("Nemate admin privilegiju!")
                                }
                            }
                                else
                                {
                            alert("Korisnik ne postoji u bazi")
                            window.location.href = 'users.html';
                                }
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