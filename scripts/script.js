let totalValue = 0;
const maxValue = 40000;
const messages = [
    "¡Vamos, estamos cerca!",
    "¡Cada donación cuenta!",
    "¡Sigamos así, juntos lo lograremos!",
    "¡Estamos a punto de alcanzar la meta!",
    "¡Lo logramos! Gracias por tus donaciones"
];

document.getElementById('addDonation').addEventListener('click', function() {
    const donorName = document.getElementById('donorName').value.trim();
    const donationAmount = parseFloat(document.getElementById('donationAmount').value);

    if (donorName && !isNaN(donationAmount)) {
        totalValue += donationAmount;

        const percentage = Math.min((totalValue / maxValue) * 100, 100);
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        progressBar.style.height = percentage + '%';
        progressText.textContent = `Q${totalValue} / Q${maxValue} (${percentage.toFixed(2)}%)`;

        const donationsList = document.getElementById('donationsList');
        const listItem = document.createElement('li');
        listItem.textContent = `${donorName} donó Q${donationAmount}`;
        donationsList.appendChild(listItem);

        document.getElementById('donorName').value = '';
        document.getElementById('donationAmount').value = '';

        checkSegments();

        if (totalValue >= maxValue) {
            showConfetti();
            setTimeout(() => {
                showMessage(messages[messages.length - 1]);
                alert('¡Lo logramos! Gracias por tus donaciones');
            }, 500);
        }
    }
});

function checkSegments() {
    const thresholds = [10000, 20000, 30000];
    thresholds.forEach((amount, index) => {
        if (totalValue >= amount && !document.getElementById(`message-${amount}`)) {
            showMessage(messages[index]);
            document.getElementById(`message-${amount}`);
        }
    });
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
