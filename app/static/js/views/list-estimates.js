document.addEventListener("DOMContentLoaded", async () => {
    loadListEstimates();
});

function customData() {
    return [
        {
            id: 123,
            client: "Mario Rossi",
            property_type: "Appartamento",
            income: 330,
            created_at: "12-10-2025",
            status: "Approved"
        },
        {
            id: 124,
            client: "Anna Neri",
            property_type: "Monolocale",
            income: 300,
            created_at: "10-10-2025",
            status: "Pending"
        },
        {
            id: 125,
            client: "Neni Kakki",
            property_type: "Monolocale",
            income: 350,
            created_at: "02-10-2025",
            status: "Cancel"
        },
    ];
}

async function loadListEstimates() {
    // const response = await fetch('/api/opportunities');
    // const r = await response.json();
    const d = await customData();
    const hasData = d.length > 0;
    $("#listEstimatesGrid").dxDataGrid({
        dataSource: d,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 250,
            placeholder: "Cerca..."
        },
        noDataText: "Non risultano immobili registrati per questa sede",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: hasData },
        columns: [
            {
                dataField: "id", 
                caption: "ID PREVENTIVO",
                // allowFiltering: true,
                sortIndex: 0,
                sortOrder: "asc",
                alignment: "left",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = '#' + data.id;
                    container.text(text);
                }
            },
            { dataField: "client", caption: "CLIENTE", sortIndex: 2, sortOrder: "asc" },
            { dataField: "property_type", caption: "IMMOBILE", sortIndex: 3, sortOrder: "asc" },
            {
                dataField: "income",
                caption: "RENDITA IPOTETICA",
                // allowFiltering: true,
                sortIndex: 4,
                sortOrder: "asc",
                alignment: "left",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = '<div class="text-start">€' + (data.income) + '/mese</div>';
                    container.html(text);
                }
            },
            { dataField: "created_at", caption: "DATA CREAZIONE", allowFiltering: true, sortIndex: 5, sortOrder: "asc" },
            {
                dataField: "status",
                caption: "STATO",
                // allowFiltering: true,
                sortIndex: 6, sortOrder: "asc",
                alignment: 'left',
                cellTemplate: function (container, options) {
                    const data = options.data;
                    let div = '';
                    switch ((data.status).toLowerCase()) {
                        case 'approved': div = '<div class="mx-auto rounded-pill alert alert-success px-1 py-0 text-center m-0" style="width: fit-content;">Approvato</div>'; break;
                        case 'pending': div = '<div class="mx-auto rounded-pill alert alert-warning px-1 py-0 text-center m-0" style="width: fit-content;">In attesa</div>'; break;
                        case 'cancel': div = '<div class="mx-auto rounded-pill alert alert-danger px-1 py-0 text-center m-0" style="width: fit-content;">Rifiutato</div>'; break;
                    }
                    container.html(div);
                }
            },
            {
                dataField: "",
                caption: "AZIONI",
                sortIndex: 7,
                cellTemplate: function (container, options) {
                    container.html('<div class="d-flex justify-content-between align-items-center"><i class="bi bi-eye text-primary"></i> <i class="bi bi-pencil"></i> <i class="bi bi-trash text-danger"></i>');
                }
            },
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
        onRowClick: function (e) { 
            if (e.rowType === "data") { 
                window.location = `/estimate/${e.data.id}`;
            }
        },
    });
}