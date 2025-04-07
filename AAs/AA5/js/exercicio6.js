function tratadorDeCliqueExercicio6() {
    let valor = prompt("Informe o texto");
    let inverted = "";
    for (let i = valor.length-1; i >= 0; i--) inverted += valor[i];

    alert(inverted);
}