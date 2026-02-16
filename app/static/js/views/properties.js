let _marginalPercentage = 0;
const earningsData = [
    { propertyId: 1, alias: "Building A", month: "2024-01", amount: 12000 },
    { propertyId: 1, alias: "Building A", month: "2024-02", amount: 13500 },
    { propertyId: 1, alias: "Building A", month: "2024-03", amount: 11000 },

    { propertyId: 2, alias: "Mall Portfolio", month: "2024-01", amount: 8000 },
    { propertyId: 2, alias: "Mall Portfolio", month: "2024-02", amount: 9000 },
    { propertyId: 2, alias: "Mall Portfolio", month: "2024-03", amount: 9500 }
];

const chartInstance = $("#earningsChart").dxChart({
    dataSource: [],
    commonSeriesSettings: {
        argumentField: "month",
        type: "line"
    },
    series: [{
        valueField: "amount",
        name: "Earnings (€)"
    }],
    tooltip: {
        enabled: true,
        customizeTooltip(info) {
            const data = info.point.data;
            return {
                html: `
                <strong>${data.alias}</strong><br/>
                Month: ${data.month}<br/>
                Earnings: € ${data.amount.toLocaleString()}
            `};
        }
    },
    argumentAxis: {
        valueMarginsEnabled: false
    },
    valueAxis: {
        label: {
            format: "currency"
        }
    },
    legend: {
        visible: true
    }
}).dxChart("instance");

document.addEventListener("DOMContentLoaded", async () => {
    await loadProperties();
    loadPropertyTypes();
    loadNations();
    loadCustomers();

    setTimeout(() => { calculateMarginalPercentage(); }, 300);
    document.getElementById('txtSellPrice').addEventListener('keyup', calculateMarginalPercentage);
    document.getElementById('txtExtraPrice').addEventListener('keyup', calculateMarginalPercentage);
    document.getElementById('txtAcqPrice').addEventListener('keyup', calculateMarginalPercentage);
    document.getElementById('txtRenPrice').addEventListener('keyup', calculateMarginalPercentage);

    $("#propertySelect").dxSelectBox({
        width: 220,
        placeholder: "Select property",
        dataSource: [
            { id: 0, name: "All Properties" },
            { id: 1, name: "Building A" },
            { id: 2, name: "Mall Portfolio" }
        ],
        displayExpr: "name",
        valueExpr: "id",
        value: 0,
        onValueChanged: reloadChart
    });

    $("#rangeSelect").dxSelectBox({
        width: 160,
        dataSource: [
            { id: 6, text: "Last 6 months" },
            { id: 12, text: "Last 12 months" },
            { id: "custom", text: "Custom" }
        ],
        displayExpr: "text",
        valueExpr: "id",
        value: 'custom',
        onValueChanged(e) {
            $("#dateRange").toggle(e.value === "custom");
            reloadChart();
        }
    });

    $("#dateRange").dxDateRangeBox({
        width: 240,
        visible: false,
        onValueChanged: reloadChart
    });

    reloadChart();

});

