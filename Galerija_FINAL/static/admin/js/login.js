function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

        if(validFr())
        {
            fetch('http://localhost:9000/login', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json'},
                 body: JSON.stringify(data)
             })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        document.cookie = `token=${el.token};SameSite=Lax`;
                        window.location.href = 'adminpanel.html';
                    }
            });
        }
        else alert("Popunite prazna polja!");
    });


    function validFr()
    {
        isValid=true;
        ids=['name','password'];
        for(let i=0;i<2;i++)
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
    document.getElementById('password').addEventListener('click',e=>{
        document.getElementById('password').classList.remove('greska');
    })

}