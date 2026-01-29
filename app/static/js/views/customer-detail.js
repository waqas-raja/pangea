let _customerDetail = [];
const crmData = {
    calls: [{ id: "1769575418394", date: "2026-01-28T10:34", person: "subject", type: "In entrata", outcome: "test@mail.com", note: "this is test content" }],
    appointments: [{ id: "1769575418395", date: "2026-01-28T10:34", type: "Type A", note: "this is test content" }],
    emails: [{ id: "1769575418396", date: "2026-01-28T10:34", subject: "subject", recipients: "test@mail.com", content: "this is test content" }]
};
document.addEventListener("DOMContentLoaded", async () => {
    renderNations();
    await loadCustomerDetail();
    loadAssociatedProperties();
    loadAssociatedQuotes();
    loadMap();
    loadCalls();
    initHtmlEditor('txtCallNote');
    loadAppointments();
    initHtmlEditor('txtAppointmentNote');
    loadEmails();
    initHtmlEditor('txtEmailContent');

    document.getElementById("txtAddress").addEventListener("focusout", loadMap);
    document.getElementById("txtCity").addEventListener("focusout", loadMap);
    document.getElementById("ddlState").addEventListener("change", loadMap);
});

async function loadCustomerDetail() {
    const response = await fetch('/api/customer/' + customerId);
    const r = await response.json();
    _customerDetail = r.payload;
    loadDetail();
}

function loadDetail(d = null) {
    document.getElementById("spFirstName").innerText = _customerDetail.name ?? 'n.d.';
    document.getElementById("txtFirstName").value = _customerDetail.name ?? '';
    document.getElementById("spLastName").innerText = _customerDetail.surname ?? 'n.d.';
    document.getElementById("txtLastName").value = _customerDetail.surname ?? '';
    document.getElementById("spEmail").innerText = _customerDetail.email ?? 'n.d.';
    document.getElementById("txtEmail").value = _customerDetail.email ?? '';
    document.getElementById("spPhone").innerText = _customerDetail.phone ?? 'n.d.';
    document.getElementById("txtPhone").value = _customerDetail.phone ?? '';
    if (_customerDetail.bizname !== null && _customerDetail.bizname !== '') document.getElementById('divCompanyFields').classList.remove("d-none");
    if (d === null) {
        document.getElementById("ckIsCompany").checked = _customerDetail.bizname !== null;
        document.getElementById("ckIsCompany").disabled = true;
    } else document.getElementById('divCompanyFields').classList.remove("d-none");
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

async function loadAssociatedProperties() {
    const response = await fetch('/api/customer/properties/' + customerId);
    const r = await response.json();
    const hasData = r.payload.length > 0;
    $("#associatedPropertiesGrid").dxDataGrid({
        dataSource: r.payload,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 300,
            placeholder: "Cerca..."
        },
        noDataText: "Nessun immobile in gestione",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            { dataField: "alias", caption: "Alias", sortIndex: 0 },
            // { dataField: "nation_name", caption: "Nation", sortIndex: 1 },
            // { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 2 },
            {
                dataField: "acquisition_price", caption: "Costo di acquisizione", width: 150, sortIndex: 3,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    container.text(formatNumber(parseFloat(data.acquisition_price)));
                }
            },
            {
                dataField: "renovation_price", caption: "Costo di ristrutturazione", width: 150, sortIndex: 4,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    container.text(formatNumber(parseFloat(data.renovation_price)));
                }
            },
            {
                dataField: "sell_price", caption: "Prezzo vendita", width: 120, sortIndex: 5,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    container.text(formatNumber(parseFloat(data.sell_price)));
                }
            },
            {
                dataField: "", caption: "Profitto", width: 80, sortIndex: 6,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const acqCost = parseFloat(data.acquisition_price) || 0;
                    const renCost = parseFloat(data.renovation_price) || 0;
                    const extraCost = parseFloat(data.extra_price) || 0;
                    const sellPrice = parseFloat(data.sell_price) || 0;
                    const margin = (((sellPrice - (acqCost + renCost + extraCost)) / (acqCost + renCost + extraCost)) * 100);
                    container.text(parseFloat(margin).toFixed(2) + ' %');
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                {
                    name: "searchPanel",
                    location: "before"
                },
                "groupPanel",
            ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
    });
}

