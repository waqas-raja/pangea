let data = [
    { id: 1, type: "", name: "hello", surname: "wordl", bizname: "", email: "hello@gmail.com", phone: "+923455252525", number_of_properties: 3 },
    { id: 1, type: "", name: "team", surname: "icon", bizname: "TeamIcon", email: "teamicon@gmail.com", phone: "+92340011223", number_of_properties: 5 },
];
document.addEventListener("DOMContentLoaded", async () => {
    await loadCustomers();
});

async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
    debugger;
    const hasData = r.payload.length > 0;
    $("#customerGrid").dxDataGrid({
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
        // editing: {
        //     mode: "row",
        //     allowAdding: true,
        //     allowUpdating: true,
        //     allowDeleting: true,
        //     useIcons: true,
        //     newRowPosition: "last"
        // },
        // onToolbarPreparing: function (e) {
        //     e.toolbarOptions.items.forEach(function (item) {
        //         if (item.name === "addRowButton") {
        //             item.options = item.options || {};
        //             item.options.elementAttr = {
        //                 id: "btnAddNewQuestion"
        //             };
        //         }
        //     });
        // },
        // onContentReady: function (e) {
        //     const toolbar = $(e.element).find(".dx-datagrid-header-panel");
        //     toolbar.addClass("d-none");
        // },
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
                // calculateDisplayValue: function (rowData) {
                //     return rowData.bizname !== '' && rowData.bizname !== undefined
                //         ? rowData.bizname
                //         : `${rowData.surname} ${rowData.name}`;
                // },
                // calculateFilterExpression: function (filterValue, selectedFilterOperation) {
                //     return [
                //         ['bizname', selectedFilterOperation, filterValue],
                //         'or',
                //         ['name', selectedFilterOperation, filterValue],
                //         'or',
                //         ['surname', selectedFilterOperation, filterValue]
                //     ];
                // },
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
            // {
            //     dataField: "multiple",
            //     caption: "Tipo",
            //     editorType: "dxSelectBox",
            //     editorOptions: {
            //         dataSource: [
            //             { value: "", label: "Seleziona..." }, // default placeholder
            //             { value: 0, label: "Singola" },
            //             { value: 1, label: "Multipla" }
            //         ],
            //         valueExpr: "value",
            //         displayExpr: "label",
            //         value: "",
            //     },
            //     validationRules: [{ type: "required" }]
            // }
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
        // onRowInserting: onAddQuestion,
        // onRowUpdating: onUpdateQuestion,
        // onRowRemoving: onDeleteQuestion,
        // rowDragging: {
        //     allowReordering: true,
        //     onReorder: async function (e) {
        //         const grid = $("#questionsGrid").dxDataGrid("instance");
        //         const items = grid.option("dataSource");
        //         const movedItem = items.splice(e.fromIndex, 1)[0];
        //         items.splice(e.toIndex, 0, movedItem);
        //         const updated = items.map((item, index) => ({ id: item.id, show_order: index + 1 }));
        //         await fetch('/api/survey/sort', {
        //             method: 'PATCH',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ questions: updated })
        //         });
        //         await loadQuestions();
        //     }
        // },
        // onRowClick: function (e) {
        //     if (clickedExpandIcon) {
        //         clickedExpandIcon = false;
        //         return;
        //     }
        //     clearTimeout(clickTimer);
        //     clickTimer = setTimeout(() => {
        //         if (e.rowType === "data") {
        //             const isExpanded = e.component.isRowExpanded(e.key);
        //             isExpanded ? e.component.collapseRow(e.key) : e.component.expandRow(e.key);
        //         }
        //     }, 200);
        // },
        // onRowDblClick: function (e) {
        //     clearTimeout(clickTimer);
        //     if (e.rowType === "data") {
        //         e.component.editRow(e.rowIndex)
        //     }
        // }
    });
}

function showModalAddEditCustomer() {
    const modalElement = document.getElementById("modalAddCustomer");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function toggleCompanyFields(el) {
    if (el.checked) document.getElementById("divCompanyFields").classList.remove("d-none");
    else document.getElementById("divCompanyFields").classList.add("d-none");
}

async function saveCustomer() {
    const btn = document.getElementById("btnSaveCustomer");
    const spinner = document.getElementById("spinnerNewCustomer");
    const firstName = document.getElementById("txtFirstName").value.trim();
    const lastName = document.getElementById("txtLastName").value.trim();
    const email = document.getElementById("txtEmail").value.trim();
    const phone = document.getElementById("txtPhone").value.trim();
    const isCompany = document.getElementById("ckIsCompany").checked;
    let bizname = document.getElementById("txtBizname").value.trim();
    let vat = document.getElementById("txtVat").value.trim();
    const result = document.getElementById("spNewCustomerResult");
    result.innerHTML = '';
    if (firstName === '' || lastName === "" || email === "" || phone === "" || (isCompany && (bizname === "" || vat === ""))) {
        result.innerText = "Si prega di compilare tutti i campi richiesti";
        result.classList.remove("d-none");
        return;
    }
    if (isValidEmail(email) === false) {
        result.innerText = "L'indirizzo email non è valido";
        result.classList.remove("d-none");
        return;
    }
    btn.disabled = true;
    spinner.classList.remove("d-none");
    result.classList.add("d-none");
    if (bizname === '') bizname = null;
    if (vat === '') vat = null;

    try {
        const response = await fetch("/api/customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": firstName, "surname": lastName, "email": email, "phone": phone, "bizname": bizname, "vat": vat })
        });
        const res = await response.json();
        if (res.result) {
            btn.disabled = false;
            spinner.classList.add("d-none");
            $("#modalAddCustomer").modal("hide");
            window.location.href = `/customer/${res.id}`;
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