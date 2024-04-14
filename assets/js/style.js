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
const RestartButtonFooter = document.getElementById('restart-footer')
const EngGameButton = document.getElementById('end-game-button')
const StartTheGameButton = document.getElementById('start-the-game')
const InputNameArea = document.getElementById('input-name')
/**
 * this makes the index of the question to change during the quiz
 */
let shuffledQuestions, currentQuestionIndex

/**
 * what function will be called when you press the buttons
 */
StartTheGameButton.addEventListener("click", collectData)
playButton.addEventListener("click", inputUserName)
contactButton.addEventListener("click", showContact)
mainMenuButton.addEventListener("click", returnToMain)
RestartButtonFooter.addEventListener("click", inputUserName)
/**
 * When clicking next question it will call the function of displaying the next question.
 */
NextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++
    displayNextQuestion()
})

function inputUserName() {
    welcomeArea.classList.add('hide')
    questionContentArea.classList.add('hide')
    contactArea.classList.add('hide')
    EngGameButton.classList.add('hide');
    InputNameArea.classList.remove('hide')
}

//This function collects the name filled in and shows at the score
function collectData() {
    const inputField = document.getElementById('your-name');
    const inputValue = inputField.value;

    if (inputValue.trim() === '') {
        alert('You didn\'t fill in your name');
        inputUserName(); // Call inputUserName() if the input is empty
    } else {
        playQuiz(); // Call playQuiz() if the input is not empty
    }

    const outputSpan = document.getElementById('username');
    outputSpan.innerText = inputValue;
}

function playQuiz() {
    welcomeArea.classList.add('hide')
    questionContentArea.classList.remove('hide')
    contactArea.classList.add('hide')
    EngGameButton.classList.add('hide')
    InputNameArea.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) // this picks a random question from the array of questions
    currentQuestionIndex = 0
    displayNextQuestion()
}
function showContact () {
    welcomeArea.classList.add('hide')
    questionContentArea.classList.add('hide')
    contactArea.classList.remove('hide')
    EngGameButton.classList.add('hide');
    InputNameArea.classList.add('hide')
}
function returnToMain () {
    questionContentArea.classList.add('hide')
    contactArea.classList.add('hide')
    welcomeArea.classList.remove('hide')
    EngGameButton.classList.add('hide');
    InputNameArea.classList.add('hide')
}
/**
 * Before the next question will be shown all conditions of the previous question will be reset
 */
function displayNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    EngGameButton.classList.add('hide');
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
/**
 * This function will take take the targeted answer and look into the questions array to see if the answer are correct or not.
 * 
 * 
 *  */

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
    
        //disables all answer buttons when you´ve selected your answer
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
        });

        // Clear all status classes from all buttons
        Array.from(answerButtons.children).forEach(button => {
            clearStatusClass(button);
        });
    
        // Add status class to the selected button
        if (correct === "true") {
            selectedButton.classList.add('correctanswer');
        } else {
            selectedButton.classList.add('wronganswer');
        }
    
        // Show the next question button or a button to see the score.
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            NextQuestionButton.classList.remove('hide');
        } else {
            EngGameButton.classList.remove('hide');
        }
    }
    
    function checkCorrectAnswer(button, correct) {
        clearStatusClass(button);
        if (correct === "true") {
            button.classList.add('correctanswer');
        } else {
            button.classList.add('wronganswer');
        }
    }
    
    function clearStatusClass(button) {
        button.classList.remove('correctanswer');
        button.classList.remove('wronganswer');
    }

function sendContact() {

}
function addRightAnswer() {

}
function addWrongAnswer() {

}