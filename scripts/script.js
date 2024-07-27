let totalValue = 0;
const maxValue = 40000;
const messages = [
    "¡Estamos a punto de alcanzar la meta!",
    "¡Lo logramos! Gracias por tus donaciones"
];

const donationsPerPage = 5;
let currentPage = 1;
const donations = [];

document.getElementById('addDonation').addEventListener('click', function() {
    const donorName = document.getElementById('donorName').value.trim();
    const donationAmount = parseFloat(document.getElementById('donationAmount').value);

    if (donorName && !isNaN(donationAmount)) {
        totalValue += donationAmount;

        const percentage = Math.min((totalValue / maxValue) * 100, 100);
        document.getElementById('progressBar').style.height = percentage + '%';
        document.getElementById('progressText').textContent = `Q${totalValue.toFixed(2)} / Q${maxValue.toFixed(2)} (${percentage.toFixed(2)}%)`;

        donations.push({ donorName, donationAmount });
        updateTable();

        if (totalValue >= 35000 && !document.getElementById('message-35000')) {
            showMessage('¡Estamos a punto de alcanzar la meta!');
        }

        if (totalValue >= maxValue) {
            showConfetti();
            setTimeout(() => {
                showMessage('¡Lo logramos! Gracias por tus donaciones');
            }, 500);
        }

        document.getElementById('donorName').value = '';
        document.getElementById('donationAmount').value = '';
    }
});

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    if (currentPage < Math.ceil(donations.length / donationsPerPage)) {
        currentPage++;
        updateTable();
    }
});

function updateTable() {
    const donationsTable = document.querySelector('#donationsTable tbody');
    donationsTable.innerHTML = '';

    const start = (currentPage - 1) * donationsPerPage;
    const end = start + donationsPerPage;
    const currentDonations = donations.slice(start, end);

    currentDonations.forEach(donation => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${donation.donorName}</td><td>Q${donation.donationAmount.toFixed(2)}</td>`;
        donationsTable.appendChild(row);
    });

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === Math.ceil(donations.length / donationsPerPage);
}

function showMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.id = `message-${totalValue}`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.style.opacity = 1;
    }, 100);
}

function showConfetti() {
    const confetti = document.getElementById('confetti');
    confetti.style.display = 'block';

    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        confetti.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confetti.style.display = 'none';
    }, 5000);
}
