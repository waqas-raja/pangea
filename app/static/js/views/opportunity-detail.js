const documentCheckList = {
    "1": {
        "sale": [
            "ID document",
            "Tax code",
            "Marital status (including property regime, if applicable)",
            "Deed of ownership(sale deed, inheritance, donation)",
            "Updated cadastral extract",
            "Compliant cadastral floor plan",
            "Building permit / license",
            "Any amnesty or regularization documents",
            "Certificate of occupancy",
            "EPC(Energy Performance Certificate)",
            "Utility systems compliance certificates",
            "Urban and cadastral compliance verification",
            "Any mortgages, foreclosures, or legal restrictions",
            "Condominium regulations",
            "Latest assembly meeting minutes",
            "Statement of paid condominium fees",
            "Administrator’s certification"
        ],
        "purchase": [
            "ID document and tax code",
            "Preliminary agreement (if available)",
            "All seller’s documents",
            "Mortgage documentation (if applicable)",
            "Preliminary notarial report",
            "EPC"
        ],
        "rent": {
            "Owner": [
                "ID document",
                "Tax code",
                "Proof of ownership",
                "EPC"
            ],
            "Tenant": [
                "ID document",
                "Tax code",
                "Lease contract",
                "Lease registration (Tax Authority)",
                "Optional flat tax regime (cedolare secca)",
            ]
        },
    },
    "2": {
        "sale": [
            "ID document and tax code",
            "Deed of ownership",
            "Cadastral extract",
            "Cadastral map",
            "Urban Planning Certificate (CDU – mandatory)",
            "Any landscape or hydrogeological restrictions",
            "Any easements"
        ],
        "purchase": [
            "ID document and tax code",
            "CDU",
            "Cadastral extract and map",
            "Deed of ownership",
            "Urban planning and restrictions verification"
        ],
        "rent": [
            "ID documents of owner and tenant",
            "Deed of ownership",
            "Cadastral extract",
            "Registered lease agreement",
            "Declared agricultural or commercial use (if applicable)"
        ],
    },
    "3": {
        "sale": [
            "ID document and tax code",
            "Deed of ownership",
            "Cadastral extract",
            "Cadastral floor plan",
            "Building permit",
            "Certificate of occupancy",
            "EPC",
            "Utility systems compliance certificates",
            "Any legal restrictions or mortgages",
            "Condominium regulations (if applicable)"],
        "purchase": [
            "ID document and tax code",
            "All seller’s documents",
            "Preliminary agreement (if available)",
            "Mortgage documentation (if applicable)",
            "EPC"
        ],
        "rent": [
            "ID documents of owner and tenant",
            "Deed of ownership",
            "Cadastral extract and floor plan",
            "EPC",
            "Utility systems certifications",
            "Commercial lease contract",
            "Lease registration (Tax Authority)",
            "Business authorization (SCIA), if required"
        ],
    },
};
const propertyCategories = [
    {
        id: 1,
        name: "Retail Spaces",
        children: [
            { id: 101, name: "Shops" },
            { id: 102, name: "Retail Units" },
            { id: 103, name: "Showrooms" },
            { id: 104, name: "Kiosks" },
            { id: 105, name: "Street-Level Stores" },
            { id: 106, name: "Shopping Mall Units" }
        ]
    },
    {
        id: 2,
        name: "Offices",
        children: [
            { id: 201, name: "Executive Offices" },
            { id: 202, name: "Professional Studios" },
            { id: 203, name: "Coworking Spaces" },
            { id: 204, name: "Business Centers" }
        ]
    },
    {
        id: 3,
        name: "Industrial Properties",
        children: [
            { id: 301, name: "Warehouses" },
            { id: 302, name: "Industrial Units" },
            { id: 303, name: "Manufacturing Facilities" },
            { id: 304, name: "Workshops" },
            { id: 305, name: "Logistics Centers" }
        ]
    },
    {
        id: 4,
        name: "Storage & Logistics",
        children: [
            { id: 401, name: "Storage Units" },
            { id: 402, name: "Deposits" },
            { id: 403, name: "Distribution Hubs" },
            { id: 404, name: "Commercial Garages" }
        ]
    },
    {
        id: 5,
        name: "Food & Hospitality",
        children: [
            { id: 501, name: "Restaurants" },
            { id: 502, name: "Bars & Cafés" },
            { id: 503, name: "Pizzerias" },
            { id: 504, name: "Pubs" },
            { id: 505, name: "Catering Facilities" }
        ]
    },
    {
        id: 6,
        name: "Hospitality Properties",
        children: [
            { id: 601, name: "Hotels" },
            { id: 602, name: "Motels" },
            { id: 603, name: "Bed & Breakfasts" },
            { id: 604, name: "Hostels" },
            { id: 605, name: "Agritourism Properties" },
            { id: 606, name: "Holiday Rentals (Commercial Use)" }
        ]
    },
    {
        id: 7,
        name: "Service Properties",
        children: [
            { id: 701, name: "Medical Clinics" },
            { id: 702, name: "Pharmacies" },
            { id: 703, name: "Gyms & Fitness Centers" },
            { id: 704, name: "Beauty Centers" },
            { id: 705, name: "Private Schools" },
            { id: 706, name: "Training Centers" }
        ]
    },
    {
        id: 8,
        name: "Parking & Ancillary Spaces",
        children: [
            { id: 801, name: "Garages" },
            { id: 802, name: "Parking Spaces" },
            { id: 803, name: "Commercial Parking Lots" }
        ]
    },
    {
        id: 9,
        name: "Land & Development",
        children: [
            { id: 901, name: "Commercial Land" },
            { id: 902, name: "Industrial Land" },
            { id: 903, name: "Development Plots" },
            { id: 904, name: "Exhibition Areas" }
        ]
    },
    {
        id: 10,
        name: "Investment Properties",
        children: [
            { id: 1001, name: "Income-Producing Properties" },
            { id: 1002, name: "Rented Commercial Units" },
            { id: 1003, name: "Entire Commercial Buildings" },
            { id: 1004, name: "Property Portfolios" }
        ]
    }
];

