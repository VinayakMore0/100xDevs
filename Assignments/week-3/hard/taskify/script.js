let todo = [];
let inProg = [];
let unReview = [];
let finish = [];

const buttons = document.getElementsByClassName("btn");

for (let btn of buttons) {
  btn.addEventListener("click", () => {
    document.getElementById("form").style.display = "flex";
  });
}

document.getElementById("addBtn").addEventListener("click", addTodo);

function addTodo() {
  const category = document.getElementById("category").value;
  const titleValue = document.getElementById("title").value.trim();
  const descValue = document.getElementById("desc").value.trim();
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  if (!titleValue || !descValue || !date) {
    alert("Please enter all the fields!");
    return;
  }

  const task = {
    title: titleValue,
    desc: descValue,
    type,
    date,
  };

  if (category === "todo") {
    todo.push(task);
  } else if (category === "inProg") {
    inProg.push(task);
  } else if (category === "unReview") {
    unReview.push(task);
  } else if (category === "finish") {
    finish.push(task);
  }

  render();

  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("form").style.display = "none";
}

function render() {
  document
    .querySelectorAll(".cat .cards")
    .forEach((cards) => (cards.innerHTML = ""));

  function getLevelInfo(type) {
    switch (type) {
      case "easy":
        return { label: "Low", color: "green" };
      case "mid":
        return { label: "Medium", color: "orange" };
      case "hard":
        return { label: "Urgent", color: "red" };
      default:
        return { label: type, color: "gray" };
    }
  }

  function createCard(task) {
    const { label, color } = getLevelInfo(task.type);

    return `
      <div class="card">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
        <div class="details">
          <div class="time">
            <span class="level" style="background:${color}; color:white; padding:2px 6px; border-radius:4px;">
              ${label}
            </span>
            <span>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiLz48cGF0aCBkPSJNMTEgOHY1aDUiLz48L2c+PC9zdmc+"
                alt="clock"
              /> ${task.date}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  document.querySelector("#todo .cards").innerHTML = todo
    .map(createCard)
    .join("");
  document.querySelector("#inProg .cards").innerHTML = inProg
    .map(createCard)
    .join("");
  document.querySelector("#unReview .cards").innerHTML = unReview
    .map(createCard)
    .join("");
  document.querySelector("#finish .cards").innerHTML = finish
    .map(createCard)
    .join("");
}

render();
