let _lands = {
    agriculture: [{ id: "1769669498550", type: 1, name: "Agriculture Land", area: "60000000", location: "this is test location" }],
    residential: [],
    industarial: [{ id: "1769677498550", type: 3, industry_type: 1, name: "Industrial Land", area: "500000", location: "this is Industarial location" }]
};
let _landTypeId = 1;
document.addEventListener("DOMContentLoaded", async () => {
    await loadLandTypes();
    loadCustomers();
});

async function loadLandTypes() {
    const response = await fetch('/api/land/types');
    const r = await response.json();
    let ctrl = document.getElementById("ddlLandType");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona tipo di terre</option>';
    r.payload.forEach(t => {
        opt += `<option value="${t.id}">${t.name}</option>`;
    });
    ctrl.innerHTML = opt;
    loadLandTabsAndContent(r.payload);
}

function showCustomerSelectionDiv(btn) {
    btn.parentNode.nextElementSibling.classList.remove('d-none');
}

async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
    let ctrl = document.getElementById("ddlSelectCustomerToSharePdf");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(customer => {
        if (customer.bizname !== "" && customer.bizname !== null) opt += `<option value="${customer.id}">${customer.bizname}</option>`;
        else opt += `<option value="${customer.id}">${customer.name} ${customer.surname}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadLandTabsAndContent(data) {
    let tabDiv = document.getElementById('landCardTabs');
    tabDiv.innerHTML = '';
    let contentDiv = document.getElementById('landCardTabsContent');
    contentDiv.innerHTML = '';
    let tabs = '', content = '';
    data.forEach((tab, i) => {
        tabs += `<li class="nav-item" role="presentation">
                    <button class="nav-link ${i === 0 ? "active" : ""}" id="${tab.name}LandTab" data-bs-toggle="tab" data-bs-target="#${tab.name}Land" type="button" role="tab" aria-controls="${tab.name}Land" aria-selected="false" tabindex="-1" onclick="setLandTypeId(${tab.id})">${tab.name}</button>
                </li>`;
        content += `<div class="tab-pane fade border border-top-0 p-3 ${i === 0 ? "show active" : ""}" id="${tab.name}Land" role="tabpanel" aria-labelledby="${tab.name}LandTab">
                                <div id="${tab.name}LandGrid" class=""></div>
                            </div>`;
    });
    tabDiv.innerHTML = tabs
    contentDiv.innerHTML = content;
    await loadLands();
}

function setLandTypeId(id) { _landTypeId = id; }

async function loadLands() {
    // const response = await fetch('/pai/pangea/api/lands');
    // const r = await response.json();
    loadAgricultureLands();
    loadIndustarialLands();
}

async function loadAgricultureLands() {
    const response = await fetch(`/api/land/1/lands`);
    const r = await response.json();
    const hasData = r.payload.length > 0;
    $(`#AgricoloLandGrid`).dxDataGrid({
        dataSource: r.payload,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non ci sono terreni registrati.",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                width: 50,
                allowFiltering: false,
                cellTemplate: function (container, options) {
                    container.html(`<div class="text-start">${options.data.id}</div>`);
                }
            },
            {
                dataField: "residence_type",
                caption: "Tipo",
            },
            {
                dataField: "area",
                caption: "Superficie",
                width: 120,
                cellTemplate: function (container, options) {
                    const area = formatNumber(parseInt(options.data.surface_area));
                    container.text(area.slice(0, -2) + ' (mq)');
                }
            },
            {
                dataField: "location",
                caption: "Ubicazione",
                width: 200,
            },
            {
                dataField: "",
                caption: "Documenti",
                // width: 250,
                cellTemplate: function (container, options) {
                    const html = `
                            <div>
                                <input type="file" id="uploadLandDocument_${options.data.id}" hidden multiple onchange="uploadLanDocuments(this, ${options.data.id})">
                                <i class="bi bi-file-earmark-arrow-up me-2" title="Carica documenti" onclick="document.getElementById('uploadLandDocument_${options.data.id}').click()"></i>
                                <span id="spinnerDocumentUpload_${options.data.id}" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></span>
                                <span id="resultDocumentUpload_${options.data.id}" class="d-none" role="status"></span>
                            </div>
                            <div id="land_document_${options.data.id}" class="row">
                        `;
                    container.html(html);
                    loadLandDocuments(options.data.id);
                }
            },
            {
                dataField: "dt",
                caption: "Data",
                allowFiltering: true,
                width: 120
            },
            {
                dataField: "",
                caption: "Azioni",
                // allowFiltering: true,
                width: "auto",
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-file-earmark-pdf me-2" onclick="showModalLandDraft(${options.data.id})"></i>
                            <i class="bi bi-pencil-square me-2" onclick="showModalAddLand(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteLand(${options.data.id})"></i>
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
            visible: false,
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        onRowClick: function (e) {
            // if (e.rowType === "data") { window.location = `/land/${e.data.id}`; }
        },
    });
}

