export default currentUser = {};

function signup() {
    var name = document.querySelector('#usname').value;
    var email = document.querySelector('#usemail').value;
    var pass = document.querySelector('#uspass').value;
    
    if (name == "" || email == "" || pass == "") {
        alert("Kindly fill all fields");
        return;
    }

    var userFromDB = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email already exists
    for (let i = 0; i < userFromDB.length; i++) {
        if (userFromDB[i].email === email) {
            alert("Email already exists!");
            return;
        }
    }

    var newUser = {
        name: name,
        email: email,
        pass: pass
    };
    
    userFromDB.push(newUser);
    localStorage.setItem("users", JSON.stringify(userFromDB));

    // Clear all fields after signup
    document.querySelector('#usname').value = '';
    document.querySelector('#usemail').value = '';
    document.querySelector('#uspass').value = '';
    
    alert("Signup successful!");
}

function login() {
    var lemail = document.querySelector("#ulemail").value;
    var lpass = document.querySelector("#ulpass").value;

    if (lemail == "" || lpass == "") {
        alert("Kindly fill all fields");
        return;
    }

    var userFromDB = JSON.parse(localStorage.getItem("users")) || [];
    
    for (let i = 0; i < userFromDB.length; i++) {
        if (userFromDB[i].email === lemail && userFromDB[i].pass === lpass) {
            currentUser.name = userFromDB[i].name;
            currentUser.email = userFromDB[i].email;
            currentUser.pass = userFromDB[i].pass;
            window.location.href = 'questions.html';
            return;
        }
    }
    
    alert("Email/Password is incorrect");
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