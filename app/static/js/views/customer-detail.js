document.addEventListener("DOMContentLoaded", async () => {
    await loadCustomerDetail();
});

async function loadCustomerDetail() {
    const response = await fetch('/api/customer/' + customerId);
    const r = await response.json();
    console.log(r);
    document.getElementById("spFirstName").innerText = r.payload.name ?? 'n.d.';
    document.getElementById("txtFirstName").value = r.payload.name ?? '';
    document.getElementById("spLastName").innerText = r.payload.surname ?? 'n.d.';
    document.getElementById("txtLastName").value = r.payload.surname ?? '';
    document.getElementById("spEmail").innerText = r.payload.email ?? 'n.d.';
    document.getElementById("txtEmail").value = r.payload.email ?? '';
    document.getElementById("spPhone").innerText = r.payload.phone ?? 'n.d.';
    document.getElementById("txtPhone").value = r.payload.phone ?? '';
    document.getElementById("ckIsCompany").checked = r.payload.bizname !== null;
    document.getElementById("ckIsCompany").disabled = true;
    if (r.payload.bizname !== null && r.payload.bizname !== '') document.getElementById('divCompanyFields').classList.remove("d-none");
    document.getElementById("spBizname").innerText = r.payload.bizname ?? 'n.d.';
    document.getElementById("txtBizname").value = r.payload.bizname ?? '';
    document.getElementById("spVat").innerText = r.payload.vat ?? 'n.d.';
    document.getElementById("txtVat").value = r.payload.vat ?? '';
    document.getElementById("spFiscal").innerText = r.payload.fiscal_code ?? 'n.d.';
    document.getElementById("txtFiscal").value = r.payload.fiscal_code ?? '';
    document.getElementById("spSdi").innerText = r.payload.sdi ?? 'n.d.';
    document.getElementById("txtSdi").value = r.payload.sdi ?? '';
    document.getElementById("spAddress").innerText = r.payload.address ?? 'n.d.';
    document.getElementById("txtAddress").value = r.payload.address ?? '';
    document.getElementById("spCity").innerText = r.payload.city ?? 'n.d.';
    document.getElementById("txtCity").value = r.payload.city ?? '';
    document.getElementById("spZip").innerText = r.payload.cap ?? 'n.d.';
    document.getElementById("txtZip").value = r.payload.cap ?? '';
    document.getElementById("spState").innerText = r.payload.nation ?? 'n.d.';
    document.getElementById("ddlState").value = r.payload.nation ?? '';
    document.getElementById("spNote").innerText = r.payload.note ?? 'n.d.';
    document.getElementById("txtNote").value = r.payload.note ?? '';
}

function toggleCompanyFields(el) {
    if (el.checked) document.getElementById("divCompanyFields").classList.remove("d-none");
    else document.getElementById("divCompanyFields").classList.add("d-none");
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
        err.textContent = "Si prega di compilare tutti i campi obbligatori";
        btn.disabled = false;
        return;
    }
    if (email !== "" && !isValidEmail(email)) {
        err.textContent = "L'email fornita non risulta valida";
        btn.disabled = false;
        return;
    }
    if (isCompany && (bizname === "" || vat === "")) {
        err.textContent = "Si prega di compilare tutti i campi obbligatori per le aziende";
        btn.disabled = false;
        return;
    }
    try {
        const response = await fetch("/api/customer/" + customerId, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                surname: surname,
                email:email,
                phone:phone,
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
                const response = await fetch("/api/customer/" + customerId, {method: "DELETE" });
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