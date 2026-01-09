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
    const hasData = d.payload.length > 0;
    // $("#listEstimatesGrid").dxDataGrid({
    //     dataSource: d.payload,
    //     keyExpr: "id",
    //     showBorders: true,
    //     columnAutoWidth: true,
    //     showBorders: true,
    //     searchPanel: {
    //         visible: true,
    //         width: 450,
    //         placeholder: "Cerca..."
    //     },
    //     noDataText: "Non risultano immobili registrati per questa sede",
    //     rowAlternationEnabled: false,
    //     grouping: { autoExpandAll: false },
    //     groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
    //     filterRow: { visible: false, applyFilter: "auto" },
    //     headerFilter: { visible: false },
    //     columns: [
    //         {
    //             dataField: "id",
    //             caption: "Id preventivo",
    //             // allowFiltering: true,
    //             // sortIndex: 0, sortOrder: "asc",
    //             alignment: "left",
    //             width: 150,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 const text = '#' + data.id;
    //                 container.text(text);
    //             }
    //         },
    //         {
    //             dataField: "",
    //             caption: "Cliente",
    //             // sortIndex: 2,sortOrder: "asc",
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 const text = data.customer_name + ' ' + data.customer_surname;
    //                 container.text(text);
    //             }
    //         },
    //         {
    //             dataField: "property_alias",
    //             caption: "Immobile",
    //             // sortIndex: 3, sortOrder: "asc"
    //         },
    //         {
    //             dataField: "",
    //             caption: "Rendita ipotetica",
    //             // allowFiltering: true,
    //             sortIndex: 4,
    //             // sortOrder: "asc",
    //             alignment: "left",
    //             // cellTemplate: function (container, options) {
    //             //     const data = options.data;
    //             //     const text = '<div class="text-start">€' + (data.income) + '/mese</div>';
    //             //     container.html(text);
    //             // }
    //         },
    //         {
    //             dataField: "dtcr",
    //             caption: "Data creazione",
    //             allowFiltering: true,
    //             // sortIndex: 5, sortOrder: "asc",
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 let date = data.dtcr.split(' ')[0];
    //                 date = date.split('-');
    //                 container.text(date[2] + '/' + date[1] + '/' + date[0]);
    //             }
    //         },
    //         {
    //             dataField: "property_status_id",
    //             caption: "Stato",
    //             // allowFiltering: true,
    //             // sortIndex: 6, sortOrder: "asc",
    //             alignment: 'center',
    //             width: 150,
    //             cellTemplate: function (container, options) {
    //                 const data = options.data;
    //                 let div = '';
    //                 switch (data.property_status_id) {
    //                     case 2: div = `<div class="mx-auto rounded-pill alert alert-success px-1 py-0 text-center m-0" style="width: fit-content; box-shadow: 1px 0px 8px 0px #a3cfbb;">${data.property_status_label}</div>`; break;
    //                     case 1:
    //                     case 3:
    //                     case 4: div = `<div class="mx-auto rounded-pill alert alert-warning px-1 py-0 text-center m-0" style="width: fit-content; box-shadow: 1px 0px 8px 0px #ffe69c;"">${data.property_status_label}</div>`; break;
    //                     case 5: div = `<div class="mx-auto rounded-pill alert alert-danger px-1 py-0 text-center m-0" style="width: fit-content; box-shadow: 1px 0px 8px 0px #f1aeb5;"">${data.property_status_label}</div>`; break;
    //                 }
    //                 container.html(div);
    //             }
    //         },
    //         // {
    //         //     dataField: "",
    //         //     caption: "Azioni",
    //         //     sortIndex: 7,
    //         //     width: 100,
    //         //     cellTemplate: function (container, options) {
    //         //         container.html(`
    //         //             <div class="d-flex justify-content-between align-items-center">
    //         //                 <i class="bi bi-eye text-primary" title="Visualizzazione" onclick="event.stopPropagation(); viewQuote(${options.data.id})"></i>
    //         //                 <i class="bi bi-pencil" title="Modificare" onclick="event.stopPropagation(); editQuote(${options.data.id})"></i>
    //         //                 <i class="bi bi-trash text-danger" title="Eliminare" onclick="event.stopPropagation(); deleteQuote(${options.data.id})"></i>
    //         //             </div>`);
    //         //     }
    //         // },
    //     ],
    //     sorting: { mode: "multiple" },
    //     remoteOperations: { paging: true, filtering: true, sorting: false },
    //     paging: { pageSize: 10 },
    //     pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
    //     toolbar: {
    //         items: [
    //             {
    //                 name: "searchPanel",
    //                 location: "before"
    //             },
    //             "groupPanel",
    //         ]
    //     },
    //     onRowClick: function (e) {
    //         if (e.rowType === "data") { viewQuote(e.data.id); }
    //     },
    // });
    const underManagementEstimates = d.payload.filter(p => p.property_status_id === 3);
    if (underManagementEstimates.length > 0) {
        $("#estimateUnderManagemanetGrid").dxDataGrid({
            dataSource: underManagementEstimates,
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
                    dataField: "property_alias",
                    caption: "Immobile",
                },
                {
                    dataField: "",
                    caption: "Rendita ipotetica",
                    sortIndex: 4,
                    width: 150,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        const text = formatNumber(parseFloat(data.total_amount) - parseFloat(data.fixed_cost));
                        container.css('text-align', 'right');
                        container.html(text);
                    }
                },
                {
                    dataField: "dtcr",
                    caption: "Data creazione",
                    allowFiltering: true,
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
                if (e.rowType === "data") { viewQuote(e.data.id); }
            },
        });
    } else $("#estimateUnderManagemanetGrid").html("<p class='text-center p-4'>Non ci sono preventivo registrati per questa categoria</p>");
    const acquiredEstimates = d.payload.filter(p => p.property_status_id === 2);
    if (underManagementEstimates.length > 0) {
        $("#estimateAcquiredGrid").dxDataGrid({
            dataSource: acquiredEstimates,
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
                    dataField: "property_alias",
                    caption: "Immobile",
                },
                {
                    dataField: "",
                    caption: "Rendita ipotetica",
                    sortIndex: 4,
                    width: 150,
                    cellTemplate: function (container, options) {
                        const data = options.data;
                        const text = formatNumber(parseFloat(data.total_amount) - parseFloat(data.fixed_cost));
                        container.css('text-align', 'right');
                        container.html(text);
                    }
                },
                {
                    dataField: "dtcr",
                    caption: "Data creazione",
                    allowFiltering: true,
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
                if (e.rowType === "data") { viewQuote(e.data.id); }
            },
        });
    } else $("#estimateUnderManagemanetGrid").html("<p class='text-center p-4'>Non ci sono preventivo registrati per questa categoria</p>");
}

function createNewEstimate() {
    if (localStorage.getItem('editEstimateId') !== null) localStorage.removeItem('editEstimateId');
    window.location.href = '/estimate';
}

function viewQuote(id) { window.location = `/estimate/${id}`; }

function editQuote(id) {
    localStorage.setItem('editEstimateId', id);
    window.location = '/estimate';
}

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