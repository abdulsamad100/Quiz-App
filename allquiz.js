document.addEventListener("DOMContentLoaded", function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem("quizStarted")
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    document.querySelector("#username").innerHTML+= toTitleCase(currentUser.name);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserData = users.find(user => user.name === currentUser.name);

    if (currentUserData && currentUserData.jscore !== undefined) {
        document.getElementById('score').textContent = currentUserData.jscore;
    } else {
        document.getElementById('score').textContent = 0;
    }
});

function enterQuiz() {
    const quizKey = prompt("Please enter the quiz key:");
    if (quizKey === null || quizKey.trim() === "") {
        toastr.warning("Quiz key is required.");
        return;
    }
    
    const validKey = JSON.parse(localStorage.getItem("quiz-keys")); 
    if (quizKey === validKey.js) {
        localStorage.setItem("quizStarted", "true");
        window.location.href = 'questions.html';
    } else {
        toastr.error("Invalid key. Please try again.");
    }
}

function userLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('qstoexecute');
    window.location.href = 'index.html';
    toastr.info("You have been logged out.");
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
