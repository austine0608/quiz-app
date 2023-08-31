const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBarfull');

let currentQuestion ={}
let acceptingAnswers =true
let score = 0
let questionContainer =0
let availableQuestions =[]

let questions =[
    {
         question: "What is the capial of USA",
         choice1:"Washington",
         choice2:"Califonia",
         choice3:"NewYork",
         choice4: "London",
         answer: 1,
     },
     {
         question: "What is the longest river in the World",
         choice1:"Chad",
         choice2:"Nile",
         choice3:"Pacific",
         choice4: "Benue",
         answer:2,
      },
      { 
         question: "Who is in charge of space activities",
         choice1:"WHO",
         choice2:"UNICEF",
         choice3:"NASA",
         choice4: "FBI",
         answer:3,
     },
     { 
         question: "Who is in charge of health activities",
         choice1:"WHO",
         choice2:"UNICEF",
         choice3:"NASA",
         choice4:"SWAT",
         answer:1,
     },
     { 
        question: "2 X 2 = ?",
        choice1:"8",
        choice2:"2",
        choice3:"4",
        choice4: "5",
        answer:3,
    },
    { 
        question: "Who is the Owner of this App",
        choice1:"Sodiq",
        choice2:"Olamide",
        choice3:"Shubby",
        choice4:"Yusuf",
        answer:2,
    },
    { 
        question: "Who is the President Of Nigerian",
        choice1:"Tinubu",
        choice2:"Atiku",
        choice3:"Muhamudu Buhari",
        choice4: "Ambode",
        answer:3,
    },
    { 
        question: "What is the Capital of Nigerian",
        choice1:"Abuja",
        choice2:"Osun",
        choice3:"Lagos",
        choice4:"Ibadan",
        answer:1,
    },
    { 
        question: "Who is the current Governor of Lagos State",
        choice1:"Tinubu",
        choice2:"Fashola",
        choice3:"Ambode",
        choice4: "Sanwo Olu",
        answer:4,
    },
    { 
        question: "What is the Capital of River State",
        choice1:"Abeokuta",
        choice2:"Port Harcourt",
        choice3:"Osogbo",
        choice4:"Kano",
        answer:2,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 10

startGame = () => {
    questionContainer = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = ()=>{
    if(availableQuestions.length === 0 || questionContainer > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html')
    }

    questionContainer++
    progressText.innerText = `Question ${questionContainer} of ${MAX_QUESTIONS}`
    progressBarfull.style.width = `${(questionContainer/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        console.log(selectedAnswer, currentQuestion);
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    } )
})

incrementScore =num => {
    score +=num
    scoreText.innerText =score
}

startGame()