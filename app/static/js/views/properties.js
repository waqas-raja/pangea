document.addEventListener("DOMContentLoaded", async () => {
    await loadProperties();
});

async function loadProperties() {
    const response = await fetch('/api/properties');
    const r = await response.json();
    debugger;
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
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/customer/${e.data.id}`; } },
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