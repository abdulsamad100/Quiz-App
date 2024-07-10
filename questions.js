var question = [{
    question: "Your name:",
    qop1: "Samad",
    qop2: "Ahmed",
    qop3: "Yousuf",
    qop4: "Ali",
    ans: "1. Samad"
},
{
    question: "Your Father Name:",
    qop1: "Abdullah",
    qop2: "Ali",
    qop3: "Mehmood",
    qop4: "Hassan",
    ans: "3. Mehmood"
}];

var qlength = question.length;
var correctans = 0;
var qstoexecute = 0;

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Store the shuffled questions in localStorage if not already stored
if (!localStorage.getItem('shuffledQuestions')) {
    var shuffledQuestions = shuffle([...question]);
    localStorage.setItem('shuffledQuestions', JSON.stringify(shuffledQuestions));
} else {
    var shuffledQuestions = JSON.parse(localStorage.getItem('shuffledQuestions'));
}

function setQuestion() {
    document.querySelector("#checkbtn").classList.remove("hideit");
    document.querySelector("#nextbtn").classList.add("hideit");

    var qnum = document.querySelector("#qnum");
    var questiondetail = document.querySelector("#question");
    var option1 = document.querySelector("#qop1");
    var option2 = document.querySelector("#qop2");
    var option3 = document.querySelector("#qop3");
    var option4 = document.querySelector("#qop4");

    var op1 = document.querySelector("#option1");
    var op2 = document.querySelector("#option2");
    var op3 = document.querySelector("#option3");
    var op4 = document.querySelector("#option4");

    var qnow = shuffledQuestions[qstoexecute];
    op1.value = `1. ${qnow.qop1}`;
    op2.value = `2. ${qnow.qop2}`;
    op3.value = `3. ${qnow.qop3}`;
    op4.value = `4. ${qnow.qop4}`;

    qnum.innerHTML = `Question ${qstoexecute + 1}:`; // Dynamic question number
    questiondetail.innerHTML = qnow.question;
    option1.innerHTML = `1. ${qnow.qop1}`;
    option2.innerHTML = `2. ${qnow.qop2}`;
    option3.innerHTML = `3. ${qnow.qop3}`;
    option4.innerHTML = `4. ${qnow.qop4}`;

    // Remove any existing background color classes for highlighting:
    var allOptions = document.querySelectorAll("label");
    for (var i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove("bggreen", "bgred");
    }
}

function checkAnswer() {
    var qnow = shuffledQuestions[qstoexecute];
    var selectedOption = document.querySelector('input[name="option"]:checked');
    document.querySelector("#checkbtn").classList.add("hideit");
    document.querySelector("#nextbtn").classList.remove("hideit");

    if (selectedOption) {
        var selectedValue = selectedOption.value;
        if (selectedValue === qnow.ans) {
            selectedOption.nextElementSibling.classList.add("bggreen"); // Highlight correct answer (green)
            correctans++;
        } else {
            selectedOption.nextElementSibling.classList.add("bgred"); // Highlight incorrect answer (red)
            document.querySelector('input[value="' + qnow.ans + '"]').nextElementSibling.classList.add("bggreen"); // Highlight correct answer
        }
    } else {
        alert("Please select an answer.");
    }
}

function nextQuestion() {
    // Clear previous answer selection and highlighting:
    var allRadioInputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < allRadioInputs.length; i++) {
        allRadioInputs[i].checked = false;
    }

    qstoexecute++;
    if (qstoexecute < qlength) {
        setQuestion();
    } else {
        // Handle end-of-quiz scenario (optional: display score, etc.)
        document.querySelector("#qpanel").classList.add("hideit");
        var marksdiv = document.querySelector("#marks");
        marksdiv.classList.remove("hideit");
        var uname = toTitleCase(localStorage.getItem("name"));
        var Percentage = (correctans * 100) / qlength;
        marksdiv.innerHTML = `<h1>Mr. ${uname}</h1><p>Your score is ${correctans} out of ${qlength}</p><p>Total Percentage is ${Percentage}%</p>`;

        // Clear the shuffled questions from localStorage for future use
        localStorage.removeItem('shuffledQuestions');
    }
}


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

setQuestion();