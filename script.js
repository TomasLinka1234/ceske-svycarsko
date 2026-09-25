document.addEventListener('DOMContentLoaded', () => {
    // 1. FILTROVÁNÍ LOKACÍ
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#attractions-container .card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. KALKULÁTOR
    const tripTypeSelect = document.getElementById('trip-type');
    const peopleSlider = document.getElementById('people-count');
    const peopleVal = document.getElementById('people-val');
    const totalPriceEl = document.getElementById('total-price');
    const calcForm = document.getElementById('calc-form');

    function updatePrice() {
        if (!tripTypeSelect || !peopleSlider || !totalPriceEl || !peopleVal) return;
        const pricePerPerson = parseInt(tripTypeSelect.value, 10);
        const count = parseInt(peopleSlider.value, 10);
        peopleVal.textContent = count.toString();
        totalPriceEl.textContent = (pricePerPerson * count).toLocaleString('cs-CZ');
    }

    if (tripTypeSelect && peopleSlider) {
        tripTypeSelect.addEventListener('change', updatePrice);
        peopleSlider.addEventListener('input', updatePrice);
        updatePrice();
    }

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Děkujeme! Vaše rezervace byla úspěšně zpracována.');
            calcForm.reset();
            updatePrice();
        });
    }

    // 3. CONTACT FORM
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Váš dotaz byl úspěšně odeslán. Budeme vás kontaktovat na uvedeném emailu.');
            contactForm.reset();
        });
    }
});

// 4. MODAL DIALOG CONTROLS (Globální funkce)
const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

function openModal(title, text) {
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.textContent = text;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}