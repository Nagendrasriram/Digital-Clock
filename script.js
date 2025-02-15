let is24HourFormat = false;

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    if (!is24HourFormat) {
        hours = hours % 12 || 12;
    }

    const padZero = num => (num < 10 ? '0' + num : num);

    document.getElementById("hours").textContent = padZero(hours);
    document.getElementById("minutes").textContent = padZero(minutes);
    document.getElementById("seconds").textContent = padZero(seconds);
    document.getElementById("ampm").textContent = is24HourFormat ? '' : ampm;

    document.getElementById("day").textContent = padZero(now.getDate());
    document.getElementById("month").textContent = padZero(now.getMonth() + 1);
    document.getElementById("year").textContent = now.getFullYear();
    document.getElementById("dayOfWeek").textContent = now.toLocaleString('en-us', { weekday: 'long' });

    updateGreeting(hours, ampm);
    updateBackground(hours);
}

function updateGreeting(hours, ampm) {
    let greeting = document.getElementById("greeting");

    if (ampm === "AM") {
        if (hours < 12) greeting.textContent = "Good Morning! ☀️";
    } else {
        if (hours < 5) greeting.textContent = "Good Afternoon! 🌞";
        else greeting.textContent = "Good Evening! 🌙";
    }
}

function updateBackground(hours) {
    let body = document.body;

    if (hours >= 5 && hours < 12) {
        body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
    } else if (hours >= 12 && hours < 18) {
        body.style.background = "linear-gradient(135deg, #ffb347, #ffcc33)";
    } else {
        body.style.background = "linear-gradient(135deg, #1f1c2c, #928DAB)";
    }
}

// Switch time format
document.getElementById("formatToggle").addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;
    document.getElementById("formatToggle").textContent = is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour";
    updateClock();
});

// Toggle dark/light theme
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.getElementById("themeToggle").textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
});

// Fetch weather data
async function fetchWeather() {
    try {
        const res = await fetch("https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=auto:ip");
        const data = await res.json();
        document.getElementById("weather").textContent = `🌡 ${data.current.temp_c}°C | ${data.location.name}`;
    } catch (error) {
        document.getElementById("weather").textContent = "Weather unavailable.";
    }
}

// Fetch motivational quotes
async function fetchQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        document.getElementById("quote").textContent = `"${data.content}" - ${data.author}`;
    } catch (error) {
        document.getElementById("quote").textContent = "Keep pushing forward!";
    }
}

// Update clock and fetch data every second
setInterval(updateClock, 1000);
setInterval(fetchQuote, 60000);
fetchWeather();
updateClock();
fetchQuote();
