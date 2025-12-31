let _userId = 0;
document.addEventListener("DOMContentLoaded", () => {
    _userId = parseInt(localStorage.getItem('uid')) || 0;
    loadUserProfilePhoto();
    loadPersonalData();
});

async function loadUserProfilePhoto() {
    const preview = document.getElementById('previewProfilePhoto');
    preview.style.backgroundPosition = 'center';
    preview.style.backgroundSize = 'cover';
    const result = document.getElementById('profilePhotoResult');
    result.textContent = '';
    result.className = '';
    try {
        const response = await fetch("/api/user/user-profile/profile-photo");
        const r = await response.json();
        if (r.result) {
            preview.style.backgroundImage = `url('../../static/imgs/users/user_${_userId}/${_userId}_profile_photo.jpg')`;
            let div = document.createElement('div');
            div.id = 'iconDelProfilePhoto';
            div.classList.add('position-absolute', 'p-2', 'text-danger', 'rounded-2');
            div.style.cssText = `display: none; background-color: #ffffff99; right: 24px; top: 0;`;
            div.innerHTML = `<i class="bi bi-trash3"></i>`;
            div.addEventListener('click', function (event) {
                event.stopPropagation();
                deleteProfilePhoto();
            });
            preview.appendChild(div);
        } else preview.style.backgroundImage = `url('../../static/imgs/default-image.jpg')`;
    } catch (error) {
        showMessage(`Si è verificato un errore durante il caricamento della foto del profilo`, 'profilePhotoResult', 'text-danger');
    }
}

function previewProfilePhoto() {
    const file = document.getElementById('userProfilePhoto').files[0];
    const preview = document.getElementById('previewProfilePhoto');
    if (file && file.type.includes('image')) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            preview.style.backgroundImage = 'url(' + reader.result + ')';
            preview.style.display = 'block';
            preview.style.backgroundPosition = 'center';
            preview.style.backgroundSize = 'cover';
        }, false);
        reader.readAsDataURL(file);
        document.getElementById('btnUploadProfilePhoto').classList.remove('d-none');
    } else {
        showMessage(`L'anteprima della foto non è riuscita`, 'profilePhotoResult', 'text-danger');
        document.getElementById('btnUploadProfilePhoto').classList.add('d-none');
    }
}

async function uploadUserProfilePhoto(ele) {
    ele.lastElementChild.classList.remove('d-none');
    const file = document.getElementById('userProfilePhoto').files[0];
    const formData = new FormData();
    formData.append('profilePhoto', file);
    try {
        const response = await fetch("/api/user/upload-profile-photo", {
            method: "POST",
            body: formData
        });
        const res = await response.json();
        if (res.result) {
            ele.lastElementChild.classList.add('d-none');
            document.getElementById('btnUploadProfilePhoto').classList.add('d-none');
            const preview = document.getElementById('previewProfilePhoto');
            let div = document.createElement('div');
            div.id = 'iconDelProfilePhoto';
            div.classList.add('position-absolute', 'p-2', 'text-danger', 'rounded-2');
            div.style.cssText = `display: none; background-color: #ffffff99; right: 24px; top: 0;`;
            div.innerHTML = `<i class="bi bi-trash3"></i>`;
            div.addEventListener('click', function (event) {
                event.stopPropagation();
                deleteProfilePhoto();
            });
            preview.appendChild(div);
            showMessage(`Foto del profilo caricata con successo`, 'profilePhotoResult', 'text-success');
        } else throw new Error("Errore durante il caricamento dei documenti immobiliari.");
    } catch (error) {
        showMessage(error.message, 'profilePhotoResult', 'text-danger');
        ele.lastElementChild.classList.add('d-none');
    }
}

async function deleteProfilePhoto() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            const preview = document.getElementById('previewProfilePhoto');
            try {
                const response = await fetch("/api/user/user-profile/delete-profile-photo", { method: 'DELETE' });
                const r = await response.json();
                if (r.result) {
                    $("#modalConfirmDelete").modal('hide');
                    preview.innerHTML = '';
                    preview.style.backgroundImage = `url('../../static/imgs/default-image.jpg')`;
                    preview.style.backgroundPosition = 'center';
                    preview.style.backgroundSize = 'cover';
                    showMessage(`Foto del profilo eliminata con successo`, 'profilePhotoResult', 'text-success')
                } else throw new Error(`Errore durante l\'eliminazione della foto del profilo.`);
            } catch (error) {
                showMessage(error.message, 'profilePhotoResult', 'text-danger');
            }
        }
    });
}