async function loadProperties() {
    const response = await fetch('/api/properties');
    const r = await response.json();
    const hasData = r.payload.length > 0;
    // $("#propertyGrid").dxDataGrid({
    //     dataSource: r.payload,
    //     keyExpr: "id",
    //     showBorders: true,
    //     columnAutoWidth: true,
    //     showBorders: true,
    //     noDataText: "Non ci sono proprietà registrate",
    //     rowAlternationEnabled: false,
    //     grouping: { autoExpandAll: false },
    //     groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
    //     filterRow: { visible: hasData, applyFilter: "auto" },
    //     headerFilter: { visible: false },
    //     columns: [
    //         { dataField: "alias", caption: "Alias", sortIndex: 0,
    //             // sortOrder: "asc"
    //         },
    //         { dataField: "", caption: "Tipo di immobile", sortIndex: 1 },
    //         { dataField: "nation_name", caption: "Nazione", sortIndex: 2 },
    //         {
    //             dataField: "size",
    //             caption: "Voltura",
    //             sortIndex: 3,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 container.text(data.size + ' (mq)');
    //             }
    //         },
    //         {
    //             dataField: "rooms",
    //             caption: "Ipoteca",
    //             sortIndex: 3,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 container.text(data.rooms);
    //             }
    //         },
    //         // { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 3, sortOrder: "asc" },
    //         {
    //             dataField: "acquisition_price",
    //             caption: "Costo di acquisizione",
    //             sortIndex: 4,
    //             width: 200,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 container.text(formatNumber(parseFloat(data.acquisition_price)));
    //             }
    //         },
    //         {
    //             dataField: "renovation_price",
    //             caption: "Costo di ristrutturazione",
    //             sortIndex: 5,
    //             width: 200,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 container.text(formatNumber(parseFloat(data.renovation_price)));
    //             }
    //         },
    //         {
    //             dataField: "sell_price",
    //             caption: "Prezzo vendita",
    //             sortIndex: 6,
    //             width: 200,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 container.text(formatNumber(parseFloat(data.sell_price)));
    //             }
    //         },
    //     ],
    //     sorting: { mode: "multiple" },
    //     remoteOperations: { paging: true, filtering: true, sorting: false },
    //     paging: { pageSize: 10 },
    //     pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
    //     toolbar: {
    //         // items: [
    //         //     "groupPanel",
    //         //     "searchPanel",
    //         // ]
    //     },
    //     onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
    // });
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
            headerFilter: { visible: false },
            columns: [
                { dataField: "alias", caption: "Alias", width: 150, sortIndex: 0 },
                { dataField: "property_type", caption: "Tipo di immobile", sortIndex: 1 },
                { dataField: "nation_name", caption: "Nazione", sortIndex: 2 },
                {
                    dataField: "size",
                    caption: "Voltura",
                    sortIndex: 3,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(data.size + ' (mq)');
                    }
                },
                {
                    dataField: "rooms",
                    caption: "Ipoteca",
                    sortIndex: 3,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(data.rooms);
                    }
                },
                // { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 3 },
                {
                    dataField: "acquisition_price", caption: "Costo di acquisizione", sortIndex: 4,
                    width: 200,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(formatNumber(parseFloat(data.acquisition_price)));
                    }
                },
                {
                    dataField: "renovation_price", caption: "Costo di ristrutturazione", sortIndex: 5,
                    width: 200,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(formatNumber(parseFloat(data.renovation_price)));
                    }
                },
                {
                    dataField: "sell_price", caption: "Prezzo vendita", sortIndex: 6,
                    width: 200,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(formatNumber(parseFloat(data.sell_price)));
                    }
                },
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
    return;
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
            headerFilter: { visible: false },
            columns: [
                { dataField: "alias", caption: "Alias", sortIndex: 0 },
                { dataField: "", caption: "Tipo di immobile", sortIndex: 1 },
                { dataField: "nation_name", caption: "Nazione", sortIndex: 2 },
                {
                    dataField: "size",
                    caption: "Voltura",
                    sortIndex: 3,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(data.size + ' (mq)');
                    }
                },
                {
                    dataField: "rooms",
                    caption: "Ipoteca",
                    sortIndex: 3,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(data.rooms);
                    }
                },
                // { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 3 },
                {
                    dataField: "acquisition_price", caption: "Costo di acquisizione", sortIndex: 4,
                    width: 200,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(formatNumber(parseFloat(data.acquisition_price)));
                    }
                },
                {
                    dataField: "renovation_price", caption: "Costo di ristrutturazione", sortIndex: 5,
                    width: 200,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(formatNumber(parseFloat(data.renovation_price)));
                    }
                },
                {
                    dataField: "sell_price", caption: "Prezzo vendita", sortIndex: 6,
                    width: 200,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        container.text(formatNumber(parseFloat(data.sell_price)));
                    }
                },
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

