//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let kikiCount;
let boubaCount;

//Questions and Options array


// 1 is for kiki
// 2 is for gouda

const quizArray = [
    {
        id: "0",
        question: "Elije una comida",
        options: [
            { text: "Milanesa con pure", score: 1 },
            { text: "Choripan", score: 2 },
            { text: "Churrasco", score: 1 },
            { text: "Molleja", score: 2 },
            { text: "Empanadas", score: 0 }
        ],
        correct: "Choripan",
    },
    {
        id: "1",
        question: "Qué te tomas si tenes sed en verano",
        options: [
            { text: "Fernet", score: 1 },
            { text: "Cocucha bien fria", score: 2 },
            { text: "Mate", score: 1 },
            { text: "Terere", score: 2 },
            { text: "Birra", score: 0 }
        ],
        correct: "Fernet",
    },
    {
        id: "2",
        question: "A que destino te gustaria viajar este verano",
        options: [
            { text: "Norte", score: 2 },
            { text: "Sur", score: 1 },
            { text: "Cordoba", score: 1 },
            { text: "Costa Atlantica", score: 2 },
            { text: "Casa Quinta", score: 0 }
        ],
        correct: "Norte",
    },
    {
        id: "3",
        question: "Elije entre los siguientes jugadores de la selección",
        options: [
            { text: "Julian Alvarez", score: 2},
            { text: "Dibu", score: 1 },
            { text: "De Paul", score: 0 },
            { text: "Cuti", score: 1 },
            { text: "Enzo Fernandez", score: 2 }
        ],
        correct: "Dibu",
    },
    {
        id: "4",
        question: "Elija a un procer",
        options: [
            { text: "María Remedios del Valle", score: 0 },
            { text: "José de San Martín", score: 1 },
            { text: "Manuel Belgrano", score: 2 },
            { text: "Juana Azurduy", score: 1 },
            { text: "Domingo Faustino Sarmiento", score: 2 }
        ],
        correct: "Juana Azurduy",
    },
    {
        id: "5",
        question: "Elija entre una de estas celebridades",
        options: [
            { text: "Lali", score: 2 },
            { text: "Tini", score: 0 },
            { text: "Duki", score: 2 },
            { text: "Wos", score: 1 },
            { text: "Maria Becerra", score: 1 }
        ],
        correct: "Maria Becerra",
    },
    {
        id: "6",
        question: "Elija una cerveza",
        options: [
            { text: "Quilmes", score: 1 },
            { text: "Patagonia", score: 2 },
            { text: "Andes", score: 1 },
            { text: "Corona", score: 0 },
            { text: "No tomo birra", score: 2 }
        ],
        correct: "Quilmes",
    },
    {
        id: "7",
        question: "A quien le tenes mas aprecio",
        options: [
            { text: "Ricky Fort", score: 2 },
            { text: "Peron", score: 1 },
            { text: "Maradona", score: 1 },
            { text: "Taylor Swift", score: 0 },
            { text: "Charly", score: 2 }
        ],
        correct: "Charly",
    },
    {
        id: "8",
        question: "Elija entre una de las siguientes peliculas argentinas",
        options: [
            { text: "Medianeras", score: 1 },
            { text: "El Secreto de Sus Ojos", score: 2 },
            { text: "Esperando La Carroza", score: 1 },
            { text: "Metegol", score: 2 },
            { text: "No vi ninguna", score: 0 }
        ],
        correct: "Medianeras",
    },
    {
        id: "9",
        question: "Elija entre una de las siguientes series televisivas argentinas",
        options: [
            { text: "Okupas", score: 1 },
            { text: "Los Simuladores", score: 2 },
            { text: "El Marginal", score: 2 },
            { text: "Hisotira de un Clan", score: 1 },
            { text: "No vi ninguna", score: 0 }
        ],
        correct: "Okupas",
    },
];


//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0].text}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1].text}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2].text}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3].text}</button>
       <button class="option-div" onclick="checker(this)">${i.options[4].text}</button>

    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {

        console.log("test 1", userOption);



        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    boubaCount= 0;
    kikiCount = 0;
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};