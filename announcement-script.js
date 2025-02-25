// Scroll to hackathons section when clicking announcement banner
function scrollToHackathons(event) {
    event.preventDefault();
    const hackathonsSection = document.getElementById('hackathons');
    hackathonsSection.scrollIntoView({ behavior: 'smooth' });
} 