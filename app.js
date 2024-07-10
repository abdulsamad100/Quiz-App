// var newusers = [];


function signup() {
    var name = document.querySelector('#usname').value;
    var email = document.querySelector('#usemail').value;
    var pass = document.querySelector('#uspass').value;
    if (name == "" || email == "" || pass == "") {
        alert("Kindly Fill all Fields");
        return;
    }
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("pass", pass);
}

function login() {
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    var lemail = document.querySelector("#ulemail").value;
    var lpass = document.querySelector("#ulpass").value;
    if (email == lemail && pass == lpass) {
        window.location.href = 'questions.html';
        console.log("Running")
    }
    else {
        alert("Email/Password is Incorrect")
    }
}

function showLogin() {
    var signup = document.getElementById("signup");
    var login = document.getElementById("login");
    signup.classList.add("hideit");
    login.classList.remove("hideit");
}

function showSignup() {
    var signup = document.getElementById("signup");
    var login = document.getElementById("login");
    signup.classList.remove("hideit");
    login.classList.add("hideit");
}