/** 
 * Here all different buttons and divs 
 * gets a let that are used in 
 * the functions and eventlisteners
 * */ 

let playButton = document.getElementById("play-btn");
let contactButton = document.getElementById("contact");
let questionContentArea = document.getElementById("game-area");
let questionContent = document.getElementById("question");
let answerButtons = document.getElementById("answers");
let welcomeArea = document.getElementById("welcome");
let contactArea = document.getElementById("contact-area");
let mainMenuButton = document.getElementById("mainmenu");
let nextQuestionButton = document.getElementById("next-question");
let restartButton = document.getElementById("restart");
let startTheGameButton = document.getElementById("start-the-game");
let inputNameArea = document.getElementById("input-name");
let userWin = document.getElementById("win");
let quizWin = document.getElementById("loss");

/** 
 * This makes the value 
 * of how many questions shown 
 * and helps questions to be shuffled
 * */

let shuffledQuestions = null;
let currentQuestionIndex = null;

function initializeGame() {
/** 
 * What function will be called 
 * by default when you click 
 * on the different buttons 
 * */ 
startTheGameButton.addEventListener("click", collectData);
playButton.addEventListener("click", inputUserName);
contactButton.addEventListener("click", showContact);
mainMenuButton.addEventListener("click", returnToMain);
restartButton.addEventListener("click", DoYouWantToRestart);


/** 
 * When clicking next question 
 * it will call the function to 
 * add 1 to how many 
 * questions has been shown
 * */ 
nextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayNextQuestion();
});
}
function hideAreas(areaToDisplay) {
    welcomeArea.classList.add("hide");
    questionContentArea.classList.add("hide");
    contactArea.classList.add("hide");
    inputNameArea.classList.add("hide");
    restartButton.classList.add("hide");
    userWin.classList.add("hide");
    quizWin.classList.add("hide");  
   areaToDisplay.classList.remove("hide");
    
}
/** 
 * Sets the buttons eventlistener 
 * to original state so you don´t 
 * being ask to leave the game 
 * outside of the game 
 * */
function resetButtons() {
    mainMenuButton.removeEventListener("click", DoYouWantToLeaveMain);
    contactButton.removeEventListener("click", DoYouWantToLeaveContact);
    contactButton.addEventListener("click", showContact);
    mainMenuButton.addEventListener("click", returnToMain);
}
/** 
 * Adding game status to buttons 
 * so you´ll be asked if you are 
 * sure to leave the game or not. 
 * */ 
function setGameStatus() {
    restartButton.removeEventListener("click", inputUserName);
    mainMenuButton.removeEventListener("click", returnToMain);
    contactButton.removeEventListener("click", showContact);
    mainMenuButton.addEventListener("click", DoYouWantToLeaveMain);
    contactButton.addEventListener("click", DoYouWantToLeaveContact);
    restartButton.addEventListener("click", DoYouWantToRestart);
}
/** 
 * Change which function to be called 
 * by restart button so you don´t 
 * get the question if you 
 * want to leave the game or not 
 * when game ended
 * */ 
function endGameRestart() {
    restartButton.addEventListener("click", inputUserName);
    restartButton.removeEventListener("click", DoYouWantToRestart);
}

/**
 * If user want to restart the game 
 * by pressing "Restart" they will 
 * be asked to restart 
 * or continue
 * */ 
function DoYouWantToRestart() {
    if (11 > currentQuestionIndex + 1) {
        const CONFIRMRESTART = window.confirm
        ("Are you sure you want to restart?");

        if (CONFIRMRESTART) {
            inputUserName();
        }
    }
}
/**
 * If user want to leave the game 
 * by pressing "Contact" they will 
 * be asked to go back to the contact page 
 * or continue
 * */ 
function DoYouWantToLeaveContact() {
    if (11 > currentQuestionIndex + 1) {
        const CONFIRMLEAVE = window.confirm
        ("Are you sure you want to leave the game?");
        if (CONFIRMLEAVE) {
            showContact();
        }
    }
}
/**
 * If user want to leave the game 
 * by pressing "main menu" they will 
 * be asked to go back to the Main menu 
 * or continue
 * */ 
function DoYouWantToLeaveMain() {
    if (11 > currentQuestionIndex + 1) { 
        const CONFIRMLEAVE = window.confirm
        ("Are you sure you want to leave the game?");
        if (CONFIRMLEAVE) {
            returnToMain();
        }
    }
}

/** 
 * When you press play 
 * the right div will be shown
 * */ 
function inputUserName() {
    hideAreas(inputNameArea);
    collectRescentScore();
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            startTheGameButton.click();
        }
    });
}

/** 
 * This function will collect 
 * last finished game or show 
 * a message that no games 
 * have been registered
 * */ 
