// Versão do primeiro colega
const olaTchau = () => {
    console.log("Olá");
    setTimeout(() => console.log("Tchau"), 2000);
}

// Versão do segundo colega
const olaETchau = () => {
    setTimeout(() => console.log("Tchau"), 2000);
    console.log("Olá");
}

// Testando as duas versões
console.log("=== Testando a primeira versão ===");
olaTchau();

setTimeout(() => {
    console.log("\n=== Testando a segunda versão ===");
    olaETchau();
}, 3000);

/* 
Análise:
Ambas as versões estão corretas e produzem o mesmo resultado:
1. "Olá" é exibido imediatamente
2. "Tchau" é exibido após ~2 segundos

Isso acontece porque:
- O console.log("Olá") é síncrono e executa imediatamente
- O setTimeout() é assíncrono e não bloqueia a execução
- A ordem do setTimeout() e console.log() não importa nesse caso
- O importante é que o "Tchau" está dentro do setTimeout com 2000ms

Conclusão:
Os dois códigos funcionam igualmente bem para o requisito proposto.
*/