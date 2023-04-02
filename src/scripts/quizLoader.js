fetch('/quizData.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)


const quiz= document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');

const quizCard = document.getElementById("quiz-container");
const scoreCard = document.getElementById('score-card');
const promptCard = document.getElementById("prompt-card");
const reminderCard = document.getElementById("reminder-card");

const questionEl = document.querySelector('.quiz-container-header');
const quizImage = document.getElementById("quiz-image");
const scoreText = document.querySelector('.score-text');

const takeQuizBtn = document.getElementById('take-quiz');
const realQuizBtn = document.getElementById('real-quiz');
const submitBtn = document.getElementById('submit');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');


let currentQuiz = 0
let score = 0

let currentQuestionIndex = -1;

takeQuizBtn.addEventListener('click', ()=>{
    reminderCard.classList.remove('active');
    quizCard.classList.add('active');
})
realQuizBtn.addEventListener('click', ()=>{
    promptCard.classList.remove('active');
    reminderCard.classList.add('active');
})

answerEls.forEach((answerEl) => {
    answerEl.addEventListener('change', () => {
      if(answerEl.checked) submitBtn.disabled = false;
    });
});


quizImage.src = data[0].answer[0].img;


function loadQuiz() {
  answerEls.forEach(answerEl => answerEl.checked = false)
  submitBtn.disabled = true;
  const currentQuizData = data[currentQuiz]
  quizImage.src = currentQuizData.img;
  questionEl.innerText = `Question ${currentQuiz+1} ${currentQuizData.question}`
  a_text.innerText = currentQuizData.answer[0].a
  b_text.innerText = currentQuizData.answer[1].b
  c_text.innerText = currentQuizData.answer[2].c
  d_text.innerText = currentQuizData.answer[3].d
}

function getSelected() {
    let answer = null;

    answerEls.forEach(answerEl => {
      if (answerEl.checked) {
        const answerId = answerEl.id;
        const isCorrect = data[currentQuiz].answer.some(a => a[answerId] && a.correct);
        
        if (isCorrect) {
          answer = true;
        } else {
          answer = false;
        }
      }
    });  
    return answer;
  }


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
       if(answer === true) {
           score++
       }
       currentQuiz++
       if(currentQuiz < data.length) {
           loadQuiz()
           if(currentQuiz == (data.length-1)){
              submitBtn.innerHTML = "See result";
           }
       } 
       else {
          quizCard.classList.remove('active');
          scoreCard.classList.add('active')
          scoreText.innerHTML = `You answered ${score}/${data.length} questions correctly`
       }
       
})

loadQuiz()
});
