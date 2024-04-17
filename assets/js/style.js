// Here all different buttons and divs gets a const that are used in the functions and eventlisteners

const playButton = document.getElementById("play-btn");
const contactButton = document.getElementById("contact");
const questionContentArea = document.getElementById("game-area");
const questionContent = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const welcomeArea = document.getElementById("welcome");
const contactArea = document.getElementById("contact-area");
const mainMenuButton = document.getElementById("mainmenu");
const NextQuestionButton = document.getElementById("next-question");
const RestartButton = document.getElementById("restart");
const StartTheGameButton = document.getElementById("start-the-game");
const InputNameArea = document.getElementById("input-name");
const userWin = document.getElementById("win");
const quizWin = document.getElementById("loss");

// This makes the value of how many questions shown and helps questions to be shuffled

let shuffledQuestions, currentQuestionIndex;

// What function will be called by default when you click on the different buttons
StartTheGameButton.addEventListener("click", collectData);
playButton.addEventListener("click", inputUserName);
contactButton.addEventListener("click", showContact);
mainMenuButton.addEventListener("click", returnToMain);
RestartButton.addEventListener("click", DoYouWantToRestart);

// When clicking next question it will call the function to add 1 to how many questions has been shown
NextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayNextQuestion();
});
// Sets the buttons eventlistener to original state so you don´t being ask to leave the game outside the game
function resetButtons() {
    mainMenuButton.removeEventListener("click", DoYouWantToLeaveMain);
    contactButton.removeEventListener("click", DoYouWantToLeaveContact);
    contactButton.addEventListener("click", showContact);
    mainMenuButton.addEventListener("click", returnToMain);  
}
// Adding game status to buttons so you´ll be asked if you are sure to leave the game or not.
function setGameStatus() {
    RestartButton.removeEventListener("click", playQuiz);
    mainMenuButton.removeEventListener("click", returnToMain);
    contactButton.removeEventListener("click", showContact);
    mainMenuButton.addEventListener("click", DoYouWantToLeaveMain);
    contactButton.addEventListener("click", DoYouWantToLeaveContact);
    RestartButton.addEventListener("click", DoYouWantToRestart);
}
// Change which function to be called by restart button so you don´t get the question if you want to leave the game or not
function endGameRestart(){
    RestartButton.addEventListener("click", playQuiz);
    RestartButton.removeEventListener("click", DoYouWantToRestart);
}

// If there is question left in the game a window will ask if they are sure to leave
function DoYouWantToRestart() {
    if (11 > currentQuestionIndex + 1) { 
        const confirmRestart = window.confirm("Are you sure you want to restart?");

        if (confirmRestart) {
            playQuiz();
        }
    } 
}
// If user want to go to quit the game and go to the contact page
function DoYouWantToLeaveContact() { 
    if (11 > currentQuestionIndex + 1) {
        const confirmLeave = window.confirm("Are you sure you want to leave the game?");
        if (confirmLeave) {
            showContact();
        }
    } 
}
// If user want to leave the game pressing "main menu" they will come back to the Main menu
function DoYouWantToLeaveMain() {
    if (11 > currentQuestionIndex + 1) { // If there is question left in the game a window will ask if they are sure to leave
    const confirmLeave = window.confirm("Are you sure you want to leave the game?");
    if (confirmLeave) {
        returnToMain();
    }
} 
}

// When you press play, the right div will be shown
function inputUserName() {
    welcomeArea.classList.add("hide");
    questionContentArea.classList.add("hide");
    contactArea.classList.add("hide");
    InputNameArea.classList.remove("hide");
    RestartButton.classList.add("hide");
}

// This function collects the name filled in and that name shows at the scoreboard
function collectData() {
    const inputField = document.getElementById("your-name");
    const inputValue = inputField.value;

    if (inputValue === "") {
        alert("You didn't fill in your name"); // If you left the namefield empty a warning will be displayed and send you back.
        inputUserName();
    } else {
        playQuiz(); // Starts the game if you have filled in a name.
    }
    // this will put the name you´ve filled to the scoreboard
    const outputSpan = document.getElementById("username");
    outputSpan.innerText = inputValue;
}