async function loadPersonalData() {
    try {
        const response = await fetch(`/api/user/${_userId}`, { method: "GET" });
        const data = await response.json();
        if (data.payload.id !== null && data.payload.id !== undefined) {
            document.getElementById('txtName').value = data.payload.name || '';
            document.getElementById('txtSurname').value = data.payload.surname || '';
            document.getElementById('txtEmail').value = data.payload.email || '';
        } else showMessage('Dati utente non trovati.', 'resultPersonalData', 'text-danger');
    } catch (error) {
        showMessage('Dati utente non trovati.', 'resultPersonalData', 'text-danger');
        // console.error("Errore durante la chiamata:", error);
    }
}

function togglePassword(e) {
    e.classList.toggle("bi-eye");
    e.classList.toggle("bi-eye-slash");
    const type = e.previousElementSibling.type === "password" ? "text" : "password";
    e.previousElementSibling.type = type;
}

async function updatePersonalData() {
    const name = document.getElementById('txtName').value.trim();
    const surname = document.getElementById('txtSurname').value.trim();
    const email = document.getElementById('txtEmail').value.trim();
    if (!name || !surname || !email) {
        if (name === '') {
            showMessage('Il nome utente è obbligatorio.', 'resultPersonalData', 'text-danger');
            return;
        }
        if (surname === '') {
            showMessage('Il cognome utente è obbligatorio.', 'resultPersonalData', 'text-danger');
            return;
        }
        if (email === '') {
            showMessage('Il e-mail utente è obbligatorio.', 'resultPersonalData', 'text-danger');
            return;
        }
    }
    if (name !== '' && !isValidLetter(name)) {
        showMessage('Nel campo nome sono accettate solo lettere.', 'resultPersonalData', 'text-danger');
        return;
    }
    if (surname !== '' && !isValidLetter(surname)) {
        showMessage('Nel campo cognome sono accettate solo lettere.', 'resultPersonalData', 'text-danger');
        return;
    }
    if (email !== '' && !isValidEmail(email)) {
        showMessage('L\'indirizzo email inserito non risulta valido.', 'resultPersonalData', 'text-danger');
        return;
    }
    const btn = document.getElementById('btnUpdatePersonalData');
    btn.lastElementChild.classList.remove('d-none');
    btn.disabled = true;
    try {
        const response = await fetch(`api/user/profile/${_userId}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: name, surname: surname, email: email })
            }
        );
        const data = await response.json();
        if(data.result) showMessage('Dati personali salvati con successo', 'resultPersonalData', 'text-success');
        else showMessage('Si sono verificati degli errori durante il salvataggio', 'resultPersonalData', 'text-danger');
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
    } catch (error) {
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        showMessage('Si sono verificati degli errori durante la chiamata.', 'resultPersonalData', 'text-danger');
        console.error("Errore durante la chiamata:", error);
    }
}

async function updatePassword() {
    const oldPsw = document.getElementById('txtOldPassword').value.trim();
    const newPsw = document.getElementById('txtNewPassword').value.trim();
    const confirmPsw = document.getElementById('txtConfirmPassword').value.trim();
    if (!oldPsw || !newPsw || !confirmPsw) {
        if (oldPsw === '') {
            showMessage('È richiesta una vecchia password.', 'resultChangePsw', 'text-danger');
            return;
        }
        if (newPsw === '') {
            showMessage('È richiesta una nuova password.', 'resultChangePsw', 'text-danger');
            return;
        }
        if (confirmPsw === '') {
            showMessage('È richiesta la conferma della nuova password.', 'resultChangePsw', 'text-danger');
            return;
        }
    }
    if (newPsw !== confirmPsw) {
        showMessage('La nuova password e la conferma password non coincidono.', 'resultChangePsw', 'text-danger');
        return;
    }
    if (newPsw.length < 8) {
        showMessage('La nuova password deve essere di almeno 8 caratteri.', 'resultChangePsw', 'text-danger');
        return;
    }
    const btn = document.getElementById('btnUpdatePassword');
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    try {
        const response = await fetch(`api/user/profile/psw/${_userId}`,{
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
            showMessage('Nuova password salvata con successo.', 'resultChangePsw', 'text-success');
        }
        else showMessage(data.message, 'resultChangePsw', 'text-danger');
        btn.lastElementChild.classList.add('d-none');
        btn.disabled = false;
    } catch (error) {
        btn.lastElementChild.classList.add('d-none');
        btn.disabled = false;
        showMessage('Si sono verificati degli errori durante la chiamata.', 'resultChangePsw', 'text-danger');
        console.error("Errore durante la chiamata:", error);
    }
}