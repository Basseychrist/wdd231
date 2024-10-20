// Wait for the DOM content to fully load before executing the script
window.addEventListener('DOMContentLoaded', () => {

  // Get the element where the visit message will be displayed
  const visitMessage = document.getElementById('visit-message');

  // Retrieve the last visit timestamp from localStorage (if available)
  const lastVisit = localStorage.getItem('lastVisit');

  // Get the current time in milliseconds
  const currentVisit = Date.now();

  // Check if this is the user's first visit
  if (!lastVisit) {
    // If no previous visit is found, display a welcome message
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    // Calculate the time difference between the current visit and the last visit
    const timeDifference = currentVisit - lastVisit;

    // Convert the time difference from milliseconds to days
    const daysSinceLastVisit = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Display a message based on how many days it's been since the last visit
    if (daysSinceLastVisit < 1) {
      // If less than 1 day has passed, display a "back so soon" message
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysSinceLastVisit === 1) {
      // If exactly 1 day has passed, display a message for 1 day
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      // If more than 1 day has passed, display the number of days since the last visit
      visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
    }
  }

  // Store the current visit time in localStorage to track future visits
  localStorage.setItem('lastVisit', currentVisit);
});


document.addEventListener("DOMContentLoaded", function () {
  // Initialize Flatpickr for event date input
  const eventDatePicker = flatpickr(".event-date", {
      dateFormat: "Y-m-d"
  });

  // Array to store scheduled events
  let events = [
      { title: "Techcorp Summit", date: "2024-10-15" },
      { title: "FinServe Meeting", date: "2024-10-18" },
      { title: "Green-Tech Expo", date: "2024-11-01" }
  ];

  // Initialize Flatpickr for the main calendar
  const calendar = flatpickr("#calendar", {
      inline: true,  // Display inline on the page
      dateFormat: "Y-m-d",
      onDayCreate: function(dObj, dStr, fp, dayElem) {
          // Highlight dates with events
          const dateStr = dayElem.dateObj.toISOString().split('T')[0];
          if (events.some(event => event.date === dateStr)) {
              dayElem.classList.add('has-event');
          }
      },
      onChange: function(selectedDates, dateStr) {
          // Show events for the selected date when a date is clicked
          displayEventsForDate(dateStr);
      }
  });

  // Function to display events for the selected date
  function displayEventsForDate(selectedDate) {
      const eventList = document.getElementById("event-list");
      const selectedDateDisplay = document.getElementById("selected-date");
      eventList.innerHTML = ""; // Clear previous events

      // Filter events for the selected date
      const eventsForDate = events.filter(event => event.date === selectedDate);

      if (eventsForDate.length > 0) {
          selectedDateDisplay.textContent = `Events on ${selectedDate}:`;

          // Display the event details
          eventsForDate.forEach(event => {
              const listItem = document.createElement("li");
              listItem.textContent = event.title;
              eventList.appendChild(listItem);
          });
      } else {
          selectedDateDisplay.textContent = `No events on ${selectedDate}.`;
      }
  }

  // Handle form submission to add new events
  const eventForm = document.getElementById("eventForm");
  const eventAddedMessage = document.getElementById("event-added-message");

  eventForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get values from form
      const eventTitle = document.getElementById("eventTitle").value;
      const eventDate = document.getElementById("eventDate").value;

      // Validate that both fields are filled out
      if (eventTitle && eventDate) {
          // Add the new event to the events array
          events.push({ title: eventTitle, date: eventDate });

          // Redraw the calendar to highlight the new event date
          calendar.redraw();

          // Display success message
          eventAddedMessage.style.display = "block";

          // Hide the success message after 3 seconds
          setTimeout(function () {
              eventAddedMessage.style.display = "none";
          }, 3000); // 3 seconds

          // Reset the form
          eventForm.reset();
          eventDatePicker.clear();

          // Optionally, display events for the newly added date
          displayEventsForDate(eventDate);
      }
  });

  // Initial display for the current date (or message to select a date)
  document.getElementById("selected-date").textContent = "Select a date to see events.";
});