async function loadIndustarialLands() {
    const response = await fetch(`/api/land/3/lands`);
    const r = await response.json();
    const hasData = r.payload.length > 0;
    $(`#IndustrialeLandGrid`).dxDataGrid({
        dataSource: r.payload,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non ci sono terreni registrati.",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                width: 80,
                allowFiltering: false,
                cellTemplate: function (container, options) {
                    container.html(`<div class="text-start">${options.data.id}</div>`);
                }
            },
            {
                dataField: "residence_type",
                caption: "Tipo",
            },
            {
                dataField: "area",
                caption: "Superficie",
                width: 200,
                cellTemplate: function (container, options) {
                    const area = formatNumber(parseInt(options.data.surface_area));
                    container.text(area.slice(0, -2) + ' (mq)');
                }
            },
            {
                dataField: "location",
                caption: "Ubicazione",
            },
            {
                dataField: "dt",
                caption: "Data",
                allowFiltering: true,
                width: 120
            },
            {
                dataField: "",
                caption: "Azioni",
                // allowFiltering: true,
                width: 85,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-file-earmark-pdf me-2" onclick="showModalLandDraft(${options.data.id})"></i>
                            <i class="bi bi-pencil-square me-2" onclick="showModalAddLand(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteLand(${options.data.id})"></i>
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
            visible: false,
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        onRowClick: function (e) {
            // if (e.rowType === "data") { window.location = `/land/${e.data.id}`; }
        },
    });
}

