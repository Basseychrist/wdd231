// Call the function when the page loads
window.onload = function () {
    // Get the current URL
    const currentUrl = window.location.href;

    // Split the URL at "?" to separate form data from the base URL
    const formInformation = currentUrl.split("?");

    // If there is no form data (length < 2), exit the function
    if (formInformation.length < 2) return;

    // Split the query string into individual key-value pairs
    const formData = formInformation[1].split("&");

    // Function to extract and decode the value for a given key
    const show = (key) => {
        let result; // Placeholder for the extracted value

        // Loop through all key-value pairs in the query string
        formData.forEach((element) => {
            // If the element starts with the key, extract its value
            if (element.startsWith(key)) {
                // Decode the value (e.g., handle spaces, special characters)
                result = decodeURIComponent(element.split("=")[1].replace(/\+/g, " "));
            }
        });

        // Return the extracted value or "Not Provided" if missing
        return result || "Not Provided";
    };

    // Function to format the timestamp into a human-readable string
    const formatDate = (dateString) => {
        // Create a Date object from the timestamp string
        const date = new Date(dateString);

        // Define formatting options for day, date, and time
        const options = {
            weekday: 'long',    // Full weekday name (e.g., "Monday")
            year: 'numeric',     // Full year (e.g., "2024")
            month: 'long',       // Full month name (e.g., "October")
            day: 'numeric',      // Day of the month (e.g., "14")
            hour: 'numeric',     // Hour (12-hour clock)
            minute: 'numeric',   // Minutes
            second: 'numeric',   // Seconds
            hour12: true,        // Use 12-hour format with AM/PM
        };

        // Format the date using the defined options
        return date.toLocaleString('en-US', options).replace(/, /g, " , ");
    };

    // Find the HTML element where the form data will be displayed
    const showInfo = document.getElementById("showData");

    // Inject the form data into the HTML using template literals
    showInfo.innerHTML = `
        <h4>First Name:</h4>
        <p>${show("firstName")}</p>
        <h4>Last Name:</h4>
        <p>${show("lastName")}</p>
        <h4>E-mail:</h4>
        <p>${show("email")}</p>
        <h4>Phone Number:</h4>
        <p>${show("phone")}</p>
        <h4>User Name:</h4>
        <p>${show("username")}</p>
        <h4>Message:</h4>
        <p>${show("message")}</p>
        <h4>Timestamp:</h4>
        <p id="date">${formatDate(show("timestamp"))}</p>
    `;
};
