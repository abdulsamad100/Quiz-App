let optionCount = 2;

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
        toastr.error("Kindly Fill all Fields");
    } else if (!ans) {
        toastr.error("Kindly Select the correct answer");
    } else {
        const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];

        const duplicate = QuizQuestions.find(q => q.question === qs);

        if (duplicate) {
            toastr.error("Question already exists");
        } else {
            const qstoUpload = {
                id: QuizQuestions.length + 1,
                question: qs,
                options: options.map((op) => ({ value: op, label: op })),
                ans: ans
            };
            QuizQuestions.push(qstoUpload);
            localStorage.setItem('Quiz-Questions', JSON.stringify(QuizQuestions));
            toastr.success("Question added");

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
        <h1 class='text-primary'>Add Question</h1>
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
    document.querySelector("#head1").classList.add("hideit");
    document.querySelector("#default").classList.add("hideit");
    addPanel.classList.remove("hideit");
}

function addOption() {
    if (optionCount < 4) {
        optionCount++;

        const optionsValues = [];
        for (let i = 1; i < optionCount; i++) {
            optionsValues.push(document.querySelector(`#op${i}`).value);
        }

        const optionsContainer = document.querySelector("#optionsContainer");
        const newOption = `
        <div id="option${optionCount}">
            <label for="op${optionCount}">Option ${optionCount}: </label>&nbsp;
            <input type="text" id="op${optionCount}">&nbsp;
            <input type="radio" name="ans" id="ans${optionCount}"><br>
        </div>
    `;
        optionsContainer.innerHTML += newOption;

        // Restore the previous values
        for (let i = 1; i < optionCount; i++) {
            document.querySelector(`#op${i}`).value = optionsValues[i - 1];
        }
    }
}

function removeOption() {
    if (optionCount > 2) {
        const optionToRemove = document.querySelector(`#option${optionCount}`);
        optionToRemove.remove();
        optionCount--;
    }
}

function showDelete() {
    const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];
    const divContent = document.querySelector("#dltPanel");

    divContent.innerHTML = "<h1 class='text-primary'>Delete Question</h1>";

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
    document.querySelector("#head1").classList.add("hideit");
}

function showEdit() {
    let questions = JSON.parse(localStorage.getItem("Quiz-Questions"));
    const editPanel = document.querySelector("#editPanel");
    editPanel.innerHTML = "<h1 class='text-primary'>Edit Question</h1>";

    if (questions && questions.length > 0) {
        questions.forEach((question, index) => {
            const questionNumber = index + 1;
            const mainDiv = `
                <div id="qpanel-${questionNumber}">
                    <span id="qnum">Question #${questionNumber}</span>
                    <span id="question">${question.question}</span><br>
                    ${question.options.map((option, i) => `<label for="option${i + 1}" id="qop${i + 1}">Option ${i + 1}: ${option.label}</label><br>`).join('')}
                    <button type="button" class="btn btn-primary" id="edit-${questionNumber}" onclick="editQuestion(${index})">Edit</button><br>
                </div>
            `;
            editPanel.innerHTML += mainDiv;
        });
    } else {
        editPanel.innerHTML = `<span>No questions to Edit</span><br>`;
    }

    editPanel.innerHTML += `<a onclick="showDefault()" class="pe-auto">Go Back</a>`;
    document.querySelector("#dltPanel").classList.add("hideit");
    document.querySelector("#head1").classList.add("hideit");
    document.querySelector("#default").classList.add("hideit");
    editPanel.classList.remove("hideit");
}

function editQuestion(index) {
    let questions = JSON.parse(localStorage.getItem("Quiz-Questions"));
    const question = questions[index];

    const editFormPanel = document.querySelector("#editFormPanel");
    editFormPanel.innerHTML = `
        <h2>Edit Question</h2>
        <form id="editForm">
            <div class="mb-3">
                <label for="editFormQuestion" class="form-label">Question</label>
                <input type="text" class="form-control" width="200px" id="editFormQuestion" value="${question.question}">
            </div>
            ${question.options.map((option, i) => `
                <div class="mb-3">
                    <label for="editFormOption${i + 1}" class="form-label">Option ${i + 1}</label>
                    <input type="text" class="form-control" width="200px" id="editFormOption${i + 1}" value="${option.label}">
                    <input type="radio" name="editAns" id="editAns${i + 1}" ${option.value === question.ans ? 'checked' : ''}> Correct Answer
                </div>
            `).join('')}
            <button type="button" class="btn btn-primary" id="editFormSaveButton" onclick="saveEditedQuestion(${index})">Save</button>
            <button type="button" class="btn btn-secondary" onclick="cancelEdit()">Cancel</button>
        </form>
    `;

    document.querySelector("#editPanel").classList.add("hideit");
    editFormPanel.classList.remove("hideit");
}