async function showModalLandDraft(id) {
    document.getElementById('shareToCustomerDiv').classList.add('d-none');
    const response = await fetch(`/api/land/detail/${id}`);
    const r = await response.json();
    document.getElementById('draftLandId').textContent = id;
    const d = new Date();
    document.getElementById('draftLandDate').textContent = 'Data: ' + d.toLocaleDateString();
    document.getElementById('hFileName').value = r.payload[0].residence_type;
    let area = '';
    switch (parseInt(_landTypeId)) {
        case 1:
            area = formatNumber(parseInt(r.payload[0].surface_area));
            document.getElementById("draftLandType").textContent = 'Agricolo';
            document.getElementById("draftLandName").textContent = r.payload[0].residence_type;
            document.getElementById("draftLandArea").textContent = area.slice(0, -2) + ' (mq)';
            document.getElementById("draftLandLocation").textContent = r.payload[0].location;
            break;
        case 2:
            break;
        case 3:
            area = formatNumber(parseInt(r.payload[0].surface_area));
            document.getElementById("draftLandType").textContent = 'Industriale';
            document.getElementById("draftLandName").textContent = r.payload[0].residence_type;
            document.getElementById("draftLandArea").textContent = area.slice(0, -2) + ' (mq)';
            document.getElementById("draftLandLocation").textContent = r.payload[0].location;
            break;
    }
    const modalElement = document.getElementById("modalPdfDraftLand");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function downloadLandDraft(btn) {
    const fname = document.getElementById('hFileName').value;
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    const el = document.getElementById('drftLandToDownloadDiv');
    // pdf options tuned for A4
    const opt = {
        margin: 10,
        filename: `${fname || 'land-draft'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    try {
        if (typeof html2pdf === 'undefined') {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js';
            s.onload = () => html2pdf().set(opt).from(el).save();
            document.body.appendChild(s);
        } else html2pdf().set(opt).from(el).save();
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        showMessage('File scaricato correttamente', 'resultLandDraft', 'text-success');
        setTimeout(() => {
            $('#modalPdfDraftLand').modal('hide');
        }, 3000);
    } catch (error) {
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        showMessage('Download del file non riuscito', 'resultLandDraft', 'text-danger');
    }
}

function showModalAddLand(id = null) {
    if (id === null) {
        document.getElementById('modalAddLandLabel').innerHTML = `<i class="bi bi-columns-gap me-3"></i>Aggiungi Terre`;
        document.getElementById('ddlLandType').value = _landTypeId;
        document.getElementById('ddlLandType').disabled = true;
        document.getElementById('hLandId').value = '';
        document.getElementById('btnSaveLand').classList.remove('d-none');
        document.getElementById('btnUpdateLand').classList.add('d-none');
        showRelevantFields(id);
    } else {
        document.getElementById('hLandId').value = id;
        document.getElementById('modalAddLandLabel').innerHTML = `<i class="bi bi-columns-gap me-3"></i>Modificare Terre`;
        document.getElementById('ddlLandType').value = _landTypeId;
        document.getElementById('ddlLandType').disabled = true;
        document.getElementById('btnSaveLand').classList.add('d-none');
        document.getElementById('btnUpdateLand').classList.remove('d-none');
        showRelevantFields(id);
    }
    const modalElement = document.getElementById("modalAddLand");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

async function showRelevantFields(landId = null) {
    let data = '';
    if (landId !== null) {
        const response = await fetch(`/api/land/detail/${landId}`);
        const r = await response.json();
        data = r.payload[0];
    }
    switch (parseInt(_landTypeId)) {
        case 1:
            document.getElementById("txtAgricultureLandName").value = landId === null ? '' : data.residence_type;
            document.getElementById("txtAgricultureLandArea").value = landId === null ? '' : data.surface_area
            document.getElementById("txtAgricultureLandLocation").value = landId === null ? '' : data.location
            document.getElementById("agricultureLandFields").classList.remove('d-none');
            document.getElementById("residentialLandFields").classList.add('d-none');
            document.getElementById("industrialLandFields").classList.add('d-none');
            break;
        case 2:
            document.getElementById("agricultureLandFields").classList.add('d-none');
            document.getElementById("residentialLandFields").classList.remove('d-none');
            document.getElementById("industrialLandFields").classList.add('d-none');
            break;
        case 3:
            document.getElementById("txtIndustarialLandName").value = landId === null ? '' : data.residence_type;
            document.getElementById("txtIndustarialLandArea").value = landId === null ? '' : data.surface_area
            document.getElementById("txtIndustarialLandLocation").value = landId === null ? '' : data.location
            document.getElementById("agricultureLandFields").classList.add('d-none');
            document.getElementById("residentialLandFields").classList.add('d-none');
            document.getElementById("industrialLandFields").classList.remove('d-none');
            break;
    }
}

async function saveLand(btn) {
    switch (parseInt(_landTypeId)) {
        case 1:
            const agricultureLandName = document.getElementById("txtAgricultureLandName").value.trim();
            const agricultureLandArea = document.getElementById("txtAgricultureLandArea").value.trim();
            const agricultureLandLocation = document.getElementById("txtAgricultureLandLocation").value.trim();
            if (agricultureLandName === '' || agricultureLandArea === '' || agricultureLandLocation === '') {
                if (agricultureLandName === '') {
                    showMessage("Il nome del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandArea === '') {
                    showMessage("La superficie del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandLocation === '') {
                    showMessage("L'ubicazione del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
            }
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            try {
                const response = await fetch("/api/land", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "name": _landTypeId, "residence_type": agricultureLandName, "area": agricultureLandArea, "location": agricultureLandLocation })
                });
                const res = await response.json();
                if (res.result) {
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                    $('#modalAddLand').modal('hide');
                    $("#AgricoloLandGrid").dxDataGrid("dispose");
                    $("#AgricoloLandGrid").empty();
                    loadAgricultureLands();
                } else {
                    showMessage("Si sono verificati degli errori durante il salvataggio", 'spNewLandResult', 'text-danger');
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                }
            } catch (error) {
                console.error(error.message);
                showMessage(error.message, 'spNewLandResult', 'text-danger');
                btn.disabled = false;
                btn.lastElementChild.classList.add("d-none");
            }
            break;
        case 2:
            document.getElementById("residentialLandFields").classList.add('d-none');
            break;
        case 3:
            const industarialLandName = document.getElementById("txtIndustarialLandName").value.trim();
            const industarialLandArea = document.getElementById("txtIndustarialLandArea").value.trim();
            const industarialLandLocation = document.getElementById("txtIndustarialLandLocation").value.trim();
            if (industarialLandName === '' || industarialLandArea === '' || industarialLandLocation === '') {
                if (industarialLandName === '') {
                    showMessage("Il nome del terreno industriale è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (industarialLandArea === '') {
                    showMessage("La superficie del terreno industriale è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (industarialLandLocation === '') {
                    showMessage("L'ubicazione del terreno industriale è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
            }
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            try {
                const response = await fetch("/api/land", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "name": _landTypeId, "residence_type": industarialLandName, "area": industarialLandArea, "location": industarialLandLocation })
                });
                const res = await response.json();
                if (res.result) {
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                    $('#modalAddLand').modal('hide');
                    $("#IndustrialeLandGrid").dxDataGrid("dispose");
                    $("#IndustrialeLandGrid").empty();
                    loadIndustarialLands();
                } else {
                    showMessage("Si sono verificati degli errori durante il salvataggio", 'spNewLandResult', 'text-danger');
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                }
            } catch (error) {
                console.error(error.message);
                showMessage(error.message, 'spNewLandResult', 'text-danger');
                btn.disabled = false;
                btn.lastElementChild.classList.add("d-none");
            }
            break;
    }
}

async function updateLand(btn) {
    const id = document.getElementById("hLandId").value.trim();
    switch (parseInt(_landTypeId)) {
        case 1:
            const agricultureLandName = document.getElementById("txtAgricultureLandName").value.trim();
            const agricultureLandArea = document.getElementById("txtAgricultureLandArea").value.trim();
            const agricultureLandLocation = document.getElementById("txtAgricultureLandLocation").value.trim();
            if (agricultureLandName === '' || agricultureLandArea === '' || agricultureLandLocation === '') {
                if (agricultureLandName === '') {
                    showMessage("Il nome del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandArea === '') {
                    showMessage("La superficie del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandLocation === '') {
                    showMessage("L'ubicazione del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
            }
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            try {
                const response = await fetch(`/api/land/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "residence_type": agricultureLandName, "area": agricultureLandArea, "location": agricultureLandLocation })
                });
                const res = await response.json();
                if (res.result) {
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                    $('#modalAddLand').modal('hide');
                    $("#AgricoloLandGrid").dxDataGrid("dispose");
                    $("#AgricoloLandGrid").empty();
                    loadAgricultureLands();
                } else {
                    showMessage("Si sono verificati degli errori durante l'aggiornamento dell'chiamata", 'spNewLandResult', 'text-danger');
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                }
            } catch (error) {
                console.error(error.message);
                showMessage(error.message, 'spNewLandResult', 'text-danger');
                btn.disabled = false;
                btn.lastElementChild.classList.add("d-none");
            }
            break;
        case 2:
            document.getElementById("residentialLandFields").classList.add('d-none');
            break;
        case 3:
            const industaryType = document.getElementById("ddlIndustarialLandType").value.trim();
            const industarialLandName = document.getElementById("txtIndustarialLandName").value.trim();
            const industarialLandArea = document.getElementById("txtIndustarialLandArea").value.trim();
            const industarialLandLocation = document.getElementById("txtIndustarialLandLocation").value.trim();
            if (industaryType === '' || industarialLandName === '' || industarialLandArea === '' || industarialLandLocation === '') {
                if (industaryType === '') {
                    showMessage("Il tipo del industria è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (industarialLandName === '') {
                    showMessage("Il nome del terreno industriale è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (industarialLandArea === '') {
                    showMessage("La superficie del terreno industriale è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (industarialLandLocation === '') {
                    showMessage("L'ubicazione del terreno industriale è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
            }
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            // TODO: SEND LAND DATA TO API AND UPDATE...
            let industarialData = _lands.industarial.find(l => l.id === id.toString());
            industarialData.industry_type = industaryType;
            industarialData.name = industarialLandName;
            industarialData.area = industarialLandArea;
            industarialData.location = industarialLandLocation;
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            $('#modalAddLand').modal('hide');
            $("#IndustrialeLandGrid").dxDataGrid("dispose");
            $("#IndustrialeLandGrid").empty();
            loadIndustarialLands();
            break;
    }
}

function deleteLand(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            const btn = document.getElementById('btnConfirmDelete');
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            try {
                const response = await fetch(`/api/land/${id}`, {
                    method: "DELETE"
                });
                const res = await response.json();
                if (res.result) {
                    switch (parseInt(_landTypeId)) {
                        case 1:
                            // _lands.agriculture = _lands.agriculture.filter(land => land.id !== id.toString());
                            $("#AgricoloLandGrid").dxDataGrid("dispose");
                            $("#AgricoloLandGrid").empty();
                            loadAgricultureLands();
                            break;
                        case 2:
                            _lands.residential = _lands.residential.filter(land => land.id !== id.toString());
                            break;
                        case 3:
                            // _lands.industarial = _lands.industarial.filter(land => land.id !== id.toString());
                            $("#IndustrialeLandGrid").dxDataGrid("dispose");
                            $("#IndustrialeLandGrid").empty();
                            loadIndustarialLands();
                            break;
                    }
                    $('#modalConfirmDelete').modal('hide');
                } else throw new Error("Si è verificato un errore durante l'eliminazione di questo record.");
            } catch (error) {
                btn.disabled = false;
                btn.lastElementChild.classList.add('d-none');
                showMessage(error.message, 'deleteErrorMessage', 'text-danger');
            }
        }
    });
}