function collectRescentScore() {
    const PLAYER = localStorage.getItem("latestUser");
    const SCORE = localStorage.getItem("latestScore");

    const RESCENTPLAYERELEMENT = document.getElementById("rescent-player");
    const RESCENTSCOREELEMENT = document.getElementById("rescent-score");
    if (PLAYER && SCORE) {

        RESCENTPLAYERELEMENT.textContent = PLAYER;
        RESCENTSCOREELEMENT.textContent = SCORE;
    } else {

        RESCENTPLAYERELEMENT.innerText = "No finished games registered";
        RESCENTSCOREELEMENT.innerText = "";
    }
}


/** 
 * This function collects 
 * the name filled in and 
 * that name shows up 
 * at the scoreboard
 * */ 
function collectData() {
    const INPUTFIELD = document.getElementById("your-name");
    const INPUTVALUE = INPUTFIELD.value;

/** 
 * If you left the namefield empty 
 * a warning will be displayed 
 * and send you back.
 * */ 
    if (INPUTVALUE === "") {
        alert("You didn't fill in your name"); 
        inputUserName();
    } else {
        playQuiz(); 
    }
 
    const OUTPUTSPAN = document.getElementById("username");
    OUTPUTSPAN.innerText = INPUTVALUE;
}

/** 
 * This function shows the right div 
 * when the game starts
 * changes buttons eventlisteners 
 * and resets the scoreboard
 * */ 
function playQuiz() {
    setGameStatus();
    resetScore();
    hideAreas(questionContentArea);
    restartButton.classList.remove("hide");
/**
 * This picks a random question 
 * from the array of questions 
 * to be shown
 * */
    shuffledQuestions = QUESTIONS.sort(() => Math.random() - 0.5); 
    currentQuestionIndex = 0;
    displayNextQuestion();
}
/** 
 * Hides and shows the right div 
 * when you navigate to contact page
 * */ 
function showContact() {
    resetButtons();
    hideAreas(contactArea);
}
/** 
 * Hides and shows the right div 
 * when you navigate to main page
 * */ 
function returnToMain() {
    resetButtons();
    hideAreas(welcomeArea);
}
/**
 * Before the next question 
 * will be shown all conditions 
 * of the previous question 
 * and buttons will be reset
 * */

function displayNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

let timer = null;

/**
 * This function will fetch 
 * the question and answer 
 * from the question array 
 * in question.js and
 * paste that text into 
 * both question div and 
 * the answering buttons.
 * It also starts a new timer 
 * that counts down from 30.
 */
function showQuestion(QUESTIONS) {
    let count = 30;

    document.getElementById("timer").innerText = count;

    // resets the timer
    if (timer) {
        clearInterval(timer);
    }

    // Starts the timer and count down 1sec at the time
    timer = setInterval(function() {
        count--;
        document.getElementById("timer").innerText = count;
        /** 
         * Stop the timer when time runs 
         * out and add a wrong score 
         * if not answered in time
         * and also disables all buttons
         * if timer reaches 0
        */
        if (count === 0) { 
            clearInterval(timer);
            addWrongAnswer();
            Array.from(answerButtons.children).forEach((button) => {
                button.disabled = true; 
            });

            
            if (11 > currentQuestionIndex + 1) {
                nextQuestionButton.classList.remove("hide");
            }
        }
    }, 1000); 

    /** 
     * This will collect data from 
     * questions.js and will 
     * fill the question div 
     * with the question and 
     * create new buttons 
     * with the answers
     * */ 
    questionContent.innerText = QUESTIONS.question; 
    QUESTIONS.answers.forEach((answer) => {
        const BUTTON = document.createElement("button"); 
        BUTTON.innerText = answer.text;
        BUTTON.classList.add("answerbutton", "btn"); 
        if (answer.correct) {
            BUTTON.dataset.correct = answer.correct; 
        }
        BUTTON.addEventListener("click", selectAnswer); 
        answerButtons.appendChild(BUTTON);
    });
}

/**
 * This function will hide 
 * the button for the next question 
 * and remove the previous answering 
 * buttons because they either 
 * have correct or wrong values. 
 * We want to start 
 * next question with 
 * new and fresh buttons
 */
