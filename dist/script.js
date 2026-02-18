const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const jobSearch = document.getElementById('jobSearch');
const modal = document.getElementById('detailModal');

// Toggle Sidebar
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.style.display = 'block';
});

// Close Sidebar/Modal
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    modal.classList.remove('active');
    overlay.style.display = 'none';
});

document.querySelector('.close').addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.style.display = 'none';
});

// Search Jobs
jobSearch.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.job-card');
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        card.style.display = title.includes(term) ? 'block' : 'none';
    });
});

// Show Job Details
document.getElementById('jobList').addEventListener('click', (e) => {
    const card = e.target.closest('.job-card');
    if (card) {
        document.getElementById('modalTitle').innerText = card.getAttribute('data-title');
        document.getElementById('modalCompany').innerText = card.getAttribute('data-company');
        document.getElementById('modalDesc').innerText = card.getAttribute('data-desc');
        document.getElementById('modalReq').innerText = card.getAttribute('data-req');
        document.getElementById('modalLoc').innerText = card.getAttribute('data-loc');
        
        modal.classList.add('active');
        overlay.style.display = 'block';
    }
});
