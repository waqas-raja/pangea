document.addEventListener("DOMContentLoaded", async () => {
    loadAssocaitedQuotes();
    loadNations();
    loadPropertyStatus();
    loadCustomers();
    // await loadOpportunities();
    await loadPropertyDetail();
});

async function loadAssocaitedQuotes() {
    const response = await fetch(`/api/property/${propertyId}/quotes`);
    const d = await response.json();
    const hasData = d.payload.length > 0;
    $("#associatedQuotesList").dxDataGrid({
        dataSource: d.payload,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 450,
            placeholder: "Cerca..."
        },
        noDataText: "Non ci sono preventivi associati registrati per questo immobile.",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id", 
                caption: "Id preventivo",
                alignment: "left",
                width: 150,
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = '#' + data.id;
                    container.text(text);
                }
            },
            {
                dataField: "",
                caption: "Cliente",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = data.customer_name + ' ' + data.customer_surname;
                    container.text(text);
                }
            },
            { 
                dataField: "dtcr",
                caption: "Data creazione",
                allowFiltering: true,
                // sortIndex: 5, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let date = data.dtcr.split(' ')[0];
                    date = date.split('-');
                    container.text(date[2] + '/' + date[1] + '/' + date[0]);
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
            if (e.rowType === "data") { window.location.href = `/estimate/${e.data.id}`; }
        },
    });
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

