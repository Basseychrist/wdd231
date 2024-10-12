// Set the timestamp
document.getElementById('timestamp').value = new Date().toISOString();

// Modal Logic
document.querySelectorAll('a[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', function(event) {
        event.preventDefault();
        const modalId = this.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        const modalId = this.getAttribute('data-close');
        document.getElementById(modalId).style.display = 'none';
    });
});

// Close modal if clicked outside content
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
};

// Animate membership cards on load
window.addEventListener('load', () => {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.transition = 'opacity 1s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
});