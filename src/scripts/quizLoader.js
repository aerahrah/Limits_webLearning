import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, update, get } from "firebase/database";

const uid = localStorage.getItem("uid");
const userRef = ref(realtimeDb, `users/${uid}`);

const quizCard = document.getElementById("quiz-container");
const scoreCard = document.getElementById("score-card");
const promptCard = document.getElementById("prompt-card");
const reminderCard = document.getElementById("reminder-card");
const preScoreCard = document.getElementById("prescore-card");
const preTestTakerCard = document.getElementById("pretesttaker-card");
const resultContainer = document.getElementById("result-container");
const viewResultBtn = document.getElementById("view-result");
const practiceCard = document.getElementById("practice-card");
const questionEl = document.querySelector(".quiz-container-header");
const quizImage = document.getElementById("quiz-image");
const scoreText = document.querySelector(".score-text");

const p_q1 = document.getElementById("p1-quiz");
const p_q2 = document.getElementById("p2-quiz");
const p_q3 = document.getElementById("p3-quiz");
const p_q4 = document.getElementById("p4-quiz");
const p_q5 = document.getElementById("p5-quiz");
const p_q6 = document.getElementById("p6-quiz");
const p_q7 = document.getElementById("p7-quiz");

const preTestNoBtn = document.getElementById("no-pretest");
const preTestYesBtn = document.getElementById("yes-pretest");
const summativeQuizBtn = document.getElementById("summative-quiz");
const postQuizBtn = document.getElementById("post-quiz");
const practiceQuizBtn = document.getElementById("practice-quiz");
const realQuizBtn = document.getElementById("real-quiz");
const submitBtn = document.getElementById("submit");
const answerEls = document.querySelectorAll(".answer");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitPreScore = document.getElementById("submit-prescore");
const errorMessage = document.getElementById("error-message");

let input = document.getElementById("number-input");
// Quiz data
const selectedAnswers = [];
let quizDataSave;
let optionQuiz;
let currentQuiz = 0;
let score = 0;
let quizTakenValue;

function disableButtonStyles(buttonId) {
  const button = document.getElementById(buttonId);
  // Update button styles if button is not null
  if (button) {
    button.style.pointerEvents = "none";
    button.style.cursor = "default";
    button.style.opacity = "0.5";
  }
}
function enableButtonStyles(buttonId) {
  const button = document.getElementById(buttonId);

  // Update button styles if button is not null
  if (button) {
    button.style.pointerEvents = "auto";
    button.style.cursor = "pointer";
    button.style.opacity = "1";
  }
}
function hideLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
}
fetchData();
document.getElementById("loading-screen").style.display = "block";
get(child(userRef, "preTestTaker"))
  .then(handlePreTestTaker)
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "postScore"))
  .then(handlePostScore)
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "sumScore"))
  .then(handleSumScore)
  .catch((error) => {
    console.error(error);
  });
get(child(userRef, "quizTaken"))
  .then((snapshot) => {
    quizTakenValue = snapshot.val();
  })
  .catch((error) => {
    console.error(error);
  });
function handlePostScore(snapshot) {
  const postScoreVal = snapshot.val();
  if (postScoreVal == "N/A") {
    enableButtonStyles("post-quiz");
  } else {
    disableButtonStyles("post-quiz");
  }
}
function handleSumScore(snapshot) {
  const sumScoreVal = snapshot.val();
  if (sumScoreVal == "N/A") {
    enableButtonStyles("summative-quiz");
  } else {
    disableButtonStyles("summative-quiz");
  }
}
function handlePreTestTaker(snapshot) {
  const preTestTaker = snapshot.val();

  if (preTestTaker == "N/A") {
    hideLoadingScreen();
    preTestTakerCard.classList.add("active");
    preTestNoBtn.addEventListener("click", function () {
      checkPreTestTaker("no");
    });
    preTestYesBtn.addEventListener("click", function () {
      checkPreTestTaker("yes");
    });
  } else if (preTestTaker == "yes") {
    get(child(userRef, "preScore"))
      .then(handlePreScoreSnapshot)
      .catch((error) => {
        console.error(error);
      });
  } else if (preTestTaker == "no") {
    hideLoadingScreen();
    console.log("asdfasljdf");
    disableButtonStyles("post-quiz");
    promptCard?.classList.add("active");
  }
}
function checkPreTestTaker(choice) {
  if (choice == "yes") {
    update(userRef, {
      preTestTaker: "yes",
    });
    preTestTakerCard.classList.remove("active");
    preScoreCard.classList.add("active");
    get(child(userRef, "preScore"))
      .then(handlePreScoreSnapshot)
      .catch((error) => {
        console.error(error);
      });
  } else if (choice == "no") {
    update(userRef, {
      preTestTaker: "no",
    });
    disableButtonStyles("post-quiz");
    preTestTakerCard.classList.remove("active");
    promptCard.classList.add("active");
  }
}

