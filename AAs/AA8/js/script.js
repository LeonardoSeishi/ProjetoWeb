const signForm = document.getElementById("login-body");
const signupForm = document.getElementById("nova-conta");
const homeForm = document.getElementById("divHome");

const signBtn = document.getElementById("botaoLogin");
const signEmailTxtBox = document.getElementById("login-email");
const signPasswordTxtBox = document.getElementById("login-password");
const signKeepConnected = document.getElementById("manterConectado");
const signPasswordHideImg = document.getElementById("olho");

function isEmailValid(email)
{
    return String(email).split("@").length == 2;
}

function updateSignHidePasswordEye()
{
    const type = signPasswordTxtBox.getAttribute("type");
    signPasswordHideImg.setAttribute("src", type=="password"? 
        "https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" :
        "https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-15-512.png"
    );
}

function toggleSignPasswordVisibility(e)
{
    const target = e.target;
    const type = signPasswordTxtBox.getAttribute("type");
    signPasswordTxtBox.setAttribute("type", type=="password"?"text":"password");
    updateSignHidePasswordEye();
}

function clearInputs(localBaseSelector)
{
    const types = "text password checkbox";
    const multiQuery = types.split(" ").map(x=>`${localBaseSelector} input[type=${x}]`).join(",");
    const inputs = document.querySelectorAll(multiQuery);
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
        inputs[i].checked = false;
    }
}

function mostrarApenasHome()
{
    signForm.style.display = "none";
    signupForm.style.display = "none";
    homeForm.style.display = "";
}

function mostrarApenasLogin()
{
    signForm.style.display = "";
    signupForm.style.display = "none";
    homeForm.style.display = "none";
    signBtn.style.display = "none";
    clearInputs("#login-body");
}

function mostrarApenasConta()
{
    signForm.style.display = "none";
    signupForm.style.display = "";
    homeForm.style.display = "none";
    clearInputs("#nova-conta");
}