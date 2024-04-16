/**
 * Here all different buttons and divs gets 
 * a const that are used in the functions 
 * and eventlisteners
**/ 
const playButton = document.getElementById("play-btn");
const contactButton = document.getElementById("contact");
const questionContentArea = document.getElementById("game-area");
const questionContent = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const welcomeArea = document.getElementById("welcome");
const contactArea = document.getElementById("contact-area");
const mainMenuButton = document.getElementById("mainmenu");
const NextQuestionButton = document.getElementById("next-question");
const RestartButtonFooter = document.getElementById("restart-game");
const StartTheGameButton = document.getElementById("start-the-game");
const InputNameArea = document.getElementById("input-name");
const RestartButton = document.getElementById("restart-footer");
const FooterArea = document.getElementById("footer");
const mainmenuGame = document.getElementById("mainmenu-game");
const contactGame = document.getElementById("contact-game");
const endMainMenu = document.getElementById("mainmenu-end");
const endRestart = document.getElementById("restart-end");
const endContact = document.getElementById("contact-end");
const userWin = document.getElementById("win");
const quizWin = document.getElementById("loss");

//this makes the index of the question to change during the quiz, so that the questions order will be random

let shuffledQuestions, currentQuestionIndex;

//what function will be called when you press the buttons
StartTheGameButton.addEventListener("click", collectData);
playButton.addEventListener("click", inputUserName);
contactButton.addEventListener("click", showContact);
mainMenuButton.addEventListener("click", returnToMain);
RestartButtonFooter.addEventListener("click", DoYouWantToRestart);
mainmenuGame.addEventListener("click", DoYouWantToLeaveMain);
contactGame.addEventListener("click", DoYouWantToLeaveContact);
endContact.addEventListener("click", showContact);
endRestart.addEventListener("click", playQuiz);
endMainMenu.addEventListener("click", returnToMain);

//When clicking next question it will call the function of displaying the next question.
NextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayNextQuestion();
});

// If user want to restart, the score will reset and questions will start over
function DoYouWantToRestart() {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        const confirmRestart = window.confirm("Are you sure you want to restart?");

        if (confirmRestart) {
            playQuiz();
        }
    } else {
        playQuiz();
    }
}
// If user want to go to quit the game and go to the contact page
function DoYouWantToLeaveContact() { 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    const confirmLeave = window.confirm("Are you sure you want to leave the game?");

    if (confirmLeave) {
        showContact();
    }
    } else {
        showContact();
    }
}
// If user want to leave the game pressing "main menu" they will come back to the Main menu
function DoYouWantToLeaveMain() {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    const confirmLeave = window.confirm("Are you sure you want to leave the game?");
    if (confirmLeave) {
        returnToMain();
    }
} else {
    returnToMain();
}
}

//What div will be shown when the function is called
function inputUserName() {
    welcomeArea.classList.add("hide");
    questionContentArea.classList.add("hide");
    contactArea.classList.add("hide");
    InputNameArea.classList.remove("hide");
    RestartButton.classList.add("hide");
}

// This function collects the name filled in and shows at the score
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

