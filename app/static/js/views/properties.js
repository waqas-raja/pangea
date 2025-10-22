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
        noDataText: "Non risultano immobili registrati per questa sede",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
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
            { dataField: "nation_name", caption: "Nation", sortIndex: 1, sortOrder: "asc" },
            { dataField: "property_status_name", caption: "Stato di proprietà", sortIndex: 2, sortOrder: "asc" },
            { dataField: "acquisition_price", caption: "Prezzo acquisizione", sortIndex: 3, sortOrder: "asc" },
            { dataField: "renovation_price", caption: "Prezzo rinnovamento", sortIndex: 4, sortOrder: "asc" },
            { dataField: "sell_price", caption: "Prezzo vendita", sortIndex: 5, sortOrder: "asc" },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: true },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/property/${e.data.id}`; } },
    });
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
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const renPrice = document.getElementById("txtRenPrice").value.trim();
    const extraPrice = document.getElementById("txtExtraPrice").value.trim();
    const sellPrice = document.getElementById("txtSellPrice").value.trim();

    const result = document.getElementById("spNewPropertyResult");
    result.innerHTML = '';
    if (alias === '' || nation === '' || address === '' || city === '' || zip === '' || status === "" || size === "" || floor === "" || acqPrice === "" || renPrice === "" || extraPrice === "" || sellPrice === "") {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    try {
        debugger;
        const response = await fetch("/api/property", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "alias": alias, "nation": nation, "city": city, "address": address, "zip": zip, "propertyStatus": status, "size": size, "floor": floor, "acqPrice": acqPrice, "renPrice": renPrice, "extraPrice": extraPrice, "sellPrice": sellPrice })
        });
        const res = await response.json();
        debugger;
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