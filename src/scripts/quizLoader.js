fetch('/quizData.json')
  .then(response => response.json())
  .then(data => {

    console.log(data)
    let quizDataSave;
    let quizDataThreeSave;
    let optionQuiz;
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
    const practiceQuizBtn = document.getElementById('practice-quiz')
    const realQuizBtn = document.getElementById('real-quiz');
    const submitBtn = document.getElementById('submit');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');


    let currentQuiz = 0;
    let score = 0

    takeQuizBtn.addEventListener('click', ()=>{
        reminderCard.classList.remove('active');
        quizCard.classList.add('active');
        loadQuiz(stableRandomizer(data)) 
        optionQuiz = "randomizeWhole";
        console.log(quizDataSave);
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


    // quizImage.src = data[0].answer[0].img;



    function loadQuiz(quizdata) {
      
      answerEls.forEach(answerEl => answerEl.checked = false)
      submitBtn.disabled = true;
      const currentQuizData = quizdata[currentQuiz]
      console.log(currentQuizData)
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


 
    function nextQuestion(option){
      const answer = getSelected()
      if(answer === true) {
          score++
      }
      console.log(option)
      console.log('clicks')
      currentQuiz++
      if(option == "randomizeThree"){
        if(currentQuiz < quizDataThreeSave.length) {
          loadQuiz(quizDataThreeSave)
          if(currentQuiz == (quizDataThreeSave.length-1)){
              submitBtn.innerHTML = "See result";
          }
        } 

        else {
          quizCard.classList.remove('active');
          scoreCard.classList.add('active')
          scoreText.innerHTML = `You answered ${score}/${quizDataThreeSave.length} questions correctly`
        }
    }
      if(option == "randomizeWhole"){
        if(currentQuiz < quizDataSave.length) {
          loadQuiz(quizDataSave)
          if(currentQuiz == (quizDataSave.length-1)){
              submitBtn.innerHTML = "See result";
          }
      } 
        else {
          quizCard.classList.remove('active');
          scoreCard.classList.add('active')
          scoreText.innerHTML = `You answered ${score}/${quizDataSave.length} questions correctly`
      }
    }  
    }
    submitBtn.addEventListener('click', function() {
      nextQuestion(optionQuiz);
    });

    function stableRandomizer(arr) {
      const randomizeQuiz = [...arr];
     for (let i = randomizeQuiz.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1)); 
       [randomizeQuiz[i], randomizeQuiz[j]] = [randomizeQuiz[j], randomizeQuiz[i]];
     }
     quizDataSave = randomizeQuiz;
     return randomizeQuiz;
    }

    function stableRandomizerThree(arr) {
      const randomizeQuizThree= [];
      const len = arr.length;
      
      // get 3 random indexes
      const indexes = new Set();
      while (indexes.size < 3) {
        indexes.add(Math.floor(Math.random() * len));
      }

      indexes.forEach(index => {
        randomizeQuizThree.push(arr[index]);
      });

      for (let i =  randomizeQuizThree.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizeQuizThree[i], randomizeQuizThree[j]] = [randomizeQuizThree[j], randomizeQuizThree[i]];
      }
      quizDataThreeSave = randomizeQuizThree;
      return randomizeQuizThree;
    }


});