const STORAGE_KEY = "development_project_data";
const PROJECT_PROFILE_KEY = "development_project_profile_data";
const PROJECT_NOTE_KEY = "development_project_note_data";
document.addEventListener("DOMContentLoaded", async () => {
    await loadNations();
    await loadSources();
    await loadOpportunityStatus();
    await loadPropertyTypes();
    await loadPropertyStatus();
    initHtmlEditor('txtNote');
    initHtmlEditor('txtProjectNote');
    await loadOpportunityDetail();
    loadChecklistDocuments();
    loadPropertyValuationDocuments();
    loadMap();
    renderProjectProfileList();
    renderTasks();
    renderProjectNotesList();

    document.getElementById("txtAddress").addEventListener("focusout", loadMap);
    document.getElementById("txtCity").addEventListener("focusout", loadMap);
    document.getElementById("ddlState").addEventListener("change", loadMap);
    document.querySelectorAll('input[name="rbPropertyType"]').forEach(radio => {
        radio.addEventListener("change", loadChecklistDocuments);
    });
    document.getElementById("ddlCommercialPropertyCats").addEventListener("change", function (e) {
        if (e.currentTarget.value !== '') {
            let ctrl = document.getElementById("ddlCommercialPropertySubCats");
            ctrl.innerHTML = '';
            let opt = '<option value="" selected>Seleziona</option>';
            const subCats = propertyCategories.find(cat => cat.id.toString() === e.currentTarget.value).children;
            subCats.forEach(subCat => {
                opt += `<option value="${subCat.id}">${subCat.name}</option>`;
            });
            ctrl.innerHTML = opt;
            document.getElementById('commercialPropertySubCats').classList.remove('d-none');
        } else document.getElementById('commercialPropertySubCats').classList.add('d-none');
    });
    document.getElementById("ddlCommercialPropertySubCats").addEventListener("change", loadChecklistDocuments);
    document.querySelectorAll('input[name="rbTransectionType"]').forEach(radio => {
        radio.addEventListener("change", loadChecklistDocuments);
    });
});

