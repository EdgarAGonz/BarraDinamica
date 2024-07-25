let totalValue = 0; // Variable para acumular el valor ingresado
const maxValue = 100; // Puedes ajustar esta meta según tus necesidades

document.getElementById('inputValue').addEventListener('input', function() {
    const inputValue = parseFloat(this.value);
    
    if (!isNaN(inputValue)) {
        totalValue += inputValue;
        
        // Actualizar la barra de progreso
        const percentage = Math.min((totalValue / maxValue) * 100, 100);
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        progressBar.style.width = percentage + '%';
        progressText.textContent = `${totalValue} / ${maxValue} (${percentage.toFixed(2)}%)`;
        
        // Limpiar el campo de entrada después de procesar el valor
        this.value = '';
    }
});
