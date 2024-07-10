var question = [{
    qnum: "1: ",
    question: "Your name:",
    qop1: "1. samad",
    qop2: "2. ahmed",
    qop3: "3. yousuf",
    qop4: "4. mamma",
    ans: "1. samad"
}];
var qlength=question.length;
var correctans=0;
var qstoexecute = 0;

function setQuestion() {
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

    var qnow = question[qstoexecute];
    op1.value = qnow.qop1;
    op2.value = qnow.qop2;
    op3.value = qnow.qop3;
    op4.value = qnow.qop4;
    // console.log(qnow);
    // qstoexecute++;
    qnum.innerHTML = qnow.qnum;
    questiondetail.innerHTML = qnow.question;
    option1.innerHTML = qnow.qop1;
    option2.innerHTML = qnow.qop2;
    option3.innerHTML = qnow.qop3;
    option4.innerHTML = qnow.qop4;
}

function checkAnswer() {
    var qnow = question[qstoexecute];
    var selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {
        var selectedValue = selectedOption.value;
        if (selectedValue === qnow.ans) {
            selectedOption.nextElementSibling.classList.add("bggreen"); // Highlight correct answer (green)
            correctans++;
            var checkbtn=document.querySelector("#checkbtn");
            checkbtn.classList.add("hideit");
            var nextbtn=document.querySelector("#nextbtn");
            nextbtn.classList.remove("hideit");
        } else {
            selectedOption.nextElementSibling.classList.add("bgred"); 
            document.querySelector('input[value="' + qnow.ans + '"]').nextElementSibling.classList.add("bggreen");
            var checkbtn=document.querySelector("#checkbtn");
            checkbtn.classList.add("hideit");
            var nextbtn=document.querySelector("#nextbtn");
            nextbtn.classList.remove("hideit");
        }
    } else {
        alert("Please select an answer.");
    }
}

function nextQuestion(){
    checkAnswer();
    qstoexecute++;
    setQuestion();
}

setQuestion();