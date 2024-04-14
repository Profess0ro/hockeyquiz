/**
 * Here all different buttons and divs gets a const that are used in the functions
 */
const playButton = document.getElementById('play-btn')
const contactButton = document.getElementById('contact')
const questionContentArea = document.getElementById('game-area')
const questionContent = document.getElementById('question')
const answerButtons = document.getElementById('answers')
const answerButton = document.getElementById('answerbutton')
const welcomeArea = document.getElementById('welcome')
const contactArea = document.getElementById('contact-area')
const mainMenuButton = document.getElementById('mainmenu')
const NextQuestionButton = document.getElementById('next-question')
/**
 * this makes the index of the question to change during the quiz
 */
let shuffledQuestions, currentQuestionIndex

/**
 * what function will be called when you press the buttons
 */
playButton.addEventListener("click", playQuiz)
contactButton.addEventListener("click", showContact)
mainMenuButton.addEventListener("click", returnToMain)
/**
 * When clicking next question it will call the function of displaying the next question.
 */
NextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++
    displayNextQuestion()
})

function playQuiz() {
    welcomeArea.classList.add('hide')
    questionContentArea.classList.remove('hide')
    contactArea.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) // this picks a random question from the array of questions
    currentQuestionIndex = 0
    displayNextQuestion()
}
function showContact () {
    welcomeArea.classList.add('hide')
    questionContentArea.classList.add('hide')
    contactArea.classList.remove('hide')
}
function returnToMain () {
    questionContentArea.classList.add('hide')
    contactArea.classList.add('hide')
    welcomeArea.classList.remove('hide')
}
/**
 * Before the next question will be shown all conditions of the previous question will be reset
 */
function displayNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    }
/**
 * This function will fetch the question and answer from the question array in question.js and
 * paste that text into both question div and the answering buttons
 */
function showQuestion (questions) {
    questionContent.innerText = questions.question
    questions.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answerbutton')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

/**
 * This function will hide button for the next question and remove the previous answering buttons because
 * they either have correct or wrong colors to them. We want to start next question with new buttons.
 */
function resetState () {
    NextQuestionButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
    ;}


function selectAnswer(e) {
    const selectedButton = e.target // makes a const out of the selected answer
    const correct = selectedButton.dataset.correct 
    checkCorrectAnswer(element, correct)
    Array.from(answerButtons.children).forEach(button => { //Creates an array from all the answerbuttons
        checkCorrectAnswer(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        NextQuestionButton.classList.remove('hide')
    } else {
        playButton.innerText = 'Restart'
        playButton.classList.remove('hide')
    }
}

function checkCorrectAnswer(element, correct) {
    if (correct) {
        element.classList.add('correctanswer')
    } else {
        element.classList.add('wronganswer')
        console.log()
    }
}

function clearStatusClass (element) {
    element.classList.remove('correctanswer')
    element.classList.remove('wronganswer')
}
function sendContact() {

}
function addRightAnswer() {

}
function addWrongAnswer() {

}