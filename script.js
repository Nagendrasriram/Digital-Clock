function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("ampm").textContent = ampm;
    document.getElementById("day").textContent = day;
    document.getElementById("month").textContent = month;
    document.getElementById("year").textContent = year;
}

// Fetch Random Quote
function fetchQuote() {
    let quotes = [
        "Believe in yourself!",
        "Your time is now!",
        "Every second counts!",
        "Keep pushing forward!",
        "You are unstoppable!"
    ];
    document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// Fetch Weather Data
async function fetchWeather() {
    try {
        let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true");
        let data = await response.json();
        let temperature = data.current_weather.temperature;
        document.getElementById("weather").textContent = `🌡️ ${temperature}°C`;
    } catch (error) {
        document.getElementById("weather").textContent = "⚠️ Unable to fetch weather.";
    }
}

// Toggle Theme
document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Speak Time
document.getElementById("speak").addEventListener("click", function() {
    let time = document.getElementById("hours").textContent + ":" + document.getElementById("minutes").textContent;
    let msg = new SpeechSynthesisUtterance("The time is " + time);
    window.speechSynthesis.speak(msg);
});

// Battery Status
navigator.getBattery().then(function(battery) {
    function updateBattery() {
        document.getElementById("battery").textContent = `🔋 Battery: ${Math.round(battery.level * 100)}%`;
    }
    updateBattery();
    battery.addEventListener('levelchange', updateBattery);
});

// Run Updates
setInterval(updateClock, 1000);
setInterval(fetchQuote, 60000);
fetchWeather();
fetchQuote();
updateClock();
