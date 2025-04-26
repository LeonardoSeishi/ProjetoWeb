// Função de callback que será executada após o timeout
function callback() {
    console.log("Estou na função de callback");
}

// Execução principal
console.log("Iniciei");

// Agendando o callback para daqui a 5 segundos
setTimeout(callback, 5000);

console.log("Estou após o setTimeout");

/* 
Saída esperada no console (na ordem):
1. Iniciei a execução do programa
2. Estou após o setTimeout - o programa continua executando
[após ~5 segundos]
Estou na função de callback (executada após 5 segundos)
*/