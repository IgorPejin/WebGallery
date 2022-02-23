function init() {

    const cookies = document.cookie.split('=');
    const token=cookies[1];
    if(token==""||token==undefined)
        {
            window.location.href='login.html'
            alert("Nemate pristup! Ulogujte se !")
            return;
        }

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}