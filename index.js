// script.js
const weatherContainer = document.getElementById('weather-info');
const loadingElement = document.getElementById('loading');

// Check if Web Workers are supported
if (window.Worker) {
  const worker = new Worker('worker.js');
  
  // Listen for messages from the web worker
  worker.onmessage = function(event) {
    const { success, data, error } = event.data;

    if (success) {
      const { location, current } = data;
      const weatherHTML = `
        <h2>Weather in ${location.name}, ${location.country}, ${location.zip}</h2>
        <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${current.condition.text}</p>
        <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
        <p><strong>Last Updated:</strong> ${current.last_updated}</p>
      `;
      weatherContainer.innerHTML = weatherHTML;
      weatherContainer.style.display = 'flex';
      loadingElement.style.display = 'none'; // Hide loading animation
    } else {
      weatherContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
  };

  // Handle any errors from the worker
  worker.onerror = function(error) {
    console.error('Worker error: ', error);
    weatherContainer.innerHTML = '<p>There was an error with the weather data worker.</p>';
  };
} else {
  weatherContainer.innerHTML = '<p>Your browser does not support Web Workers.</p>';
}
