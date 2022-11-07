const login_status = localStorage.getItem("login")

if (login_status !== 'true') {
    localStorage.setItem("login", false);
}

if (login_status !== 'true') {
    document.getElementById('notloggedin').style.display = "block";
} else if (login_status == 'true') {
    document.getElementById('notloggedin').style.display = "none";
}