function resetState() {
    nextQuestionButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
/** 
 * This function will 
 * take the targeted answer 
 * and look if the answer 
 * are set with the value correct
 * or not and also
 * disables all buttons when
 * an answer has been selected
 * */ 

function selectAnswer(e) {
    clearInterval(timer);
    const SELECTEDBUTTON = e.target;
    const CORRECT = SELECTEDBUTTON.dataset.correct;

    Array.from(answerButtons.children).forEach((button) => { 
        button.disabled = true;
    });

    Array.from(answerButtons.children).forEach((button) => {
     clearStatusClass(button);
    });

    if (CORRECT === "true") {
        /** 
         * Add status class to 
         * the selected button 
         * if it´s correct or 
         * wrong answer
         * */ 
        SELECTEDBUTTON.classList.add("correctanswer");
        addRightAnswer();
    } else {
        SELECTEDBUTTON.classList.add("wronganswer");
        addWrongAnswer();
    }
        /** 
         * Checks if 11 question 
         * has been shown or not. 
         * If 11 has been shown 
         * the function finalScore() 
         * will be called
         * and the game ends
         * */ 
    if (11 > currentQuestionIndex + 1) {
        nextQuestionButton.classList.remove("hide");
    } else {
        finalScore();
    }

}
/** 
 * This function will remove 
 * the class of right 
 * or wrong answer 
 * to the new answerbuttons
 * */ 
function clearStatusClass(button) {
    button.classList.remove("correctanswer");
    button.classList.remove("wronganswer");
}
/** 
 * This function will increase 
 * the users score if 
 * correct answer has
 * been selected
 * */ 
function addRightAnswer() {
    const CORRECTSCOREELEMENT = document.querySelector("#scores .correct");

    let oldCorrectScore = parseInt(CORRECTSCOREELEMENT.innerText);

    if (!isNaN(oldCorrectScore)) {
        const NEWCORRECTSCORE = oldCorrectScore + 1;
        CORRECTSCOREELEMENT.innerText = NEWCORRECTSCORE;
    }
}

/** 
 * This function will increase 
 * the quiz´s score if 
 * selected answer
 * are wrong
 * */ 
function addWrongAnswer() {
    const CORRECTSCOREELEMENT = document.querySelector("#scores .wrong");

    let oldCorrectScore = parseInt(CORRECTSCOREELEMENT.innerText);

    if (!isNaN(oldCorrectScore)) {
        const NEWCORRECTSCORE = oldCorrectScore + 1;
        CORRECTSCOREELEMENT.innerText = NEWCORRECTSCORE;
    }
}
/** 
 * This function will reset 
 * the scoreboard if 
 * you restart the game
 * */ 
function resetScore() {
    const CORRECTSCOREELEMENT = document.querySelector("#scores .correct");
    const WRONGSCOREELEMENT = document.querySelector("#scores .wrong");

    CORRECTSCOREELEMENT.innerText = "0";
    WRONGSCOREELEMENT.innerText = "0";
}
/** 
 * This function checks 
 * who has the highest score 
 * between user and quiz 
 * to send win or 
 * loss message at the end.
 * */ 
function finalScore() {
    resetButtons();
    endGameRestart();
    const CORRECTSCORE = 
    parseInt(document.querySelector("#scores .correct").innerText);
    const WRONGSCORE = 
    parseInt(document.querySelector("#scores .wrong").innerText);

    if (CORRECTSCORE > WRONGSCORE) {
        userWin.classList.remove("hide");
        quizWin.classList.add("hide");
    } else {
        userWin.classList.add("hide");
        quizWin.classList.remove("hide");
    }
    yourRescentScore();
}

/** This will add the rescent 
 * score when the quiz ended
 * to localstorage.
 * The rescent score 
 * will be shown where 
 * you put in the username 
 * before the quiz starts 
 * */
function yourRescentScore() {
    const PLAYER = document.getElementById("username").textContent;
    const PLAYERSCORE = 
    parseInt(document.querySelector("#scores .correct").innerText);
    const QUIZSCORE = 
    parseInt(document.querySelector("#scores .wrong").innerText);

    const RESCENTPLAYERELEMENT = document.getElementById("rescent-player");
    const RESCENTSCOREELEMENT = document.getElementById("rescent-score");

    RESCENTPLAYERELEMENT.textContent = PLAYER;
    RESCENTSCOREELEMENT.textContent = 
    "   " + PLAYERSCORE + " - " + QUIZSCORE + "   QUIZ";

    localStorage.setItem("latestUser", PLAYER);
    localStorage.setItem("latestScore", RESCENTSCOREELEMENT.textContent);

 


}


/** 
 * This function sends an email 
 * if all are fields are filled 
 * in and also sends 
 * a reply to the persons 
 * email via Emailjs
 * */ 
function sendEmail(event) {
    event.preventDefault();
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };
    // Email validation
    const EMAILPATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!EMAILPATTERN.test(params.email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Check if any of the fields are empty
    if (params.name === "") {
        alert("Please fill in your name");
    } else if (params.email === "") {
        alert("Please fill in your email");
    } else if (params.message === "") {
        alert("Your message is empty");
    } else {
        emailjs.send("service_jmbyfsi", "template_j35glvk", params)
            .then(function() {
                alert("Thank you for the feedback!");

                /** 
                 * Reset the value of 
                 * the forms input fields 
                 * when feedback has been sent
                 * */ 
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
            })
            .catch(function(error) {
                alert("Error sending email:", error); 

            });
    }
}