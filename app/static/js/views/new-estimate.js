let _isEstimated = false;
document.addEventListener("DOMContentLoader", () => {

})

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
        const response = await fetch("/api/estimate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "customer": customer.value.trim(), "property": property.value.trim() })
        });
        const res = await response.json();
        if (res.result) {
            btn.disabled = true;
            btn.lastElementChild.classList.add("d-none");
            showMessage('Registrazione salvata con successo', 'errAddNewEstimate', 'text-success');
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
    _isEstimated = true;
    document.getElementById('btnSaveNewEstimate').disabled = false;
}

function addCostVariant() {
    let ctrl_id = 1;
    const parent = document.getElementById('deductionFixedCost');
    if (parent.children.length > 0) ctrl_id = parseInt(parent.lastElementChild.id.split('_')[1]) + 1;
    const str = `<div id="costSection_${ctrl_id}" class="d-flex justify-content-between align-items-center gap-3 mb-3">
                    <input type="text" id="txtCostDesc_${ctrl_id}_1" class="form-control w-80" value="" placeholder="Es. Tipo">
                    <input type="number" id="txtCost_${ctrl_id}_1" class="form-control w-15" value="" placeholder="€">
                    <span class="w-5 text-center" role="button" onclick="removeCostSection(this)"><i class="bi bi-trash"></i></span>
                </div>`;
    parent.innerHTML += str;
}

function removeCostSection(ele) {
    ele.parentNode.remove();
}