async function loadPropertyTypes() {
    const response = await fetch('/api/property-types');
    const r = await response.json();
    let ctrl = document.getElementById("ddlPropertyType");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona id tipo</option>';
    r.payload.forEach(t => {
        opt += `<option value="${t.id}">${t.name}</option>`;
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

async function saveProperty() {
    const btn = document.getElementById("btnSaveProperty");
    const spinner = document.getElementById("spinnerNewProperty");
    const alias = document.getElementById("txtAlias").value.trim();
    const propertyType = document.getElementById("ddlPropertyType").value;
    const customer = document.getElementById("ddlCustomer").value;
    const nation = document.getElementById("ddlState").value;
    const city = document.getElementById("txtCity").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const zip = document.getElementById("txtZip").value.trim();
    const size = document.getElementById("txtSize").value.trim();
    const floor = document.getElementById("txtFloor").value.trim();
    const room = parseInt(document.getElementById("txtRoom").value.trim());
    const bath = parseInt(document.getElementById("txtBathroom").value.trim());
    const garden = parseInt(document.getElementById("txtGarden").value.trim());
    const box = parseInt(document.getElementById("txtBox").value.trim());
    const elevator = document.getElementById("txtElevator").checked === true ? 1 : 0;
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const renPrice = document.getElementById("txtRenPrice").value.trim();
    const extraPrice = document.getElementById("txtExtraPrice").value.trim();
    const sellPrice = document.getElementById("txtSellPrice").value.trim();
    const result = document.getElementById("spNewPropertyResult");
    result.innerHTML = '';
    result.classList.add("d-none");
    if (alias === '' || customer === '' || nation === '' || address === '' || city === '' || zip === '' || size === "" || floor === "" || acqPrice === "" || propertyType === "") {
        result.classList.remove("d-none");
        if (alias === '') { result.innerText = "L'alias è obbligatorio"; return; }
        if (customer === '') { result.innerText = "Il cliente è obbligatorio"; return; }
        if (propertyType === '') { result.innerText = "Il tipo di proprietà è obbligatorio"; return; }
        if (address === '') { result.innerText = "L'indirizzo è obbligatorio"; return; }
        if (city === '') { result.innerText = "La città è obbligatoria"; return; }
        if (zip === '') { result.innerText = "Il codice postale è obbligatorio con un numero valido"; return; }
        if (size === '') { result.innerText = "La Taglia è obbligatoria con un numero valido"; return; }
        if (floor === '') { result.innerText = "Il pavimento è obbligatorio con un numero valido"; return; }
        if (acqPrice === '') { result.innerText = "Il prezzo di acquisizione è richiesto con un numero valido"; return; }
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
    if ((room !== '' && !isValidateNumber(room)) || room <= 0) {
        result.classList.remove("d-none");
        result.innerText = 'La stanza non è un numero valido';
        return;
    }
    if ((bath !== '' && !isValidateNumber(bath)) || bath <= 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il bagno non è un numero valido';
        return;
    }
    if ((garden !== '' && !isValidateNumber(garden)) || garden < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il giardino non è un numero valido';
        return;
    }
    if ((box !== '' && !isValidateNumber(box)) || box < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il garage non è un numero valido';
        return;
    }
    if (!isValidateNumber(acqPrice) || parseInt(acqPrice) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il costo di acquisizione non è un numero valido';
        return;
    }
    if (!isValidateNumber(renPrice) || parseInt(renPrice) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il costo di ristrutturazione non è un numero valido';
        return;
    }
    if (!isValidateNumber(extraPrice) || parseInt(extraPrice) < 0) {
        result.classList.remove("d-none");
        result.innerText = 'Il costo di extra non è un numero valido';
        return;
    }
    if (!isValidateNumber(sellPrice)) {
        result.classList.remove("d-none");
        result.innerText = 'l prezzo di vendita non è un numero valido';
        return;
    }
    if (parseInt(sellPrice) < (parseInt(acqPrice) + parseInt(renPrice) + parseInt(extraPrice))) {
        result.classList.remove("d-none");
        result.innerText = 'Il prezzo di vendita deve essere superiore alla somma di tutti i costi.';
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    try {
        const response = await fetch("/api/property", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "alias": alias, "customer": customer, "propertyType": propertyType, "nation": nation, "city": city, "address": address, "zip": zip, "propertyStatus": 3, "size": size, "floor": floor, "room": room, "bathroom": bath, "garden": garden, "box": box, "elevator": elevator, "acqPrice": acqPrice, "renPrice": renPrice, "extraPrice": extraPrice, "sellPrice": sellPrice })
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

function calculateMarginalPercentage() {
    const acqCost = parseFloat(document.getElementById('txtAcqPrice').value) || 0;
    const renCost = parseFloat(document.getElementById('txtRenPrice').value) || 0;
    const extraCost = parseFloat(document.getElementById('txtExtraPrice').value) || 0;
    const sellPrice = parseFloat(document.getElementById('txtSellPrice').value) || 0;
    _marginalPercentage = (((sellPrice - (acqCost + renCost + extraCost)) / (acqCost + renCost + extraCost)) * 100);
    if (isNaN(_marginalPercentage)) _marginalPercentage = 0;
    document.getElementById('txtMarginalPercentage').value = _marginalPercentage.toFixed(2);
}

function reloadChart() {
    const propertyId = $("#propertySelect").dxSelectBox("instance").option("value");
    const range = $("#rangeSelect").dxSelectBox("instance").option("value");
    const customRange = $("#dateRange").dxDateRangeBox("instance").option("value");

    let filtered = [...earningsData];
    // Property filter
    if (propertyId && propertyId !== 0) {
        filtered = filtered.filter(x => x.propertyId === propertyId);
    }
    // Time range filter
    if (range !== "custom") {
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - range);
        filtered = filtered.filter(x =>
            new Date(x.month + "-01") >= cutoff
        );
    } else if (customRange && customRange[0]) {
        filtered = filtered.filter(x => {
            const d = new Date(x.month + "-01");
            return d >= customRange[0] && d <= customRange[1];
        });
    }
    chartInstance.option("dataSource", filtered);
}
