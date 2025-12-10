document.addEventListener("DOMContentLoaded", async () => {
    await loadCustomers();
});

async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
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
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "type",
                caption: "Tipo",
                width: 50,
                alignment: "center",
                // allowFiltering: true,
                // sortIndex: 0,
                // sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    data.bizname !== '' && data.bizname !== undefined && data.bizname !== null ? container.html('<i class="bi bi-buildings fs-5"></i>') : container.html('<i class="bi bi-person fs-5"></i>');
                }
            },
            {
                caption: "Nome",
                allowFiltering: true,
                // sortIndex: 1, sortOrder: "asc",
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = data.bizname !== '' && data.bizname !== undefined && data.bizname !== null
                        ? data.bizname
                        : `${data.surname} ${data.name}`;
                    container.text(text);
                }
            },
            {
                dataField: "email",
                caption: "Email", 
                // sortIndex: 2, sortOrder: "asc"
            },
            {
                dataField: "phone",
                caption: "Telephono",
                // sortIndex: 3, sortOrder: "asc"
            },
            {
                dataField: "number_of_properties",
                caption: "Proprietà",
                width: 100,
                alignment: "right",
                // sortIndex: 4, sortOrder: "asc"
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = data.number_of_properties !== '' && data.number_of_properties !== undefined && data.number_of_properties !== null
                        ? data.number_of_properties
                        : 0;
                    container.text(text);
                }
            },
            {
                dataField: "",
                caption: "Onere",
                width: 100,
                // sortIndex: 4, sortOrder: "asc"
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = 'n.d.'
                    container.text(text);
                }
            },
            {
                dataField: "",
                caption: "Agenzia",
                width: 100,
                // sortIndex: 4, sortOrder: "asc"
                cellTemplate: function (container, options) {
                    const data = options.data;
                    const text = 'n.d.'
                    container.text(text);
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
        onRowClick: function (e) { if (e.rowType === "data") { window.location = `/customer/${e.data.id}`; } },
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