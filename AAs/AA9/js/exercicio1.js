// Função calculadora que recebe a, b e uma função f
function calculadora(a, b, f) {
    return f(a, b);
}

// Função soma
function soma(a, b) {
    return a + b;
}

// Função subtrai
function subtrai(a, b) {
    return a - b;
}

// Chamadas da função calculadora com os parâmetros solicitados
console.log("Resultado 1:", calculadora(31, 12, soma));    // Deve retornar 43
console.log("Resultado 2:", calculadora(11, 25, subtrai)); // Deve retornar -14