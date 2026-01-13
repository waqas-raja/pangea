document.addEventListener("DOMContentLoaded", async () => {
    await loadNations();
    await loadSources();
    await loadOpportunityStatus();
    await loadPropertyTypes();
    await loadPropertyStatus();
    await loadOpportunityDetail();
});

async function loadOpportunityDetail() {
    const response = await fetch('/api/opportunity/' + opportunityId);
    const r = await response.json();
    document.getElementById("spAlias").innerText = r.payload.alias ?? 'n.d.';
    document.getElementById("spSource").innerText = r.payload.source_name ?? 'n.d.';
    document.getElementById("spPropertyType").innerText = r.payload.property_type_name ?? 'n.d.';
    document.getElementById("spSize").innerText = r.payload.size ? formatNumber(parseFloat(r.payload.size)).slice(0, -2) : 'n.d.';
    document.getElementById("spOpportunityStatus").innerText = r.payload.opportunity_status_name ?? 'n.d.';
    document.getElementById("spPrice").innerText = formatNumber(parseInt(r.payload.price)) ?? formatNumber(0);
    document.getElementById("spTaxes").innerText = formatNumber(parseInt(r.payload.taxes)) ?? formatNumber(0);
    document.getElementById("spAddress").innerText = r.payload.address ?? 'n.d.';
    document.getElementById("spCity").innerText = r.payload.city ?? 'n.d.';
    document.getElementById("spState").innerText = r.payload.nation_name ?? 'n.d.';
    document.getElementById("spUrl").innerHTML = r.payload.url !== '' && r.payload.url !== null ? `<i class="bi bi-globe me-2"></i><a href="${r.payload.url}" alt="" target="_blank">${r.payload.url}<a/>` : 'n.d.';
    document.getElementById("spRefName").innerText = r.payload.reference_name ?? 'n.d.';
    document.getElementById("spRefSurname").innerText = r.payload.reference_surname ?? 'n.d.';
    document.getElementById("spRefEmail").innerText = r.payload.reference_email ?? 'n.d.';
    document.getElementById("spRefPhone").innerText = r.payload.reference_phone ?? 'n.d.';
    document.getElementById("spAcqPrice").innerText = formatNumber(parseInt(r.payload.acquisition_price !== null ? r.payload.acquisition_price : 0));
    document.getElementById("spEstimatedSellPrice").innerText = formatNumber(0);
    document.getElementById("spNote").innerText = r.payload.note ?? 'n.d.';

    document.getElementById("txtAlias").value = r.payload.alias ?? '';
    document.getElementById("ddlSource").value = r.payload.source;
    document.getElementById("ddlPropertyType").value = r.payload.property_type ?? '';
    document.getElementById("txtSize").value = r.payload.size ?? '';
    document.getElementById("ddlOpportunityStatus").value = r.payload.opportunity_status ?? '';
    document.getElementById("txtPrice").value = r.payload.price ?? '';
    document.getElementById("txtProjectProcessPrice").value = r.payload.price ?? '';
    document.getElementById("txtTaxes").value = r.payload.taxes ?? '';
    document.getElementById("txtAddress").value = r.payload.address ?? '';
    document.getElementById("txtCity").value = r.payload.city ?? '';
    document.getElementById("txtCity").value = r.payload.city ?? '';
    document.getElementById("ddlState").value = r.payload.nation ?? '';
    document.getElementById("txtUrl").value = r.payload.url ?? '';
    document.getElementById("txtRefName").value = r.payload.reference_name ?? '';
    document.getElementById("txtRefSurname").value = r.payload.reference_surname ?? '';
    document.getElementById("txtRefEmail").value = r.payload.reference_email ?? '';
    document.getElementById("txtRefPhone").value = r.payload.reference_phone ?? '';
    document.getElementById("txtAcqPrice").value = r.payload.acquisition_price ?? '';
    document.getElementById("txtEstimatedSellPrice").value = 0;
    document.getElementById("txtNote").value = r.payload.note ?? '';
}

function allowEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.add('d-none'));
    editControls.forEach(editControl => editControl.classList.remove('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.add('d-none');
}

function cancelEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.remove('d-none'));
    editControls.forEach(editControl => editControl.classList.add('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.add('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.add('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.remove('d-none');
    document.getElementById('errMessage').innerHTML = '';
}

async function loadSources() {
    const response = await fetch('/api/sources');
    const r = await response.json();
    let ctrl = document.getElementById("ddlSource");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona la fonte</option>';
    r.payload.forEach(source => {
        opt += `<option value="${source.id}">${source.name}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadNations() {
    const response = await fetch('/api/nations');
    const r = await response.json();
    let ctrl = document.getElementById("ddlState");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona la stato</option>';
    r.payload.forEach(nation => {
        opt += `<option value="${nation.code}">${nation.name}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadPropertyTypes() {
    const response = await fetch('/api/property-types');
    const r = await response.json();
    let ctrl = document.getElementById("ddlPropertyType");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona il tipo di proprietà</option>';
    r.payload.forEach(type => {
        opt += `<option value="${type.id}">${type.name}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadPropertyStatus() {
    const response = await fetch('/api/property-status');
    const r = await response.json();
    let ctrl = document.getElementById("ddlPropertyStatus");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(p => {
        opt += `<option value="${p.id}">${p.name}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadOpportunityStatus() {
    const response = await fetch('/api/opportunity-status');
    const r = await response.json();
    let ctrl = document.getElementById("ddlOpportunityStatus");
    ctrl.innerHTML = '';
    let opt = `<option value="" selected>Seleziona lo stato dell'opportunità</option>`;
    r.payload.forEach(type => {
        opt += `<option value="${type.id}">${type.name}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function updateGenericInfo() {
    const btn = document.getElementById("iconSaveEditGenericInfo");
    btn.disabled = true;
    let result = document.getElementById('errMessage');
    result.innerText = '';
    const alias = document.getElementById("txtAlias").value.trim();
    const source = document.getElementById("ddlSource").value;
    const propertyType = document.getElementById("ddlPropertyType").value;
    const opportunityStatus = document.getElementById("ddlPropertyStatus").value;
    const size = document.getElementById("txtSize").value.trim();
    const price = document.getElementById("txtPrice").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const city = document.getElementById("txtCity").value.trim();
    const nation = document.getElementById("ddlState").value;
    const tax = document.getElementById("txtTaxes").value.trim();
    const note = document.getElementById("txtNote").value.trim();
    const url = document.getElementById("txtUrl").value.trim();
    const refName = document.getElementById("txtRefName").value.trim();
    const refSurname = document.getElementById("txtRefSurname").value.trim();
    const refEmail = document.getElementById("txtRefEmail").value.trim();
    const refPhone = document.getElementById("txtRefPhone").value.trim();
    const propertyStatus = document.getElementById("ddlPropertyStatus").value;
    const floor = document.getElementById("txtFloor").value.trim();
    const room = parseInt(document.getElementById("txtRoom").value.trim());
    const bathroom = parseInt(document.getElementById("txtBathroom").value.trim());
    const garden = parseInt(document.getElementById("txtGarden").value.trim());
    const box = parseInt(document.getElementById("txtBox").value.trim());
    const elevator = document.getElementById("txtElevator").checked === true ? 1 : 0;
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const estimatedSellPrice = document.getElementById("txtEstimatedSellPrice").value.trim();
    if (alias === '' || source === '' || propertyType === '' || opportunityStatus === '' || size === '' || price === '' || address === '' || city === '' || nation === '' || tax === '' || note === '') {
        btn.disabled = false;
        if (alias === '') { result.innerText = "L'alias è obbligatorio"; return; }
        if (source === '') { result.innerText = "La fonte è obbligatoria"; return; }
        if (propertyType === '') { result.innerText = "Il tipo di proprietà è obbligatorio"; return; }
        if (size === '') { result.innerText = "La taglia è richiesta con un numero valido"; return; }
        if (address === '') { result.innerText = "L'indirizzo è obbligatorio"; return; }
        if (city === '') { result.innerText = "La città è obbligatoria"; return; }
        if (nation === '') { result.innerText = "Lo Stato è obbligatorio"; return; }
        if (opportunityStatus === '') { result.innerText = "È richiesto lo stato dell'opportunità"; return; }
        if (price === '') { result.innerText = "Il prezzo è richiesto con un numero valido"; return; }
        if (tax === '') { result.innerText = "La tassa è richiesta con un numero valido"; return; }
        if (note === '') { result.innerText = "La nota è obbligatoria"; return; }
    }
    if (refEmail !== "" && !isValidEmail(refEmail)) {
        result.textContent = "L'email fornita non risulta valida";
        btn.disabled = false;
        return;
    }
    if (refPhone !== "" && !isValidPhone(refPhone)) {
        result.textContent = "Il numero di telefono fornito non è valido.";
        btn.disabled = false;
        return;
    }
    try {
        const response = await fetch("/api/opportunity/" + opportunityId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                alias: alias,
                source: parseInt(source),
                propertyType: parseInt(propertyType),
                opportunityStatus: parseInt(opportunityStatus),
                size: size,
                price: parseInt(price),
                address: address,
                city: city,
                nation: nation,
                taxes: tax,
                url: url,
                referenceName: refName,
                referenceSurname: refSurname,
                referenceEmail: refEmail,
                referencePhone: refPhone,
                acqPrice: parseInt(acqPrice),
                note: note
            })
        });
        const res = await response.json();
        btn.disabled = false;
        if (res.result) {
            await loadOpportunityDetail();
            cancelEditGeneralInfo();
        } else result.innerText = "Si sono verificati degli errori";
    } catch (error) {
        result.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

function togglePageSections(t, el) {
    const sec = el.parentElement.previousElementSibling;
    if (t === 0) {
        sec.classList.add('d-none');
        document.getElementById('btnProjectProcess').classList.add('d-none');
        document.getElementById('iconAllowEditGenericInfo').classList.add('d-none');
        document.getElementById('btnBack').classList.remove('d-none');
        document.getElementById('opportunityDetailSec').classList.add('d-none');
        document.getElementById('projectProcessSec').classList.remove('d-none');
    } else {
        sec.classList.remove('d-none');
        document.getElementById('btnProjectProcess').classList.remove('d-none');
        document.getElementById('iconAllowEditGenericInfo').classList.remove('d-none');
        document.getElementById('btnBack').classList.add('d-none');
        document.getElementById('opportunityDetailSec').classList.remove('d-none');
        document.getElementById('projectProcessSec').classList.add('d-none');
    }
}

function startProjectProcess() {
    const price = document.getElementById('txtProjectProcessPrice').value.trim();
    const renCost = document.getElementById('txtProjectProcessRenCost').value.trim();
    const extCost = document.getElementById('txtProjectProcessExtraCost').value.trim();
    let result = document.getElementById('projectProcessResult');
    result.textContent = '';
    if (price === '' || renCost === '' || extCost === '') {
        result.classList.add('text-danger');
        if (price === '') {
            result.textContent = 'Il prezzo di acquisto è obbligatorio';
            return;
        }
        if (renCost === '') {
            result.textContent = 'Sono richiesti costi di ristrutturazione';
            return;
        }
        if (extCost === '') {
            result.textContent = 'È richiesto un costo aggiuntivo';
            return;
        }
    }
    if ((price !== '' && !isValidateNumber(parseInt(price))) || parseInt(price) < 1) {
        result.classList.add('text-danger');
        result.textContent = 'Il prezzo di acquisto non è un numero valido';
        return;
    }
    if ((renCost !== '' && !isValidateNumber(parseInt(renCost))) || parseInt(renCost) < 0) {
        result.classList.add('text-danger');
        result.textContent = 'Il costo della ristrutturazione non è un numero valido';
        return;
    }
    if ((extCost !== '' && !isValidateNumber(parseInt(extCost))) || parseInt(extCost) < 0) {
        result.classList.add('text-danger');
        result.textContent = 'Un costo aggiuntivo non è un numero valido';
        return;
    }
    const newPrice = parseInt(price) + parseInt(renCost) + parseInt(extCost);
    document.getElementById('spAcqPrice').textContent = formatNumber(newPrice);
    document.getElementById('txtAcqPrice').value = newPrice;
    document.getElementById('btnBack').click();
    
}

async function deleteModal() {
    const div = `<div id="reasonDiv" class="mb-3">
                    <label for="txtDelReason" class="form-label">Spiega la tua motivazione</label>
                    <textarea class="form-control" id="txtDelReason" rows="3"></textarea>
                </div>`;
    const targetElement = document.querySelector('#deleteErrorMessage');
    if (targetElement) targetElement.insertAdjacentHTML('beforebegin', div);
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            let err = document.getElementById('deleteErrorMessage');
            err.innerHTML = '';
            const reason = document.getElementById('txtDelReason').value.trim();
            if (reason === "") {
                err.innerText = "Si prega di compilare tutti i campi richiesti";
                return;
            }
            try {
                const response = await fetch("/api/opportunity/" + opportunityId + "/mark-delete", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ reason: reason })
                });
                const res = await response.json();
                if (res.result) {
                    document.getElementById('reasonDiv').remove();
                    $("#modalConfirmDelete").modal('hide');
                    window.location = `/opportunities`;
                } else throw new Error("Error while deleting opportunity!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}