async function loadAssociatedQuotes() {
    const response = await fetch('/api/customer/quotes/' + customerId);
    const r = await response.json();
    $("#associatedQuoteGrid").dxDataGrid({
        dataSource: r.payload,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 300,
            placeholder: "Cerca..."
        },
        noDataText: "Nessun preventivo in gestione",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID preventivo",
                // allowFiltering: true,
                // sortIndex: 0, sortOrder: "asc",
                alignment: "left",
                width: 120,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = '#' + data.id;
                    container.text(text);
                }
            },
            {
                dataField: "property_alias",
                caption: "Immobile",
                // sortIndex: 3, sortOrder: "asc"
            },
            {
                dataField: "dtcr",
                caption: "Data creazione",
                allowFiltering: true,
                width: 130,
                // sortIndex: 5, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let date = data.dtcr.split(' ')[0];
                    date = date.split('-');
                    container.text(date[2] + '/' + date[1] + '/' + date[0]);
                }
            },
            {
                dataField: "property_status_id",
                caption: "Stato",
                // allowFiltering: true,
                // sortIndex: 6, sortOrder: "asc",
                width: 150,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let div = '';
                    switch (data.property_status_id) {
                        case 2: div = `<div class="mx-auto rounded-pill alert alert-success px-1 py-0 text-center m-0" style="width: fit-content; box-shadow: 1px 0px 8px 0px #a3cfbb;">${data.property_status_label}</div>`; break;
                        case 1:
                        case 3:
                        case 4: div = `<div class="mx-auto rounded-pill alert alert-warning px-1 py-0 text-center m-0" style="width: fit-content; box-shadow: 1px 0px 8px 0px #ffe69c;"">${data.property_status_label}</div>`; break;
                        case 5: div = `<div class="mx-auto rounded-pill alert alert-danger px-1 py-0 text-center m-0" style="width: fit-content; box-shadow: 1px 0px 8px 0px #f1aeb5;"">${data.property_status_label}</div>`; break;
                    }
                    container.html(div);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                {
                    name: "searchPanel",
                    location: "before"
                },
                "groupPanel",
            ]
        },
        onRowClick: function (e) {
            if (e.rowType === "data") window.location = `/estimate/${e.data.id}`;
        },
    });
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
        document.getElementById('divCompanyFields').classList.add("d-none");
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
    const tag = document.getElementById("ddlTag");
    const tags = Array.from(tag.options)
        .filter(option => option.selected)
        .map(option => option.value);
    const isCompany = document.getElementById("ckIsCompany").checked;
    const bizname = document.getElementById("txtBizname").value.trim();
    const vat = document.getElementById("txtVat").value.trim();
    const fiscal = document.getElementById("txtFiscal").value.trim();
    const sdi = document.getElementById("txtSdi").value.trim();
    const investment = document.getElementById("txtPotentialInvestment").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const city = document.getElementById("txtCity").value.trim();
    const zip = document.getElementById("txtZip").value.trim();
    const state = document.getElementById("ddlState").value.trim();
    const note = document.getElementById("txtNote").value.trim();
    let err = document.getElementById('errEditCustomer');
    err.innerText = '';
    if (name === "" || surname === "" || email === "" || phone === "" || (tags.length === 0 || tags[0] === '') || address === "" || city === "" || zip === "" || state === "") {
        btn.disabled = false;
        if (name === "") { err.textContent = "Il campo Nome è obbligatorio"; return; }
        if (surname === "") { err.textContent = "Il campo Cognome è obbligatorio"; return; }
        if (email === "") { err.textContent = "L'e-mail è obbligatoria"; return; }
        if (phone === "") { err.textContent = "È richiesto il telefono con un numero valido"; return; }
        if (address === "") { err.textContent = "L'indirizzo è obbligatorio"; return; }
        if (city === "") { err.textContent = "La città è obbligatoria"; return; }
        if (zip === "") { err.textContent = "È richiesto il codice postale con un numero valido"; return; }
        if (state === "") { err.textContent = "Lo Stato è obbligatorio"; return; }
        if (tags.length === 0 || tags[0] === '') { err.textContent = 'Seleziona almeno un tag'; return; }
    }
    if (email !== "" && !isValidEmail(email)) {
        err.textContent = "L'email fornita non risulta valida.";
        btn.disabled = false;
        return;
    }
    if (phone !== "" && !isValidPhone(phone)) {
        err.textContent = "Il numero di telefono fornito non è valido.";
        btn.disabled = false;
        return;
    }
    if (zip !== "" && !isValidZip(zip)) {
        err.textContent = "È richiesto il codice postale con un numero valido.";
        btn.disabled = false;
        return;
    }
    if (city !== "" && !isValidLetter(city)) {
        err.textContent = "Per la città sono accettate solo lettere.";
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
                tags: tags,
                bizname: isCompany ? bizname : null,
                vat: isCompany ? vat : null,
                fiscal: fiscal !== "" ? fiscal : null,
                sdi: sdi !== "" ? sdi : null,
                potentialInvestment: investment !== "" ? investment : null,
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

async function renderNations() {
    const response = await fetch('/api/nations');
    const r = await response.json();
    let ctrl = document.getElementById("ddlState");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona nazione</option>';
    r.payload.forEach(type => {
        opt += `<option value="${type.code}">${type.name}</option>`;
    });
    ctrl.innerHTML = opt;
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

/*************************CRM CALLS MANAGEMENT START*************************** */
async function loadCalls() {
    // TODO: FETCH CALLS DATA FROM API AND LOAD...
    // const response = await fetch('/api/customer/quotes/' + customerId);
    // const r = await response.json();
    $("#callsList").dxDataGrid({
        dataSource: crmData.calls,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 300,
            placeholder: "Cerca..."
        },
        noDataText: "Nessun record trovato per le chiamate",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                alignment: "left",
                width: 120,
            },
            {
                dataField: "date",
                caption: "Data creazione",
                // allowFiltering: true,
                width: 150,
                // sortIndex: 5, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let date = data.date.split('T')[0];
                    date = date.split('-');
                    container.text(date[2] + '/' + date[1] + '/' + date[0] + ' ' + data.date.split('T')[1]);
                }
            },
            {
                dataField: "person",
                caption: "Contatto",
                // allowFiltering: true,
                width: 100,
            },
            {
                dataField: "outcome",
                caption: "Esito",
                // allowFiltering: true,
                width: 150,
            },
            {
                dataField: "note",
                caption: "Note",
                // allowFiltering: true,
                cellTemplate: function (container, options) {
                    container.html(options.data.note);
                }
            },
            {
                dataField: "",
                caption: "Azioni",
                // allowFiltering: true,
                width: 60,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-2" onclick="showNewCallModal(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteCall(${options.data.id})"></i>
                        `;
                    container.html(html);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 5 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                {
                    name: "searchPanel",
                    location: "before"
                },
                "groupPanel",
            ]
        },
        onRowClick: function (e) {
            // if (e.rowType === "data") window.location = `/estimate/${e.data.id}`;
        },
    });
}

function showNewCallModal(id = null) {
    if (id === null) {
        document.getElementById('modalAddCallLabel').innerHTML = `<i class="bi bi-telephone me-3"></i>Nuova chiamata`;
        document.getElementById('txtCallDate').value = '';
        document.getElementById('ddlCallType').value = '';
        document.getElementById('txtCallWith').value = '';
        document.getElementById('txtCallOutcome').value = '';
        $("#txtCallNote").dxHtmlEditor('instance').option('value', '');
        document.getElementById('btnSaveCall').classList.remove('d-none');
        document.getElementById('btnUpdateCall').classList.add('d-none');
    } else {
        const call = crmData.calls.find(c => c.id === id.toString());
        document.getElementById('modalAddCallLabel').innerHTML = `<i class="bi bi-telephone me-3"></i>Modifica chiamata`;
        document.getElementById('hCallId').value = id;
        document.getElementById('txtCallDate').value = call.date;
        document.getElementById('txtCallWith').value = call.person;
        document.getElementById('ddlCallType').value = call.type;
        document.getElementById('txtCallOutcome').value = call.outcome;
        $("#txtCallNote").dxHtmlEditor('instance').option('value', call.note);
        document.getElementById('btnSaveCall').classList.add('d-none');
        document.getElementById('btnUpdateCall').classList.remove('d-none');
    }
    const modalElement = document.getElementById("modalAddCall");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function saveCall(btn) {
    const date = document.getElementById('txtCallDate').value;
    const person = document.getElementById('txtCallWith').value;
    const type = document.getElementById('ddlCallType').value;
    const outcome = document.getElementById('txtCallOutcome').value;
    const note = $("#txtCallNote").dxHtmlEditor('instance').option('value');
    if (!date || !outcome || !note || !type) {
        if (date === '') { showMessage('Il campo data è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        // if (person === '') { showMessage('Il campo persona è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        if (type === '') { showMessage('Il campo tipo di chiamata è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        if (outcome === '') { showMessage('Il campo esito è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        if (note === '') { showMessage('Il campo note è obbligatorio', 'crmCallResult', 'text-danger'); return; }
    }
    btn.disabled = true;
    btn.lastElementChild.classList.add('d-none');
    // TODO: SEND CALL DATA TO API AND SAVE...
    const id = Date.now().toString();
    crmData.calls.push({ id: id, date: date, person: person, type: type, outcome: outcome, note: note });
    btn.disabled = false;
    btn.lastElementChild.classList.remove('d-none');
    $('#modalAddCall').modal('hide');
    $("#callsList").dxDataGrid("dispose");
    $("#callsList").empty();
    loadCalls();
}

function updateCall(btn) {
    const id = document.getElementById('hCallId').value;
    const date = document.getElementById('txtCallDate').value;
    const person = document.getElementById('txtCallWith').value;
    const type = document.getElementById('ddlCallType').value;
    const outcome = document.getElementById('txtCallOutcome').value;
    const note = $("#txtCallNote").dxHtmlEditor('instance').option('value');
    if (!date || !type || !outcome || !note) {
        if (date === '') { showMessage('Il campo data è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        if (type === '') { showMessage('Il campo tipo di chiamata è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        if (outcome === '') { showMessage('Il campo esito è obbligatorio', 'crmCallResult', 'text-danger'); return; }
        if (note === '') { showMessage('Il campo note è obbligatorio', 'crmCallResult', 'text-danger'); return; }
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SEND CALL DATA TO API AND UPDATE...
    const callToUpdate = crmData.calls.find(call => call.id === id);
    if (callToUpdate) {
        callToUpdate.date = date;
        callToUpdate.person = person;
        callToUpdate.type = type;
        callToUpdate.outcome = outcome;
        callToUpdate.note = note;
    }
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddCall').modal('hide');
    $("#callsList").dxDataGrid("dispose");
    $("#callsList").empty();
    loadCalls();
}

function deleteCall(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            // TODO: DELETE CALL API...
            crmData.calls = crmData.calls.filter(call => call.id !== id.toString());
            $("#callsList").dxDataGrid("dispose");
            $("#callsList").empty();
            $('#modalConfirmDelete').modal('hide');
            loadCalls();
        }
    });
}
/*************************CRM CALLS MANAGEMENT END*************************** */

/*************************CRM APPOINTMENT MANAGEMENT START*************************** */
async function loadAppointments() {
    // TODO: FETCH APPOINTMENTS DATA FROM API AND LOAD...
    // const response = await fetch('/api/customer/quotes/' + customerId);
    // const r = await response.json();
    $("#appointmentsList").dxDataGrid({
        dataSource: crmData.appointments,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 300,
            placeholder: "Cerca..."
        },
        noDataText: "Nessun record trovato per le appuntamento",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                alignment: "left",
                width: 120,
            },
            {
                dataField: "date",
                caption: "Data creazione",
                allowFiltering: true,
                width: 130,
                // sortIndex: 5, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let date = data.date.split('T')[0];
                    date = date.split('-');
                    container.text(date[2] + '/' + date[1] + '/' + date[0] + ' ' + data.date.split('T')[1]);
                }
            },
            {
                dataField: "type",
                caption: "Tipo",
                // allowFiltering: true,
            },
            {
                dataField: "note",
                caption: "Note",
                // allowFiltering: true,
                cellTemplate: function (container, options) {
                    container.html(options.data.note);
                }
            },
            {
                dataField: "",
                caption: "Azioni",
                allowFiltering: true,
                width: 60,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-2" onclick="showNewAppointmentModal(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteAppointment(${options.data.id})"></i>
                        `;
                    container.html(html);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 5 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                {
                    name: "searchPanel",
                    location: "before"
                },
                "groupPanel",
            ]
        },
        onRowClick: function (e) {
            // if (e.rowType === "data") window.location = `/estimate/${e.data.id}`;
        },
    });
}

