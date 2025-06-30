let numeroSecreto = Math.floor(Math.random() * 10) + 1;

function adivinar() {
    const guess = parseInt(document.getElementById('guess').value);
    const resultado = document.getElementById('resultado');
    if (guess === numeroSecreto) {
        resultado.textContent = "¡Correcto! Adivinaste el número.";
    } else if (guess > numeroSecreto) {
        resultado.textContent = "Demasiado alto. Intenta de nuevo.";
    } else {
        resultado.textContent = "Demasiado bajo. Intenta de nuevo.";
    }
}