async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
    let ctrl = document.getElementById("ddlCustomer");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(customer => {
        if (customer.bizname !== "" && customer.bizname !== null) opt += `<option value="${customer.id}">${customer.bizname}</option>`;
        else opt += `<option value="${customer.id}">${customer.name} ${customer.surname}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadOpportunities() {
    const response = await fetch('/api/opportunities');
    const r = await response.json();
    let ctrl = document.getElementById("ddlOpportunity");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(p => {
        opt += `<option value="${p.id}">${p.alias}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadPropertyDetail() {
    const response = await fetch('/api/property/' + propertyId);
    const r = await response.json();
    document.getElementById("spCustomer").innerText = (r.payload.customer_bizname !== null ? r.payload.customer_bizname : r.payload.customer_name + ' ' + r.payload.customer_surname) ?? 'n.d.';
    // document.getElementById("spOpportunity").innerText = r.payload.opportunity ?? 'n.d.';
    document.getElementById("spAlias").innerText = r.payload.alias ?? 'n.d.';
    document.getElementById("spState").innerText = r.payload.nation_name ?? 'n.d.';
    document.getElementById("spCity").innerText = r.payload.city ?? 'n.d.';
    document.getElementById("spAddress").innerText = r.payload.address ?? 'n.d.';
    document.getElementById("spZip").innerText = r.payload.cap ?? 'n.d.';
    document.getElementById("spStreet").innerText = 'n.d.';
    document.getElementById("spDistrict").innerText = 'n.d.';
    document.getElementById("spPropertyStatus").innerText = r.payload.property_status_name ?? 'n.d.';
    document.getElementById("spSize").innerText = r.payload.size ? parseInt(r.payload.size) + ' (mq)' : 'n.d.';
    document.getElementById("spFloor").innerText = r.payload.floor ?? 'n.d.';
    document.getElementById("spRoom").innerText = r.payload.rooms ? r.payload.rooms : "No";
    document.getElementById("spBathroom").innerText = r.payload.bathrooms ? r.payload.bathrooms : "No";
    document.getElementById("spGarden").innerText = r.payload.garden ? r.payload.garden : "No";
    document.getElementById("spBox").innerText = r.payload.box ? r.payload.box : "No";
    document.getElementById("spElevator").innerText = r.payload.elevator ? "Yes" : "No";
    document.getElementById("spAcqPrice").innerText = formatNumber(parseInt(r.payload.acquisition_price)) ?? formatNumber(0);
    document.getElementById("spRenPrice").innerText = formatNumber(parseInt(r.payload.renovation_price)) ?? formatNumber(0);
    document.getElementById("spExtraPrice").innerText = formatNumber(parseInt(r.payload.renovation_price)) ?? formatNumber(0);
    document.getElementById("spSellPrice").innerText = formatNumber(parseInt(r.payload.sell_price)) ?? formatNumber(0);

    document.getElementById("ddlCustomer").value = r.payload.customer ?? '';
    // document.getElementById("ddlOpportunity").value = r.payload.opportunity ?? ''
    document.getElementById("txtAlias").value = r.payload.alias ?? '';
    document.getElementById("ddlState").value = r.payload.nation ?? '';
    document.getElementById("txtCity").value = r.payload.city ?? '';
    document.getElementById("txtAddress").value = r.payload.address ?? '';
    document.getElementById("txtZip").value = r.payload.cap ?? '';
    document.getElementById("ddlPropertyStatus").value = r.payload.property_status ?? '';
    document.getElementById("txtSize").value = r.payload.size ?? '';
    document.getElementById("txtFloor").value = r.payload.floor ?? '';
    document.getElementById("txtRoom").value = r.payload.rooms;
    document.getElementById("txtBathroom").value = r.payload.bathrooms;
    document.getElementById("txtGarden").value = r.payload.garden;
    document.getElementById("txtBox").value = r.payload.box;
    document.getElementById("txtElevator").checked = r.payload.elevator ? true : false;
    document.getElementById("txtAcqPrice").value = r.payload.acquisition_price ?? '';
    document.getElementById("txtRenPrice").value = r.payload.renovation_price ?? '';
    document.getElementById("txtExtraPrice").value = r.payload.renovation_price ?? '';
    document.getElementById("txtSellPrice").value = r.payload.sell_price ?? '';
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
    let result = document.getElementById('errMessage');
    result.innerText = '';
    const customer = document.getElementById("ddlCustomer").value;
    // const opportunity = document.getElementById("ddlOpportunity").value;
    const alias = document.getElementById("txtAlias").value.trim();
    const nation = document.getElementById("ddlState").value;
    const city = document.getElementById("txtCity").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const zip = document.getElementById("txtZip").value.trim();
    const street = document.getElementById("txtStreet").value.trim();
    const district = document.getElementById("txtDistrict").value.trim();
    const propertyStatus = document.getElementById("ddlPropertyStatus").value;
    const size = document.getElementById("txtSize").value.trim();
    const floor = document.getElementById("txtFloor").value.trim();
    const room = parseInt(document.getElementById("txtRoom").value.trim());
    const bathroom = parseInt(document.getElementById("txtBathroom").value.trim());
    const garden = parseInt(document.getElementById("txtGarden").value.trim());
    const box = parseInt(document.getElementById("txtBox").value.trim());
    const elevator = document.getElementById("txtElevator").checked === true ? 1 : 0;
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const renPrice = document.getElementById("txtRenPrice").value.trim();
    const extraPrice = document.getElementById("txtExtraPrice").value.trim();
    const sellPrice = document.getElementById("txtSellPrice").value.trim();
    if (alias === '' || nation === '' || city === '' || address === '' || size === '' || zip === '' || propertyStatus === '' || floor === '' || acqPrice === '' || renPrice === '' || extraPrice === '' || sellPrice === '' || street === '' || district === '') {
        btn.disabled = false;
        if (alias === '') { result.innerText = "L'alias è obbligatorio"; return; }
        if (nation === '') { result.innerText = "La nazione è obbligatoria"; return; }
        if (address === '') { result.innerText = "L'indirizzo è obbligatorio"; return; }
        if (city === '') { result.innerText = "La città è obbligatoria"; return; }
        if (zip === '') { result.innerText = "Il codice postale è obbligatorio con un numero valido"; return; }
        if (street === '') { result.innerText = "La strada è obbligatoria"; return; }
        if (district === '') { result.innerText = "È necessario il distretto"; return; }
        if (propertyStatus === '') { result.innerText = "Lo stato della proprietà è obbligatorio"; return; }
        if (size === '') { result.innerText = "La Taglia è obbligatoria con un numero valido"; return; }
        if (floor === '') { result.innerText = "Il pavimento è obbligatorio con un numero valido"; return; }
        if (acqPrice === '') { result.innerText = "Il prezzo di acquisizione è richiesto con un numero valido"; return; }
        if (renPrice === '') { result.innerText = "Il prezzo di ristrutturazione è richiesto con un numero valido"; return; }
        if (extraPrice === '') { result.innerText = "Il prezzo di extra è richiesto con un numero valido"; return; }
        if (sellPrice === '') { result.innerText = "Il prezzo di vendita è obbligatorio con un numero valido"; return; }
    }
    if (city !== "" && !isValidLetter(city)) {
        result.textContent = "Per la città sono accettate solo lettere.";
        btn.disabled = false;
        return;
    }
    if (district !== "" && !isValidLetter(district)) {
        result.textContent = "Per il distretto si accettano solo lettere.";
        btn.disabled = false;
        return;
    }
    if (zip !== "" && !isValidZip(zip)) {
        result.textContent = "È richiesto il codice postale con un numero valido.";
        btn.disabled = false;
        return;
    }
    if ((size !== '' && !isValidateNumber(parseInt(size))) || parseInt(size) <= 0) {
        result.classList.remove("d-none");
        result.innerText = 'La dimensione non è un numero valido';
        return;
    }
    if ((floor !== '' && !isValidateNumber(parseInt(floor))) || parseInt(floor) <= 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il piano non è un numero valido';
        return;
    }
    if ((room !== '' && !isValidateNumber(parseInt(room))) || parseInt(room) <= 0) {
        result.classList.remove("d-none");
        result.innerText = 'La stanza non è un numero valido';
        return;
    }
    if ((bathroom !== '' && !isValidateNumber(parseInt(bathroom))) || parseInt(bathroom) <= 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il bagno non è un numero valido';
        return;
    }
    if ((garden !== '' && !isValidateNumber(parseInt(garden))) || parseInt(garden) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il giardino non è un numero valido';
        return;
    }
    if ((box !== '' && !isValidateNumber(parseInt(box))) || parseInt(box) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il garage non è un numero valido';
        return;
    }
    if (!isValidateNumber(parseInt(acqPrice)) || parseInt(acqPrice) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il costo di acquisizione non è un numero valido';
        return;
    }
    if (!isValidateNumber(parseInt(renPrice)) || parseInt(renPrice) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il costo di ristrutturazione non è un numero valido';
        return;
    }
    if (!isValidateNumber(parseInt(extraPrice)) || parseInt(extraPrice) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il costo di extra non è un numero valido';
        return;
    }
    if (!isValidateNumber(parseInt(sellPrice))) {
        result.classList.remove("d-none");
        result.innerText = 'l prezzo di vendita non è un numero valido';
        return;
    }
    if (parseInt(sellPrice) < (parseInt(acqPrice) + parseInt(renPrice) + parseInt(extraPrice))) {
        result.classList.remove("d-none");
        result.innerText = 'Il prezzo di vendita deve essere superiore alla somma di tutti i costi.';
        return;
    }
    try {
        btn.disabled = true;
        const response = await fetch("/api/property/" + propertyId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer: customer,
                alias: alias,
                nation: nation,
                city: city,
                address: address,
                zip: zip,
                street: street,
                district: district,
                propertyStatus: parseInt(propertyStatus),
                size: size,
                floor: floor,
                room: room,
                bathroom: bathroom,
                garden: garden,
                box: box,
                elevator: elevator,
                acqPrice: parseInt(acqPrice),
                renPrice: parseInt(renPrice),
                extraPrice: parseInt(extraPrice),
                sellPrice: parseInt(sellPrice),
            })
        });
        const res = await response.json();
        btn.disabled = false;
        if (res.result) {
            await loadPropertyDetail();
            cancelEditGeneralInfo();
        } else result.innerText = "Si sono verificati degli errori";
    } catch (error) {
        result.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

async function deleteModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const response = await fetch("/api/property/" + propertyId, { method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    window.location = `/properties`;
                } else throw new Error("Error while deleting Property!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}
