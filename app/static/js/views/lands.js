let _lands = {
    agriculture: [{ id: "1769669498550", type: 1, name: "Agriculture Land", area: "60000000", location: "this is test location" }],
    residential: [],
    industarial: []
};
document.addEventListener("DOMContentLoaded", async () => {
    await loadLandTypes();
});

async function loadLandTypes() {
    const response = await fetch('/api/land/land-types');
    const r = await response.json();
    let ctrl = document.getElementById("ddlLandType");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona tipo di terre</option>';
    r.payload.forEach(t => {
        opt += `<option value="${t.id}">${t.name}</option>`;
    });
    ctrl.innerHTML = opt;
    loadLandTabsAndContent(r.payload);
}

async function loadLandTabsAndContent(data) {
    let tabDiv = document.getElementById('landCardTabs');
    tabDiv.innerHTML = '';
    let contentDiv = document.getElementById('landCardTabsContent');
    contentDiv.innerHTML = '';
    let tabs = '', content = '';
    data.forEach((tab, i) => {
        tabs += `<li class="nav-item" role="presentation">
                    <button class="nav-link ${i === 0 ? "active" : ""}" id="${tab.name}LandTab" data-bs-toggle="tab" data-bs-target="#${tab.name}Land" type="button" role="tab" aria-controls="${tab.name}Land" aria-selected="false" tabindex="-1">${tab.name}</button>
                </li>`;
        content += `<div class="tab-pane fade border border-top-0 p-3 ${i === 0 ? "show active" : ""}" id="${tab.name}Land" role="tabpanel" aria-labelledby="${tab.name}LandTab">
                                <div id="${tab.name}LandGrid" class=""></div>
                            </div>`;
    });
    tabDiv.innerHTML = tabs
    contentDiv.innerHTML = content;
    await loadLands();
}

async function loadLands() {
    // const response = await fetch('/pai/pangea/api/lands');
    // const r = await response.json();
    loadAgricultureLands();
}

async function loadAgricultureLands() {
    const data = _lands.agriculture;
    const hasData = data.length > 0;
    $(`#AgricoloLandGrid`).dxDataGrid({
        dataSource: data,
        keyExpr: "id",
        showBorders: true,
        columnAutoWidth: true,
        showBorders: true,
        noDataText: "Non ci sono terreni registrati.",
        rowAlternationEnabled: false,
        grouping: { autoExpandAll: false },
        groupPanel: { visible: false, emptyPanelText: "Trascina qui le colonne per raggruppare" },
        filterRow: { visible: hasData, applyFilter: "auto" },
        headerFilter: { visible: false },
        columns: [
            {
                dataField: "id",
                caption: "ID",
                width: 120,
                allowFiltering: false,
            },
            {
                dataField: "name",
                caption: "Nome",
            },
            {
                dataField: "area",
                caption: "Superficie",
                cellTemplate: function (container, options) {
                    const area = formatNumber(parseInt(options.data.area));
                    container.text(area.slice(0, -2) + ' (mq)');
                }
            },
            {
                dataField: "location",
                caption: "Ubicazione",
            },
            {
                dataField: "",
                caption: "Azioni",
                // allowFiltering: true,
                width: 60,
                cellTemplate: function (container, options) {
                    const html = `
                            <i class="bi bi-pencil-square me-2" onclick="showModalAddLand(${options.data.id}, ${options.data.type})"></i>
                            <i class="bi bi-trash3 text-danger" onclick="deleteCall(${options.data.id})"></i>
                        `;
                    container.html(html);
                }
            },
        ],
        sorting: { mode: "multiple" },
        remoteOperations: { paging: true, filtering: true, sorting: false },
        paging: { pageSize: 10 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true },
        toolbar: {
            visible: false,
            items: [
                "groupPanel",
                "searchPanel",
            ]
        },
        onRowClick: function (e) {
            // if (e.rowType === "data") { window.location = `/land/${e.data.id}`; }
        },
    });
}

