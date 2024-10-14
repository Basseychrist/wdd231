// Membership levels array with title, benefits, and modal details
const membershipLevels = [
    {
        id: 'np',
        title: 'Non-Profit Membership',
        benefits: 'Benefits include networking, discounted event prices, and more for non-profit organizations.',
        modalId: 'npModal'
    },
    {
        id: 'bronze',
        title: 'Bronze Membership',
        benefits: 'Bronze members enjoy advertising opportunities, event discounts, and training programs.',
        modalId: 'bronzeModal'
    },
    {
        id: 'silver',
        title: 'Silver Membership',
        benefits: 'Silver members get all bronze benefits plus spotlight features and VIP events.',
        modalId: 'silverModal'
    },
    {
        id: 'gold',
        title: 'Gold Membership',
        benefits: 'Gold members receive premium advertising, exclusive invitations, and top-tier networking events.',
        modalId: 'goldModal'
    }
];

// Function to generate membership cards and modals dynamically
function generateMembershipCardsAndModals() {
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

        modalContent.appendChild(modalClose);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modal.appendChild(modalContent);

        modalContainer.appendChild(modal);
    });
}

// Initialize the membership cards and modals when the page loads
window.addEventListener('load', function() {
    generateMembershipCardsAndModals();

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
