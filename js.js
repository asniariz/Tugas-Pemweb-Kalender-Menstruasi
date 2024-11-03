let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let startDate;
let cycleLength;

// Function to show the calendar screen and hide the input form
function showCalendar() {
    // Get input values
    startDate = new Date(document.getElementById("startDate").value);
    cycleLength = parseInt(document.getElementById("cycleLength").value);

    // Check if startDate and cycleLength are valid
    if (!startDate || isNaN(cycleLength)) {
        alert("Please enter a valid start date and cycle length.");
        return;
    }

    // Show calendar screen
    document.getElementById("inputScreen").style.display = "none";
    document.getElementById("calendarScreen").style.display = "block";

    // Display the calendar with fertile window
    displayCalendar(currentMonth, currentYear);
}

// Function to show the input form and hide the calendar screen
function showInputScreen() {
    document.getElementById("inputScreen").style.display = "block";
    document.getElementById("calendarScreen").style.display = "none";
}

// Function to display the calendar with ovulation and fertile window
function displayCalendar(month, year) {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("currentMonthYear");
    monthYear.innerText = new Date(year, month).toLocaleString('default', {
        month: 'long',
        year: 'numeric'
    });

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Clear existing calendar cells
    calendar.innerHTML = "";

    // Fill in empty cells for days before the start of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendar.appendChild(emptyCell);
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div");
        cell.classList.add("day");
        cell.innerText = day;

        // Calculate ovulation and fertile days based on the start date and cycle length
        const currentDay = new Date(year, month, day);
        const diffDays = Math.floor((currentDay - startDate) / (1000 * 60 * 60 * 24));
        const dayInCycle = (diffDays % cycleLength + cycleLength) % cycleLength;

        // Add styling for fertile window and ovulation day
        if (dayInCycle === 14) {
            cell.classList.add("ovulation");
        } else if (dayInCycle >= 11 && dayInCycle <= 16) {
            cell.classList.add("fertile");
        } else if (dayInCycle === 0) {
            cell.classList.add("start-cycle");
        }

        calendar.appendChild(cell);
    }
}

// Month navigation
document.getElementById("prevMonth").onclick = function () {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) currentYear -= 1;
    displayCalendar(currentMonth, currentYear);
};

document.getElementById("nextMonth").onclick = function () {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) currentYear += 1;
    displayCalendar(currentMonth, currentYear);
};

// Initial setup
showInputScreen();