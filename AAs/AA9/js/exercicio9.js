let i = 0;
const max = 10;

// Versão refatorada com async/await
async function pRefatorada() {
    while (i < max) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(i++);
    }
}

console.log("\n=== Versão Refatorada com Async/Await ===");

pRefatorada().then(() => console.log("Finalizado!"));