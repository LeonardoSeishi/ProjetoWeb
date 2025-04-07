function tratadorDeCliqueExercicio4() {
    let valor = parseInt(prompt("Informe o numero"));
    if(valor >= 30 && valor <= 50) alert(`${valor} está no intervalo [30,50].`);
    else if (valor >= 60 && valor <= 100) alert(`${valor} está no intervalo [60,100].`);
    else alert("O número informado não está em nenhum dos dois intervalos.");
}