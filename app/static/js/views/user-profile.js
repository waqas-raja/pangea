let _id = null;
document.addEventListener("DOMContentLoaded", init);

async function init() {
    loadPersonalData();
}

async function loadPersonalData() {
    _id = localStorage.getItem('uid');
    try {
        const response = await fetch(`/api/user/${_id}`, { method: "GET" });
        const data = await response.json();
        if (data.payload.id !== null && data.payload.id !== undefined) {
            document.getElementById('txtName').value = data.payload.name || '';
            document.getElementById('txtSurname').value = data.payload.surname || '';
            document.getElementById('txtEmail').value = data.payload.email || '';
        } else showResult('resultPersonalData', 'Dati utente non trovati.', false);    
    } catch (error) {
        showResult('resultPersonalData', 'Dati utente non trovati.', false);
        console.error("Errore durante la chiamata:", error);
    }
}

function togglePassword(e) {
    e.classList.toggle("bi-eye");
    e.classList.toggle("bi-eye-slash");
    const type = e.previousElementSibling.type === "password" ? "text" : "password";
    e.previousElementSibling.type = type;
}


function showResult(spanId, message, isSuccess) {
    const resultSpan = document.getElementById(spanId);
    resultSpan.textContent = message;
    resultSpan.className = isSuccess ? 'text-success' : 'text-danger';
}

async function updatePersonalData() {
    const name = document.getElementById('txtName').value.trim();
    const surname = document.getElementById('txtSurname').value.trim();
    const email = document.getElementById('txtEmail').value.trim();
    if (!name || !surname || !email) {
        if (name === '') {
            showResult('resultPersonalData', 'Il nome utente è obbligatorio.', false);
            return;
        }
        if (surname === '') {
            showResult('resultPersonalData', 'Il cognome utente è obbligatorio.', false);
            return;
        }
        if (email === '') {
            showResult('resultPersonalData', 'Il e-mail utente è obbligatorio.', false);
            return;
        }
    }
    if (name !== '' && !isValidLetter(name)) {
        showResult('resultPersonalData', 'Nel campo nome sono accettate solo lettere.', false);
        return;
    }
    if (surname !== '' && !isValidLetter(surname)) {
        showResult('resultPersonalData', 'Nel campo cognome sono accettate solo lettere.', false);
        return;
    }
    if (email !== '' && !isValidEmail(email)) {
        showResult('resultPersonalData', 'L\'indirizzo email inserito non risulta valido.', false);
        return;
    }
    const btn = document.getElementById('btnUpdatePersonalData');
    btn.lastElementChild.classList.remove('d-none');
    btn.disabled = true;
    try {
        const response = await fetch(`api/user/profile/${_id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: name, surname: surname, email: email })
            }
        );
        const data = await response.json();
        if(data.result) showResult('resultPersonalData', 'Dati personali salvati con successo', true);
        else showResult('resultPersonalData', 'Si sono verificati degli errori durante il salvataggio', false);
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
    } catch (error) {
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        showResult('resultPersonalData', 'Si sono verificati degli errori durante la chiamata.', false);
        console.error("Errore durante la chiamata:", error);
    }
}

async function updatePassword() {
    const oldPsw = document.getElementById('txtOldPassword').value.trim();
    const newPsw = document.getElementById('txtNewPassword').value.trim();
    const confirmPsw = document.getElementById('txtConfirmPassword').value.trim();
    if (!oldPsw || !newPsw || !confirmPsw) {
        if (oldPsw === '') {
            showResult('resultChangePsw', 'È richiesta una vecchia password.', false);
            return;
        }
        if (newPsw === '') {
            showResult('resultChangePsw', 'È richiesta una nuova password.', false);
            return;
        }
        if (confirmPsw === '') {
            showResult('resultChangePsw', 'È richiesta la conferma della nuova password.', false);
            return;
        }
    }
    if (newPsw !== confirmPsw) {
        showResult('resultChangePsw', 'La nuova password e la conferma password non coincidono.', false);
        return;
    }
    if (newPsw.length < 8) {
        showResult('resultChangePsw', 'La nuova password deve essere di almeno 8 caratteri.', false);
        return;
    }
    const btn = document.getElementById('btnUpdatePassword');
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    try {
        const response = await fetch(`api/user/profile/psw/${_id}`,{
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ old_psw: oldPsw, new_psw: newPsw })
            }
        );
        const data = await response.json();
        if (data.result) {
            document.getElementById('txtOldPassword').value = '';
            document.getElementById('txtNewPassword').value = '';
            document.getElementById('txtConfirmPassword').value = '';
            showResult('resultChangePsw', 'Nuova password salvata con successo', true);
        }
        else showResult('resultChangePsw', data.message, false);
        btn.lastElementChild.classList.add('d-none');
        btn.disabled = false;
    } catch (error) {
        btn.lastElementChild.classList.add('d-none');
        btn.disabled = false;
        showResult('resultChangePsw', 'Si sono verificati degli errori durante la chiamata.', false);
        console.error("Errore durante la chiamata:", error);
    }
}