// This function shows the right div when the game starts, changes buttons eventlisteners and resets the scoreboard
function playQuiz() {
    setGameStatus();
    resetScore();
    welcomeArea.classList.add("hide");
    questionContentArea.classList.remove("hide");
    contactArea.classList.add("hide");
    InputNameArea.classList.add("hide");
    RestartButton.classList.remove("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // this picks a random question from the array of questions to be shown
    currentQuestionIndex = 0;
    displayNextQuestion();
}
// Hides and shows the right div when you navigate to contact page
function showContact() {
    resetButtons();
    welcomeArea.classList.add("hide");
    questionContentArea.classList.add("hide");
    contactArea.classList.remove("hide");
    InputNameArea.classList.add("hide");
    RestartButton.classList.add("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");

}
// Hides and shows the right div when you navigate to main page
function returnToMain() {
    resetButtons();
    questionContentArea.classList.add("hide");
    contactArea.classList.add("hide");
    welcomeArea.classList.remove("hide");
    InputNameArea.classList.add("hide");
    RestartButton.classList.add("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");
}
//Before the next question will be shown all conditions of the previous question and buttons will be reset

function displayNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

let timer = null;

/**This function will fetch the question and answer from the question array in question.js and
 * paste that text into both question div and the answering buttons.
 * It also starts a new timer that counts down from 20.
 */
function showQuestion(questions) {
    let count = 20; 

    document.getElementById("timer").innerText = count;

    // resets the timer
    if (timer) {
        clearInterval(timer);
    }

    // Starts the timer and count down 1sec at the time
    timer = setInterval(function() {
        count--;
        document.getElementById("timer").innerText = count;
        if (count === 0) { // Stop the timer when time runs out and add a wrong score if not answered in time.
            clearInterval(timer);
            addWrongAnswer();
            Array.from(answerButtons.children).forEach((button) => {
                button.disabled = true; // Disable answer buttons when the time runs out
            });

            // Show the next question button if 11 questions hasn´t been shown
            if (11 > currentQuestionIndex + 1) {
                NextQuestionButton.classList.remove("hide");
            } 
        }
    }, 1000); // timer set to count down by 1000milliseconds at the time (1sec)

    // This will collect data from questions.js and will fill the question div with the question and create new buttons with the answers
    questionContent.innerText = questions.question; // This puts in the question in the question div from the array in question.js
    questions.answers.forEach((answer) => {
        const button = document.createElement("button"); // Will create new answerbuttons for each question.
        button.innerText = answer.text;
        button.classList.add("answerbutton", "btn"); // Which classes to be set on the new buttons
        if (answer.correct) {
            button.dataset.correct = answer.correct; // This will check what answer is correct and paste that fact to the button
        }
        button.addEventListener("click", selectAnswer); // Adds eventlisteners to the new buttons
        answerButtons.appendChild(button);
    });
}

/**
 * This function will hide the button for the next question and remove the previous answering buttons because
 * they either have correct or wrong values. We want to start next question with new buttons 
 */
function resetState() {
    NextQuestionButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// This function will take take the targeted answer and look if the answer are set with the value correct

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    Array.from(answerButtons.children).forEach((button) => { // disables all answer buttons when you´ve selected your answer
        button.disabled = true;
    });

    Array.from(answerButtons.children).forEach((button) => {
        // Clear all status classes from all buttons
        clearStatusClass(button);
    });

    if (correct === "true") {
        // Add status class to the selected button if it´s correct or wrong answer
        selectedButton.classList.add("correctanswer");
        addRightAnswer();
    } else {
        selectedButton.classList.add("wronganswer");
        addWrongAnswer();
    }

    if (11 > currentQuestionIndex + 1) {
        // Checks if 11 question has been shown or not. If 11 has been shown the function finalScore() will be called
        NextQuestionButton.classList.remove("hide");
    } else {
        finalScore();
    }
    
}
// This function will remove the class of right or wrong answer to the new answerbuttons
function clearStatusClass(button) {
    button.classList.remove("correctanswer");
    button.classList.remove("wronganswer");
}
// This function will increase the users score if answered correct
function addRightAnswer() {
    const correctScoreElement = document.querySelector("#scores .correct"); 

    let oldCorrectScore = parseInt(correctScoreElement.innerText);

    if (!isNaN(oldCorrectScore)) {
        const newCorrectScore = oldCorrectScore + 1;
        correctScoreElement.innerText = newCorrectScore;
    }
}

// This function will increase the quiz´s score if answered wrong
function addWrongAnswer() {
    const correctScoreElement = document.querySelector("#scores .wrong"); 

    let oldCorrectScore = parseInt(correctScoreElement.innerText);

    if (!isNaN(oldCorrectScore)) {
        const newCorrectScore = oldCorrectScore + 1;
        correctScoreElement.innerText = newCorrectScore;
    }
}
// This function will reset the scoreboard if you restart the game
function resetScore() {
    const correctScoreElement = document.querySelector("#scores .correct");
    const wrongScoreElement = document.querySelector("#scores .wrong");

    correctScoreElement.innerText = "0";
    wrongScoreElement.innerText = "0";
}
// This function checks who has the highest score between user and quiz to send win or loss message at the end.
function finalScore() {
    resetButtons();
    endGameRestart();
    const correctScore = parseInt(document.querySelector("#scores .correct").innerText);
    const wrongScore = parseInt(document.querySelector("#scores .wrong").innerText);

    if (correctScore > wrongScore) {
        userWin.classList.remove("hide");
        quizWin.classList.add("hide"); 
    } else {
        userWin.classList.add("hide");
        quizWin.classList.remove("hide");
    }
}

// This function sends an email if all are fields are filled in and also sends a reply to the persons email via Emailjs
function sendEmail(event) {
    event.preventDefault();
    let params = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    };
    // This shows a warning if any of the fields are empty when submitting feedback
    if (document.getElementById("name").value === ""){
        alert("Please fill in your name");
    } else if (document.getElementById("email").value === ""){
        alert("please fill in your email");
    } else if (document.getElementById("message").value === ""){
        alert("your message are empty");
    } else {
    emailjs.send("service_jmbyfsi", "template_j35glvk", params)
        .then(function () {
            alert("Thank you for the feedback!");

            // Reset the value of the forms input fields when feedback has been sent
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        })
        .catch(function (error) {
            alert("Error sending email:", error); // Will send error message if feedback fails to be sent
            
        });}
}