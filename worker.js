// worker.js
const zipCodes = ["10001", "90013", "60611", "77006"]; // Sample zip codes
let index = 0;

function fetchWeatherData(zip) {
  const url = `http://api.weatherapi.com/v1/current.json?q=${zip}&aqi=no&key=<PASTE YOUR KEY HERE>`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.location.zip = zip;
      // Send weather data back to main thread
      postMessage({ success: true, data });
    })
    .catch((error) => {
      postMessage({ success: false, error });
    });
}

// Poll every 8 seconds
setInterval(() => {
  const zip = zipCodes[index];
  fetchWeatherData(zip);
  index = (index + 1) % zipCodes.length; // Cycle through zip codes
}, 8000);
