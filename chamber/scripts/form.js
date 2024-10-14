// Function to fetch membership levels from the JSON file
async function fetchMembershipLevels() {
    try {
        const response = await fetch('data/membershipLevels.json');
        if (!response.ok) throw new Error('Failed to load membership levels');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching membership levels:', error);
        return []; // Return an empty array on error
    }
}

// Function to generate membership cards and modals dynamically
async function generateMembershipCardsAndModals() {
    const membershipLevels = await fetchMembershipLevels(); // Fetch data from JSON
    const cardContainer = document.querySelector('.form-membership-cards');
    const modalContainer = document.getElementById('membershipLevels');

    // Clear existing content if necessary
    cardContainer.innerHTML = '';
    modalContainer.innerHTML = '';

    membershipLevels.forEach(level => {
        // Create membership card
        const card = document.createElement('div');
        card.classList.add('form-card');
        card.id = `${level.id}Card`;

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = level.title;

        const cardLink = document.createElement('a');
        cardLink.href = '#';
        cardLink.textContent = 'Learn More';
        cardLink.setAttribute('data-modal', level.modalId);
        cardLink.addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementById(level.modalId).style.display = 'block';
        });

        card.appendChild(cardTitle);
        card.appendChild(cardLink);
        cardContainer.appendChild(card);

        // Create modal
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.id = level.modalId;

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalClose = document.createElement('span');
        modalClose.classList.add('close');
        modalClose.textContent = '×';
        modalClose.setAttribute('data-close', level.modalId);
        modalClose.addEventListener('click', function() {
            document.getElementById(level.modalId).style.display = 'none';
        });

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = `${level.title} Benefits`;

        const modalText = document.createElement('p');
        modalText.textContent = level.benefits;

        // Add the price to the modal
        const modalPrice = document.createElement('p');
        modalPrice.innerHTML = `<strong>Price:</strong> ${level.Price}`;

        modalContent.appendChild(modalClose);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(modalPrice); // Add price element
        modal.appendChild(modalContent);

        modalContainer.appendChild(modal);
    });
}

// Initialize the membership cards and modals when the page loads
window.addEventListener('load', async function() {
    await generateMembershipCardsAndModals(); // Ensure data is loaded before generating

    // Animate membership cards on page load
    document.querySelectorAll('.form-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200); // Delay animation for each card
    });
});

// Close modal if clicking outside the modal content
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
