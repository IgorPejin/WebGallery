function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked
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
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'adminpanel.html';
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
    
}