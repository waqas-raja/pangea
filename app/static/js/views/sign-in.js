let _pin = '';
let _userId = '';
document.addEventListener("DOMContentLoaded", () => {
    enterToClick("#txtLoginEmail, #txtLoginPsw", "btnLogin");
    enterToClick("#txtRecoveryEmail", "btnRecovery");
});

function showForgotPassword() {
    document.getElementById('txtRecoveryEmail').value = '';
    document.getElementById('login-card').classList.add('d-none');
    document.getElementById('forgot-password-card').classList.remove('d-none');
    document.getElementById('txtRecoveryEmail').focus();
}

function showLogin() {
    document.getElementById('forgot-password-card').classList.add('d-none');
    document.getElementById('login-card').classList.remove('d-none');
    document.getElementById('txtLoginEmail').focus();
}

function togglePassword(el) {
    const txt = el.previousElementSibling;
    const icon = el.firstElementChild;
    if (txt.type === 'password') {
        txt.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        txt.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

async function signIn() {
    const email = document.getElementById('txtLoginEmail').value.trim();
    const psw = document.getElementById('txtLoginPsw').value.trim();
    const ip = await get_user_ip();
    const os = get_user_os();
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 1 : 0;
    const msg = document.getElementById('spLoginResult');
    msg.textContent = '';
    if (!email || !psw) {
        msg.textContent = 'Tutti i campi sono obbligatori.';
        msg.classList.add('text-danger');
        return;
    }
    if (!isValidEmail(email)) {
        msg.textContent = 'Inserisci un indirizzo email valido.';
        msg.classList.add('text-danger');
        return;
    }
    try {
        const response = await fetch('/api/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "psw": psw,
                "ip": ip,
                "mobile": mobile,
                "os": os
            })
        });
        if (!response.ok) throw new Error('Mancata risposta dal server api');
        const data = await response.json();
        localStorage.setItem("uid", data.id);
        localStorage.setItem("uname", data.name);
        localStorage.setItem("urole", data.role);
        window.location.href = '/properties';
    } catch (error) {
        msg.textContent = 'Credenziali non valide.';
        msg.classList.add('text-danger');
        console.error('Errore durante il login:', error);
    }
}

async function recoverPassword(btn) {
    const email = document.getElementById('txtRecoveryEmail').value.trim();
    const msg = document.getElementById('spRecoveryResult');
    msg.textContent = '';
    if (!email) {
        msg.textContent = 'Il campo email è obbligatorio.';
        msg.classList.add('text-danger');
        return;
    }
    if (!isValidEmail(email)) {
        msg.textContent = 'Inserisci un indirizzo email valido.';
        msg.classList.add('text-danger');
        return;
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    try {
        const response = await fetch('/api/reset-psw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
        });
        if (!response.ok) {
            const error = await response.json();
            msg.textContent = error.message || 'Recupero password fallito.';
            msg.classList.add('text-danger');
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            return;
        }
        const data = await response.json();
        if (data.result) {
            _pin = data.pin;
            _userId = data.userId;
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            document.getElementById('forgot-password-card').classList.add('d-none');
            document.getElementById('insert-pin-card').classList.remove('d-none');
            let timeLeft = 3 * 60;
            const timerEl = document.getElementById('timerCountdown');
            const timer = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerEl.textContent =
                    String(minutes).padStart(2, '0') + ':' +
                    String(seconds).padStart(2, '0');
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    _pin = '';
                    timerEl.textContent = 'Il tuo tempo è scaduto.';
                }
                timeLeft--;
            }, 1000);
        } else {
            msg.textContent = 'Email di recupero inviata con successo! Controlla la tua casella di posta.';
            msg.classList.remove('text-danger');
            msg.classList.add('text-success');
        }

    } catch (error) {
        msg.textContent = 'Si è verificato un errore. Riprova più tardi.';
        msg.classList.add('text-danger');
        console.error('Errore durante il recupero password:', error);
    }
}

function checkPin() {
    const inputPin = document.getElementById('txtSecretPin').value.trim();
    let result = document.getElementById('spPinResult');
    result.textContent = '';
    if (inputPin === '') {
        result.textContent = 'Il campo PIN è obbligatorio.';
        result.classList.add('text-danger');
        return;
    }
    if (_pin !== inputPin) {
        result.textContent = 'Il codice PIN non corrisponde.';
        result.classList.add('text-danger');
        return;
    }
    document.getElementById('insert-pin-card').classList.add('d-none');
    document.getElementById('change-password-card').classList.remove('d-none');
}

async function changePassword(btn) {
    const newPsw = document.getElementById('txtNewPsw').value.trim();
    const confNewPsw = document.getElementById('txtConfirmNewPsw').value.trim();
    let result = document.getElementById('spChangePswResult');
    result.textContent = '';
    result.classList.remove('text-danger');
    if (newPsw === '' || confNewPsw === '') {
        if (newPsw === '') result.textContent = 'Il campo nuova password è obbligatorio.';
        if (confNewPsw === '') result.textContent = 'Il campo conferma nuova password è obbligatorio.';
        result.classList.add('text-danger');
        return;
    }
    if (newPsw !== confNewPsw) {
        result.textContent = 'Le password non corrispondono.';
        result.classList.add('text-danger');
        return;
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    try {
        const response = await fetch('/api/reset-new-psw/' + _userId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPsw: newPsw }),
        });
        const data = await response.json();
        if (data.result) {
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            result.textContent = 'La nuova password è stata aggiornata con successo.';
            result.classList.add('text-success');
            setTimeout(() => {
                result.textContent = '';
                result.classList.remove('text-success');
                document.getElementById('change-password-card').classList.add('d-none');
                document.getElementById('login-card').classList.remove('d-none');
            }, 3000);
        } else throw new Error(`Si è verificato un errore durante l'aggiornamento della nuova password`);
    } catch (error) {
        result.textContent = error.message;
        result.classList.add('text-danger');
    }
}