function loadChecklistDocuments() {
    const propertyType = document.querySelector('input[name="rbPropertyType"]:checked').value;
    const transectionType = document.querySelector('input[name="rbTransectionType"]:checked').value;
    const c = document.getElementById('ddlCommercialPropertyCats').value;
    const sc = document.getElementById('ddlCommercialPropertySubCats').value;
    if (propertyType === '3' && sc === '') {
        let ctrl = document.getElementById("ddlCommercialPropertyCats");
        ctrl.innerHTML = '';
        let opt = '<option value="" selected>Seleziona</option>';
        propertyCategories.forEach(cat => {
            opt += `<option value="${cat.id}">${cat.name}</option>`;
        });
        ctrl.innerHTML = opt;
        document.getElementById('commercialPropertyCats').classList.remove('d-none');
    } else if (propertyType !== '3') {
        document.getElementById('ddlCommercialPropertyCats').value = '';
        document.getElementById('commercialPropertyCats').classList.add('d-none');
        document.getElementById('ddlCommercialPropertySubCats').value = '';
        document.getElementById('commercialPropertySubCats').classList.add('d-none');
    }
    const arr = documentCheckList[propertyType][transectionType];
    let grid = document.getElementById('documentChecklistGrid');
    grid.innerHTML = '';
    if (propertyType === '3' && (c === '' || sc === '')) {
        grid.innerHTML = '<div class="w-100 text-black-50 text-center"><em>Seleziona una sottocategoria commerciale per visualizzare l\'elenco dei documenti richiesti.</em></div>';
        return;
    }
    let str = '';
    if (Array.isArray(arr)) {
        arr.forEach(name => {
            str += `<div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${name}">
                                <label class="form-check-label">
                                    ${name}
                                </label>
                            </div>
                        </div>`;
        });
    } else {
        Object.keys(arr).forEach(role => {
            str += `<div class="col-12 col-sm-12 col-lg-12 mb-2">
                        <div class="pai-title">${role}</div>
                    </div>`;
            arr[role].forEach(name => {
                str += `<div class="col-12 col-sm-6 col-md-6 col-lg-6 mb-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${name}">
                                <label class="form-check-label">
                                    ${name}
                                </label>
                            </div>
                        </div>`;
            });
        });
    }
    grid.innerHTML = str;
}

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
    document.getElementById("spNote").innerHTML = r.payload.note ?? 'n.d.';
    document.getElementById("spEstimatedProcessingTime").innerHTML = 'n.d.';
    document.getElementById("spProcessingTime").innerHTML = 'n.d.';

    document.getElementById("txtAlias").value = r.payload.alias ?? '';
    document.getElementById("ddlSource").value = r.payload.source;
    document.getElementById("ddlPropertyType").value = r.payload.property_type ?? '';
    document.getElementById("txtSize").value = r.payload.size ?? '';
    document.getElementById("ddlOpportunityStatus").value = r.payload.opportunity_status ?? '';
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
    document.getElementById("txtEstimatedSellPrice").value = 0;
    $("#txtNote").dxHtmlEditor('instance').option('value', r.payload.note ?? '');
    document.getElementById("txtNote").value = r.payload.note ?? '';
}

function allowEditGeneralInfo(btn) {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.add('d-none'));
    editControls.forEach(editControl => editControl.classList.remove('d-none'));
    btn.classList.add('d-none');
    btn.nextElementSibling.classList.remove('d-none');
}

function cancelEditGeneralInfo(btn) {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.remove('d-none'));
    editControls.forEach(editControl => editControl.classList.add('d-none'));
    btn.parentNode.classList.add('d-none');
    btn.parentNode.previousElementSibling.classList.remove('d-none');
    document.getElementById('resultGenericInfo').innerHTML = '';
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

async function updateGenericInfo(btn) {
    btn.disabled = true;
    let result = document.getElementById('resultGenericInfo');
    result.innerText = '';
    const alias = document.getElementById("txtAlias").value.trim();
    const source = document.getElementById("ddlSource").value;
    const propertyType = document.getElementById("ddlPropertyType").value;
    const opportunityStatus = document.getElementById("ddlOpportunityStatus").value;
    const size = document.getElementById("txtSize").value.trim();
    const price = document.getElementById("txtPrice").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const city = document.getElementById("txtCity").value.trim();
    const nation = document.getElementById("ddlState").value;
    const tax = document.getElementById("txtTaxes").value.trim();
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
    const processingTime = document.getElementById("txtProcessingTime").value.trim();
    const estimatedProcessingTime = document.getElementById("txtEstimatedProcessingTime").value.trim();
    if (alias === '' || source === '' || propertyType === '' || opportunityStatus === '' || size === '' || price === '' || address === '' || city === '' || nation === '' || tax === '') {
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
                estimatedSellPrice: estimatedSellPrice,
                estimatedProcessingTime: estimatedProcessingTime,
                processingTime: processingTime,
            })
        });
        const res = await response.json();
        btn.disabled = false;
        if (res.result) {
            await loadOpportunityDetail();
            btn.previousElementSibling.click();
            showMessage('Dati aggiornati con successo.', 'resultGenericInfo', 'text-success');
        } else throw new Error("Si sono verificati degli errori");
    } catch (error) {
        showMessage(`Errore durante l'aggiornamento dei dati.`, 'resultGenericInfo', 'text-danger');
        console.error(error.message !== undefined ? error.message : error);
    }
}

function allowNoteModification(el) {
    el.classList.add('d-none');
    el.nextElementSibling.classList.remove('d-none');
    document.getElementById('spNote').classList.add('d-none');
    document.getElementById('txtNote').classList.remove('d-none');
}

function cancelNoteModification(el) {
    el.parentNode.classList.add('d-none');
    el.parentNode.previousElementSibling.classList.remove('d-none');
    document.getElementById('spNote').classList.remove('d-none');
    document.getElementById('txtNote').classList.add('d-none');
}

