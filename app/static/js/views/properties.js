document.addEventListener("DOMContentLoaded", async () => {
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
            {
                dataField: "type",
                caption: "Tipo",
                allowFiltering: true,
                sortIndex: 0,
                sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    data.bizname !== '' && data.bizname !== undefined && data.bizname !== null ? container.html('<i class="bi bi-buildings fs-5"></i>') : container.html('<i class="bi bi-person fs-5"></i>');
                }
            },
            {
                caption: "Nome",
                allowFiltering: true,
                sortIndex: 1, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = data.bizname !== '' && data.bizname !== undefined && data.bizname !== null
                        ? data.bizname
                        : `${data.surname} ${data.name}`;
                    container.text(text);
                }
            },
            { dataField: "email", caption: "Email", sortIndex: 2, sortOrder: "asc" },
            { dataField: "phone", caption: "Telephono", sortIndex: 3, sortOrder: "asc" },
            { dataField: "number_of_properties", caption: "Proprietà", sortIndex: 4, sortOrder: "asc" },
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

function showModalAddProperty() {
    const modalElement = document.getElementById("modalAddProperty");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}