async function sharePdfToCustomer(btn) {
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    const selectedCustomerId = document.getElementById('ddlSelectCustomerToSharePdf').value;
    const el = document.getElementById('drftLandToDownloadDiv');
    // pdf options tuned for A4
    const opt = {
        margin: 10,
        // filename: `${fname || 'land-draft'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    try {
        const el = document.getElementById("drftLandToDownloadDiv");
        const blob = await generatePdfBlob(el);
        const fileId = Date.now();
        const fd = new FormData();
        fd.append("file", blob, `land-draft.pdf`);
        fd.append("customer_id", selectedCustomerId);
        fd.append("file_id", fileId);
        const response = await fetch(`/api/land/share-pdf-file`, {
            method: "POST",
            body: fd
        });
        const res = await response.json();
        if (res.result) {
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            document.getElementById('shareToCustomerDiv').classList.add('d-none');
            showMessage('File condiviso correttamente', 'resultLandDraft', 'text-success');
        } else throw new Error("Download del file non riuscito.");
    } catch (error) {
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        showMessage(error.message || 'Download del file non riuscito', 'resultLandDraft', 'text-danger');
    }
}

async function generatePdfBlob(el) {
    const opt = {
        margin: 10,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // load script if needed
    if (typeof html2pdf === "undefined") {
        await new Promise(resolve => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
            s.onload = resolve;
            document.body.appendChild(s);
        });
    }
    const blob = await html2pdf()
        .set(opt)
        .from(el)
        .toPdf()
        .outputPdf("blob");
    return blob;
}

