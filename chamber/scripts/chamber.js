document.addEventListener('DOMContentLoaded', async () => {
    const membersContainer = document.getElementById('members');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
  
    // Fetch members data
    const fetchMembers = async () => {
      try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to fetch members');
        const members = await response.json();
        return members;
      } catch (error) {
        console.error(error);
        membersContainer.innerHTML = '<p>Could not load member data. Please try again later.</p>';
      }
    };
  
    // Function to render member cards
    const renderMembers = (members, view) => {
      membersContainer.innerHTML = ''; // Clear current members
      membersContainer.className = view; // Apply grid or list class
  
      members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
  
        // Create image element
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', member.image);
        imgElement.setAttribute('alt', member.name);
        imgElement.setAttribute('width', '200');
        imgElement.setAttribute('height', '150');
        imgElement.setAttribute('loading', 'lazy');
        imgElement.classList.add('center-image'); // Add class to center the image
  
        // Append the rest of the member info
        memberCard.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Member'}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p>${member.description}</p>
        `;
  
        // Append the image at the top of the card
        memberCard.insertBefore(imgElement, memberCard.firstChild);
  
        membersContainer.appendChild(memberCard);
      });
    };
  
    // Initial render in grid view
    const members = await fetchMembers();
    if (members) renderMembers(members, 'grid-view');
  
    // Toggle between grid and list view
    if (gridViewBtn && listViewBtn) {
      gridViewBtn.addEventListener('click', () => renderMembers(members, 'grid-view'));
      listViewBtn.addEventListener('click', () => renderMembers(members, 'list-view'));
    }
  });
  