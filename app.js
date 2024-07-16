var currentUser = {};
var adminUser = { email: "admin", pass: "admin123", value: "false" };
localStorage.setItem("admin", JSON.stringify(adminUser));
localStorage.removeItem("quizStarted");
let quizkey = localStorage.getItem("quiz-keys");
if (quizkey == null) {
    var initialKeys = { js: "js2024" };
    localStorage.setItem("quiz-keys", JSON.stringify(initialKeys));
}

function signup(event) {
    event.preventDefault();
    
    const name = document.querySelector('#usname').value;
    const email = document.querySelector('#usemail').value;
    const pass = document.querySelector('#uspass').value;

    if (name == "" || email == "" || pass == "") {
        toastr.warning("Kindly fill all fields");
        return;
    }

    let userFromDB = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < userFromDB.length; i++) {
        if (userFromDB[i].email === email) {
            toastr.error("Email already exists!");
            return;
        }
    }

    const newUser = {
        name: name,
        email: email,
        pass: pass
    };

    userFromDB.push(newUser);
    localStorage.setItem("users", JSON.stringify(userFromDB));

    document.querySelector('#usname').value = '';
    document.querySelector('#usemail').value = '';
    document.querySelector('#uspass').value = '';

    toastr.success("Signup successful!");
}

function login(event) {
    event.preventDefault();
    
    const lemail = document.querySelector("#ulemail").value;
    const lpass = document.querySelector("#ulpass").value;

    if (lemail == "" || lpass == "") {
        toastr.warning("Kindly fill all fields");
        return;
    }

    const userFromDB = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < userFromDB.length; i++) {
        if (userFromDB[i].email === lemail && userFromDB[i].pass === lpass) {
            currentUser.name = userFromDB[i].name;
            currentUser.email = userFromDB[i].email;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('isLoggedIn', true);
            window.location.href = 'allquiz.html';
            return;
        }
    }

    toastr.error("Email/Password is incorrect");
}

function adminLogin(event) {
    event.preventDefault();
    
    var alemail = document.querySelector("#alemail").value;
    var alpass = document.querySelector("#alpass").value;

    if (alemail == "" || alpass == "") {
        toastr.warning("Kindly fill all fields");
        return;
    }

    var adminCredentials = JSON.parse(localStorage.getItem("admin")) || [];

    if (adminCredentials.email === alemail && adminCredentials.pass === alpass) {
        let ad = JSON.parse(localStorage.getItem("admin"));
        ad.value = "true";
        localStorage.setItem("admin", JSON.stringify(ad));
        window.location.href = 'admin.html';
        return;
    }

    toastr.error("Email/Password is incorrect");
}

function showLogin() {
    document.getElementById("signup").classList.add("hideit");
    document.getElementById("adlogin").classList.add("hideit");
    document.getElementById("login").classList.remove("hideit");
}

function showAdmin() {
    document.getElementById("adlogin").classList.remove("hideit");
    document.getElementById("signup").classList.add("hideit");
    document.getElementById("login").classList.add("hideit");
}

function showSignup() {
    var admin = document.getElementById("adlogin");
    var signup = document.getElementById("signup");
    var login = document.getElementById("login");
    admin.classList.add("hideit");
    signup.classList.remove("hideit");
    login.classList.add("hideit");
}

document.querySelector('#uspass').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        signup(event);
    }
});

document.querySelector('#ulpass').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        login(event);
    }
});

document.querySelector('#alpass').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        adminLogin(event);
    }
});
    