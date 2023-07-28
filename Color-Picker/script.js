// Get DOM elements
const colorBox = document.getElementById('colorBox');
const hueSlider = document.getElementById('hueSlider');
const saturationSlider = document.getElementById('saturationSlider');
const lightnessSlider = document.getElementById('lightnessSlider');
const hexInput = document.getElementById('hexInput');

// Function to update color based on slider values
function updateColor() {
   // Get slider values
   const hue = hueSlider.value;
   const saturation = saturationSlider.value;
   const lightness = lightnessSlider.value;

   // Convert HSL to RGB
   const rgbColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

   // Update color box background color and hex input value
   colorBox.style.backgroundColor = rgbColor;

   hexInput.value = rgbToHex(colorBox.style.backgroundColor);
}

// Function to convert RGB color to hex code
// function rgbToHex(color) {
//   const rgbValues = color.match(/\d+/g);
//   const hexValues = rgbValues.map(value => {
//     const hexValue = Number(value).toString(16);
//     return hexValue.length === 1 ? "0" + hexValue : hexValue;
//   });
//   return "#" + hexValues.join("");
// }

function HextoHSL(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

   var r = parseInt(result[1], 16);
   var g = parseInt(result[2], 16);
   var b = parseInt(result[3], 16);

   r /= 255, g /= 255, b /= 255;
   var max = Math.max(r, g, b), min = Math.min(r, g, b);
   var h, s, l = (max + min) / 2;

   if (max == min) {
      h = s = 0; // achromatic 
   } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
         case g: h = (b - r) / d + 2; break;
         case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
   }

   s = s * 100;
   s = Math.round(s);
   l = l * 100;
   l = Math.round(l);
   h = Math.round(360 * h);

   var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
   hueSlider.value = h;
   saturationSlider.value = s;
   lightnessSlider.value = l;

   console.log(colorInHSL);
   // $rootScope.$emit('colorChanged', { colorInHSL });
}

function rgbToHex(color) {
   color = color.replace("rgb(", "");
   color = color.replace(")", "");
   var RGBColor = color.split(',');

   var finalColor = "#" + (1 << 24 | RGBColor[0] << 16 | RGBColor[1] << 8 | RGBColor[2]).toString(16).slice(1);
   return finalColor;
}

// Event listeners for sliders
hueSlider.addEventListener('input', updateColor);
saturationSlider.addEventListener('input', updateColor);
lightnessSlider.addEventListener('input', updateColor);

document.getElementById("hexInput").addEventListener("click", function () {
   navigator.clipboard.writeText(document.getElementById('hexInput').value).then(function () {
      console.log("Text copied to clipboard successfully.");
   }, function () {
      console.log("Error copying text to clipboard.");
   });
});

updateColor();

//Eyedropper Code to Pick Color from screen
let btn = document.getElementById('open_eyedropper')
if (!window.EyeDropper) {
   console.log('Your browser does not support the EyeDropper API');
} else {
   console.log("Browser supports EyeDropper");
   btn.addEventListener('click', () => {
      // create an object for EyeDropper interface 
      const eyeDropper = new EyeDropper();
      // open the eyedropper api
      eyeDropper.open().then(result => {
         // color details will be printed if the user selects a color
         hexInput.value = result.sRGBHex;
         colorBox.style.backgroundColor = result.sRGBHex;

         HextoHSL(result.sRGBHex);
         console.log(`The color selected is - ${result.sRGBHex}`);
      }).catch(e => {
         console.log("error:", e);
      });
   });
}

hexInput.addEventListener("keyup", () => {
   HextoHSL(hexInput.value);
   colorBox.style.backgroundColor = hexInput.value;
});