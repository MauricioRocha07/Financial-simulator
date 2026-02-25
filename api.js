export async function fetchSelicRate() {    
    try {
        // Vai até o endereço e espera a resposta
        const response = await fetch ('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');

        // Transforma em JSON
        const data = await response.json();

        // Deixei aqui para lembrar como descobri o erro da selic diaria
        // O BC respondeu uma Array onde o dado estava na posição [0]
        // console.log("O BC respondeu isso:", data);

        // Resposta do endereço
        const currentSelic = Number(data[0].valor);

        // Dados prontos para usar
        return currentSelic;

    } catch (error) {
        // Caso o servidor esteja fora do ar
        console.error("Error fetching Selic:", error);
        return 0; // Para não quebrar o site
    }
}
