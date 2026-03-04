# 📈 Financial Simulator: Do Zero ao DUX

Um simulador interativo de juros compostos focado em planejamento financeiro de longo prazo. 

Este projeto foi desenvolvido para consolidar conhecimentos práticos em **JavaScript Vanilla**, **Lógica de Programação**, **Arquitetura de Código** e **Consumo de APIs REST**.

## 🚀 Tecnologias e Práticas Utilizadas

* **HTML5 & CSS3:** Estruturação semântica e estilização moderna com interface responsiva.
* **JavaScript (ES6+):** Lógica matemática de juros compostos utilizando laços de repetição (`for`).
* **Consumo de API (Fetch/Async/Await):** Integração real com a API pública do Banco Central do Brasil (SGS) para capturar a taxa Selic anual atualizada e convertê-la matematicamente para a taxa mensal correspondente.
* **Análise Comparativa Dinâmica:** Implementação de lógica para renderização simultânea de múltiplos cenários de investimento (Taxa Personalizada, Tesouro Selic e Poupança). O JavaScript manipula o DOM de forma assíncrona para calcular e exibir os três resultados lado a lado, evidenciando o impacto dos juros compostos no longo prazo.
* **Tratamento de Erros:** Implementação de blocos `try/catch` para garantir a resiliência da aplicação caso o servidor do governo fique indisponível.
* **Modularização:** Separação de responsabilidades utilizando `import` e `export` para isolar regras de negócio (`calculator.js`) e requisições de rede (`api.js`) da manipulação de tela (`main.js`).
* **UI/UX e Visualização de Dados:** Refatoração da interface isolando a estrutura (HTML) da estilização (CSS) com design responsivo. Integração com a biblioteca Chart.js para renderizar gráficos de barras dinâmicos, proporcionando uma comparação visual clara entre os cenários de investimento.
* **Tratamento de Erros e Validação:** Implementação de *Inline Validation* com JavaScript para garantir a integridade dos cálculos. O sistema previne a execução de funções com dados vazios ou negativos, fornecendo feedback visual imediato e amigável ao usuário sem bloquear a interface (evitando o uso de `alert()`).

## ⚙️ Como funciona

O usuário insere três dados fundamentais:
1. **Aporte Mensal:** O valor investido todos os meses.
2. **Taxa de Juros:** A rentabilidade mensal esperada (podendo ser preenchida manualmente ou puxada automaticamente via Banco Central).
3. **Tempo:** O período da simulação em meses.

O sistema captura esses eventos via DOM, processa o cálculo de juros sobre juros mês a mês e retorna o valor final formatado nativamente para a moeda brasileira (BRL).

## 👨‍💻 Autor
Estudante de Análise e Desenvolvimento de Sistemas (ADS), em transição de carreira, apaixonado por resolver problemas de negócios através da tecnologia e automação.