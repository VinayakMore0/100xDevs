// Importing the quiz data and functions from quiz.js
import { quizData, getCurrentQuestion, checkAnswer } from "./data.js";

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Displaying the current question and options
function displayQuestion(question) {
  document.getElementById("question-text").textContent = question.question;
  document.getElementById("answer-a").textContent = "A. " + question.a;
  document.getElementById("answer-b").textContent = "B. " + question.b;
  document.getElementById("answer-c").textContent = "C. " + question.c;
  document.getElementById("answer-d").textContent = "D. " + question.d;
}

// Highlight the selected answer button
function highlightSelectedAnswer(selectedButton) {
  const answerButtons = document.querySelectorAll(".answer-options button");
  answerButtons.forEach(function (btn) {
    btn.classList.remove("selected");
  });
  selectedButton.classList.add("selected");
}

// Displaying the final result
function displayResult(score, totalQuestions) {
  document.getElementById(
    "result"
  ).textContent = `Your score: ${score} out of ${totalQuestions}`;
}

// Disabling the UI elements after the quiz ends
function disableUI() {
  const answerButtons = document.querySelectorAll(".answer-options button");
  const submitBtn = document.getElementById("submit-btn");
  answerButtons.forEach(function (btn) {
    btn.style.display = "none";
  });
  submitBtn.style.display = "none";
}

// Initialize the quiz by displaying the first question
displayQuestion(getCurrentQuestion(currentQuestionIndex));

// Handle answer selection
const answerButtons = document.querySelectorAll(".answer-options button");
answerButtons.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    selectedAnswer = event.target.id.slice(-1); // Extract the last character (a, b, c, d)
    highlightSelectedAnswer(event.target);
  });
});

// Handle submit button click
document.getElementById("submit-btn").addEventListener("click", function () {
  if (selectedAnswer === null) {
    alert("Please select an answer before submitting!");
    return;
  }

  // Check if the selected answer is correct
  if (checkAnswer(currentQuestionIndex, selectedAnswer)) {
    score++;
  }

  // Move to the next question or display results
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    displayQuestion(getCurrentQuestion(currentQuestionIndex));
    selectedAnswer = null; // Reset the selected answer
    // Remove selected class from all buttons
    answerButtons.forEach((btn) => btn.classList.remove("selected"));
  } else {
    displayResult(score, quizData.length);
    disableUI();
  }
});
