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
});