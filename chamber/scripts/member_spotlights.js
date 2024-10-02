    // JSON Data for Member Spotlights
    fetch('data/members.json')
      .then(response => response.json())
      .then(data => {
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
    });