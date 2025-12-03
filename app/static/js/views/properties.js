document.addEventListener("DOMContentLoaded", async () => {
    await loadNations();
    await loadPropertyStatus();
    await loadProperties();
});

async function loadProperties() {
    const response = await fetch('/api/properties');
    const r = await response.json();
    const hasData = r.payload.length > 0;
    $("#propertyGrid").dxDataGrid({
        dataSource: r.payload,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non ci sono proprietà registrate",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        columns: [
            // {
            //     caption: "Nome",
            //     allowFiltering: true,
            //     sortIndex: 1, sortOrder: "asc",
            //     cellTemplate: function (container, options) {
            //         const data = options.data;
            //         const text = data.bizname !== '' && data.bizname !== undefined && data.bizname !== null
            //             ? data.bizname
            //             : `${data.surname} ${data.name}`;
            //         container.text(text);
            //     }
            // },
            { dataField: "alias", caption: "Alias", sortIndex: 0, sortOrder: "asc" },
            { dataField: "", caption: "Tipo di immobile", sortIndex: 1},
            { dataField: "nation_name", caption: "Nation", sortIndex: 2, sortOrder: "asc" },
            { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 3, sortOrder: "asc" },
            { dataField: "acquisition_price", caption: "Prezzo acquisizione", sortIndex: 4, sortOrder: "asc" },
            { dataField: "renovation_price", caption: "Prezzo rinnovamento", sortIndex: 5, sortOrder: "asc" },
            { dataField: "sell_price", caption: "Prezzo vendita", sortIndex: 6, sortOrder: "asc" },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            // items: [
            //     "groupPanel",
            //     "searchPanel",
            // ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
    });
    const underManagementProperties = r.payload.filter(p => p.property_status === 3);
    if (underManagementProperties.length > 0) {
        $("#propertyUnderManagemanetGrid").dxDataGrid({
            dataSource: underManagementProperties,
            keyExpr: "id",
            showBorders: true,
            columnAutoWidth: true,
            showBorders: true,
            noDataText: "Non ci sono proprietà registrate per questa categoria",
            rowAlternationEnabled: false,
            grouping: { autoExpandAll: false },
            groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
            filterRow: { visible: underManagementProperties.length > 0, applyFilter: "auto" },
            headerFilter: { visible: underManagementProperties.length > 0 },
            columns: [
                { dataField: "alias", caption: "Alias", sortIndex: 0},
                { dataField: "", caption: "Tipo di immobile", sortIndex: 1},
                { dataField: "nation_name", caption: "Nation", sortIndex: 2 },
                { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 3 },
                { dataField: "acquisition_price", caption: "Prezzo acquisizione", sortIndex: 4 },
                { dataField: "renovation_price", caption: "Prezzo rinnovamento", sortIndex: 5 },
                { dataField: "sell_price", caption: "Prezzo vendita", sortIndex: 6 },
            ],
            sorting: { mode: "multiple" },
            remoteOperations: { paging: true, filtering: true, sorting: false },
            paging: { pageSize: 10 },
            pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
            toolbar: {
                // items: [
                //     "groupPanel",
                //     "searchPanel",
                // ]
            },
            onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
        });
    } else $("#propertyUnderManagemanetGrid").html("<p class='text-center p-4'>Non ci sono proprietà registrate per questa categoria</p>");
    const underEvaluationProperties = r.payload.filter(p => p.property_status === 1);
    if (underEvaluationProperties.length > 0) {
        $("#propertyUnderEvaluationGrid").dxDataGrid({
            dataSource: underEvaluationProperties,
            keyExpr: "id",
            showBorders: true,
            columnAutoWidth: true,
            showBorders: true,
            noDataText: "Non ci sono proprietà registrate per questa categoria",
            rowAlternationEnabled: false,
            grouping: { autoExpandAll: false },
            groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
            filterRow: { visible: underEvaluationProperties.length > 0, applyFilter: "auto" },
            headerFilter: { visible: underEvaluationProperties.length > 0 },
            columns: [
                { dataField: "alias", caption: "Alias", sortIndex: 0},
                { dataField: "", caption: "Tipo di immobile", sortIndex: 1},
                { dataField: "nation_name", caption: "Nation", sortIndex: 2 },
                { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 3 },
                { dataField: "acquisition_price", caption: "Prezzo acquisizione", sortIndex: 4 },
                { dataField: "renovation_price", caption: "Prezzo rinnovamento", sortIndex: 5 },
                { dataField: "sell_price", caption: "Prezzo vendita", sortIndex: 6 },
            ],
            sorting: { mode: "multiple" },
            remoteOperations: { paging: true, filtering: true, sorting: false },
            paging: { pageSize: 10 },
            pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
            toolbar: {
                // items: [
                //     "groupPanel",
                //     "searchPanel",
                // ]
            },
            onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
        });
    } else $("#propertyUnderEvaluationGrid").html("<p class='text-center p-4'>Non ci sono proprietà registrate per questa categoria</p>");
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

async function saveProperty() {
    const btn = document.getElementById("btnSaveProperty");
    const spinner = document.getElementById("spinnerNewProperty");
    const alias = document.getElementById("txtAlias").value.trim();
    const nation = document.getElementById("ddlState").value;
    const city = document.getElementById("txtCity").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const zip = document.getElementById("txtZip").value.trim();
    const status = document.getElementById("ddlPropertyStatus").value;
    const size = document.getElementById("txtSize").value.trim();
    const floor = document.getElementById("txtFloor").value.trim();
    const room = document.getElementById("txtRoom").checked === true ? 1 : 0;
    const bath = document.getElementById("txtBathroom").checked === true ? 1 : 0;
    const garden = document.getElementById("txtGarden").checked === true ? 1 : 0;
    const box = document.getElementById("txtBox").checked === true ? 1 : 0;
    const elevator = document.getElementById("txtElevator").checked === true ? 1 : 0;
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const renPrice = document.getElementById("txtRenPrice").value.trim();
    const extraPrice = document.getElementById("txtExtraPrice").value.trim();
    const sellPrice = document.getElementById("txtSellPrice").value.trim();
    const result = document.getElementById("spNewPropertyResult");
    result.innerHTML = '';
    result.classList.add("d-none");
    if (alias === '' || nation === '' || address === '' || city === '' || zip === '' || status === "" || size === "" || floor === "" || acqPrice === "" || renPrice === "" || extraPrice === "" || sellPrice === "") {
        result.classList.remove("d-none");
        if (alias === '') { result.innerText = "L'alias è obbligatorio"; return; }
        if (nation === '') { result.innerText = "La nazione è obbligatoria"; return; }
        if (address === '') { result.innerText = "L'indirizzo è obbligatorio"; return; }
        if (city === '') { result.innerText = "La città è obbligatoria"; return; }
        if (zip === '') { result.innerText = "Il codice postale è obbligatorio con un numero valido"; return; }
        if (status === '') { result.innerText = "Lo stato della proprietà è obbligatorio"; return; }
        if (size === '') { result.innerText = "La Taglia è obbligatoria con un numero valido"; return; }
        if (floor === '') { result.innerText = "Il pavimento è obbligatorio con un numero valido"; return; }
        if (acqPrice === '') { result.innerText = "Il prezzo di acquisizione è richiesto con un numero valido"; return; }
        if (renPrice === '') { result.innerText = "Il prezzo di ristrutturazione è richiesto con un numero valido"; return; }
        if (extraPrice === '') { result.innerText = "Il prezzo di extra è richiesto con un numero valido"; return; }
        if (sellPrice === '') { result.innerText = "Il prezzo di vendita è obbligatorio con un numero valido"; return; }
    }
    // if (!isValidateNumber(size)) { result.classList.remove("d-none"); result.innerText = 'La dimensione non è un numero valido'; return; }
    // if (!isValidateNumber(floor)) { result.classList.remove("d-none"); result.innerText = 'Il piano non è un numero valido'; return; }
    // if (!isValidateNumber(acqPrice)) { result.classList.remove("d-none"); result.innerText = 'Il prezzo di acquisizione non è un numero valido'; return; }
    // if (!isValidateNumber(renPrice)) { result.classList.remove("d-none"); result.innerText = 'Il prezzo di ristrutturazione non è un numero valido'; return; }
    // if (!isValidateNumber(extraPrice)) { result.classList.remove("d-none"); result.innerText = 'Il prezzo di extra non è un numero valido'; return; }
    // if (!isValidateNumber(sellPrice)) { result.classList.remove("d-none"); result.innerText = 'l prezzo di vendita non è un numero valido'; return; }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    try {
        const response = await fetch("/api/property", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "alias": alias, "nation": nation, "city": city, "address": address, "zip": zip, "propertyStatus": status, "size": size, "floor": floor, "room": room, "bathroom": bath, "garden": garden, "box": box, "elevator": elevator, "acqPrice": acqPrice, "renPrice": renPrice, "extraPrice": extraPrice, "sellPrice": sellPrice })
        });
        const res = await response.json();
        if (res.result) {
            btn.disabled = false;
            spinner.classList.add("d-none");
            $("#modalAddProperty").modal("hide");
            window.location.href = `/property/${res.id}`;
        } else {
            result.innerText = "Si sono verificati degli errori durante il salvataggio";
            btn.disabled = false;
            spinner.classList.remove("d-none");
            result.classList.remove("d-none");
        }
    } catch (error) {
        console.error(error.message);
        result.innerText = "Si è verificato un errore";
        btn.disabled = false;
        spinner.classList.remove("d-none");
        result.classList.remove("d-none");
    }
}

function showModalAddProperty() {
    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}