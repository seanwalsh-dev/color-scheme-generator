/*

FIGMA FILE
  https://www.figma.com/design/twasy8Bca4hW7gunLFSLoY/Color-Scheme-Generator?node-id=2-1155&t=YpxMaxGtulNtCXis-0

  API
  https://www.thecolorapi.com/docs#schemes

GOALS
  + Choose a ‘seed color’ with a <input type=”color”>
  + Choose color scheme mode in a <select> box
  + Clicking button makes request to the Color API to get a color scheme
  + Display the scheme colors and hex values on the page
  - Stretch goal: click hex values to copy to clipboard.




TODO: 
  
  + input for type of color code to show (hex, rgb, hsl, cmyk, etc)
  - copy to clipboard function
  - differnt max limits for color count based on scheme type
  - light/dark mode toggle
  - better styling/layout
  

*/

// UNIVERSAL VARIABLES

const colorPicker = document.getElementById('color-picker');
const selectModeType = document.getElementById('mode-type');
const form = document.getElementById('color-form');
const colorContainer = document.getElementById('color-container');
const colorCount = document.getElementById('color-count');
const colorCodeSelect = document.getElementById('color-code');

let currnetApiData = null;

// GET SELECTED COLOR VALUE

colorPicker.addEventListener('input', getSelectedHex)

function getSelectedHex() {
  const selectedHex = colorPicker.value;
  const noHashHex = removeHash(selectedHex);
  return noHashHex
}

// REMOVE # FROM HEX CODE

function removeHash(hex) {
  if (hex && hex.startsWith('#')) {
    return hex.slice(1);
  }
  return hex;
}

// SUBMIT FORM

form.addEventListener('submit', getApiData)

// GET API DATA

function getApiData(e) {
  e.preventDefault()

  const mode = selectModeType.value
  const hex = getSelectedHex()
  const count = colorCount.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
  .then(res => res.json())
  .then(data => {
    console.log(`data.colors: ( ${hex} - ${mode} - ${count} )`, data.colors);
    currnetApiData = data
    getColorData(data)
  })
}

// UPDATE COLOR CODE ON COLOR CODE SELECT CHANGE 

    colorCodeSelect.addEventListener('change', handleColorCodeChange)
    function handleColorCodeChange() {
      getColorData(currnetApiData)
    }

// DISPLAY COLOR DATA

function getColorData(data) {
  const selectedColorCode = colorCodeSelect.value;
  
  colorContainer.innerHTML = ``
  data.colors.forEach(color => {
    colorContainer.innerHTML += `
      <div class="color-swatch" style="background-color: ${color.hex.value};">
        <img 
          src="${color.image.named}" 
          alt="${color.name.value} color swatch"
          class="color-name"
        >
        <div class="color-info">
          <p class="color-code-p">${color[selectedColorCode].value}</p>
      </div>
    ` 
  })
}