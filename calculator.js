export function calculateCompoundInterest(monthlyContribution, interestRate, months) { // Para usar no main.js
    let totalAmount = 0; // O valor do patrimonio começa do 0

    // Precisa transformar o numero inteiro em numero decimal
    let decimalRate = interestRate / 100;

    // O for vai rodar mes a mes ate atingir o tempo total
    for (let currentMonth = 1; currentMonth <= months; currentMonth++) {
        // O dinheiro guardado rende os juros do mes
        totalAmount = totalAmount + (totalAmount * decimalRate);

        // O aporte mensal
        totalAmount = totalAmount + monthlyContribution;
    }

    // Roda todos os meses e devolve o valor total
    return totalAmount;
}