async function updateNote(btn) {
    btn.disabled = true;
    let result = document.getElementById('resultNote');
    result.innerText = '';
    const note = $("#txtNote").dxHtmlEditor('instance').option('value');
    if (note === '') {
        btn.disabled = false;
        result.innerText = "La nota è obbligatoria";
        return;
    }
    try {
        const response = await fetch("/api/opportunity/" + opportunityId + "/note", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                note: note
            })
        });
        if (response.ok) {
            const res = await response.json();
            btn.disabled = false;
            await loadOpportunityDetail();
            btn.previousElementSibling.click();
            showMessage('Dati aggiornati con successo.', 'resultNote', 'text-success');
        } else throw new Error(`Errore durante l'aggiornamento della nota`);
    } catch (error) {
        btn.disabled = false;
        showMessage(error.message !== undefined ? error.message : error, 'resultNote', 'text-danger');
    }
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

function loadMap() {
    const address = document.getElementById("txtAddress").value.trim();
    const city = document.getElementById("txtCity").value.trim();
    const state = $("#ddlState option:selected").text();
    const addressCombined = address + ' ' + city + ' ' + state;
    if (!addressCombined) return;
    const url = "https://www.google.com/maps?q=" + encodeURIComponent(addressCombined) + "&output=embed";
    document.getElementById("mapContainer").innerHTML = `
        <iframe
            width="100%"
            height="350"
            frameborder="0"
            style="border:0"
            src="${url}"
            allowfullscreen>
        </iframe>
    `;
}

async function uploadPropertyRelevantDocument(ctrl) {
    const files = ctrl.files;
    const spinner = document.getElementById("spinnerPropertyChecklistDocs");
    const allowedExtensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png'];
    for (let file of files) {
        const extension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            showMessage(`Tipo di file non consentito: ${file.name}`, 'resultPropertyChecklistDocs', 'text-danger')
            return;
        }
    }
    spinner.classList.remove('d-none');
    const formData = new FormData();
    formData.append("opportunity_id", opportunityId);
    for (let file of files) formData.append("documents[]", file);
    try {
        const response = await fetch("/api/opportunity/upload-valuation-document", {
            method: "POST",
            body: formData
        });
        const res = await response.json();
        if (res.result) {
            await loadPropertyValuationDocuments();
            spinner.classList.add('d-none');
            showMessage('Documenti caricati con successo', 'resultPropertyChecklistDocs', 'text-success')
        } else throw new Error("Errore durante il caricamento dei documenti immobiliari.");
    } catch (error) {
        spinner.classList.add('d-none');
        showMessage(error.message, 'resultPropertyChecklistDocs', 'text-danger');
    }
}

async function loadPropertyValuationDocuments() {
    try {
        const icons = ['bi-file-earmark-pdf', 'bi-filetype-doc', 'bi-filetype-docx', 'bi-file-earmark-image'];
        const div = document.getElementById('propertyValuationDocumentList');
        div.innerHTML = '';
        const response = await fetch(`/api/opportunity/get-valuation-document/${opportunityId}`);
        const res = await response.json();
        if (res.result) {
            if (res.payload.length === 0) {
                div.innerHTML = '<p class="w-100 text-black-50 text-center">Nessun documento trovato per questa proprietà</p>';
                return;
            }
            let str = '';
            for (let file of res.payload) {
                const ext = file.name.split('.').pop().toLowerCase();
                let icon = '';
                switch (ext) {
                    case 'png':
                    case 'jpg':
                    case 'jpeg': icon = icons[3]; break;
                    case 'pdf': icon = icons[0]; break;
                    case 'doc': icon = icons[1]; break;
                    case 'docx': icon = icons[2]; break;
                }
                const fname = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
                str += `<div class="col mb-3">
                            <div class="docSection d-flex justify-content-center align-items-center border rounded-3 position-relative" style="height: 130px;">
                                <div class="position-absolute delDocument" style="display:none; right: 5px;top:5px;">
                                    <span class="rounded-3 p-2 me-2" role="button" onclick="downloadDocument('${file.name}')" title="Scaricamento" style="background-color: #0dcaf020;">
                                        <i class="bi bi-download fs-5 text-info"></i>
                                    </span>
                                    <span class="rounded-3 p-2" role="button" onclick="deleteDocument(this)" title="Eliminare" style="background-color: #ff000010;">
                                        <i class="bi bi-trash3 fs-5 text-danger"></i>
                                    </span>
                                </div>
                                <div class="card-body text-center">
                                    <i class="bi ${icon} fs-3"></i>
                                    <p class="card-text px-2" data-filename="${file.name}" style="overflow-wrap: anywhere;">${fname}</p>
                                </div>
                            </div>
                        </div>`;
            }
            div.insertAdjacentHTML("beforeend", str);
        } else throw new Error(res.error);
    } catch (error) {
        showMessage(error.message, 'resultPropertyChecklistDocs', 'text-danger')
    }
}

