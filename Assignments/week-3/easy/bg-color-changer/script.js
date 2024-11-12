const body = document.body;
// const redButton = document.getElementById('red-button');
const customColorsContainer = document.getElementById('custom-colors');
const colorInput = document.getElementById('color-input');
const addColorButton = document.getElementById('add-color');

let customColors = [
    'Red',
    'Yellow',
    'Black',
    'Purple',
    'Green',
    'Blue',
    'Default'
];

function renderCustomColors() {
    customColorsContainer.innerHTML = '';
    customColors.forEach(color => {
        const button = document.createElement('button');
        button.style.backgroundColor = color;
        button.style.color = '#fff';
        button.textContent = color;
        button.addEventListener('click', () => setBackgroundColor(color));
        customColorsContainer.appendChild(button);
    });
}

function setBackgroundColor(color) {
    body.style.backgroundColor = color;
} 

// redButton.addEventListener('click', () =>   setBackgroundColor('#ff0000'));

addColorButton.addEventListener('click', () => {
    const newColor = colorInput.value.trim();
    if (newColor) {
        customColors.push(newColor);
        renderCustomColors();
        colorInput.value = '';
    }
});

renderCustomColors();