function showNewAppointmentModal(id = null) {
    if (id === null) {
        document.getElementById('modalAddAppointmentLabel').innerHTML = `<i class="bi bi-calendar me-3"></i>Nuovo appuntamento`;
        document.getElementById('txtAppointmentDate').value = '';
        document.getElementById('txtAppointmentType').value = '';
        $("#txtAppointmentNote").dxHtmlEditor('instance').option('value', '');
        document.getElementById('btnSaveAppointment').classList.remove('d-none');
        document.getElementById('btnUpdateAppointment').classList.add('d-none');
    } else {
        const appointment = crmData.appointments.find(a => a.id === id.toString());
        document.getElementById('modalAddAppointmentLabel').innerHTML = `<i class="bi bi-calendar me-3"></i>Modifica appuntamento`;
        document.getElementById('hAppointmentId').value = id;
        document.getElementById('txtAppointmentDate').value = appointment.date;
        document.getElementById('txtAppointmentType').value = appointment.type;
        $("#txtAppointmentNote").dxHtmlEditor('instance').option('value', appointment.note);
        document.getElementById('btnSaveAppointment').classList.add('d-none');
        document.getElementById('btnUpdateAppointment').classList.remove('d-none');
    }
    const modalElement = document.getElementById("modalAddAppointment");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function saveAppointment(btn) {
    const date = document.getElementById('txtAppointmentDate').value;
    const type = document.getElementById('txtAppointmentType').value;
    const note = $("#txtAppointmentNote").dxHtmlEditor('instance').option('value');
    if (!date || !type || !note) {
        if (date === '') { showMessage('Il campo data è obbligatorio', 'crmAppointmentResult', 'text-danger'); return; }
        if (type === '') { showMessage('Il campo tipo è obbligatorio', 'crmAppointmentResult', 'text-danger'); return; }
        if (note === '') { showMessage('Il campo note è obbligatorio', 'crmAppointmentResult', 'text-danger'); return; }
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SEND CALL DATA TO API AND SAVE...
    const id = Date.now().toString();
    crmData.appointments.push({ id: id, date: date, type: type, note: note });
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddAppointment').modal('hide');
    $("#appointmentsList").dxDataGrid("dispose");
    $("#appointmentsList").empty();
    loadAppointments();
}

function updateAppointment(btn) {
    const id = document.getElementById('hAppointmentId').value;
    const date = document.getElementById('txtAppointmentDate').value;
    const type = document.getElementById('txtAppointmentType').value;
    const note = $("#txtAppointmentNote").dxHtmlEditor('instance').option('value');
    if (!date || !type || !note) {
        if (date === '') { showMessage('Il campo data è obbligatorio', 'crmAppointmentResult', 'text-danger'); return; }
        if (type === '') { showMessage('Il campo tipo è obbligatorio', 'crmAppointmentResult', 'text-danger'); return; }
        if (note === '') { showMessage('Il campo note è obbligatorio', 'crmAppointmentResult', 'text-danger'); return; }
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SEND APPOINTMENT DATA TO API AND UPDATE...
    const appointmentToUpdate = crmData.appointments.find(appointment => appointment.id === id);
    if (appointmentToUpdate) {
        appointmentToUpdate.date = date;
        appointmentToUpdate.type = type;
        appointmentToUpdate.note = note;
    }
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddAppointment').modal('hide');
    $("#appointmentsList").dxDataGrid("dispose");
    $("#appointmentsList").empty();
    loadAppointments();
}

function deleteAppointment(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            // TODO: DELETE APPOINTMENT API...
            crmData.appointments = crmData.appointments.filter(appointment => appointment.id !== id.toString());
            $("#appointmentsList").dxDataGrid("dispose");
            $("#appointmentsList").empty();
            $('#modalConfirmDelete').modal('hide');
            loadAppointments();
        }
    });
}
/*************************CRM APPOINTMENT MANAGEMENT END*************************** */

