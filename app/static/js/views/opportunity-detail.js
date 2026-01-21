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
const STORAGE_KEY = "development_project_data";
document.addEventListener("DOMContentLoaded", async () => {
    await loadNations();
    await loadSources();
    await loadOpportunityStatus();
    await loadPropertyTypes();
    await loadPropertyStatus();
    initHtmlEditor('txtNote');
    await loadOpportunityDetail();
    loadChecklistDocuments();
    loadPropertyValuationDocuments();
    loadMap();
    renderTasks();

    document.getElementById("txtAddress").addEventListener("focusout", loadMap);
    document.getElementById("txtCity").addEventListener("focusout", loadMap);
    document.getElementById("ddlState").addEventListener("change", loadMap);
    document.querySelectorAll('input[name="rbPropertyType"]').forEach(radio => {
        radio.addEventListener("change", loadChecklistDocuments);
    });
    document.querySelectorAll('input[name="rbTransectionType"]').forEach(radio => {
        radio.addEventListener("change", loadChecklistDocuments);
    });
});

function loadChecklistDocuments() {
    const propertyType = document.querySelector('input[name="rbPropertyType"]:checked').value;
    const transectionType = document.querySelector('input[name="rbTransectionType"]:checked').value;
    const arr = documentCheckList[propertyType][transectionType];
    let grid = document.getElementById('documentChecklistGrid');
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

/************************TASK MANAGEMENT*******************************/
function showNewTaskModal() {
    document.getElementById('modalAddTaskLabel').textContent = 'Aggiungi attività';
    document.getElementById('txtInputTask').value = '';
    document.getElementById('btnUpdateTask').classList.add('d-none');
    document.getElementById('btnSaveTask').classList.remove('d-none');
    const modalElement = document.getElementById("modalAddTask");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function renderTasks() {
    const data = loadData();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

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
    document.getElementById('modalAddTaskLabel').textContent = 'Modifica attività';
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
    const data = loadData();
    const id = document.getElementById('hTaskId').value;
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
            let data = loadData();
            data.tasks = data.tasks.filter(task => task.id !== id.toString())
            // data.tasks.splice(i, 1);
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
/************************TASK MANAGEMENT END*******************************/