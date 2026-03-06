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

    const { finalAmount: finalManual, history: manualHistory } = calculateCompoundInterest(monthlyContribution, manualRate, months);
    // As chaves {} para abrir o pacote e extrair o que precisa
    const { finalAmount: finalSelic } = calculateCompoundInterest(monthlyContribution, selicMensal, months);
    const { finalAmount: finalSavings } = calculateCompoundInterest(monthlyContribution, 0.5, months);
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

// --- Inicio Bloco Tabela ---
const tableContainer = document.getElementById('tableContainer');
const tableBody = document.getElementById('tableBody');

// Limpeza de tabela
tableBody.innerHTML = '';

// Fazer a tabela aparecer na tela
tableContainer.style.display = 'block';

// O laço de repetição percorrendo o historico
manualHistory.forEach((item) => {
    // Cria uma linha virtual (tr)
    const row = document.createElement('tr');

    // Preenche as colunas na função de moeda (td)
    row.innerHTML = `
    <td>${item.month}</td>
    <td>${formatCurrency(item.interestEarned)}</td>
    <td style="color: #00ea90; font-weight: bold;">${formatCurrency(item.totalAmount)}</td>
    `;

    // Injeta a linha pronta
    tableBody.appendChild(row);
});
// --- Fim Bloco Tabela ---

// --- Inicio Bloco Gamificação ---
const gamificationContainer = document.getElementById('gamificationContainer');
const cardXP = document.getElementById('cardXP');
const cardDux = document.getElementById('cardDux');
const currentLevel = document.getElementById('currentLevel');

// Mostra a area
gamificationContainer.style.display = 'block';

// Reseta os cartões para trancado após uma nova simulação
cardXP.classList.add('locked');
cardDux.classList.add('locked');
currentLevel.textContent = "Iniciante";

// O que testa o valor final
if (finalManual >= 250000) {
    cardXP.classList.remove('locked');
    cardDux.classList.remove('locked');
    currentLevel.textContent = "Membro DUX";
    currentLevel.style.color = "#00d2ff";
} else if (finalManual >= 50000) {
    cardXP.classList.remove('locked');
    currentLevel.textContent = "Investidor XP";
    currentLevel.style.color = "#f1c40f";
}
// Se não antingiu o valor ele mantem o 'locked' ativo
// --- Fim Bloco Gamificação ---

});

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    document.getElementById('monthlyContribution').value = '';
    document.getElementById('interestRate').value = '';
    document.getElementById('months').value = '';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('tableContainer').style.display = 'none';
    document.getElementById('tableBody').innerHTML = '';
    document.getElementById('gamificationContainer').style.display = 'none';

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
