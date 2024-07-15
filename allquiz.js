document.addEventListener("DOMContentLoaded", function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem("quizStarted")
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Display the user's score
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
        // alert("Quiz key is required.");
        return;
    }
    
    const validKey = JSON.parse(localStorage.getItem("quiz-keys")); 
    if (quizKey === validKey.js) {
        localStorage.setItem("quizStarted","true");
        window.location.href = 'questions.html';
    } else {
        alert("Invalid key. Please try again.");
    }
}
function userLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('qstoexecute');
    window.location.href = 'index.html';
};