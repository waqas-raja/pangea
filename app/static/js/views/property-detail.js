document.addEventListener("DOMContentLoaded", async () => {
    await loadNations();
    await loadPropertyStatus();
    await loadCustomers();
    await loadOpportunities();
    await loadPropertyDetail();
});

async function loadPropertyStatus() {
    const response = await fetch('/api/property-status');
    const r = await response.json();
    let ctrl = document.getElementById("ddlPropertyStatus");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(p => {
        opt += `<option value="${p.id}">${p.name}</option>`;
    });
    ctrl.innerHTML = opt;
}
async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
    let ctrl = document.getElementById("ddlCustomer");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(customer => {
        if (customer.bizname !== "") opt += `<option value="${customer.id}">${customer.bizname}</option>`;
        else opt += `<option value="${customer.id}">${customer.name} ${customer.surname}</option>`;
    });
    ctrl.innerHTML = opt;
}
async function loadOpportunities() {
    const response = await fetch('/api/opportunities');
    const r = await response.json();
    let ctrl = document.getElementById("ddlOpportunity");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(p => {
        opt += `<option value="${p.id}">${p.alias}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadPropertyDetail() {
    const response = await fetch('/api/property/' + propertyId);
    const r = await response.json();
    document.getElementById("spCustomer").innerText = r.payload.customer ?? 'n.d.';
    document.getElementById("spOpportunity").innerText = r.payload.opportunity ?? 'n.d.';
    document.getElementById("spAlias").innerText = r.payload.alias ?? 'n.d.';
    document.getElementById("spState").innerText = r.payload.nation_name ?? 'n.d.';
    document.getElementById("spCity").innerText = r.payload.city ?? 'n.d.';
    document.getElementById("spAddress").innerText = r.payload.address ?? 'n.d.';
    document.getElementById("spZip").innerText = r.payload.cap ?? 'n.d.';
    document.getElementById("spPropertyStatus").innerText = r.payload.property_status_name ?? 'n.d.';
    document.getElementById("spSize").innerText = r.payload.size ?? 'n.d.';
    document.getElementById("spFloor").innerText = r.payload.floor ?? 'n.d.';
    document.getElementById("spRoom").innerText = r.payload.rooms ? "Yes" : "No";
    document.getElementById("spBathroom").innerText = r.payload.bathrooms ? "Yes" : "No";
    document.getElementById("spGarden").innerText = r.payload.garden ? "Yes" : "No";
    document.getElementById("spBox").innerText = r.payload.box ? "Yes" : "No";
    document.getElementById("spElevator").innerText = r.payload.elevator ? "Yes" : "No";
    document.getElementById("spAcqPrice").innerText = formatNumber(parseInt(r.payload.acquisition_price)) ?? formatNumber(0);
    document.getElementById("spRenPrice").innerText = formatNumber(parseInt(r.payload.renovation_price)) ?? formatNumber(0);
    document.getElementById("spExtraPrice").innerText = formatNumber(parseInt(r.payload.renovation_price)) ?? formatNumber(0);
    document.getElementById("spSellPrice").innerText = formatNumber(parseInt(r.payload.sell_price)) ?? formatNumber(0);

    document.getElementById("ddlCustomer").value = r.payload.customer ?? '';
    document.getElementById("ddlOpportunity").value = r.payload.opportunity ?? ''
    document.getElementById("txtAlias").value = r.payload.alias ?? '';
    document.getElementById("ddlState").value = r.payload.nation ?? '';
    document.getElementById("txtCity").value = r.payload.city ?? '';
    document.getElementById("txtAddress").value = r.payload.address ?? '';
    document.getElementById("txtZip").value = r.payload.cap ?? '';
    document.getElementById("ddlPropertyStatus").value = r.payload.property_status ?? '';
    document.getElementById("txtSize").value = r.payload.size ?? '';
    document.getElementById("txtFloor").value = r.payload.floor ?? '';
    document.getElementById("txtRoom").checked = r.payload.rooms ? true : false;
    document.getElementById("txtBathroom").checked = r.payload.bathrooms ? true : false;
    document.getElementById("txtGarden").checked = r.payload.garden ? true : false;
    document.getElementById("txtBox").checked = r.payload.box ? true : false;
    document.getElementById("txtElevator").checked = r.payload.elevator ? true : false;
    document.getElementById("txtAcqPrice").value = r.payload.acquisition_price ?? '';
    document.getElementById("txtRenPrice").value = r.payload.renovation_price ?? '';
    document.getElementById("txtExtraPrice").value = r.payload.renovation_price ?? '';
    document.getElementById("txtSellPrice").value = r.payload.sell_price ?? '';
}

function allowEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.add('d-none'));
    editControls.forEach(editControl => editControl.classList.remove('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.remove('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.add('d-none');
}

function cancelEditGeneralInfo() {
    const valueControls = document.querySelectorAll('.valueControl');
    const editControls = document.querySelectorAll('.editControl');
    valueControls.forEach(valueControl => valueControl.classList.remove('d-none'));
    editControls.forEach(editControl => editControl.classList.add('d-none'));
    document.getElementById("iconSaveEditGenericInfo").classList.add('d-none');
    document.getElementById("iconCancelEditGenericInfo").classList.add('d-none');
    document.getElementById("iconAllowEditGenericInfo").classList.remove('d-none');
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

async function loadOpportunityStatus() {
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

async function updateGenericInfo() {
    const btn = document.getElementById("iconSaveEditGenericInfo");
    btn.disabled = true;
    let err = document.getElementById('errMessage');
    err.innerText = '';
    const customer = document.getElementById("ddlCustomer").value;
    const opportunity = document.getElementById("ddlOpportunity").value;
    const alias = document.getElementById("txtAlias").value.trim();
    const nation = document.getElementById("ddlState").value;
    const city = document.getElementById("txtCity").value.trim();
    const address = document.getElementById("txtAddress").value.trim();
    const zip = document.getElementById("txtZip").value.trim();
    const propertyStatus = document.getElementById("ddlPropertyStatus").value;
    const size = document.getElementById("txtSize").value.trim();
    const floor = document.getElementById("txtFloor").value.trim();
    const room = document.getElementById("txtRoom").checked === true ? 1 : 0;
    const bathroom = document.getElementById("txtBathroom").checked === true ? 1 : 0;
    const garden = document.getElementById("txtGarden").checked === true ? 1 : 0;
    const box = document.getElementById("txtBox").checked === true ? 1 : 0;
    const elevator = document.getElementById("txtElevator").checked === true ? 1 : 0;
    const acqPrice = document.getElementById("txtAcqPrice").value.trim();
    const renPrice = document.getElementById("txtRenPrice").value.trim();
    const extraPrice = document.getElementById("txtExtraPrice").value.trim();
    const sellPrice = document.getElementById("txtSellPrice").value.trim();
    if (alias === '' || nation === '' || city === '' || address === '' || size === '' || zip === '' || propertyStatus === '' || floor === '' || acqPrice === '' || renPrice === '' || extraPrice === "" || sellPrice === "") {
        err.innerText = "Si prega di compilare tutti i campi richiesti";
        btn.disabled = false;
        return;
    }
    try {
        const response = await fetch("/api/property/" + propertyId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer: customer,
                opportunity: opportunity,
                alias: alias,
                nation: nation,
                city: city,
                address: address,
                zip: zip,
                propertyStatus: parseInt(propertyStatus),
                size: size,
                floor: floor,
                room: room,
                bathroom: bathroom,
                garden: garden,
                box: box,
                elevator: elevator,
                acqPrice: parseInt(acqPrice),
                renPrice: parseInt(renPrice),
                extraPrice: parseInt(extraPrice),
                sellPrice: parseInt(sellPrice),
            })
        });
        const res = await response.json();
        btn.disabled = false;
        if (res.result) {
            await loadPropertyDetail();
            cancelEditGeneralInfo();
        } else err.innerText = "Si sono verificati degli errori";
    } catch (error) {
        err.innerText = "Si sono verificati degli errori";
        console.error(error.message !== undefined ? error.message : error);
    }
}

async function deleteModal() {
    showDeleteConfirmationModal(async function (confirmed) {
        if (confirmed) {
            try {
                const response = await fetch("/api/property/" + propertyId, { method: "DELETE" });
                const res = await response.json();
                if (res.result) {
                    $("#modalConfirmDelete").modal('hide');
                    window.location = `/properties`;
                } else throw new Error("Error while deleting Property!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}

function showDeleteConfirmationModal(callback) {
    document.getElementById("deleteErrorMessage").innerHTML = '';
    const modalElement = document.getElementById("modalConfirmDelete");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const confirmButton = document.getElementById("btnConfirmDelete");
    confirmButton.removeEventListener("click", confirmButton.clickHandler);
    confirmButton.clickHandler = function (e) {
        e.stopPropagation();
        callback(true);
    };
    confirmButton.addEventListener("click", confirmButton.clickHandler);
}