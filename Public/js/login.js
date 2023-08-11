let urlVal='http://localhost:2800';
// let urlVal='https://presentation.awlinternational.com';


const handleLogin = async () => {
    const userid = document.getElementById('userid').value;
    const pass = document.getElementById('password').value;

    const data = { userid, pass }
    const response = await fetch(`${urlVal}/api/verifyuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    if (result.status) {
        alert('Your are Login successfully')
        localStorage.setItem('userId', result.userid)
        window.location.href = '/dashboard';
    }
    else {
        alert('Invalid Userid and Password');
        window.location.reload();
    }
}