// Telas e formulários principais
const signForm = document.getElementById("login-body");
const signupForm = document.getElementById("nova-conta");
const homeForm = document.getElementById("divHome");

// Elementos do formulário de login
const signBtn = document.getElementById("botaoLogin");
const signEmailTxtBox = document.getElementById("login-email");
const signPasswordTxtBox = document.getElementById("login-password");
const signKeepConnected = document.getElementById("manterConectado");
const signPasswordHideImg = document.getElementById("olho");

// Elementos do formulário de cadastro
const signupNome = document.getElementById("signup-nome");
const signupSobrenome = document.getElementById("signup-sobrenome");
const signupCPF = document.querySelector("input[onblur^='validarCPF']");
const signupEmail = document.querySelector("input[onblur^='validaEmail']");
const signupSenha = document.getElementById("signup-senha");
const signupRepitaSenha = document.getElementById("signup-repita-senha");
const areaBotaoConta = document.getElementById("areaBotaoConta");
const criarContaBtn = areaBotaoConta.querySelector("input[type='button']");

// Elementos de status dos campos do cadastro
const statusNome = document.getElementById('statusNome');
const statusSobrenome = document.getElementById('statusSobrenome');
const statusCPF = document.getElementById('statusCPF');
const statusEmail = document.getElementById('statusEmail');
const statusSenha = document.getElementById('statusSenha');
const statusRepitaSenha = document.getElementById('statusRepitaSenha');

const iconeOk = '<span style="color:green;vertical-align:middle;">&#10004;</span>';
const iconeErro = '<span style="color:red;vertical-align:middle;">&#10060;</span>';

// ====== Lógica de Login ======

function isEmailValid(email) {
    return String(email).split("@").length == 2;
}

function updateLoginForm() {
    if (signEmailTxtBox.value == "" || signPasswordTxtBox.value == "")
        signBtn.style.display = "none";
    else
        signBtn.style.display = "";
}

function clearInputs(localBaseSelector) {
    const types = "text password checkbox";
    const multiQuery = types.split(" ").map(x => `${localBaseSelector} input[type=${x}]`).join(",");
    const inputs = document.querySelectorAll(multiQuery);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].checked = false;
    }
}

function validateSign() {
    return (isEmailValid(signEmailTxtBox.value) && signPasswordTxtBox.value != "");
}

function sign() {
    let valid = validateSign();
    if (!valid) return;

    alert("Sucesso ao logar!");
    mostrarApenasHome();
}


class CPF {
    constructor(value) {
        this.value = value.replace(/\D/g, '');
        if (this.value.length !== 11) throw new Error("CPF deve ter 11 dígitos.");
        if (/^(\d)\1*$/.test(this.value)) throw new Error("CPF inválido: todos os dígitos iguais.");

        // Validação do primeiro dígito verificador
        let sumAux = 0;
        for (let i = 0; i < 9; i++) sumAux += parseInt(this.value.charAt(i)) * (10 - i);
        let restAux = (sumAux * 10) % 11;
        let dig1 = restAux === 10 ? 0 : restAux;
        if (dig1 !== parseInt(this.value.charAt(9))) throw new Error("CPF inválido: primeiro dígito verificador incorreto.");
        // Validação do segundo dígito verificador
        sumAux = 0;
        for (let i = 0; i < 10; i++) sumAux += parseInt(this.value.charAt(i)) * (11 - i);
        restAux = (sumAux * 10) % 11;
        let d2 = restAux === 10 ? 0 : restAux;
        if (d2 !== parseInt(this.value.charAt(10))) throw new Error("CPF inválido: segundo dígito verificador incorreto.");
    }
}

class Conta {
    constructor(nome, sobrenome, cpf, email, senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;       // objeto CPF já validado
        this.email = email;
        this.senha = senha;
    }
}

// ====== Funções de Validação dos Campos de Cadastro ======

function setBotaoConta(habilitado) {
    criarContaBtn.disabled = !habilitado;
    criarContaBtn.style.background = habilitado ? "#369" : "#888";
    criarContaBtn.style.cursor = habilitado ? "pointer" : "not-allowed";
}

function validaTextoEmBranco(campo, statusEl) {
    const el = document.getElementById(statusEl);
    let valor = campo.value.trim();
    if (valor === "") {
        el.innerHTML = `${iconeErro} Este campo não pode ficar vazio.`;
        el.style.color = "red";
    } else {
        el.innerHTML = `${iconeOk} Campo validado com sucesso.`;
        el.style.color = "green";
    }
    avaliarFormulario();
}