function showModalAddLand(id = null, type = null) {
    if (id === null) {
        document.getElementById('modalAddLandLabel').innerHTML = `<i class="bi bi-columns-gap me-3"></i>Aggiungi Terre`;
        document.getElementById('ddlLandType').value = '';
        document.getElementById('hLandId').value = '';
        document.getElementById('btnSaveLand').classList.remove('d-none');
        document.getElementById('btnUpdateLand').classList.add('d-none');
        document.getElementById('ddlLandType').disabled = false;
        showRelevantFields(type, id);
    } else {
        document.getElementById('hLandId').value = id;
        document.getElementById('modalAddLandLabel').innerHTML = `<i class="bi bi-columns-gap me-3"></i>Modificare Terre`;
        document.getElementById('ddlLandType').value = type;
        document.getElementById('ddlLandType').disabled = true;
        document.getElementById('btnSaveLand').classList.add('d-none');
        document.getElementById('btnUpdateLand').classList.remove('d-none');
        showRelevantFields(type, id);
    }
    const modalElement = document.getElementById("modalAddLand");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function showRelevantFields(val, landId = null) {
    if (val === null) {
        document.getElementById("agricultureLandFields").classList.add('d-none');
        document.getElementById("residentialLandFields").classList.add('d-none');
        document.getElementById("industrialLandFields").classList.add('d-none');
        return;
    }
    switch (parseInt(val)) {
        case 1:
            let ad = '';
            if (landId !== null) ad = _lands.agriculture.find(l => l.id === landId.toString());
            document.getElementById("txtAgricultureLandName").value = landId === null ? '' : ad.name;
            document.getElementById("txtAgricultureLandArea").value = landId === null ? '' : ad.area
            document.getElementById("txtAgricultureLandLocation").value = landId === null ? '' : ad.location
            document.getElementById("agricultureLandFields").classList.remove('d-none');
            document.getElementById("residentialLandFields").classList.add('d-none');
            document.getElementById("industrialLandFields").classList.add('d-none');
            break;
        case 2:
            document.getElementById("agricultureLandFields").classList.add('d-none');
            document.getElementById("residentialLandFields").classList.remove('d-none');
            document.getElementById("industrialLandFields").classList.add('d-none');
            break;
        case 3:
            document.getElementById("agricultureLandFields").classList.add('d-none');
            document.getElementById("residentialLandFields").classList.add('d-none');
            document.getElementById("industrialLandFields").classList.remove('d-none');
            break;
    }
}

function saveLand(btn) {
    const landType = document.getElementById("ddlLandType").value.trim();
    if (landType === '') {
        result.innerText = "È richiesta la selezione del tipo di terreno";
        result.classList.remove("d-none");
        return;
    }
    switch (landType) {
        case '1':
            const agricultureLandName = document.getElementById("txtAgricultureLandName").value.trim();
            const agricultureLandArea = document.getElementById("txtAgricultureLandArea").value.trim();
            const agricultureLandLocation = document.getElementById("txtAgricultureLandLocation").value.trim();
            if (agricultureLandName === '' || agricultureLandArea === '' || agricultureLandLocation === '') {
                if (agricultureLandName === '') {
                    showMessage("Il nome del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandArea === '') {
                    showMessage("La superficie del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandLocation === '') {
                    showMessage("L'ubicazione del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
            }
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            // TODO: SEND LAND DATA TO API AND SAVE...
            const id = Date.now().toString();
            _lands.agriculture.push({ id: id, type: parseInt(landType), name: agricultureLandName, area: agricultureLandArea, location: agricultureLandLocation });
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            $('#modalAddLand').modal('hide');
            $("#agricultureLandGrid").dxDataGrid("dispose");
            $("#agricultureLandGrid").empty();
            loadAgricultureLands();
            break;
        case '2':
            document.getElementById("residentialLandFields").classList.add('d-none');
            break;
        case '3':
            document.getElementById("industrialLandFields").classList.add('d-none');
            break;
    }

}

function updateLand(btn) {
    const id = document.getElementById("hLandId").value.trim();
    const landType = document.getElementById("ddlLandType").value.trim();
    if (landType === '') {
        result.innerText = "È richiesta la selezione del tipo di terreno";
        result.classList.remove("d-none");
        return;
    }
    switch (parseInt(landType)) {
        case 1:
            const agricultureLandName = document.getElementById("txtAgricultureLandName").value.trim();
            const agricultureLandArea = document.getElementById("txtAgricultureLandArea").value.trim();
            const agricultureLandLocation = document.getElementById("txtAgricultureLandLocation").value.trim();
            if (agricultureLandName === '' || agricultureLandArea === '' || agricultureLandLocation === '') {
                if (agricultureLandName === '') {
                    showMessage("Il nome del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandArea === '') {
                    showMessage("La superficie del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
                if (agricultureLandLocation === '') {
                    showMessage("L'ubicazione del terreno agricolo è obbligatorio.", 'spNewLandResult', 'text-danger');
                    return;
                }
            }
            btn.disabled = true;
            btn.lastElementChild.classList.remove('d-none');
            // TODO: SEND LAND DATA TO API AND UPDATE...
            let d = _lands.agriculture.find(l => l.id === id.toString());
            d.name = agricultureLandName;
            d.area = agricultureLandArea;
            d.location = agricultureLandLocation;
            btn.disabled = false;
            btn.lastElementChild.classList.add('d-none');
            $('#modalAddLand').modal('hide');
            $("#agricultureLandGrid").dxDataGrid("dispose");
            $("#agricultureLandGrid").empty();
            loadAgricultureLands();
            break;
        case '2':
            document.getElementById("residentialLandFields").classList.add('d-none');
            break;
        case '3':
            document.getElementById("industrialLandFields").classList.add('d-none');
            break;
    }

}
