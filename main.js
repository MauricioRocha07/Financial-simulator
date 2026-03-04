import { calculateCompoundInterest } from "./calculator.js"; // Chamando a função
import { fetchSelicRate } from "./api.js";

// Botão "Simular"
const calculateBtn = document.getElementById('calculateBtn');
const resultManual = document.getElementById('resultManual');
const resultSelic = document.getElementById('resultSelic');
const resultSavings = document.getElementById('resultSavings');
let myChart = null;

// Espera o click no botão
calculateBtn.addEventListener('click', async () => {

    // Pega os numeros digitados pelo usuario
    const monthlyContribution = Number(document.getElementById('monthlyContribution').value);
    const months = Number(document.getElementById('months').value);
    const manualRate = Number(document.getElementById('interestRate').value);
    // O Number() para garantir que o JS entenda como numero
    const errorMessage = document.getElementById('errorMessage');

    // Validação
    if (monthlyContribution <= 0 || months <= 0) {
        errorMessage.style.display = 'block';
        return; // impede o calculo de continuar
    } else {
        errorMessage.style.display = 'none'; // Esconder a mensagem caso esteja certa
    }

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

    // --- Inicio Bloco Grafico ---
    if (myChart) {
        myChart.destroy();
    }
    // Se já tiver um grafico e destroi antes de criar um novo

    const ctx = document.getElementById('myChart').getContext('2d');
    // Pega o elemento no HTML

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sua Simulação', 'Tesouro Selic', 'Poupança'],
            datasets: [{
                label: 'Valor Final Bruto',
                data: [finalManual, finalSelic, finalSavings],
                backgroundColor: [
                    'rgba(0, 210, 255, 0.7)',
                    'rgba(0, 234, 144, 0.7)',
                    'rgba(255, 71, 87, 0.7)'
                ],
                borderColor: [
                    '#00d2ff',
                    '#00ea90',
                    '#ff4757',
                ],
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display:false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#a0a0b0'},
                    grid: { color: '#3a3a55' }
                },
                x: {
                    ticks: { color: '#ffffff', font: {weight: 'bold' } },
                    grid: { display: false }
                }
            }
        }
    });

    // --- Fim Bloco Grafico ---
});

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    document.getElementById('monthlyContribution').value = '';
    document.getElementById('interestRate').value = '';
    document.getElementById('months').value = '';
    document.getElementById('errorMessage').style.display = 'none';

    resultManual.textContent = 'R$ 0,00';
    resultSelic.textContent = 'R$0,00';
    resultSavings.textContent = 'R$0,00';

    if (myChart) {
        myChart.destroy();
        myChart = null;
    }
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