function validaEmail(campo, statusEl) {
    const el = document.getElementById(statusEl);
    let valor = campo.value.trim();
    let arrobas = valor.split("@").length - 1;
    if (valor === "") {
        el.innerHTML = `${iconeErro} E-mail não pode ficar vazio.`;
        el.style.color = "red";
    } else if (arrobas !== 1) {
        el.innerHTML = `${iconeErro} E-mail deve conter apenas um @.`;
        el.style.color = "red";
    } else {
        el.innerHTML = `${iconeOk} E-mail validado com sucesso.`;
        el.style.color = "green";
    }
    avaliarFormulario();
}

function validarCPF(campo, statusEl) {
    const el = document.getElementById(statusEl);

    try {
        let cpf = new CPF(campo.value);
        el.innerHTML = `${iconeOk} CPF válido.`;
        el.style.color = "green";
    } catch (e) {
        el.innerHTML = `${iconeErro} ${e.message}`;
        el.style.color = "red";
    }
    avaliarFormulario();
}

function validaRepitaSenha() {
    let senha = signupSenha.value;
    let repita = signupRepitaSenha.value;

    // Validação de senha
    if (!senha) {
        statusSenha.innerHTML = `${iconeErro} Senha não pode ser vazia.`;
        statusSenha.style.color = "red";
    } else {
        let nivel = nivelSenha(senha);
        statusSenha.innerHTML = `${iconeOk} Senha válida. Segurança: <b>${nivel}</b>`;
        statusSenha.style.color = "green";
    }

    // Validação repetição
    if (!repita) {
        statusRepitaSenha.innerHTML = `${iconeErro} Repita sua senha.`;
        statusRepitaSenha.style.color = "red";
    } else if (repita !== senha) {
        statusRepitaSenha.innerHTML = `${iconeErro} As senhas não coincidem.`;
        statusRepitaSenha.style.color = "red";
    } else {
        statusRepitaSenha.innerHTML = `${iconeOk} Senha repetida corretamente.`;
        statusRepitaSenha.style.color = "green";
    }

    avaliarFormulario();
}

function nivelSenha(senha) {
    let nivel = 0;
    if (senha.length >= 8) nivel++; //0
    if (/[A-Z]/.test(senha)) nivel++; //1
    if (/[a-z]/.test(senha)) nivel++; //2
    if (/[0-9]/.test(senha)) nivel++; //3
    if (/[^A-Za-z0-9]/.test(senha)) nivel++; //4

    const niveis = ["Muito fraca", "Fraca", "Media", "Forte", "Muito forte"];
    return niveis[Math.max(0, nivel-1)];
}

function avaliarFormulario() {
    let validos = true;

    if (statusCPF.style.color !== 'green') validos = false;
    if (!signupNome.value.trim() || statusNome.style.color !== 'green') validos = false;
    if (!signupEmail.value.trim() || statusEmail.style.color !== 'green') validos = false;
    if (!signupSobrenome.value.trim() || statusSobrenome.style.color !== 'green') validos = false;

    if (!signupSenha.value || !signupRepitaSenha.value) validos = false;
    if (statusSenha.style.color !== 'green' || statusRepitaSenha.style.color !== 'green') validos = false;

    setBotaoConta(validos);
}

function signup()
{
    const senha = signupSenha.value;
    const nome = signupNome.value.trim();
    const email = signupEmail.value.trim();
    const sobrenome = signupSobrenome.value.trim();
    
    let cpf;
    try { cpf = new CPF(signupCPF.value); } 
    catch (e) 
    {
        alert("Erro inesperado ao validar CPF. Por favor, revise os campos.");
        return;
    }

    const conta = new Conta(nome, sobrenome, cpf, email, senha);
    console.log(conta);
    alert("Conta criada com sucesso! Veja o console para detalhes do objeto.");
}

function mostrarApenasHome() {
    signForm.style.display = "none";
    signupForm.style.display = "none";
    homeForm.style.display = "";
}

function mostrarApenasLogin() {
    signForm.style.display = "";
    signupForm.style.display = "none";
    homeForm.style.display = "none";
    signBtn.style.display = "none";
    clearInputs("#login-body");
}

function mostrarApenasConta() {
    signForm.style.display = "none";
    signupForm.style.display = "";
    homeForm.style.display = "none";
    clearInputs("#nova-conta");
    setBotaoConta(false);
}

mostrarApenasHome();