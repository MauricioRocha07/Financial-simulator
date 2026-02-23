import { calculateCompoundInterest } from "./calculator.js"; // Chamando a função

// Botão "Simular"
const calculateBtn = document.getElementById('calculateBtn');
const resultDisplay = document.getElementById('resultValue');

// Espera o click no botão
calculateBtn.addEventListener('click', () => {

    // Pega os numeros digitados pelo usuario
    const monthylyContribution = Number(document.getElementById('monthlyContribution').value);
    const interestRate = Number(document.getElementById('interestRate').value);
    const months = Number(document.getElementById('months').value);
    // O Number() para garantir que o JS entenda como numero

    const finalAmount = calculateCompoundInterest(monthylyContribution, interestRate, months);
    // Chama a função e guarda o resultado

    const formatteResult = finalAmount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    // Formata o numero para a moeda BRL

    resultDisplay.textContent = formatteResult;
    // Resultado formatado na tela
});