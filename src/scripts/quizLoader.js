const quizData = [
    {
        question: "Evaluate: ",
        answer: [
        {img: '../assets/img_quiz/q3.png',a: "1", correct: false},
        {b: "2", correct: false},
        {c: "3", correct: true}, //C
        {d: "4", correct: false},
        ]
    }

    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q2.png",a: "-∞", correct: true}, //A
        {b: "+∞", correct: false},
        {c: "0", correct: false},
        {d: "dne", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q3.png",a: "1/5", correct: false},
        {b: "2/5", correct: true}, //B
        {c: "3/5", correct: false},
        {d: "4/5", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q4.png",a: "2", correct: false},
        {b: "3", correct: false},
        {c: "4", correct: false},
        {d: "5", correct: true}, //D
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q5.png",a: "2", correct: false},
        {b: "3", correct: true}, //B
        {c: "4", correct: false},
        {d: "5", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q6.png",a: "0", correct: true}, //A
        {b: "1", correct: false},
        {c: "2", correct: false},
        {d: "3", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q7.png",a: "5/4", correct: false}, 
        {b: "1/4", correct: true}, //B
        {c: "3/4", correct: false},
        {d: "7/4", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q8.png",a: "-√7/4", correct: false},
        {b: "-√5/8", correct: false},
        {c: "-√11/6", correct: false},
        {d: "-√3/2", correct: true}, //D
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q9.png",a: "1/3", correct: false},
        {b: "2/3", correct: true}, //B
        {c: "9/10", correct: false},
        {d: "9/5", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q10.png",a: "1", correct: true}, //A
        {b: "2", correct: false},
        {c: "3", correct: false},
        {d: "4", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q11.png",a: "0", correct: false},
        {b: "1", correct: false},
        {c: "2", correct: false},
        {d: "dne", correct: true}, //D
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q12.png",a: "dne", correct: false},
        {b: "0", correct: true}, //B
        {c: "1", correct: false},
        {d: "2", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q13.png",a: "-1", correct: false},
        {b: "0", correct: false},
        {c: "1", correct: true}, //C
        {d: "2", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q14.png",a: "-5", correct: false},
        {b: "-4", correct: false},
        {c: "-3", correct: false},
        {d: "-2", correct: true}, //D
        ]
    }
    ,
    {
        question: "Find: ",
        answer: [
        {img: "questions/q15.png",a: "3", correct: true}, //A
        {b: "2", correct: false},
        {c: "1", correct: false},
        {d: "0", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q16.png",a: "-5/6", correct: true}, //A
        {b: "-1/4", correct: false},
        {c: "-5/8", correct: false},
        {d: "-7/9", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q17.png",a: "-∞", correct: false},
        {b: "+∞", correct: false},
        {c: "1", correct: false},
        {d: "dne", correct: true}, //D
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q18.png",a: "-1/8", correct: true}, //A
        {b: "-3/8", correct: false},
        {c: "-5/8", correct: false},
        {d: "-7/8", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q19.png",a: "3/7", correct: false},
        {b: "-3/7", correct: false},
        {c: "7/3", correct: true}, //C
        {d: "-7/3", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        answer: [
        {img: "questions/q20.png",a: "1", correct: false},
        {b: "2", correct: false},
        {c: "3", correct: false},
        {d: "dne", correct: true}, //D
        ]
    }
    ,
    
];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById('question')
const quizImage = document.getElementById("quiz-image");
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

let currentQuestionIndex = -1;



quizImage.src = quizData[0].answer[0].img;


function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    quizImage.src = currentQuizData.answer[0].img;
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.answer[0].a
    b_text.innerText = currentQuizData.answer[1].b
    c_text.innerText = currentQuizData.answer[2].c
    d_text.innerText = currentQuizData.answer[3].d
}
loadQuiz()
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer = null;
  
    answerEls.forEach(answerEl => {
      if (answerEl.checked) {
        const answerId = answerEl.id;
        console.log(answerId)
        console.log(a[answerId])
        console.log(a.correct)
        const isCorrect = quizData[currentQuiz].answer.some(a => a[answerId] && a.correct);
        
        if (isCorrect) {
          answer = true;
        } else {
          answer = false;
        }
      }
    });
  
    if (answer === null) {
      return null;
    }
  
    return answer;
  }


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    console.log(answer + "ksdlksjdlksjdjlskjd")
       if(answer === true) {
           score++
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } 
       else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
       }
       
})