function handlePreScoreSnapshot(snapshot) {
  const prescore = snapshot.val();

  if (prescore == "N/A") {
    hideLoadingScreen();
    preScoreCard.classList.add("active");
    submitPreScore.addEventListener("click", handlePreScoreInput);
  } else {
    hideLoadingScreen();
    promptCard?.classList.add("active");
  }
}

function handlePreScoreInput() {
  let isValid = true;

  if (input.value < 0 || input.value > 20) {
    displayTextMessage("Score must be between 0 and 20!", "notify-failed");
    isValid = false;
  } else {
    update(userRef, {
      preScore: input.value,
    });
    displayTextMessage("Successfully added score!", "notify-success");
    setTimeout(() => {
      preScoreCard.classList.remove("active");
      promptCard.classList.add("active");
    }, 3000);
  }

  if (!isValid) {
    input.focus();
  }
}

function displayTextMessage(errorMessageText, errorMessageClass) {
  errorMessage.textContent = errorMessageText;
  errorMessage.classList.remove("notify-success", "notify-failed");
  errorMessage.classList.add(errorMessageClass);
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.transform = "scale(1)";
  }, 200);
  setTimeout(() => {
    errorMessage.style.transform = "scale(0)";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 300);
  }, 3000);
}

function generateQuizHTML(questions, score) {
  let quizHTML = "";
  let quizSolutionHTML = "";
  let questionNum = 0;
  let solutionContainer = [];
  let solutionHeader;
  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let selectedAns = selectedAnswers[i].answerID;
    let choicesHTML = "";
    let selectedAnswerText = "";
    let correctAnsHeader = "";
    let wrongAnsHeader = "";
    solutionContainer.push(question.solution);
    selectedAnswerText = question.answer.find((ans) => ans[selectedAns]);
    selectedAnswerText = selectedAnswerText
      ? selectedAnswerText[selectedAns]
      : "";

    for (let j = 0; j < question.answer.length; j++) {
      let answer = question.answer[j];
      let isSelected = "";

      let choices = [answer.a, answer.b, answer.c, answer.d];
      let isCorrect = answer.correct ? "correct-answer" : "";
      if (choices[j] === selectedAnswerText) {
        isSelected = "selectedAnsByUser";
      }
      if (
        choices.includes(selectedAnswerText) &&
        isCorrect == "correct-answer"
      ) {
        correctAnsHeader = `<h2 class ="quiz-container--correct primary-text text-center" > CORRECT</h2>`;
      }
      choicesHTML += `
    <li>
      <input type="radio" name="answer${i}" id="${choices[j]}" class="answer ${isCorrect}" />
      <label for="${choices[j]}" class="tertiary-text answer-label ${isCorrect} ${isSelected}" id="${choices[j]}_text">${choices[j]}</label>
    </li>
  `;
    }
    if (correctAnsHeader == "") {
      wrongAnsHeader = `<h2 class ="quiz-container--wrong primary-text text-center" > WRONG</h2>`;
      correctAnsHeader = wrongAnsHeader;
    }
    quizHTML += `
      <div id="quiz-container-${questionNum}" class="card-containers quiz-container">
       ${correctAnsHeader}
        <div class="quiz-container-body">
       
          <h2 class="primary-text quiz-container-header"> Question ${i + 1} ${
      question.question
    }</h2>
          <div class="image-container">
            <img src="${question.img}" id="quiz-image-${questionNum}" />
          </div>
          <ul class="question-container text-center">
            ${choicesHTML}
          </ul>
        </div>
      </div>
    `;
    if (solutionContainer[i]) {
      quizSolutionHTML += `
    <div class="img-solution-container--item">
              <h2 class="primary-text quiz-container-header"> Question ${
                i + 1
              }</h2>
      <img src="${solutionContainer[i]}" />
    </div>
    `;
    }
    questionNum++;
  }
  if (quizSolutionHTML) {
    solutionHeader = `<div class="quiz-container--title quiz-container--title--1 primary-text text-center">Solutions </div>`;
  } else {
    solutionHeader = "";
  }
  quizHTML = `<div class="quiz-container--title primary-text text-center">You answered ${score}/${questions.length} questions correctly </div> ${quizHTML}   ${solutionHeader} <div class="img-solution-container">${quizSolutionHTML}      </div>     <a href="/profile" id="home-screen-btn" class="btn btn--green secondary-text">Go to profile</a
        >`;

  return quizHTML;
}
//This will get the data from json and make use of the data for the quiz
async function fetchData() {
  await Promise.all([
    fetch("/quizData.json").then((response) => response.json()),
    fetch("/quizDataSum.json").then((response) => response.json()),
    fetch("/quizDataL1.json").then((response) => response.json()),
    fetch("/quizDataL2.json").then((response) => response.json()),
    fetch("/quizDataL3.json").then((response) => response.json()),
    fetch("/quizDataL4.json").then((response) => response.json()),
    fetch("/quizDataL5.json").then((response) => response.json()),
    fetch("/quizDataL6.json").then((response) => response.json()),
    fetch("/quizDataL7.json").then((response) => response.json()),
  ]).then((results) => {
    const data = results[0];
    const summativeData = results[1];
    const pQ1 = results[2];
    const pQ2 = results[3];
    const pQ3 = results[4];
    const pQ4 = results[5];
    const pQ5 = results[6];
    const pQ6 = results[7];
    const pQ7 = results[8];

    // Event listeners

    p_q1?.addEventListener("click", initializeQuiz("randomizePQ1"));
    p_q2?.addEventListener("click", initializeQuiz("randomizePQ2"));
    p_q3?.addEventListener("click", initializeQuiz("randomizePQ3"));
    p_q4?.addEventListener("click", initializeQuiz("randomizePQ4"));
    p_q5?.addEventListener("click", initializeQuiz("randomizePQ5"));
    p_q6?.addEventListener("click", initializeQuiz("randomizePQ6"));
    p_q7?.addEventListener("click", initializeQuiz("randomizePQ7"));
    realQuizBtn?.addEventListener("click", () => {
      promptCard.classList.remove("active");
      reminderCard.classList.add("active");
      get(child(userRef, "preTestTaker"))
        .then((snapshot) => {
          const preTestTakerVal = snapshot.val();
          if (preTestTakerVal == "no") {
            disableButtonStyles("post-quiz");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    postQuizBtn?.addEventListener("click", initializeQuiz("randomizeWhole"));
    summativeQuizBtn?.addEventListener(
      "click",
      initializeQuiz("randomizeWholeSum")
    );
    practiceQuizBtn?.addEventListener("click", () => {
      promptCard.classList.remove("active");
      practiceCard.classList.add("active");
    });
    realQuizBtn?.addEventListener("click", () => {
      promptCard.classList.remove("active");
      reminderCard.classList.add("active");
    });
    answerEls.forEach((answerEl) => {
      answerEl?.addEventListener("change", () => {
        submitBtn.disabled = false;
      });
    });
    submitBtn?.addEventListener("click", () => {
      nextQuestion(optionQuiz);
    });
    // Functions

    function initializeQuiz(option) {
      const optionsData = {
        randomizeThree: { data: data, count: 3 },
        randomizeWhole: { data: data },
        randomizeWholeSum: { data: summativeData, count: 15 },
        randomizePQ1: { data: pQ1, count: 3 },
        randomizePQ2: { data: pQ2, count: 3 },
        randomizePQ3: { data: pQ3, count: 3 },
        randomizePQ4: { data: pQ4, count: 3 },
        randomizePQ5: { data: pQ5, count: 3 },
        randomizePQ6: { data: pQ6, count: 3 },
        randomizePQ7: { data: pQ7, count: 3 },
      };

      return () => {
        disableButtonStyles("navbar-menu");
        reminderCard.classList.remove("active");
        practiceCard.classList.remove("active");
        quizCard.classList.add("active");
        const optionData = optionsData[option];

        if (optionData) {
          loadQuiz(stableRandomizer(optionData.data, optionData.count));
          optionQuiz = option;
        }
      };
    }

    function loadQuiz(quizdata) {
      answerEls.forEach((answerEl) => (answerEl.checked = false));
      submitBtn.disabled = true;
      const currentQuizData = quizdata[currentQuiz];
      quizImage.src = currentQuizData.img;
      questionEl.innerText = `Question ${currentQuiz + 1} ${
        currentQuizData.question
      }`;
      a_text.innerText = currentQuizData.answer[0].a;
      b_text.innerText = currentQuizData.answer[1].b;
      c_text.innerText = currentQuizData.answer[2].c;
      d_text.innerText = currentQuizData.answer[3].d;
    }

    function getSelected(quizdata) {
      let selectedAnswer = null;

      answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
          const answerId = answerEl.id;
          const correctAnswers = quizdata[currentQuiz].answer.filter(
            (a) => a.correct
          );

          const isCorrect = correctAnswers.some((a) => a[answerId]);
          selectedAnswer = isCorrect ? true : false;
          selectedAnswers.push({ answerID: answerId });
        }
      });

      return selectedAnswer;
    }

    function nextQuestion(option) {
      let quizData = quizDataSave;

      console.log(option);
      const answer = getSelected(quizData);
      score += answer === true ? 1 : 0;

      currentQuiz++;
      const quizDataLength = quizData.length;

      if (currentQuiz < quizDataLength) {
        loadQuiz(quizData);
      } else {
        quizCard.classList.remove("active");
        scoreCard.classList.add("active");

        const scoreMessage = `You answered ${score}/${quizDataLength} questions correctly`;
        const scoreAdd = {
          postScore: score,
        };
        const scoreAddSum = {
          sumScore: score,
        };

        if (option === "randomizeWhole" || option === "randomizeWholeSum") {
          const updatePromise =
            option === "randomizeWhole"
              ? update(userRef, scoreAdd)
              : update(userRef, scoreAddSum);
          updatePromise
            .then(() => {
              console.log("New child node added successfully!");
            })
            .catch((error) => {
              console.error("Error adding new child node: ", error);
            });

          viewResultBtn.addEventListener("click", () => {
            scoreCard.classList.remove("active");
            resultContainer.classList.add("active");
            resultContainer.innerHTML = generateQuizHTML(quizData, score);
          });
        }

        if (
          option === "randomizeThree" ||
          option === "randomizePQ1" ||
          option === "randomizePQ2" ||
          option === "randomizePQ3" ||
          option === "randomizePQ4" ||
          option === "randomizePQ5" ||
          option === "randomizePQ6" ||
          option === "randomizePQ7"
        ) {
          quizTakenValue += 1;
          const quizTakenValUpdate = {
            quizTaken: quizTakenValue,
          };
          update(userRef, quizTakenValUpdate);
          scoreText.innerHTML = `${scoreMessage}
        <button class="btn btn--green secondary-text" onclick="location.reload()">Reload</button>
      `;
          viewResultBtn.addEventListener("click", () => {
            scoreCard.classList.remove("active");
            resultContainer.classList.add("active");
            resultContainer.innerHTML = generateQuizHTML(quizData, score);
          });
        } else {
          scoreText.innerHTML = scoreMessage;
        }
      }
    }

    function stableRandomizer(arr, count = 20) {
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

      if (randomizeQuiz) {
        quizDataSave = randomizeQuiz;
        return randomizeQuiz;
      }
    }
  });
}
