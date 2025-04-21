function togglePasswordVisibility(passwordTxtBoxId, eyeImgId)
{
    const eye = document.getElementById(eyeImgId);
    const passwordTxtBox = document.getElementById(passwordTxtBoxId);
    let type = passwordTxtBox.getAttribute("type");
    
    passwordTxtBox.setAttribute("type", type=="password"?"text":"password");
    type = passwordTxtBox.getAttribute("type");
    eye.setAttribute("src", type=="password"? 
        "https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" :
        "https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-15-512.png"
    );
}