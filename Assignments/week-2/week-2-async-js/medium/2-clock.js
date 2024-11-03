// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)


function formatTime(date, use24Hour = true) {
    const hours = use24Hour ? date.getHours() : (date.getHours() % 12 || 12);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = use24Hour ? '' : (date.getHours() >= 12 ? 'PM' : 'AM');

    return `${hours.toString().padStart(2, '0')} : ${minutes} : ${seconds}${ampm}`
}

function displayTime() {
    const now = new Date();
    const time24 = formatTime(now);
    const time12 = formatTime(now, false);

    console.clear();
    console.log(`24-hour format: ${time24}`);
    console.log(`12-hour format: ${time12}`);
}

function startClock() {
    displayTime();
    setInterval(displayTime, 1000);
}

startClock();

console.log("Press Ctrl+C to stop the click clocl.");


