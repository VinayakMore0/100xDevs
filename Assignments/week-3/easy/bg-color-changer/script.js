const colors = ["Red", "Yellow", "Black", "Purple", "Green", "Blue", "White"];

function addColor(color) {
  colors.push(document.querySelector("input").value);
  render(colors);
}

function createColorBtn(color) {
  const btn = document.createElement("button");
  btn.innerHTML = color;
  btn.className = "btn";
  btn.style.backgroundColor = color;
  btn.onclick = () => {
    document.querySelector("#root").style.backgroundColor = color;
  };
  return btn;
}

function render(colors) {
  document.querySelector("#btnParent").innerHTML = "";
  for (let i = 0; i < colors.length; i++) {
    const elem = createColorBtn(colors[i]);
    document.querySelector("#btnParent").appendChild(elem);
  }
}

render(colors);
