fetch("/quizData.json")
  .then((response) => response.json())
  .then((data) => {
    const quizCard = document.getElementById("quiz-container");
    const scoreCard = document.getElementById("score-card");
    const promptCard = document.getElementById("prompt-card");
    const reminderCard = document.getElementById("reminder-card");

    const questionEl = document.querySelector(".quiz-container-header");
    const quizImage = document.getElementById("quiz-image");
    const scoreText = document.querySelector(".score-text");

    const takeQuizBtn = document.getElementById("take-quiz");
    const practiceQuizBtn = document.getElementById("practice-quiz");
    const realQuizBtn = document.getElementById("real-quiz");
    const submitBtn = document.getElementById("submit");
    const answerEls = document.querySelectorAll(".answer");
    const a_text = document.getElementById("a_text");
    const b_text = document.getElementById("b_text");
    const c_text = document.getElementById("c_text");
    const d_text = document.getElementById("d_text");

    // Quiz data
    let quizDataSave;
    let quizDataThreeSave;
    let optionQuiz;
    let currentQuiz = 0;
    let score = 0;
    console.log(quizDataThreeSave);
    // Event listeners
    takeQuizBtn.addEventListener("click", startQuiz("randomizeWhole"));
    practiceQuizBtn.addEventListener("click", startQuiz("randomizeThree"));
    realQuizBtn.addEventListener("click", () => {
      promptCard.classList.remove("active");
      reminderCard.classList.add("active");
    });
    answerEls.forEach((answerEl) =>
      answerEl.addEventListener("change", enableSubmit)
    );
    submitBtn.addEventListener("click", () => {
      nextQuestion(optionQuiz);
    });

    // Functions
    function startQuiz(option) {
      console.log(quizDataSave);
      return () => {
        reminderCard.classList.remove("active");
        promptCard.classList.remove("active");
        quizCard.classList.add("active");
        option == "randomizeThree"
          ? loadQuiz(stableRandomizer(data, "randomizeThree", 3))
          : option == "randomizeWhole"
          ? loadQuiz(stableRandomizer(data, "randomizeWhole"))
          : null;
        optionQuiz = option;
      };
    }

    function enableSubmit() {
      submitBtn.disabled = false;
    }

    function loadQuiz(quizdata) {
      answerEls.forEach((answerEl) => (answerEl.checked = false));
      submitBtn.disabled = true;
      const currentQuizData = quizdata[currentQuiz];
      console.log(currentQuizData);
      quizImage.src = currentQuizData.img;
      questionEl.innerText = `Question ${currentQuiz + 1} ${
        currentQuizData.question
      }`;
      a_text.innerText = currentQuizData.answer[0].a;
      b_text.innerText = currentQuizData.answer[1].b;
      c_text.innerText = currentQuizData.answer[2].c;
      d_text.innerText = currentQuizData.answer[3].d;
    }

    function getSelected() {
      let answer = null;

      answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
          const answerId = answerEl.id;
          const isCorrect = data[currentQuiz].answer.some(
            (a) => a[answerId] && a.correct
          );
          answer = isCorrect ? true : false;
        }
      });
      return answer;
    }

    function nextQuestion(option) {
      const answer = getSelected();
      score += answer === true ? 1 : 0;

      currentQuiz++;

      const quizData =
        option === "randomizeThree" ? quizDataThreeSave : quizDataSave;
      const quizDataLength = quizData.length;

      if (currentQuiz < quizDataLength) {
        loadQuiz(quizData);

        if (currentQuiz === quizDataLength - 1) {
          submitBtn.innerHTML = "See result";
        }
      } else {
        quizCard.classList.remove("active");
        scoreCard.classList.add("active");

        const scoreMessage = `You answered ${score}/${quizDataLength} questions correctly`;

        if (option === "randomizeThree") {
          scoreText.innerHTML = `${scoreMessage}
            <button class="btn btn--green secondary-text" onclick="location.reload()">Reload</button>
          `;
        } else {
          scoreText.innerHTML = scoreMessage;
        }
      }
    }

    function stableRandomizer(arr, option, count = 20) {
      const len = arr.length;
      const randomizeQuiz = [];

      // get count random indexes
      const indexes = new Set();
      while (indexes.size < count) {
        indexes.add(Math.floor(Math.random() * len));
      }

      indexes.forEach((index) => {
        randomizeQuiz.push(arr[index]);
      });

      for (let i = randomizeQuiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizeQuiz[i], randomizeQuiz[j]] = [
          randomizeQuiz[j],
          randomizeQuiz[i],
        ];
      }
      option == "randomizeThree"
        ? (quizDataThreeSave = randomizeQuiz)
        : option == "randomizeWhole"
        ? (quizDataSave = randomizeQuiz)
        : (option = null);

      return randomizeQuiz;
    }
  });
