import { quizData } from "./data.js";
let score = 0;
let currQues = 0;

function render() {
  const q = quizData[currQues];

  const template = `
    <div id="card">
      <form id="quizForm">
        <div id="form">
          <div id="ques">
            <div id="title">
              <h2>${q.question}</h2>
            </div>
            <div id="radio">
              ${["a", "b", "c", "d"]
                .map(
                  (opt) => `
                <div class="radioText">
                  <input type="radio" name="ans" id="${opt}" value="${opt}" />
                  <label for="${opt}">${q[opt]}</label>
                </div>`
                )
                .join("")}
            </div>
          </div>
          <div id="submit">
            <input type="submit" value="Submit"/>
          </div>
        </div>
      </form>
    </div>
  `;
  document.querySelector("#root").innerHTML = template;

  document.getElementById("quizForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const answer = document.querySelector("input[name='ans']:checked");
    if (!answer) {
      alert("Please select an answer!");
      return;
    }

    if (answer.value === q.correct) {
      score++;
    }

    currQues++;
    if (currQues < quizData.length) {
      render();
    } else {
      showResult();
    }
  });
}

function showResult() {
  document.getElementById("root").innerHTML = `
      <div id="resultCard">
      <h2>You answered ${score}/${quizData.length} questions correctly</h2>
      <button id="restart">Reload</button>
    </div>
    `;

  document.getElementById("restart").addEventListener("click", () => {
    currQues = 0;
    score = 0;
    render();
  });
}

render();
