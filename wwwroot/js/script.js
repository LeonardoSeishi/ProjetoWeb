document.addEventListener("DOMContentLoaded", async ()=>{

    const btnRun = document.getElementById('run-btn');
    const btnClear = document.getElementById('clear-btn');
    const txtCode = document.getElementById('csharp-code');
    const txtResult = document.getElementById('output-content'); 

    async function onRunCode(){
        txtCode.disabled = true;
        btnRun.disabled = true;
        btnClear.disabled = true;

        let code = txtCode.value;
        let request = await fetch('/RunCode', 
            {   
                method: "POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },    
                body: new URLSearchParams({
                    'code': code,
                })
            }
        );

        let result = await request.text();
        txtResult.textContent = result;

        txtCode.disabled = false;
        btnRun.disabled = false;
        btnClear.disabled = false;
    }

    async function clearCode(){
        txtCode.textContent = '';
    }

    async function addEvents(){
        btnRun.addEventListener('click', onRunCode);
        btnClear.addEventListener('click', clearCode);
    }

    await addEvents();

    const userEmail = localStorage.getItem("userEmail");

    async function loadCode() {
        if (!userEmail) return;

        try {
            const response = await fetch(`/user/load-code?email=${encodeURIComponent(userEmail)}`);
            const code = await response.text();
            if (typeof txtCode !== 'undefined' && code != null && code != undefined && code != '') {
                txtCode.value = code;
            }
        } catch (err) {
            console.error("Erro ao carregar o código:", err);
        }
    }

    async function saveCode() {
        if (!userEmail || typeof txtCode === 'undefined') return;

        try {
            await fetch("/user/save-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, code: txtCode.value })
            });
            console.log("Código salvo automaticamente");
        } catch (err) {
            console.error("Erro ao salvar o código:", err);
        }
    }

    // Inicia o carregamento e salvamento periódico
    window.addEventListener("DOMContentLoaded", () => {
        saveCode();
        loadCode();
        setInterval(saveCode, 5000); // salva a cada 5s
    });

});