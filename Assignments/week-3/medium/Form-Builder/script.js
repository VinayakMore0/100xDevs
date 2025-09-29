let feilds = [];

document.getElementById("addBtn").addEventListener("click", addFeild);

function addFeild() {
  const type = document.getElementById("feild").value;
  const labelValue = document.getElementById("label").value.trim();

  if (!labelValue) {
    alert("Please enter a field label!");
    return;
  }

  feilds.push({
    type,
    label: labelValue,
  });
  render(feilds);

  document.getElementById("label").value = "";
}

function render(feilds) {
  const form = document.getElementById("previewForm");
  form.innerHTML = "";

  feilds.forEach((feild) => {
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", feild.label);
    label.innerText = feild.label;

    const input = document.createElement("input");
    input.setAttribute("type", feild.type === "text" ? "text" : feild.type);
    input.setAttribute("id", feild.label);
    input.setAttribute("name", feild.label);

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  });
}

render(feilds);
