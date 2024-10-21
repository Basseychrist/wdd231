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
    visitMessage.textContent = "Welcome! ";
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


