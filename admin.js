function getSelectedRadioValue() {
    const radios = document.getElementsByName('ans');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].id;
        }
    }
    return null;
}

function addQuestion() {
    const qs = document.querySelector("#qstoadd").value;
    const op1 = document.querySelector("#op1").value;
    const op2 = document.querySelector("#op2").value;
    const op3 = document.querySelector("#op3").value;
    const op4 = document.querySelector("#op4").value;
    const ansradio = getSelectedRadioValue();
    let ans = null;

    switch (ansradio) {
        case "ans1":
            ans = op1;
            break;
        case "ans2":
            ans = op2;
            break;
        case "ans3":
            ans = op3;
            break;
        case "ans4":
            ans = op4;
            break;
    }

    if (!qs || !op1 || !op2 || !op3 || !op4) {
        alert("Kindly Fill all Fields");
    } else if (!ans) {
        alert("Kindly Select the correct answer");
    } else {
        const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];

        const duplicate = QuizQuestions.find(q => q.question === qs);

        if (duplicate) {
            alert("Question already exists");
        }
        else {
            const qstoUpload = { question: qs, qop1: op1, qop2: op2, qop3: op3, qop4: op4, ans: ans };
            QuizQuestions.push(qstoUpload);
            localStorage.setItem('Quiz-Questions', JSON.stringify(QuizQuestions));
            alert("Question added");

            document.querySelector("#qstoadd").value = "";
            document.querySelector("#op1").value = "";
            document.querySelector("#op2").value = "";
            document.querySelector("#op3").value = "";
            document.querySelector("#op4").value = "";
            const radios = document.getElementsByName('ans');
            for (let i = 0; i < radios.length; i++) {
                radios[i].checked = false;
            }
        }

    }
}

function showAdd() {
    document.querySelector("#default").classList.add("hideit");
    document.querySelector("#addPanel").classList.remove("hideit");
}

function showDefault() {
    document.querySelector("#default").classList.remove("hideit");
    document.querySelector("#addPanel").classList.add("hideit");
    document.querySelector("#dltPanel").classList.add("hideit");
}

function showDelete() {
    const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];
    const divContent = document.querySelector("#dltPanel");

    divContent.innerHTML = "<h1>Delete Question</h1>";

    if (QuizQuestions.length > 0) {
        QuizQuestions.forEach((question, index) => {
            const questionNumber = index + 1;
            const mainDiv = `
        <div id="qpanel">
            <span id="qnum">Question # ${questionNumber}</span>
            <span id="question">${question.question}</span><br>
            <label for="option1" id="qop1">Option 1: ${question.qop1}</label><br>
            <label for="option2" id="qop2">Option 2: ${question.qop2}</label><br>
            <label for="option3" id="qop3">Option 3: ${question.qop3}</label><br>
            <label for="option4" id="qop4">Option 4: ${question.qop4}</label><br>
            <button type="button" class="btn btn-danger" id="${questionNumber}" onclick="dltqs(${questionNumber - 1})">Delete</button><br>
        </div>
        `;
            divContent.innerHTML += mainDiv;
            // console.log("running");
        });
    } else {
        divContent.innerHTML = `<span>No questions to delete</span><br>`;
    }
    divContent.innerHTML+=`<a onclick="showDefault()" class="pe-auto">Go Back</a>`
    document.querySelector("#dltPanel").classList.remove("hideit");
    document.querySelector("#default").classList.add("hideit");
}

function dltqs(num) {
    const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];

    if (num >= 0 && num < QuizQuestions.length) {
        QuizQuestions.splice(num, 1);
        localStorage.setItem('Quiz-Questions', JSON.stringify(QuizQuestions));
        alert("Question deleted");
        showDelete();
    } else {
        alert("Invalid question number");
    }
}

function adminLogout(){
    window.location.href = 'index.html';
}
