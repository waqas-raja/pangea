document.addEventListener("DOMContentLoaded", async () => {
    await loadLands();
});

async function loadLands() {
    // const response = await fetch('/api/customers');
    // const r = await response.json();
    const hasData = [].length > 0;
    $("#landGrid").dxDataGrid({
        dataSource: [],
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non ci sono terreni registrati.",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: hasData, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "type",
                caption: "Tipo",
                alignment: "left",
                // allowFiltering: true,
                // sortIndex: 0,
                // sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    data.bizname !== '' && data.bizname !== undefined && data.bizname !== null ? container.html('<i class="bi bi-buildings fs-5"></i>') : container.html('<i class="bi bi-person fs-5"></i>');
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
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/land/${e.data.id}`; } },
    });
}

function showModalAddLand() {
    const modalElement = document.getElementById("modalAddLand");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function saveLand() {
    const btn = document.getElementById("btnSaveLand");
    const landType = document.getElementById("ddlLandType").value.trim();
    const result = document.getElementById("spNewLandResult");
    result.innerHTML = '';
    if (landType === '') {
        result.innerText = "È richiesta la selezione del tipo di terreno";
        result.classList.remove("d-none");
        return;
    }
}