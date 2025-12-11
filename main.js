/*

FIGMA FILE
  https://www.figma.com/design/twasy8Bca4hW7gunLFSLoY/Color-Scheme-Generator?node-id=2-1155&t=YpxMaxGtulNtCXis-0

  API
  https://www.thecolorapi.com/docs#schemes

GOALS
  + Choose a ‘seed color’ with a <input type=”color”>
  - Choose color scheme mode in a <select> box
  - Clicking button makes request to the Color API to get a color scheme
  - Display the scheme colors and hex values on the page
  - Stretch goal: click hex values to copy to clipboard.




TODO: 
  
  -write the API
    -Figure out how to get the other color values from the hex value
      -rgb
      -hsl
      -cmyk
    -format=html
    -Modes
      -get modes from select input
        -monochrome 
        -monochrome-dark
        -monochrome-light 
        -analogic 
        -complement 
        -analogic-complement 
        -triad 
        -quad
    -figure out API data and how to use it
    -button
      -display the color scheme on button click

*/

// UNIVERSAL VARIABLES

const colorPicker = document.getElementById('color-picker');
const selectModeType = document.getElementById('mode-type');
const form = document.getElementById('color-form');
const colorSchemeDisplay = document.getElementById('color-scheme-display');

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

// GET API DATA

form.addEventListener('submit', getApiData)

function getApiData(e) {
  e.preventDefault()

  const mode = selectModeType.value
  const hex = getSelectedHex()

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`)
  .then(res => res.json())
  .then(data => {
    console.log(`${hex}, ${mode} data: `, data);
  })
}