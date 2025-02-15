function updateClock(){
    let now = new Date();

    // Get time components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Get date components
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are 0-based, so we add 1
    let year = now.getFullYear();

    // Ensure two-digit format
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    // Update the clock
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("format").textContent = ampm; // Fix AM/PM ID

    // Update the date
    document.getElementById("day").textContent = day;
    document.getElementById("month").textContent = month;
    document.getElementById("year").textContent = year;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock();
