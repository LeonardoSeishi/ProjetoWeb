function tratadorDeCliqueExercicio2() {
    // atualize esta função para
    // exibir um alerta com a hora 
    // atual no seguinte formato:
    // Horário: 8 PM : 40m : 28s
    console.log('adicionar código na função tratadorDeCliqueExercicio2() em ./js/exercicio2.js');

    let date = new Date();
    alert(`Horário: ${date.getHours()%12} ${date.getHours() > 12 ? "PM" : "AM"} : ${date.getMinutes()}m : ${date.getSeconds()}s`);
}