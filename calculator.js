export function calculateCompoundInterest(monthlyContribution, interestRate, months) { // Para usar no main.js
    let totalAmount = 0; // O valor do patrimonio começa do 0

    // Precisa transformar o numero inteiro em numero decimal
    let decimalRate = interestRate / 100;

    let history = [] // Cria uma lista vazia para guardar historicos

    // O for vai rodar mes a mes ate atingir o tempo total
    for (let currentMonth = 1; currentMonth <= months; currentMonth++) {
        // Separamos o calculo do juros para anotar na tabela
        let interestEarned = totalAmount * decimalRate;
        // O dinheiro guardado rende os juros do mes
        totalAmount = totalAmount + interestEarned + monthlyContribution;

        // Empurra um objeto com os dados para a lista
        history.push({
            month: currentMonth,
            interestEarned: interestEarned,
            totalAmount: totalAmount
        });
    }

    // Roda todos os meses e devolve o valor total junto com a lista
    return {
        finalAmount: totalAmount,
        history: history
    };
}
