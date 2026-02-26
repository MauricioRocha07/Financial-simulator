import { calculateCompoundInterest } from "./calculator.js"; // Chamando a função
import { fetchSelicRate } from "./api.js";

// Botão "Simular"
const calculateBtn = document.getElementById('calculateBtn');
const resultManual = document.getElementById('resultManual');
const resultSelic = document.getElementById('resultSelic');
const resultSavings = document.getElementById('resultSavings');

// Espera o click no botão
calculateBtn.addEventListener('click', async () => {

    // Pega os numeros digitados pelo usuario
    const monthlyContribution = Number(document.getElementById('monthlyContribution').value);
    const months = Number(document.getElementById('months').value);
    const manualRate = Number(document.getElementById('interestRate').value);
    // O Number() para garantir que o JS entenda como numero

    const selicAnual = await fetchSelicRate();
    const selicMensal = (Math.pow(1 + selicAnual /100, 1 / 12) -1) * 100;
    // Busca a Selic

    const finalManual = calculateCompoundInterest(monthlyContribution, manualRate, months);
    const finalSelic = calculateCompoundInterest(monthlyContribution, selicMensal, months);
    const finalSavings = calculateCompoundInterest(monthlyContribution, 0.5, months);
    // Chama a função e guarda o resultado

    const formatCurrency = (value) => value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    // Formata o numero para a moeda BRL

    resultManual.textContent = formatCurrency(finalManual);
    resultSelic.textContent = formatCurrency(finalSelic);
    resultSavings.textContent = formatCurrency(finalSavings);
    // Resultado formatado na tela
});

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    document.getElementById('monthlyContribution').value = '';
    document.getElementById('interestRate').value = '';
    document.getElementById('months').value = '';

    resultManual.textContent = 'R$ 0,00';
    resultSelic.textContent = 'R$0,00';
    resultSavings.textContent = 'R$0,00';
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
