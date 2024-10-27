// ----------way finder for users-----------------//
document.addEventListener('DOMContentLoaded', () => {
    // Get the current page's filename (e.g., home.html)
    const currentPage = window.location.pathname.split('/').pop();

    // Get all navigation links
    const navLinks = document.querySelectorAll('.navigation a');

    // Loop through the links and apply 'active' class to the matching page
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
