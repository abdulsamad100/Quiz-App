window.onbeforeunload = function(event) {
    var confirmationMessage = 'Are you sure you want to leave this page?';
    event.returnValue = confirmationMessage;
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
    return confirmationMessage;
  };
  
function userLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('qstoexecute');
    window.location.href = 'index.html';
};
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }
});

var correctans = 0;
var qstoexecute = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

var questions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];

if (questions.length === 0) {
    alert("Ask admin to add questions");
    window.location.href = "index.html";
} else {
    if (!localStorage.getItem('shuffledQuestions')) {
        var shuffledQuestions = shuffle([...questions]);
        localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));
    } else {
        var shuffledQuestions = JSON.parse(localStorage.getItem('shuffledQuestions'));
    }

    var qlength = shuffledQuestions.length;

    function createQuestionPanel() {
        var qpanel = document.querySelector("#qpanel");

        var qnum = document.createElement("span");
        qnum.id = "qnum";
        qpanel.appendChild(qnum);

        var questiondetail = document.createElement("span");
        questiondetail.id = "question";
        qpanel.appendChild(questiondetail);
        qpanel.appendChild(document.createElement("br"));

        var optionsContainer = document.createElement("div");
        optionsContainer.id = "options-container";
        qpanel.appendChild(optionsContainer);
        qpanel.appendChild(document.createElement("br"));

        var checkButton = document.createElement("button");
        checkButton.type = "button";
        checkButton.classList.add("btn", "btn-primary", "hideit");
        checkButton.onclick = checkAnswer;
        checkButton.id = "checkbtn";
        checkButton.innerText = "Check";
        qpanel.appendChild(checkButton);

        var nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.classList.add("btn", "btn-primary");
        nextButton.onclick = nextQuestion;
        nextButton.id = "nextbtn";
        nextButton.innerText = "Next";
        qpanel.appendChild(nextButton);
    }

    function setQuestion() {
        document.querySelector("#checkbtn").classList.remove("hideit");
        document.querySelector("#nextbtn").classList.add("hideit");

        var qnum = document.querySelector("#qnum");
        var questiondetail = document.querySelector("#question");
        var optionsContainer = document.querySelector("#options-container");

        optionsContainer.innerHTML = '';

        var qnow = shuffledQuestions[qstoexecute];

        qnum.innerHTML = `Question ${qstoexecute + 1}:`;
        questiondetail.innerHTML = qnow.question;

        qnow.options.forEach((option, index) => {
            var optionContainer = document.createElement('div');
            optionContainer.classList.add("option-container");
            optionContainer.style.marginBottom = "10px";

            var optionButton = document.createElement("button");
            optionButton.type = "button";
            optionButton.classList.add("btn", "btn-option");
            optionButton.id = "option" + index;
            optionButton.innerHTML = `<span class="option-number">${index + 1}. </span>${option.label}`;
            optionButton.onclick = selectOption;
            optionContainer.appendChild(optionButton);

            optionsContainer.appendChild(optionContainer);
        });

        var allOptions = document.querySelectorAll("label");
        for (var i = 0; i < allOptions.length; i++) {
            allOptions[i].classList.remove("bggreen", "bgred");
        }
    }

    function selectOption(event) {
        var selectedButton = event.target.closest('.btn-option');
        var allButtons = document.querySelectorAll(".btn-option");

        allButtons.forEach(button => {
            button.classList.remove("selected");
            button.style.borderColor = "black";
        });

        selectedButton.classList.add("selected");
        selectedButton.style.borderColor = "blue";
    }

    function checkAnswer() {
        var qnow = shuffledQuestions[qstoexecute];
        var selectedButton = document.querySelector('.btn-option.selected');
        document.querySelector("#checkbtn").classList.add("hideit");
        document.querySelector("#nextbtn").classList.remove("hideit");

        if (selectedButton) {
            var selectedValue = selectedButton.innerText.slice(3); // Remove the number and space
            if (selectedValue === qnow.ans) {
                selectedButton.classList.add("bggreen");
                correctans++;
            } else {
                selectedButton.classList.add("bgred");
                var correctButton = Array.from(document.querySelectorAll('.btn-option')).find(button => button.innerText.slice(3) === qnow.ans);
                if (correctButton) {
                    correctButton.classList.add("bggreen");
                }
            }
        } else {
            alert("Please select an answer.");
        }

        // Remove blue border color from all buttons
        var allButtons = document.querySelectorAll(".btn-option");
        allButtons.forEach(button => {
            button.style.borderColor = "black";
        });
    }

    function nextQuestion() {
        qstoexecute++;
        if (qstoexecute < qlength) {
            setQuestion();
        } else {
            document.querySelector("#qpanel").classList.add("hideit");
            var marksdiv = document.querySelector("#marks");
            marksdiv.classList.remove("hideit");
            var user = JSON.parse(localStorage.getItem("currentUser"));
            var uname = toTitleCase(user.name);
            var Percentage = (correctans * 100) / qlength;

            marksdiv.innerHTML = `<h1>Mr. ${uname}</h1><p>Your score is ${correctans} out of ${qlength}</p><p>Total Percentage is ${Percentage}%<br> <button onclick="userLogout()" type="button" class="btn btn-danger">Logout</button></p>`;

            localStorage.removeItem('shuffledQuestions');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id == 'logoutLink') {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
        }
    });

    createQuestionPanel();
    setQuestion();
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
} function userLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('qstoexecute'); // Clear the stored index
    window.location.href = 'index.html';
};