function obterRegiaoFiscalAtravesDoCPFInformado(cpfInformado) {
    //edite esta função!
    console.log(cpfInformado);

    let regions = [
        "DF, GO, MT, MS e TO",
        "AC, AP, AM, PA, RO e RR",
        "CE, MA e PI",
        "AL, PB, PE e RN",
        "BA e SE",
        "MG",
        "ES e RJ",
        "SP",
        "PR e SC",
        "RS"
    ]

    let regionDigit = parseInt(cpfInformado[cpfInformado.length-3]);
    if(regionDigit==0) regionDigit=9; else regionDigit--;
    console.log("Region Digit:", regionDigit);
    
    //----------------------------
    return regions[regionDigit];
}



function tratadorDeCliqueExercicio8() {
    let textCPF = document.getElementById("textCPF")
	let textRegiao = document.getElementById("regiaoFiscal")

    const regiaoFiscal = obterRegiaoFiscalAtravesDoCPFInformado(textCPF.value);
    textRegiao.textContent = "Região fiscal: "+regiaoFiscal
}