/*************************CRM EMAILS MANAGEMENT START*************************** */
async function loadEmails() {
    // TODO: FETCH APPOINTMENTS DATA FROM API AND LOAD...
    // const response = await fetch('/api/customer/quotes/' + customerId);
    // const r = await response.json();
    $("#emailsList").dxDataGrid({
        dataSource: crmData.emails,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 300,
            placeholder: "Cerca..."
        },
        noDataText: "Nessun record trovato per le email",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                alignment: "left",
                width: 120,
            },
            {
                dataField: "date",
                caption: "Data",
                allowFiltering: true,
                width: 130,
                // sortIndex: 5, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let date = data.date.split('T')[0];
                    date = date.split('-');
                    container.text(date[2] + '/' + date[1] + '/' + date[0] + ' ' + data.date.split('T')[1]);
                }
            },
            {
                dataField: "subject",
                caption: "Soggetto",
                // allowFiltering: true,
            },
            {
                dataField: "recipients",
                caption: "Destinatari",
                // allowFiltering: true,
            },
            {
                dataField: "content",
                caption: "Contenuto",
                // allowFiltering: true,
                cellTemplate: function (container, options) {
                    container.html(options.data.content);
                }
            },
            {
                dataField: "",
                caption: "Azioni",
                allowFiltering: true,
                width: 60,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-2" onclick="showNewEmailModal(${options.data.id})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteEmail(${options.data.id})"></i>
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
                {
                    name: "searchPanel",
                    location: "before"
                },
                "groupPanel",
            ]
        },
        onRowClick: function (e) {
            // if (e.rowType === "data") window.location = `/estimate/${e.data.id}`;
        },
    });
}