async function downloadDocument(filename) {
    const spinner = document.getElementById("spinnerPropertyChecklistDocs");
    spinner.classList.remove('d-none');
    try {
        const encoded = encodeURIComponent(filename);
        const response = await fetch(`/api/opportunity/download-valuation-document/${opportunityId}/${encoded}`);
        if (!response.ok) throw new Error("Download failed");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        spinner.classList.add('d-none');
    } catch (error) {
        spinner.classList.add('d-none');
        showMessage(error.message, 'resultPropertyChecklistDocs', 'text-danger');
    }
}

async function deleteDocument(el) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            const fname = el.parentElement.nextElementSibling.lastElementChild.dataset.filename;
            const spinner = document.getElementById("spinnerPropertyChecklistDocs");
            spinner.classList.remove('d-none');
            try {
                const response = await fetch(`/api/opportunity/delete-valuation-document/${opportunityId}/${fname}`, { method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    el.parentNode.parentNode.parentNode.remove();
                    spinner.classList.add('d-none');
                    showMessage('Documento eliminato con successo', 'resultPropertyChecklistDocs', 'text-success')
                } else throw new Error("Si è verificato un errore durante l'eliminazione di questo documento.");
            } catch (error) {
                $("#modalConfirmDelete").modal('hide');
                spinner.classList.add('d-none');
                showMessage(error.message, 'resultPropertyChecklistDocs', 'text-danger');
            }
        }
    });
}

/************************PROJECT PROCESS TASK MANAGEMENT START*******************************/
function showNewTaskModal() {
    document.getElementById('modalAddTaskLabel').innerHTML = '<i class="bi bi-list-task me-3"></i>Aggiungi attività';
    document.getElementById('txtInputTask').value = '';
    const radioButtons = document.getElementsByName('rbScenarioEvaluation');
    for (let i = 0; i < 1; i++) radioButtons[i].checked = true;
    document.getElementById('btnUpdateTask').classList.add('d-none');
    document.getElementById('btnSaveTask').classList.remove('d-none');
    const modalElement = document.getElementById("modalAddTask");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function renderTasks() {
    // TODO: LOAD TASKS FROM API...
    const data = loadData();
    $("#taskList").dxDataGrid({
        dataSource: data.tasks,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Nessun compito aggiunto",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                allowFiltering: true,
                width: 150,
            },
            {
                dataField: "text",
                caption: "Compito",
                allowFiltering: true,
                width: 500,
                // sortIndex: 2, sortOrder: "asc"
            },
            {
                dataField: "status",
                caption: "Stato",
                allowFiltering: true,
                alignment: "left",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    container.html(`
                            <input type="checkbox" class="form-check-input" placeholder="${data.status ? "Deseleziona se in sospeso" : "Controlla se completato"}" ${data.status ? "checked" : ""} onchange="toggleTask(${data.id})">
                            <span class="${data.status ? 'completed' : ''}">${data.status ? 'Completato' : 'In corso'}</span>
                        `);
                }
            },
            {
                dataField: "scenario",
                caption: "Scenario",
                allowFiltering: true,
                // sortIndex: 4, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let text = '';
                    switch (data.scenario) {
                        case 'best': text = 'Nel migliore dei casi'; break;
                        case 'average': text = 'Caso medio'; break;
                        case 'worst': text = 'Il caso peggiore'; break;
                    }
                    container.text(text);
                }
            },
            {
                dataField: "",
                caption: "Azioni",
                allowFiltering: true,
                width: 150,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-3" onclick="showModalToEditTask(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteTask(${options.data.id})"></i>
                        `;
                    container.html(html);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        // onRowClick: function (e) { if (e.rowType === "data") { window.location = `/opportunity/${e.data.id}`; } },
    });
}

function saveTask(btn) {
    const taskTitle = document.getElementById("txtInputTask").value.trim();
    const scenario = document.querySelector('input[name="rbScenarioEvaluation"]:checked').value;
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    if (taskTitle === '') {
        showMessage(`Inserisci l'attività per procedere.`, 'spNewTaskResult', 'text-danger');
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        return;
    }
    // TODO: SAVE NEW TASK...
    const data = loadData();
    const id = Date.now().toString();
    data.tasks.push({ id: id, text: taskTitle, status: false, scenario: scenario });

    saveToStorage(data);
    document.getElementById("txtInputTask").value = "";
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddTask').modal('hide');
    $("#taskList").dxDataGrid("dispose");
    $("#taskList").empty();
    renderTasks();
}

function toggleTask(id) {
    // TODO: TOGGLE TASK STATUS...
    const data = loadData();
    const task = data.tasks.find(task => task.id === id.toString());
    task.status = !task.status;
    saveToStorage(data);
    $("#taskList").dxDataGrid("dispose");
    $("#taskList").empty();
    renderTasks();
}

function showModalToEditTask(id) {
    const data = loadData();
    const task = data.tasks.find(task => task.id === id.toString());
    document.getElementById('txtInputTask').value = task.text;
    const radioButtons = document.getElementsByName('rbScenarioEvaluation');
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].value === task.scenario) {
            radioButtons[i].checked = true;
            break;
        }
    }
    document.getElementById('modalAddTaskLabel').innerHTML = '<i class="bi bi-list-task me-3"></i>Modifica attività';
    document.getElementById('btnUpdateTask').classList.remove('d-none');
    document.getElementById('btnSaveTask').classList.add('d-none');
    document.getElementById('hTaskId').value = id;
    const modalElement = document.getElementById("modalAddTask");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function editTask(btn) {
    const taskTitle = document.getElementById("txtInputTask").value.trim();
    const scenario = document.querySelector('input[name="rbScenarioEvaluation"]:checked').value;
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    if (taskTitle === '') {
        showMessage(`Inserisci l'attività per procedere.`, 'spNewTaskResult', 'text-danger');
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        return;
    }
    const id = document.getElementById('hTaskId').value;
    // TODO: UPDATE TASK...
    const data = loadData();
    const task = data.tasks.find(task => task.id === id.toString());
    task.text = taskTitle;
    task.scenario = scenario;
    saveToStorage(data);
    document.getElementById("txtInputTask").value = "";
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddTask').modal('hide');
    $("#taskList").dxDataGrid("dispose");
    $("#taskList").empty();
    renderTasks();
}

