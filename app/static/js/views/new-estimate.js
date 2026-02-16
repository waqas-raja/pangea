let _isEstimated = false;
let _estimateMonthly = [];
let _estimateFixedCost = [];
let _editEstimateId = null;
document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
    loadProperties();
    if (localStorage.getItem('editEstimateId') !== null) {
        _editEstimateId = parseInt(localStorage.getItem('editEstimateId'));
        loadEstimateDetail(_editEstimateId);
    }
})

async function loadEstimateDetail(id) {
    const response = await fetch('/api/estimate/' + id);
    const r = await response.json();
    let totalEstimate = 0, totalDeduct = 0;
    if (r.result) {
        document.getElementById('ddlSelectClient').value = r.payload.estimate.customer;
        document.getElementById('ddlSelectProperty').value = r.payload.estimate.property;
        r.payload.estimate_month.forEach(element => {
            totalEstimate += parseInt(element.avge_daily_price) * parseInt(element.rented_days);
            document.getElementById(`average${element.month}`).value = parseInt(element.avge_daily_price);
            document.getElementById(`estimated${element.month}`).value = parseInt(element.rented_days);
        });
        let parentDiv = document.getElementById('deductionFixedCost');
        parentDiv.innerHTML = '';
        if (r.payload.estimate_fixed_cost.length > 0) {
            let strCost = '';
            r.payload.estimate_fixed_cost.forEach((element, i) => {
                totalDeduct += parseInt(element.fixed_cost_amount);
                strCost += `<div id="costSection_${i}" class="d-flex justify-content-between align-items-center gap-3 mb-3">
                                <input type="text" id="txtCostDesc_${i}_1" class="form-control w-80" value="${element.fixed_cost_label}" placeholder="Es. TARI, SPESE Condominiali...">
                                <input type="number" id="txtCost_${i}_1" class="form-control w-15 costToDeduct" maxlength="5" value="${parseInt(element.fixed_cost_amount)}" placeholder="€" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); calculateEstimate()">
                                <span class="w-5 text-center" role="button" onclick="removeCostSection(this)"><i class="bi bi-trash"></i></span>
                            </div>`;
            });
            parentDiv.innerHTML = strCost;
        }
        document.getElementById('calculatedTotal').textContent = formatNumber(totalEstimate - totalDeduct);
    }
}

function cancelEstimation() {
    if (_editEstimateId === null) window.location = `/estimates`;
    else window.location = `/estimate/${_editEstimateId}`;
}

async function saveNewEstimate() {
    if (!_isEstimated) return;
    const btn = document.getElementById("btnSaveNewEstimate");
    const customer = document.getElementById('ddlSelectClient');
    const property = document.getElementById('ddlSelectProperty');
    const result = document.getElementById('errAddNewEstimate');
    result.innerHTML = '';
    customer.style.borderColor = '#dee2e6';
    property.style.borderColor = '#dee2e6';
    if (customer.value.trim() === '' || property.value.trim() === "") {
        if (customer.value.trim() === '') customer.style.borderColor = 'red';
        if (property.value.trim() === '') property.style.borderColor = 'red';
        showMessage('Si prega di compilare tutti i campi richiesti', 'errAddNewEstimate', 'text-danger');
        return;
    }
    btn.disabled = true;
    btn.lastElementChild.classList.remove("d-none");
    result.classList.add("d-none");
    try {
        let response;
        if (_editEstimateId !== null) {
            response = await fetch(`/api/estimate/${_editEstimateId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "customer": customer.value.trim(), "property": property.value.trim(), "monthlyEstimate": _estimateMonthly, "fixedCost": _estimateFixedCost })
            });
        } else {
            response = await fetch("/api/estimate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "customer": customer.value.trim(), "property": property.value.trim(), "monthlyEstimate": _estimateMonthly, "fixedCost": _estimateFixedCost })
            });
        }
        const res = await response.json();
        if (res.result) {
            btn.disabled = true;
            btn.lastElementChild.classList.add("d-none");
            showMessage(res.message, 'errAddNewEstimate', 'text-success');
            _isEstimated = false;
            _estimateFixedCost = [];
            _estimateMonthly = [];
        } else {
            showMessage('Si sono verificati degli errori durante il salvataggio', 'errAddNewEstimate', 'text-danger');
            btn.disabled = false;
            btn.lastElementChild.classList.remove("d-none");
        }
    } catch (error) {
        console.error(error.message);
        showMessage('Si è verificato un errore', 'errAddNewEstimate', 'text-danger');
        btn.disabled = false;
        btn.lastElementChild.classList.add("d-none");
    }
}

function calculateEstimate() {
    _estimateFixedCost = [];
    _estimateMonthly = [];
    const months = ["Jen", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let total = 0, deduct = 0;
    months.forEach(month => {
        let avg = Number(document.getElementById(`average${month}`).value) || 0;
        let est = Number(document.getElementById(`estimated${month}`).value) || 0;
        if (avg < 0) avg = 0;
        if (est < 0) est = 0;
        total += avg * est;
        _estimateMonthly.push({ month: month, average: avg, estimated: est});
    });
    let costElements = document.getElementsByClassName('costToDeduct');
    for (let i = 0; i < costElements.length; i++) {
        deduct += Number(costElements[i].value) || 0;
        if (Number(costElements[i].value) > 0) _estimateFixedCost.push({ label: costElements[i].previousElementSibling.value || '', amount: Number(costElements[i].value) || 0 });
    }
    total = total - deduct;
    document.getElementById('calculatedTotal').textContent = formatNumber(total);
    _isEstimated = true;
    document.getElementById('btnSaveNewEstimate').disabled = false;
}

function addCostVariant() {
    let ctrl_id = 1;
    const parent = document.getElementById('deductionFixedCost');
    if (parent.children.length > 0) ctrl_id = parseInt(parent.lastElementChild.id.split('_')[1]) + 1;
    const div = document.createElement('div');
    div.id = `costSection_${ctrl_id}`;
    div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'gap-3', 'mb-3');
    const str = `<input type="text" id="txtCostDesc_${ctrl_id}_1" class="form-control w-80" value="" placeholder="Es. Tipo">
                <input type="number" id="txtCost_${ctrl_id}_1" class="form-control w-15 costToDeduct" maxlength="5" value="" placeholder="€" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); calculateEstimate()">
                <span class="w-5 text-center" role="button" onclick="removeCostSection(this)"><i class="bi bi-trash"></i></span>`;
    div.innerHTML = str;
    parent.append(div);
}

function removeCostSection(ele) {
    ele.parentNode.remove();
    calculateEstimate();
}

async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
    let ctrl = document.getElementById("ddlSelectClient");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona cliente</option>';
    r.payload.forEach(customer => {
        if (customer.bizname !== "" && customer.bizname !== null) opt += `<option value="${customer.id}" class="text-capitalize">${customer.bizname}</option>`;
        else opt += `<option value="${customer.id}" class="text-capitalize">${customer.name} ${customer.surname}</option>`;
    });
    ctrl.innerHTML = opt;
}

async function loadProperties() {
    const response = await fetch('/api/properties');
    const r = await response.json();
    let ctrl = document.getElementById("ddlSelectProperty");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona immobile</option>';
    r.payload.forEach(p => {
        opt += `<option value="${p.id}" class="text-capitalize">${p.alias}</option>`;
    });
    ctrl.innerHTML = opt;
}

