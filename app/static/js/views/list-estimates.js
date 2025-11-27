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
    const response = await fetch('/api/estimates');
    const d = await response.json();
    // const d = await customData();
    const hasData = d.length > 0;
    $("#listEstimatesGrid").dxDataGrid({
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
        noDataText: "Non risultano immobili registrati per questa sede",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: false, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id", 
                caption: "ID PREVENTIVO",
                // allowFiltering: true,
                // sortIndex: 0, sortOrder: "asc",
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
                caption: "CLIENTE",
                // sortIndex: 2,sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = data.customer_name + ' ' + data.customer_surname;
                    container.text(text);
                }
            },
            {
                dataField: "property_alias",
                caption: "IMMOBILE",
                // sortIndex: 3, sortOrder: "asc"
            },
            {
                dataField: "",
                caption: "RENDITA IPOTETICA",
                // allowFiltering: true,
                sortIndex: 4,
                // sortOrder: "asc",
                alignment: "left",
                // cellTemplate: function (container, options) {
                //     const data = options.data;
                //     const text = '<div class="text-start">€' + (data.income) + '/mese</div>';
                //     container.html(text);
                // }
            },
            { 
                dataField: "dtcr",
                caption: "DATA CREAZIONE",
                allowFiltering: true,
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
                caption: "STATO",
                // allowFiltering: true,
                // sortIndex: 6, sortOrder: "asc",
                alignment: 'center',
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
            {
                dataField: "",
                caption: "AZIONI",
                sortIndex: 7,
                width: 100,
                cellTemplate: function (container, options) {
                    container.html(`
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="bi bi-eye text-primary" title="Visualizzazione" onclick="event.stopPropagation(); viewQuote(${options.data.id})"></i>
                            <i class="bi bi-pencil" title="Modificare" onclick="event.stopPropagation(); editQuote(${options.data.id})"></i>
                            <i class="bi bi-trash text-danger" title="Eliminare" onclick="event.stopPropagation(); deleteQuote(${options.data.id})"></i>
                        </div>`);
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
            if (e.rowType === "data") { viewQuote(e.data.id); }
        },
    });
}

function viewQuote(id) { window.location = `/estimate/${id}`; }

function editQuote(id) {debugger}

async function deleteQuote(id) {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const btn = document.getElementById('btnConfirmDelete');
                btn.disabled = true;
                btn.lastElementChild.classList.remove('d-none');
                const response = await fetch("/api/estimate/" + id, { method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    loadListEstimates();
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                    $("#modalConfirmDelete").modal('hide');
                } else throw new Error("Errore durante l'eliminazione della citazione!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}