function deleteTask(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            // TODO: DELETE TASK...
            let data = loadData();
            data.tasks = data.tasks.filter(task => task.id !== id.toString());
            saveToStorage(data);
            $("#taskList").dxDataGrid("dispose");
            $("#taskList").empty();
            $('#modalConfirmDelete').modal('hide');
            renderTasks();
        }
    });
}

function loadData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        tasks: []
    };
}

function saveToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
/************************PROCESS PROJECT TASK MANAGEMENT END*******************************/

/************************PROCESS PROJECT PROFILE MANAGEMENT START*******************************/
function loadProjectProfileData() {
    return JSON.parse(localStorage.getItem(PROJECT_PROFILE_KEY)) || {
        profiles: []
    };
}

function saveToProjectProfileStorage(data) {
    localStorage.setItem(PROJECT_PROFILE_KEY, JSON.stringify(data));
}

function renderProjectProfileList() {
    // TODO: LOAD DATA FROM API...
    const data = loadProjectProfileData();
    $("#developmentProjectProfileList").dxDataGrid({
        dataSource: data.profiles,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Nessun compito aggiunto",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                allowFiltering: true,
                width: 150,
            },
            {
                dataField: "project_name",
                caption: "Nome progetto",
                allowFiltering: true,
                width: 300,
                // sortIndex: 2, sortOrder: "asc"
            },
            {
                dataField: "project_code",
                caption: "Codice progetto",
                allowFiltering: true,
                width: 200,
                // sortIndex: 2, sortOrder: "asc"
            },
            {
                dataField: "project_address",
                caption: "Indirizzo del progetto",
                allowFiltering: true,
            },
            {
                dataField: "project_contact",
                caption: "Contatto del progetto",
                allowFiltering: true,
                width: 200,
                // sortIndex: 2, sortOrder: "asc"
            },
            {
                dataField: "",
                caption: "Azioni",
                allowFiltering: true,
                width: 150,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-3" onclick="showModalToEditProjectProfile(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteProjectProfile(${options.data.id})"></i>
                        `;
                    container.html(html);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        // onRowClick: function (e) { if (e.rowType === "data") { window.location = `/opportunity/${e.data.id}`; } },
    });
}

function showNewProjectProfileModal() {
    document.getElementById('modalAddProjectProfileLabel').innerHTML = `<i class="bi bi-terminal me-3"></i>Aggiungi profilo progetto`;
    document.getElementById('txtProjectName').value = '';
    document.getElementById('txtProjectCode').value = '';
    document.getElementById('txtProjectAddress').value = '';
    document.getElementById('txtProjectContact').value = '';
    const modalElement = document.getElementById("modalAddProjectProfile");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function saveProjectProfile(btn) {
    const projectName = document.getElementById("txtProjectName").value.trim();
    const projectCode = document.getElementById("txtProjectCode").value.trim();
    const projectAddress = document.getElementById("txtProjectAddress").value.trim();
    const projectContact = document.getElementById("txtProjectContact").value.trim();
    if (projectName === '' || projectCode === '' || projectAddress === '' || projectContact === '') {
        if (projectName === '') { showMessage(`Il nome del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
        if (projectCode === '') { showMessage(`Il codice del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
        if (projectAddress === '') { showMessage(`L'indirizzo del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
        if (projectContact === '') { showMessage(`Il contatto del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
    }
    if (isValidPhone(projectContact) === false) {
        showMessage("Il numero di telefono non è valido", 'spProjectProfileResult', 'text-danger');
        return;
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SAVE PROFILE...
    const data = loadProjectProfileData();
    const id = Date.now().toString();
    data.profiles.push({ id: id, project_name: projectName, project_code: projectCode, project_address: projectAddress, project_contact: projectContact });

    saveToProjectProfileStorage(data);
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddProjectProfile').modal('hide');
    $("#developmentProjectProfileList").dxDataGrid("dispose");
    $("#developmentProjectProfileList").empty();
    renderProjectProfileList();
}

function showModalToEditProjectProfile(id) {
    const data = loadProjectProfileData();
    const profile = data.profiles.find(p => p.id === id.toString());
    document.getElementById('txtProjectName').value = profile.project_name;
    document.getElementById('txtProjectCode').value = profile.project_code;
    document.getElementById('txtProjectAddress').value = profile.project_address;
    document.getElementById('txtProjectContact').value = profile.project_contact;

    document.getElementById('modalAddProjectProfileLabel').innerHTML = '<i class="bi bi-terminal me-3"></i>Modifica profilo progetto';
    document.getElementById('btnUpdateProjectProfile').classList.remove('d-none');
    document.getElementById('btnSaveProjectProfile').classList.add('d-none');
    document.getElementById('hProjectProfileId').value = id;
    const modalElement = document.getElementById("modalAddProjectProfile");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function editProjectProfile(btn) {
    const projectName = document.getElementById("txtProjectName").value.trim();
    const projectCode = document.getElementById("txtProjectCode").value.trim();
    const projectAddress = document.getElementById("txtProjectAddress").value.trim();
    const projectContact = document.getElementById("txtProjectContact").value.trim();
    if (projectName === '') { showMessage(`Il nome del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
    if (projectCode === '') { showMessage(`Il codice del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
    if (projectAddress === '') { showMessage(`L'indirizzo del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
    if (projectContact === '') { showMessage(`Il contatto del progetto è obbligatorio.`, 'spProjectProfileResult', 'text-danger'); return; }
    if (isValidPhone(projectContact) === false) {
        showMessage("Il numero di telefono non è valido", 'spProjectProfileResult', 'text-danger');
        return;
    }
    const data = loadProjectProfileData();
    const id = document.getElementById('hProjectProfileId').value;
    // TODO: UPDATE PROFILE...
    const profile = data.profiles.find(p => p.id === id.toString());
    profile.project_name = projectName;
    profile.project_code = projectCode;
    profile.project_address = projectAddress;
    profile.project_contact = projectContact;
    saveToProjectProfileStorage(data);
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddProjectProfile').modal('hide');
    $("#developmentProjectProfileList").dxDataGrid("dispose");
    $("#developmentProjectProfileList").empty();
    renderProjectProfileList();
}

function deleteProjectProfile(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            // TODO: DELETE PROFILE...
            let data = loadProjectProfileData();
            data.profiles = data.profiles.filter(profile => profile.id !== id.toString())
            // data.tasks.splice(i, 1);
            saveToProjectProfileStorage(data);
            $("#developmentProjectProfileList").dxDataGrid("dispose");
            $("#developmentProjectProfileList").empty();
            $('#modalConfirmDelete').modal('hide');
            renderProjectProfileList();
        }
    });
}
/************************PROCESS PROJECT PROFILE MANAGEMENT END*******************************/

/************************PROCESS PROJECT NOTES MANAGEMENT START*******************************/
function loadProjectNoteData() {
    return JSON.parse(localStorage.getItem(PROJECT_NOTE_KEY)) || {
        notes: []
    };
}

function saveToProjectNoteStorage(data) {
    localStorage.setItem(PROJECT_NOTE_KEY, JSON.stringify(data));
}

function renderProjectNotesList() {
    // TODO: LOAD DATA FROM API...
    const data = loadProjectNoteData();
    $("#developmentProjectNotesList").dxDataGrid({
        dataSource: data.notes,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Nessun compito aggiunto",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                allowFiltering: true,
                width: 150,
            },
            {
                dataField: "project_id",
                caption: "ID progetto",
                allowFiltering: true,
                width: 150,
            },
            {
                dataField: "project_note",
                caption: "Note progetto",
                allowFiltering: true,
                cellTemplate: function (container, options) {
                    container.html(options.data.project_note)
                }
            },
            {
                dataField: "",
                caption: "Azioni",
                allowFiltering: true,
                width: 150,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-3" onclick="showModalToEditProjectNote(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteProjectNote(${options.data.id})"></i>
                        `;
                    container.html(html);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        // onRowClick: function (e) { if (e.rowType === "data") { window.location = `/opportunity/${e.data.id}`; } },
    });
}

function showNewNoteModal() {
    const projects = loadProjectProfileData().profiles;
    initProjectAutocomplete('txtProjectNoteAutoComplete', 'hProjectProfileId', projects);
    document.getElementById('modalAddProjectNoteLabel').innerHTML = `<i class="bi bi-stickies me-3"></i>Aggiungi nota progetto`;
    $("#txtProjectNote").dxHtmlEditor('instance').option('value', '');
    const modalElement = document.getElementById("modalAddProjectNote");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function saveProjectNote(btn) {
    const projectId = document.getElementById('hProjectProfileId').value;
    const projectNote = $("#txtProjectNote").dxHtmlEditor('instance').option('value');
    if (projectNote === '') { showMessage(`La nota del progetto è obbligatoria.`, 'spProjectNoteResult', 'text-danger'); return; }
    if (projectId === '') { showMessage(`Seleziona un progetto per procedere.`, 'spProjectNoteResult', 'text-danger'); return; }

    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SAVE NOTE...
    const data = loadProjectNoteData();
    const id = Date.now().toString();
    data.notes.push({ id: id, project_note: projectNote, project_id: projectId });

    saveToProjectNoteStorage(data);
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddProjectNote').modal('hide');
    $("#developmentProjectNotesList").dxDataGrid("dispose");
    $("#developmentProjectNotesList").empty();
    renderProjectNotesList();
}

function showModalToEditProjectNote(id) {
    document.getElementById('modalAddProjectNoteLabel').innerHTML = '<i class="bi bi-stickies me-3"></i>Modifica nota progetto';
    const data = loadProjectNoteData();
    const note = data.notes.find(n => n.id === id.toString());
    const projects = loadProjectProfileData().profiles;
    let pname = '';
    projects.forEach(p => {
        if (p.id === note.project_id) pname = p.project_name;
    });
    initProjectAutocomplete('txtProjectNoteAutoComplete', 'hProjectProfileId', projects);
    const auto = $("#txtProjectNoteAutoComplete").dxAutocomplete("instance");
    auto.option("value", pname);
    $("#txtProjectNote").dxHtmlEditor('instance').option('value', note.project_note);
    document.getElementById('hProjectProfileId').value = note.project_id;
    document.getElementById('hProjectNoteId').value = id;
    const modalElement = document.getElementById("modalAddProjectNote");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function editProjectNote(btn) {
    const projectId = document.getElementById('hProjectProfileId').value;
    const projectNote = $("#txtProjectNote").dxHtmlEditor('instance').option('value');
    if (projectNote === '') { showMessage(`La nota del progetto è obbligatoria.`, 'spProjectNoteResult', 'text-danger'); return; }
    if (projectId === '') { showMessage(`Seleziona un progetto per procedere.`, 'spProjectNoteResult', 'text-danger'); return; }

    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: UPDATE NOTE...
    const data = loadProjectNoteData();
    const id = document.getElementById('hProjectNoteId').value;
    const note = data.notes.find(n => n.id === id.toString());
    note.project_note = projectNote;
    note.project_id = projectId;
    saveToProjectNoteStorage(data);
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddProjectNote').modal('hide');
    $("#developmentProjectNotesList").dxDataGrid("dispose");
    $("#developmentProjectNotesList").empty();
    renderProjectNotesList();
}

function deleteProjectNote(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            // TODO: DELETE NOTE...
            let data = loadProjectNoteData();
            data.notes = data.notes.filter(note => note.id !== id.toString());
            saveToProjectNoteStorage(data);
            $("#developmentProjectNotesList").dxDataGrid("dispose");
            $("#developmentProjectNotesList").empty();
            $('#modalConfirmDelete').modal('hide');
            renderProjectNotesList();
        }
    });
}
/************************PROJECT PROFILE NOTES MANAGEMENT END*******************************/