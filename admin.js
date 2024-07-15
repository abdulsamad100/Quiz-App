let optionCount = 2; // Start with 2 options

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
    const options = [];
    for (let i = 1; i <= optionCount; i++) {
        options.push(document.querySelector(`#op${i}`).value);
    }
    const ansradio = getSelectedRadioValue();
    let ans = null;

    switch (ansradio) {
        case "ans1":
            ans = options[0];
            break;
        case "ans2":
            ans = options[1];
            break;
        case "ans3":
            ans = options[2];
            break;
        case "ans4":
            ans = options[3];
            break;
    }

    if (!qs || options.some(op => !op)) {
        alert("Kindly Fill all Fields");
    } else if (!ans) {
        alert("Kindly Select the correct answer");
    } else {
        const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];

        const duplicate = QuizQuestions.find(q => q.question === qs);

        if (duplicate) {
            alert("Question already exists");
        } else {
            const qstoUpload = {
                question: qs,
                options: options.map((op, i) => ({ value: op, label: op })),
                ans: ans
            };
            QuizQuestions.push(qstoUpload);
            localStorage.setItem('Quiz-Questions', JSON.stringify(QuizQuestions));
            alert("Question added");

            document.querySelector("#qstoadd").value = "";
            for (let i = 1; i <= optionCount; i++) {
                document.querySelector(`#op${i}`).value = "";
                document.querySelector(`#ans${i}`).checked = false;
            }
        }
    }
}

function showAdd() {
    const addPanel = document.querySelector("#addPanel");
    addPanel.innerHTML = `
        <h1>Adding Question....</h1>
        <label for="qs">Question: </label><br>
        <textarea id="qstoadd" placeholder="Enter Question here..."></textarea><br>
        <br>
        <div id="optionsContainer">
            ${[1, 2].map(i => `
                <div id="option${i}">
                    <label for="op${i}">Option ${i}: </label>&nbsp;
                    <input type="text" id="op${i}">&nbsp;
                    <input type="radio" name="ans" id="ans${i}"><br>
                </div>
            `).join('')}
        </div>
        <br>
        <button type="button" class="btn btn-primary" onclick="addOption()">Add Option</button>
        <button type="button" class="btn btn-danger" onclick="removeOption()">Remove Option</button><br><br>
        <button type="button" class="btn btn-success" onclick="addQuestion()">Add</button><br>
        <a onclick="showDefault()" class="pe-auto">Go Back</a>
    `;
    document.querySelector("#default").classList.add("hideit");
    addPanel.classList.remove("hideit");
}

function addOption() {
    optionCount++;
    const optionsContainer = document.querySelector("#optionsContainer");
    const newOption = `
        <div id="option${optionCount}">
            <label for="op${optionCount}">Option ${optionCount}: </label>&nbsp;
            <input type="text" id="op${optionCount}">&nbsp;
            <input type="radio" name="ans" id="ans${optionCount}"><br>
        </div>
    `;
    optionsContainer.innerHTML += newOption;
}

function removeOption() {
    if (optionCount > 2) {
        const optionToRemove = document.querySelector(`#option${optionCount}`);
        optionToRemove.remove();
        optionCount--;
    }
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
                    ${question.options.map((option, i) => `<label for="option${i + 1}" id="qop${i + 1}">Option ${i + 1}: ${option.label}</label><br>`).join('')}
                    <button type="button" class="btn btn-danger" id="${questionNumber}" onclick="dltqs(${questionNumber - 1})">Delete</button><br>
                </div>
            `;
            divContent.innerHTML += mainDiv;
        });
    } else {
        divContent.innerHTML = `<span>No questions to delete</span><br>`;
    }
    divContent.innerHTML += `<a onclick="showDefault()" class="pe-auto">Go Back</a>`
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

function adminLogout() {
    let ad = JSON.parse(localStorage.getItem("admin"));
    ad.value = "false";
    localStorage.setItem("admin", JSON.stringify(ad));
    window.location.href = 'index.html';
}
