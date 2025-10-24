let _isEstimated = false;
document.addEventListener("DOMContentLoader", () => {

})

function saveNewEstimate() {
    if (!_isEstimated) return;
}

function calculateEstimate() {
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