async function uploadLanDocuments(ele, id) {
    const files = ele.files;
    const allowedExtensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png'];
    for (let file of files) {
        const extension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            showMessage(`Tipo di file non consentito: ${file.name}`, `resultDocumentUpload_${id}`, 'text-danger')
            return;
        }
    }
    ele.parentNode.children[2].classList.remove('d-none');
    const formData = new FormData();
    formData.append("land_id", id);
    for (let file of files) formData.append("documents[]", file);
    try {
        const response = await fetch("/api/land/upload-document", {
            method: "POST",
            body: formData
        });
        const res = await response.json();
        if (res.result) {
            await loadLandDocuments(id);
            ele.parentNode.children[2].classList.add('d-none');
            showMessage('Documenti caricati con successo', `resultDocumentUpload_${id}`, 'text-success')
        } else throw new Error("Errore durante il caricamento dei documenti immobiliari.");
    } catch (error) {
        ele.parentNode.children[2].classList.add('d-none');
        showMessage(error.message, `resultDocumentUpload_${id}`, 'text-danger');
    }
}

async function loadLandDocuments(id) {
    try {
        const div = document.getElementById(`land_document_${id}`);
        div.innerHTML = '';
        const response = await fetch(`/api/land/get-document/${id}`);
        const res = await response.json();
        if (res.result) {
            if (res.payload.length === 0) {
                div.innerHTML = '<p class="w-100 text-black-50 text-center">Nessun documento caricato ancora</p>';
                return;
            }
            const icons = ['bi-file-earmark-pdf', 'bi-filetype-doc', 'bi-filetype-docx', 'bi-file-earmark-image'];
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
                str += `<div class="col-sm-4 mb-3">
                            <div class="docSection d-flex justify-content-center align-items-center border rounded-3 position-relative" style="height: auto;">
                                <div class="position-absolute delDocument" style="display:none; right: -16px;top:-10px;">
                                    <span class="rounded-3 p-1 me-1" role="button" onclick="openInNewTab(${id}, '${file.name}')" title="Scaricamento" style="background-color: #0dcaf020;">
                                        <i class="bi bi-eye fs-6 text-info"></i>
                                    </span>
                                    <span class="rounded-3 p-1" role="button" onclick="deleteDocument(${id}, this)" title="Eliminare" style="background-color: #ff000010;">
                                        <i class="bi bi-trash3 fs-6 text-danger"></i>
                                    </span>
                                </div>
                                <div class="card-body text-center">
                                    <i class="bi ${icon} fs-3"></i>
                                    <p class="d-none" data-filename="${file.name}"></p>
                                </div>
                            </div>
                        </div>`;
            }
            div.insertAdjacentHTML("beforeend", str);
        } else throw new Error(res.error);
    } catch (error) {
        showMessage(error.message, `resultDocumentUpload_${id}`, 'text-danger')
    }
}

function openInNewTab(id, fileName) {
    const url = `http://localhost:8080/static/imgs/land_${id}/${fileName}`;
    window.open(url, '_blank').focus();
}

async function deleteDocument(id, el) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            const fname = el.parentElement.nextElementSibling.lastElementChild.dataset.filename;
            const spinner = document.getElementById(`spinnerDocumentUpload_${id}`);
            spinner.classList.remove('d-none');
            try {
                const response = await fetch(`/api/land/delete-document/${id}/${fname}`, { method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    el.parentNode.parentNode.parentNode.remove();
                    spinner.classList.add('d-none');
                    showMessage('Documento eliminato con successo', `resultDocumentUpload_${id}`, 'text-success')
                } else throw new Error("Si è verificato un errore durante l'eliminazione di questo documento.");
            } catch (error) {
                $("#modalConfirmDelete").modal('hide');
                spinner.classList.add('d-none');
                showMessage(error.message, `resultDocumentUpload_${id}`, 'text-danger');
            }
        }
    });
}