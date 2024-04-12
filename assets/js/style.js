const playButton = document.getElementById('play-btn')
const startButton = document.getElementById('startquiz')
const questionContentArea = document.getElementById('game-area')
const questionContent = document.getElementById('question')
const answerButtons = document.getElementById('answerbutton')
const welcomeArea = document.getElementById('welcome')
const startGameArea = document.getElementById('startgame')
const mainMenuButton = document.getElementById('mainmenu')


playButton.addEventListener("click", playQuiz)
startButton.addEventListener("click", startGame)
mainMenuButton.addEventListener("click", returnToMain)


function playQuiz() {
    welcomeArea.classList.add('hide')
    startGameArea.classList.remove('hide')
}
function startGame () {
    startGameArea.classList.add('hide')
    questionContentArea.classList.remove('hide')
}
function returnToMain () {
    questionContentArea.classList.add('hide')
    startGameArea.classList.add('hide')
    welcomeArea.classList.remove('hide')
}
function checkCorrectAnswer() {

}
function addRightAnswer() {

}
function addWrongAnswer() {

}
function displayNextQuestion () {

}
function resetState () {

}
