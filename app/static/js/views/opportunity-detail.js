document.addEventListener("DOMContentLoaded", async () => {
    await loadNations();
    await loadSources();
    await loadOpportunityStatus();
    await loadPropertyTypes();
    await loadOpportunityDetail();
});

async function loadOpportunityDetail() {
    const response = await fetch('/api/opportunity/' + opportunityId);
    const r = await response.json();
    document.getElementById("spAlias").innerText = r.payload.alias ?? 'n.d.';
    document.getElementById("spSource").innerText = r.payload.source_name ?? 'n.d.';
    document.getElementById("spPropertyType").innerText = r.payload.property_type_name ?? 'n.d.';
    document.getElementById("spSize").innerText = r.payload.size ?? 'n.d.';
    document.getElementById("spPropertyStatus").innerText = r.payload.opportunity_status_name ?? 'n.d.';
    document.getElementById("spPrice").innerText = formatNumber(parseInt(r.payload.price)) ?? formatNumber(0);
    document.getElementById("spTaxes").innerText = formatNumber(parseInt(r.payload.taxes)) ?? formatNumber(0);
    document.getElementById("spAddress").innerText = r.payload.address ?? 'n.d.';
    document.getElementById("spCity").innerText = r.payload.city ?? 'n.d.';
    document.getElementById("spState").innerText = r.payload.nation_name ?? 'n.d.';
    document.getElementById("spUrl").innerText = r.payload.url ?? 'n.d.';
    document.getElementById("spRefName").innerText = r.payload.reference_name ?? 'n.d.';
    document.getElementById("spRefSurname").innerText = r.payload.reference_surname ?? 'n.d.';
    document.getElementById("spRefEmail").innerText = r.payload.reference_email ?? 'n.d.';
    document.getElementById("spRefPhone").innerText = r.payload.reference_phone ?? 'n.d.';
    document.getElementById("spAcqPrice").innerText = formatNumber(parseInt(r.payload.acquisition_price !== null ? r.payload.acquisition_price : 0));
    document.getElementById("spProServices").innerText = r.payload.professional_services ?? 'n.d.';
    document.getElementById("spNote").innerText = r.payload.note ?? 'n.d.';

    document.getElementById("txtAlias").value = r.payload.alias ?? '';
    document.getElementById("ddlSource").value = r.payload.source;
    document.getElementById("ddlPropertyType").value = r.payload.property_type ?? '';
    document.getElementById("txtSize").value = r.payload.size ?? '';
    document.getElementById("ddlPropertyStatus").value = r.payload.opportunity_status ?? '';
    document.getElementById("txtPrice").value = r.payload.price ?? '';
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
    document.getElementById("ddlProServices").value = r.payload.professional_services ?? '';
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

async function loadOpportunityStatus() {
    const response = await fetch('/api/opportunity-status');
    const r = await response.json();
    let ctrl = document.getElementById("ddlPropertyStatus");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona lo stato della proprietà</option>';
    r.payload.forEach(type => {
        opt += `<option value="${type.id}">${type.name}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function updateGenericInfo() {
    const btn = document.getElementById("iconSaveEditGenericInfo");
    btn.disabled = true;
    let err = document.getElementById('errMessage');
    err.innerText = '';
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
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const proService = document.getElementById("ddlProServices").value;
    if (alias === '' || source === '' || propertyType === '' || opportunityStatus === '' || size === '' || price === '' || address === '' || city === '' || nation === '' || tax === '' || note === '') {
        err.innerText = "Si prega di compilare tutti i campi richiesti";
        btn.disabled = false;
        return;
    }
    if (refEmail !== "" && !isValidEmail(refEmail)) {
        err.textContent = "L'email fornita non risulta valida";
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
                professionalService: proService,
                note: note
            })
        });
        const res = await response.json();
        btn.disabled = false;
        if (res.result) {
            await loadOpportunityDetail();
            cancelEditGeneralInfo();
        } else err.innerText = "Si sono verificati degli errori";
    } catch (error) {
        err.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

async function deleteModal() {
    const div = `<div id="reasonDiv" class="mb-3">
                    <label for="txtDelReason" class="form-label">Reason</label>
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