function showNewEmailModal(id = null) {
    if (id === null) {
        document.getElementById('modalAddEmailLabel').innerHTML = `<i class="bi bi-envelope me-3"></i>Nuova email`;
        document.getElementById('txtEmailDate').value = '';
        document.getElementById('txtEmailSubject').value = '';
        document.getElementById('txtEmailRecipients').value = '';
        $("#txtEmailContent").dxHtmlEditor('instance').option('value', '');
        document.getElementById('btnSaveEmail').classList.remove('d-none');
        document.getElementById('btnUpdateEmail').classList.add('d-none');
    } else {
        const email = crmData.emails.find(e => e.id === id.toString());
        document.getElementById('modalAddEmailLabel').innerHTML = `<i class="bi bi-envelope me-3"></i>Modifica email`;
        document.getElementById('hEmailId').value = id;
        const formatedDate = toDatetimeLocal(email.date);
        document.getElementById('txtEmailDate').value = formatedDate;
        document.getElementById('txtEmailSubject').value = email.subject;
        document.getElementById('txtEmailRecipients').value = email.recipients;
        $("#txtEmailContent").dxHtmlEditor('instance').option('value', email.content);
        document.getElementById('btnSaveEmail').classList.add('d-none');
        document.getElementById('btnUpdateEmail').classList.remove('d-none');
    }
    const modalElement = document.getElementById("modalAddEmail");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function saveEmail(btn) {
    const date = document.getElementById('txtEmailDate').value;
    const subject = document.getElementById('txtEmailSubject').value;
    const recipients = document.getElementById('txtEmailRecipients').value;
    const content = $("#txtEmailContent").dxHtmlEditor('instance').option('value');
    if (!date || !subject || !recipients || !content) {
        if (date === '') { showMessage('Il campo data è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
        if (subject === '') { showMessage('Il campo soggetto è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
        if (recipients === '') { showMessage('Il campo destinatari è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
        if (content === '') { showMessage('Il campo contenuto è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
    }
    if (!isValidEmail(recipients)) {
        showMessage('Uno o più indirizzi email non sono validi', 'crmEmailResult', 'text-danger');
        return;
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SEND CALL DATA TO API AND SAVE...
    const id = Date.now().toString();
    crmData.emails.push({ id: id, date: date, subject: subject, recipients: recipients, content: content });
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddEmail').modal('hide');
    $("#emailsList").dxDataGrid("dispose");
    $("#emailsList").empty();
    loadEmails();
}

function updateEmail(btn) {
    const id = document.getElementById('hEmailId').value;
    const date = document.getElementById('txtEmailDate').value;
    const subject = document.getElementById('txtEmailSubject').value;
    const recipients = document.getElementById('txtEmailRecipients').value;
    const content = $("#txtEmailContent").dxHtmlEditor('instance').option('value');
    if (!date || !subject || !recipients || !content) {
        if (date === '') { showMessage('Il campo data è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
        if (subject === '') { showMessage('Il campo soggetto è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
        if (recipients === '') { showMessage('Il campo destinatari è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
        if (content === '') { showMessage('Il campo contenuto è obbligatorio', 'crmEmailResult', 'text-danger'); return; }
    }
    if (!isValidEmail(recipients)) {
        showMessage('Uno o più indirizzi email non sono validi', 'crmEmailResult', 'text-danger');
        return;
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    // TODO: SEND CALL DATA TO API AND UPDATE...
    const emailToUpdate = crmData.emails.find(email => email.id === id);
    if (emailToUpdate) {
        emailToUpdate.date = date;
        emailToUpdate.subject = subject;
        emailToUpdate.recipients = recipients;
        emailToUpdate.content = content;
    }
    btn.disabled = false;
    btn.lastElementChild.classList.add('d-none');
    $('#modalAddEmail').modal('hide');
    $("#emailsList").dxDataGrid("dispose");
    $("#emailsList").empty();
    loadEmails();
}

function deleteEmail(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            // TODO: DELETE EMAIL API...
            crmData.emails = crmData.emails.filter(email => email.id !== id.toString());
            $("#emailsList").dxDataGrid("dispose");
            $("#emailsList").empty();
            $('#modalConfirmDelete').modal('hide');
            loadEmails();
        }
    });
}
/*************************CRM EMAILS MANAGEMENT END*************************** */