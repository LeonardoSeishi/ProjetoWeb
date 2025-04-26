function consoleAtrasadoCorrigido(mensagem, atraso) {
    setTimeout(() => console.log(mensagem), atraso);
}

console.log("\n=== TESTE DA VERSÃO CORRIGIDA ===");
console.log("Olá");
consoleAtrasadoCorrigido("Teste - versão corrigida", 2000);
console.log("Bye");