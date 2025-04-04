function tratadorDeCliqueExercicio3() {

    const inputString = window.prompt("Insira uma String: ")

    if (inputString && inputString.length >= 2) {
        const resultado = inputString.slice(1,-1)
        alert(`String final: ${resultado}`)
    } else {
        alert('Número de caracteres insuficiente')
    }
}