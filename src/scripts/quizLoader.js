const quizData = [
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q1.png",
        answer: [
        {a: "1", correct: false},
        {b: "2", correct: false},
        {c: "3", correct: true}, //C
        {d: "4", correct: false},
        ]
    }

    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q2.png",
        answer: [
        {a: "-∞", correct: true}, //A
        {b: "+∞", correct: false},
        {c: "0", correct: false},
        {d: "dne", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q3.png",
        answer: [
        {a: "1/5", correct: false},
        {b: "2/5", correct: true}, //B
        {c: "3/5", correct: false},
        {d: "4/5", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q4.png",
        answer: [
        {a: "2", correct: false},
        {b: "3", correct: false},
        {c: "4", correct: false},
        {d: "5", correct: true}, //D
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q5.png",
        answer: [
        {a: "2", correct: false},
        {b: "3", correct: true}, //B
        {c: "4", correct: false},
        {d: "5", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q6.png",
        answer: [
        {a: "0", correct: true}, //A
        {b: "1", correct: false},
        {c: "2", correct: false},
        {d: "3", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q7.png",
        answer: [
        {a: "5/4", correct: false}, 
        {b: "1/4", correct: true}, //B
        {c: "3/4", correct: false},
        {d: "7/4", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q8.png",
        answer: [
        {a: "-√7/4", correct: false},
        {b: "-√5/8", correct: false},
        {c: "-√11/6", correct: false},
        {d: "-√3/2", correct: true}, //D
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q9.png",
        answer: [
        {a: "1/3", correct: false},
        {b: "2/3", correct: true}, //B
        {c: "9/10", correct: false},
        {d: "9/5", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q10.png",
        answer: [
        {a: "1", correct: true}, //A
        {b: "2", correct: false},
        {c: "3", correct: false},
        {d: "4", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q11.png",
        answer: [
        {a: "0", correct: false},
        {b: "1", correct: false},
        {c: "2", correct: false},
        {d: "dne", correct: true}, //D
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q12.png",
        answer: [
        {a: "dne", correct: false},
        {b: "0", correct: true}, //B
        {c: "1", correct: false},
        {d: "2", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q13.png",
        answer: [
        {a: "-1", correct: false},
        {b: "0", correct: false},
        {c: "1", correct: true}, //C
        {d: "2", correct: false},
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q14.png",
        answer: [
        {a: "-5", correct: false},
        {b: "-4", correct: false},
        {c: "-3", correct: false},
        {d: "-2", correct: true}, //D
        ]
    }
    ,
    {
        question: "Find: ",
        img: "/images/img_quiz/q15.png",
        answer: [
        {a: "3", correct: true}, //A
        {b: "2", correct: false},
        {c: "1", correct: false},
        {d: "0", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q16.png",
        answer: [
        {a: "-5/6", correct: true}, //A
        {b: "-1/4", correct: false},
        {c: "-5/8", correct: false},
        {d: "-7/9", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q17.png",
        answer: [
        {a: "-∞", correct: false},
        {b: "+∞", correct: false},
        {c: "1", correct: false},
        {d: "dne", correct: true}, //D
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q18.png",
        answer: [
        {a: "-1/8", correct: true}, //A
        {b: "-3/8", correct: false},
        {c: "-5/8", correct: false},
        {d: "-7/8", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q19.png",
        answer: [
        {a: "3/7", correct: false},
        {b: "-3/7", correct: false},
        {c: "7/3", correct: true}, //C
        {d: "-7/3", correct: false},
        ]
    }
    ,
    {
        question: "Evaluate: ",
        img: "/images/img_quiz/q20.png",
        answer: [
        {a: "1", correct: false},
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
const questionEl = document.querySelector('.quiz-container-header')
const quizImage = document.getElementById("quiz-image");
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

let currentQuestionIndex = -1;


answerEls.forEach((answerEl) => {
    answerEl.addEventListener('change', () => {
      if(answerEl.checked) submitBtn.disabled = false;
    //   const isAnswerChecked = Array.from(answerEls).some((answerEl) => answerEl.checked);
      
    });
  });


quizImage.src = quizData[0].answer[0].img;


function loadQuiz() {
    deselectAnswers()
    submitBtn.disabled = true;
    const currentQuizData = quizData[currentQuiz]
    quizImage.src = currentQuizData.img;
    questionEl.innerText = `Question ${currentQuiz+1} ${currentQuizData.question}`
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
           if(currentQuiz == (quizData.length-1)){
                submitBtn.innerHTML = "See result";
           }
       } 
       else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
       }
       
})