// This function shows the right div when the username are correctly filled and the game can start
function playQuiz() {
    resetScore();
    welcomeArea.classList.add("hide");
    questionContentArea.classList.remove("hide");
    contactArea.classList.add("hide");
    InputNameArea.classList.add("hide");
    RestartButton.classList.remove("hide");
    FooterArea.classList.add("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // this picks a random question from the array of questions
    currentQuestionIndex = 0;
    displayNextQuestion();
}
// Hides and shows the right div when you click the contact button.
function showContact() {
    welcomeArea.classList.add("hide");
    questionContentArea.classList.add("hide");
    contactArea.classList.remove("hide");
    InputNameArea.classList.add("hide");
    RestartButton.classList.add("hide");
    FooterArea.classList.remove("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");
}
// Hides and shows the right div when you click the Main menu button button.
function returnToMain() {
    questionContentArea.classList.add("hide");
    contactArea.classList.add("hide");
    welcomeArea.classList.remove("hide");
    InputNameArea.classList.add("hide");
    RestartButton.classList.add("hide");
    FooterArea.classList.remove("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");
}
//Before the next question will be shown all conditions of the previous question will be reset

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
    let count = 20; // Sets the timer to start at 20 seconds

    document.getElementById("timer").innerText = count;

    // deletes the previous questiontimer before setting up a new 
    if (timer) {
        clearInterval(timer);
    }

    // Set up the new timer
    timer = setInterval(function() {
        count--;
        document.getElementById("timer").innerText = count;
        if (count === 0) { // Stop the timer when time runs out and add a wrong score if not answered in time.
            clearInterval(timer);
            addWrongAnswer();
            Array.from(answerButtons.children).forEach((button) => {
                button.disabled = true; // Disable answer buttons when the time runs out
            });

            // Show the next question button or the end game div based on the current question index
            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                NextQuestionButton.classList.remove("hide");
            } 
        }
    }, 1000);

    // Display the question and answer buttons
    questionContent.innerText = questions.question; // This puts in the question in the question div from the array in question.js
    questions.answers.forEach((answer) => {
        const button = document.createElement("button"); //This will create new answerbuttons for each question.
        button.innerText = answer.text;
        button.classList.add("answerbutton");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

/**
 * This function will hide the button for the next question and remove the previous answering buttons because
 * they either have correct or wrong values. We want to start next question with new buttons.
 */
function resetState() {
    NextQuestionButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//This function will take take the targeted answer and look into the questions array to see if the answer are have true boolean at correct or not.

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    Array.from(answerButtons.children).forEach((button) => { //disables all answer buttons when you´ve selected your answer
        button.disabled = true;
    });

    Array.from(answerButtons.children).forEach((button) => {
        // Clear all status classes from all buttons
        clearStatusClass(button);
    });

    if (correct === "true") {
        // Add status class to the selected button
        selectedButton.classList.add("correctanswer");
        addRightAnswer();
    } else {
        selectedButton.classList.add("wronganswer");
        addWrongAnswer();
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // Show the next question button or a button to see the score.
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
// This function will increase the correct score if answered correct
function addRightAnswer() {
    const correctScoreElement = document.querySelector("#scores .correct"); // This will search up the right element to increase the value of

    let oldCorrectScore = parseInt(correctScoreElement.innerText);

    if (!isNaN(oldCorrectScore)) {
        const newCorrectScore = oldCorrectScore + 1;
        correctScoreElement.innerText = newCorrectScore;
    }
}

// This function will increase the wrong score if answered wrong
function addWrongAnswer() {
    const correctScoreElement = document.querySelector("#scores .wrong"); // This will search up the right element to increase the value of

    let oldCorrectScore = parseInt(correctScoreElement.innerText);

    if (!isNaN(oldCorrectScore)) {
        const newCorrectScore = oldCorrectScore + 1;
        correctScoreElement.innerText = newCorrectScore;
    }
}
// This function will reset the score if you restart the game
function resetScore() {
    const correctScoreElement = document.querySelector("#scores .correct");
    const wrongScoreElement = document.querySelector("#scores .wrong");

    correctScoreElement.innerText = "0";
    wrongScoreElement.innerText = "0";
}
// This function checks who has the highest score between user and quiz to send win or loss message at the end.
function finalScore() {
    const correctScore = parseInt(document.querySelector("#scores .correct").innerText);
    const wrongScore = parseInt(document.querySelector("#scores .wrong").innerText);

    if (correctScore > wrongScore) {
        userWin.classList.remove("hide");
        quizWin.classList.add("hide"); // Ensure quizWin remains hidden
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
    if (document.getElementById("name").value === ""){
        alert("Please fill in your name");
    } else if (document.getElementById("email").value === ""){
        alert("please fill in your email");
    } else {
    emailjs.send("service_jmbyfsi", "template_j35glvk", params)
        .then(function () {
            alert("Thank you for the feedback!");

            // Reset the value of the forms input fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        })
        .catch(function (error) {
            alert("Error sending email:", error); // Will send error message if email fails to be sent
            
        });}
}