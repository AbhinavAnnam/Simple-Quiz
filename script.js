const questions = [
    {
        question:"What is the capital of India?",
        answers: [
            {text: "New Delhi", correct:true},
            {text: "Kolkata", correct:false},
            {text: "Chennai", correct:false},
            {text: "Mumbai", correct:false},
        ]
    },
    {
        question:"Which of the following cities is landlocked?",
        answers: [
            {text: "Hyderabad", correct:true},
            {text: "Kolkata", correct:false},
            {text: "Chennai", correct:false},
            {text: "Mumbai", correct:false},
        ]
    },
    {
        question:"How long is a test match usually?",
        answers: [
            {text: "2 days", correct:false},
            {text: "3 days", correct:false},
            {text: "4 days", correct:false},
            {text: "5 days", correct:true},
        ]
    },
    {
        question:"What is the part of speech of the word 'enough'?",
        answers: [
            {text: "Noun", correct:false},
            {text: "Adjective", correct:false},
            {text: "Adverb", correct:false},
            {text: "Can be both adjective and adverb", correct:true},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect  = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
