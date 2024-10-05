// JSON Data for Member Spotlights
const fetchMemberSpotlights = async () => {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    
    const spotlightContainer = document.getElementById('spotlightContainer');
    const qualifiedMembers = data.filter(member => member.membershipLevel >= 2); // Silver or Gold members
    const selectedMembers = [];

    // Select 2 random members to spotlight
    while (selectedMembers.length < 2) {
      const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
      if (!selectedMembers.includes(qualifiedMembers[randomIndex])) {
        selectedMembers.push(qualifiedMembers[randomIndex]);
      }
    }

    // Render selected members in the spotlight
    selectedMembers.forEach(member => {
      spotlightContainer.innerHTML += `
        <div class="member-card">
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}">Visit Website</a>
        </div>`;
    });
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
};

// Execute spotlight function on DOM load
document.addEventListener('DOMContentLoaded', fetchMemberSpotlights);
