let _customerDetail = [];
document.addEventListener("DOMContentLoaded", async () => {
    await loadCustomerDetail();
    loadAssociatedProperties();
    loadAssociatedQuotes();
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
        if (phone === "") { err.textContent = "È richiesto il telefono con un numero valido"; return; }
        if (address === "") { err.textContent = "L'indirizzo è obbligatorio"; return; }
        if (city === "") { err.textContent = "La città è obbligatoria"; return; }
        if (zip === "") { err.textContent = "È richiesto il codice postale con un numero valido"; return; }
        if (state === "") { err.textContent = "Lo Stato è obbligatorio"; return; }
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