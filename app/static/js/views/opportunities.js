document.addEventListener("DOMContentLoaded", async () => {
    await loadOpportunities();
    await loadSources();
    await loadPropertyTypes();
    await loadPropertyStatus();
    await loadNations();
});

async function loadOpportunities() {
    const response = await fetch('/api/opportunities');
    const r = await response.json();
    const hasData = r.payload.length > 0;
    $("#opportunityGrid").dxDataGrid({
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
            {
                dataField: "alias",
                caption: "Alias",
                allowFiltering: true,
                sortIndex: 0,
                sortOrder: "asc",
                // cellTemplate: function (container, options) {
                //     const data = options.data;
                //     data.bizname !== '' && data.bizname !== undefined && data.bizname !== null ? container.html('<i class="bi bi-buildings fs-5"></i>') : container.html('<i class="bi bi-person fs-5"></i>');
                // }
            },
            { dataField: "source", caption: "Fonte", allowFiltering: true, sortIndex: 2, sortOrder: "asc" },
            { dataField: "property_type", caption: "Tipo di proprita", allowFiltering: true, sortIndex: 3, sortOrder: "asc" },
            {
                dataField: "status",
                caption: "Stato",
                allowFiltering: true,
                sortIndex: 4, sortOrder: "asc",
                // cellTemplate: function (container, options) {
                //     const data = options.data;
                //     const text = data.bizname !== '' && data.bizname !== undefined && data.bizname !== null
                //         ? data.bizname
                //         : `${data.surname} ${data.name}`;
                //     container.text(text);
                // }
            },
            { dataField: "nation", caption: "Nazione", allowFiltering: true, sortIndex: 5, sortOrder: "asc" },
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
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/opportunity/${e.data.id}`; } },
    });
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

function showModalAddOpportunity() {
    const modalElement = document.getElementById("modalAddOpportunity");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

async function saveOpportunity() {
    const btn = document.getElementById("btnSaveOpportunity");
    const spinner = document.getElementById("spinnerNewOpportunity");
    const alias = document.getElementById("txtAlias").value.trim();
    const source = document.getElementById("ddlSource").value;
    const propertyType = document.getElementById("ddlPropertyType").value;
    const propertyStatus = document.getElementById("ddlPropertyStatus").value;
    const size = document.getElementById("txtSize").value.trim();
    const price = document.getElementById("txtPrice").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const city = document.getElementById("txtCity").value.trim();
    const nation = document.getElementById("ddlState").value;
    const tax = document.getElementById("txtTaxes").value.trim();
    const note = document.getElementById("txtNote").value.trim();
    const result = document.getElementById("spNewOpportunityResult");
    result.innerHTML = '';
    if (alias === '' || source === '' || propertyType === '' || propertyStatus === '' || size === '' || price === '' || address === '' || city === '' || nation === '' || tax === '' || note === '') {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    debugger;
    try {
        const response = await fetch("/api/opportunity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "alias": alias, "source": source, "nation": nation, "city": city, "address": address, "propertyType": propertyType, "size": size, "price": price, "taxes": tax, "status": propertyStatus, "note": note })
        });
        const res = await response.json();
        debugger;
        if (res.result) {
            btn.disabled = false;
            spinner.classList.add("d-none");
            $("#modalAddOpportunity").modal("hide");
            window.location.href = `/opportunity/${res.id}`;
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