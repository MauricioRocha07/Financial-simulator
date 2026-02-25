import { calculateCompoundInterest } from "./calculator.js"; // Chamando a função
import { fetchSelicRate } from "./api.js";

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

    const formattedResult = finalAmount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    // Formata o numero para a moeda BRL

    resultDisplay.textContent = formattedResult;
    // Resultado formatado na tela
});

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    document.getElementById('monthlyContribution').value = '';
    document.getElementById('interestRate').value = '';
    document.getElementById('months').value = '';

    resultDisplay.textContent = 'R$ 0,00';
});

// Novo botão Selic
const selicBtn = document.getElementById('selicBtn');

selicBtn.addEventListener('click', async () => {
    // Feedback enquanto carrega os dados
    selicBtn.textContent = "Buscando no BC...";

    // Chama a função para pegar os dados
    const selicAnual = await fetchSelicRate();

    // Conversão da taxa Anua para Mensal
    const selicMensal = (Math.pow(1 + selicAnual / 100, 1 / 12) - 1) *100;
    // Math.pow nada mais é o do que a exponenciação, ex: Math.pow(base, expoente).

    // Devolve pro HTML com apenas 2 casas decimais
    document.getElementById('interestRate').value = selicMensal.toFixed(2);

    // Volta do texto pro botão
    selicBtn.textContent = "Puxar Selic Atual";
});