function saveEditedQuestion(index) {
    let questions = JSON.parse(localStorage.getItem("Quiz-Questions"));

    const editedQuestion = document.querySelector("#editFormQuestion").value;

    const editedOptions = questions[index].options.map((option, i) => {
        const label = document.querySelector(`#editFormOption${i + 1}`).value;
        const value = label;
        return { ...option, label, value };
    });

    const selectedAnsId = Array.from(document.getElementsByName('editAns')).find(radio => radio.checked)?.id;
    let editedAns = null;

    if (selectedAnsId) {
        const selectedIndex = parseInt(selectedAnsId.replace('editAns', '')) - 1;
        editedAns = editedOptions[selectedIndex]?.value;
    }

    if (!editedQuestion || editedOptions.some(op => !op.label)) {
        toastr.error("Kindly Fill all Fields");
    } else if (!editedAns) {
        toastr.error("Kindly Select the correct answer");
    } else {
        questions[index].question = editedQuestion;
        questions[index].options = editedOptions;
        questions[index].ans = editedAns;

        localStorage.setItem("Quiz-Questions", JSON.stringify(questions));

        toastr.success("Question edited successfully");

        document.querySelector("#editFormPanel").classList.add("hideit");
        showEdit();
    }
}

function cancelEdit() {
    document.querySelector("#editFormPanel").classList.add("hideit");
    document.querySelector("#editPanel").classList.remove("hideit");
}

function showDefault() {
    document.querySelector("#editPanel").classList.add("hideit");
    document.querySelector("#dltPanel").classList.add("hideit");
    document.querySelector("#addPanel").classList.add("hideit");
    document.querySelector("#editKey").classList.add("hideit");
    document.querySelector("#default").classList.remove("hideit");
    document.querySelector("#head1").classList.remove("hideit");
    
}

function dltqs(num) {
    const QuizQuestions = JSON.parse(localStorage.getItem('Quiz-Questions')) || [];

    if (num >= 0 && num < QuizQuestions.length) {
        QuizQuestions.splice(num, 1);
        localStorage.setItem('Quiz-Questions', JSON.stringify(QuizQuestions));
        toastr.info("Question deleted");
        showDelete();
    } else {
        toastr.error("Invalid question number");
    }
}

function adminLogout() {
    let ad = JSON.parse(localStorage.getItem("admin"));
    ad.value = "false";
    localStorage.setItem("admin", JSON.stringify(ad));
    window.location.href = 'index.html';
}

function showKey() {
    document.querySelector("#editKey").classList.remove("hideit");
    document.querySelector("#default").classList.add("hideit");
    const previouskey = JSON.parse(localStorage.getItem("quiz-keys"));
    let keyPanel = document.querySelector("#editKey");
    keyPanel.innerHTML = `<h2 class='text-primary'>Current Key: <span id="JSKey"></span></h2>
    <input type="text" class="form-control" width="200px" id="newKey"><br>  
    <button type="button" class="btn btn-primary" onclick="changeKey()">Change Key</button>
    <button type="button" class="btn btn-danger" onclick="showDefault()">Go Back</button>
    `
    document.querySelector("#JSKey").innerHTML = previouskey.js;
}

function changeKey() {
    const newKey = document.querySelector("#newKey");
    const previouskey = JSON.parse(localStorage.getItem("quiz-keys"));
    if (newKey.value === "") {
        toastr.warning("Kindly Enter Value");
    }
    else if (newKey.value == previouskey.js) {
        toastr.warning("Enter a New key to Update");
    } else {
        previouskey.js = newKey.value;
        localStorage.setItem("quiz-keys", JSON.stringify(previouskey));
        showDefault();
    }
}