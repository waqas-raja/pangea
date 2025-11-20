let _customerDetail = [];
document.addEventListener("DOMContentLoaded", async () => {
    await loadCustomerDetail();
});

async function loadCustomerDetail() {
    const response = await fetch('/api/customer/' + customerId);
    const r = await response.json();
    _customerDetail = r.payload;
    loadDetail();
}

function loadDetail(d=null) {
    document.getElementById("spFirstName").innerText = _customerDetail.name ?? 'n.d.';
    document.getElementById("txtFirstName").value = _customerDetail.name ?? '';
    document.getElementById("spLastName").innerText = _customerDetail.surname ?? 'n.d.';
    document.getElementById("txtLastName").value = _customerDetail.surname ?? '';
    document.getElementById("spEmail").innerText = _customerDetail.email ?? 'n.d.';
    document.getElementById("txtEmail").value = _customerDetail.email ?? '';
    document.getElementById("spPhone").innerText = _customerDetail.phone ?? 'n.d.';
    document.getElementById("txtPhone").value = _customerDetail.phone ?? '';
    document.getElementById("ckIsCompany").checked = _customerDetail.bizname !== null;
    if(d === null) document.getElementById("ckIsCompany").disabled = true;
    if (_customerDetail.bizname !== null && _customerDetail.bizname !== '') document.getElementById('divCompanyFields').classList.remove("d-none");
    document.getElementById("spBizname").innerText = _customerDetail.bizname ?? 'n.d.';
    document.getElementById("txtBizname").value = _customerDetail.bizname ?? '';
    document.getElementById("spVat").innerText = _customerDetail.vat ?? 'n.d.';
    document.getElementById("txtVat").value = _customerDetail.vat ?? '';
    document.getElementById("spFiscal").innerText = _customerDetail.fiscal_code ?? 'n.d.';
    document.getElementById("txtFiscal").value = _customerDetail.fiscal_code ?? '';
    document.getElementById("spSdi").innerText = _customerDetail.sdi ?? 'n.d.';
    document.getElementById("txtSdi").value = _customerDetail.sdi ?? '';
    document.getElementById("spAddress").innerText = _customerDetail.address ?? 'n.d.';
    document.getElementById("txtAddress").value = _customerDetail.address ?? '';
    document.getElementById("spCity").innerText = _customerDetail.city ?? 'n.d.';
    document.getElementById("txtCity").value = _customerDetail.city ?? '';
    document.getElementById("spZip").innerText = _customerDetail.cap ?? 'n.d.';
    document.getElementById("txtZip").value = _customerDetail.cap ?? '';
    document.getElementById("spState").innerText = _customerDetail.nation ?? 'n.d.';
    document.getElementById("ddlState").value = _customerDetail.nation ?? '';
    document.getElementById("spNote").innerText = _customerDetail.note ?? 'n.d.';
    document.getElementById("txtNote").value = _customerDetail.note ?? '';
}

function toggleCompanyFields(el) {
    if (el.checked) {
        loadDetail(1);
        document.getElementById("divCompanyFields").style.pointerEvents = 'initial';
        document.getElementById("divCompanyFields").style.opacity = 1;
    } else {
        document.getElementById("txtBizname").value = '';
        document.getElementById("txtVat").value = '';
        document.getElementById("txtFiscal").value = '';
        document.getElementById("txtSdi").value = '';
        document.getElementById("divCompanyFields").style.pointerEvents = 'none';
        document.getElementById("divCompanyFields").style.opacity = 0.5;
    }
}

function allowEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.add('d-none'));
    editControls.forEach(editControl => editControl.classList.remove('d-none'));
    document.getElementById("ckIsCompany").disabled = false;
    document.getElementById("iconSaveEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.add('d-none');
}

function cancelEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.remove('d-none'));
    editControls.forEach(editControl => editControl.classList.add('d-none'));
    document.getElementById("ckIsCompany").disabled = true;
    document.getElementById("iconSaveEditGenericInfo").classList.add('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.add('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.remove('d-none');
    document.getElementById('errEditCustomer').innerHTML = '';
}

async function updateGenericInfo() {
    const btn = document.getElementById("iconSaveEditGenericInfo");
    btn.disabled = true;
    const name = document.getElementById("txtFirstName").value.trim();
    const surname = document.getElementById("txtLastName").value.trim();
    const email = document.getElementById("txtEmail").value.trim();
    const phone = document.getElementById("txtPhone").value.trim();
    const isCompany = document.getElementById("ckIsCompany").checked;
    const bizname = document.getElementById("txtBizname").value.trim();
    const vat = document.getElementById("txtVat").value.trim();
    const fiscal = document.getElementById("txtFiscal").value.trim();
    const sdi = document.getElementById("txtSdi").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const city = document.getElementById("txtCity").value.trim();
    const zip = document.getElementById("txtZip").value.trim();
    const state = document.getElementById("ddlState").value.trim();
    const note = document.getElementById("txtNote").value.trim();
    let err = document.getElementById('errEditCustomer');
    err.innerText = '';
    if (name === "" || surname === "" || email === "" || phone === "" || address === "" || city === "" || zip === "" || state === "") {
        btn.disabled = false;
        if (name === "") { err.textContent = "Il campo Nome è obbligatorio"; return; }
        if (surname === "") { err.textContent = "Il campo Cognome è obbligatorio"; return; }
        if (email === "") { err.textContent = "L'e-mail è obbligatoria"; return; }
        if (phone === "") { err.textContent = "È richiesto il telefono"; return; }
        if (address === "") { err.textContent = "L'indirizzo è obbligatorio"; return; }
        if (city === "") { err.textContent = "La città è obbligatoria"; return; }
        if (zip === "") { err.textContent = "Il codice postale è obbligatorio"; return; }
        if (state === "") { err.textContent = "Lo Stato è obbligatorio"; return; }
    }
    if (email !== "" && !isValidEmail(email)) {
        err.textContent = "L'email fornita non risulta valida";
        btn.disabled = false;
        return;
    }
    if (isCompany && (bizname === "" || vat === "")) {
        btn.disabled = false;
        if (bizname === "") { err.textContent = "Il nome aziendale è obbligatorio"; return; }
        if (vat === "") { err.textContent = "È richiesta l'Iva"; return; }
    }
    try {
        const response = await fetch("/api/customer/" + customerId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                bizname: isCompany ? bizname : null,
                vat: isCompany ? vat : null,
                fiscal: fiscal !== "" ? fiscal : null,
                sdi: sdi !== "" ? sdi : null,
                address: address,
                city: city,
                zip: zip,
                state: state,
                note: note
            })
        });
        const res = await response.json();
        btn.disabled = false;
        if (res.result) {
            await loadCustomerDetail();
            cancelEditGeneralInfo();
        } else err.innerText = "Si sono verificati degli errori";
    } catch (error) {
        err.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

async function deleteCustomerModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const response = await fetch("/api/customer/" + customerId, { method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    window.location = `/customers`;
                } else throw new Error("Error while deleting customer!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}

function showDeleteConfirmationModal(callback) {
    document.getElementById("deleteErrorMessage").innerHTML = '';
    const modalElement = document.getElementById("modalConfirmDelete");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const confirmButton = document.getElementById("btnConfirmDelete");
    confirmButton.removeEventListener("click", confirmButton.clickHandler);
    confirmButton.clickHandler = function (e) {
        e.stopPropagation();
        callback(true);
    };
    confirmButton.addEventListener("click", confirmButton.clickHandler);
}