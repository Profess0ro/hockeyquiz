const playButton = document.getElementById('play-btn')
const contactButton = document.getElementById('contact')
const questionContentArea = document.getElementById('game-area')
const questionContent = document.getElementById('question')
const answerButtons = document.getElementById('answerbutton')
const welcomeArea = document.getElementById('welcome')
const contactArea = document.getElementById('contact-area')
const mainMenuButton = document.getElementById('mainmenu')


playButton.addEventListener("click", playQuiz)
contactButton.addEventListener("click", showContact)
mainMenuButton.addEventListener("click", returnToMain)


function playQuiz() {
    welcomeArea.classList.add('hide')
    questionContentArea.classList.remove('hide')
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
