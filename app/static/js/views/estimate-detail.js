document.addEventListener("DOMContentLoaded", async () => {
    await loadEstimateDetail();
    loadCustomers();
});

async function loadEstimateDetail() {
    const response = await fetch('/api/estimate/' + estimateId);
    const r = await response.json();
    let months = { "Jen": "Gennaio", "Feb": "Febbraio", "Mar": "Marzo", "Apr": "aprile", "May": "maggio", "Jun": "giugno", "Jul": "luglio", "Aug": "agosto", "Sep": "settembre", "Oct": "ottobre", "Nov": "novembre", "Dec": "dicembre" };
    let totalEstimate = 0, totalDeduct = 0;
    if (r.result) {
        document.getElementById('customerName').textContent = r.payload.estimate.customer_name + " " + r.payload.estimate.customer_surname;
        document.getElementById('customerEmail').textContent = r.payload.estimate.customer_email;
        document.getElementById('customerPhone').textContent = r.payload.estimate.customer_phone;
        document.getElementById('propertyAddress').textContent = r.payload.estimate.propert_address;
        document.getElementById('propertySize').textContent = r.payload.estimate.property_size + ' mq';

        document.getElementById('customerNameDraft').textContent = r.payload.estimate.customer_name + " " + r.payload.estimate.customer_surname;
        document.getElementById('customerEmailDraft').textContent = r.payload.estimate.customer_email;
        document.getElementById('customerPhoneDraft').textContent = r.payload.estimate.customer_phone;
        document.getElementById('propertyAddressDraft').textContent = r.payload.estimate.propert_address;
        document.getElementById('propertySizeDraft').textContent = r.payload.estimate.property_size + ' mq';
        let str = '';
        r.payload.estimate_month.forEach(element => {
            totalEstimate += parseInt(element.avge_daily_price) * parseInt(element.rented_days);
            str += `<tr>
                        <td class="text-capitalize">${months[element.month]}</td>
                        <td class="text-center">${formatNumber(parseInt(element.avge_daily_price))}</td>
                        <td class="text-center">${formatNumber(element.rented_days)}</td>
                        <td class="fw-semibold text-end">${formatNumber(parseInt(element.avge_daily_price) * parseInt(element.rented_days))} </td>
                    </tr>`;
        });
        document.getElementById('tBodyMonthlyEstimate').innerHTML = str;
        document.getElementById('tBodyMonthlyEstimateDraft').innerHTML = str;
        document.getElementById('tFooterMonthlyEstimate').innerHTML = `<tr>
                            <td class="fw-bold">Totale Annuo</td>
                            <td class="text-success fw-semibold"></td>
                            <td class="text-danger fw-semibold"></td>
                            <td class="text-success fw-bold text-end">${formatNumber(totalEstimate)}</td>
                        </tr>`;
        document.getElementById('tFooterMonthlyEstimateDraft').innerHTML = `<tr>
                            <td class="fw-bold">Totale Annuo</td>
                            <td class="text-success fw-semibold"></td>
                            <td class="text-danger fw-semibold"></td>
                            <td class="text-success fw-bold text-end">${formatNumber(totalEstimate)}</td>
                        </tr>`;
        if (r.payload.estimate_fixed_cost.length > 0) {
            let strCost = '';
            r.payload.estimate_fixed_cost.forEach(element => {
                totalDeduct += parseInt(element.fixed_cost_amount);
                strCost += `<tr>
                            <td class="text-capitalize">${element.fixed_cost_label}</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="fw-semibold text-end">${formatNumber(parseInt(element.fixed_cost_amount))}</td>
                        </tr>`;
            });
            document.getElementById('tBodyFixedCost').innerHTML = strCost;
            document.getElementById('tBodyFixedCostDraft').innerHTML = strCost;
            document.getElementById('tFooterFixedCost').innerHTML = `<tr>
                            <td class="fw-bold">Totale</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="text-danger fw-bold text-end">${formatNumber(totalDeduct)}</td>
                        </tr>`;
            document.getElementById('tFooterFixedCostDraft').innerHTML = `<tr>
                            <td class="fw-bold">Totale</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="text-danger fw-bold text-end">${formatNumber(totalDeduct)}</td>
                        </tr>`;
        } else {
            document.getElementById('divFixedCost').style.display = 'none';
            document.getElementById('divFixedCostDraft').style.display = 'none';
        }
        document.getElementById('netAnnualIncome').textContent = formatNumber(totalEstimate - totalDeduct);
        document.getElementById('netAnnualIncomeDraft').textContent = formatNumber(totalEstimate - totalDeduct);
        const d = new Date();
        document.getElementById('dateDraft').textContent = 'Data: ' + d.toLocaleDateString();
    }
}

async function loadCustomers() {
    const response = await fetch('/api/customers');
    const r = await response.json();
    let ctrl = document.getElementById("ddlCustomer");
    ctrl.innerHTML = '';
    let opt = '<option value="" selected>Seleziona</option>';
    r.payload.forEach(customer => {
        if (customer.bizname !== "" && customer.bizname !== null) opt += `<option value="${customer.id}">${customer.bizname}</option>`;
        else opt += `<option value="${customer.id}">${customer.name} ${customer.surname}</option>`;
    });
    ctrl.innerHTML = opt;
}

function editQuote(id) {
    localStorage.setItem('editEstimateId', id);
    window.location.href = '/estimate';
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
                    btn.disabled = false;
                    btn.lastElementChild.classList.add('d-none');
                    $("#modalConfirmDelete").modal('hide');
                    window.location.href = '/estimates';
                } else throw new Error("Errore durante l'eliminazione della citazione!");
            } catch (error) {
                document.getElementById("deleteErrorMessage").innerText = error.message !== undefined ? error.message : error;
            }
        }
    });
}

function showQuoteDraftModal(tag = null) {
    if (tag !== null) {
        document.getElementById('selectCustomerSection').classList.remove('d-none');
        document.getElementById('btnQuoteDraftDownload').classList.add('d-none');
        document.getElementById('btnSendQuoteDraftToCustomer').classList.remove('d-none');
    } else {
        document.getElementById('selectCustomerSection').classList.add('d-none');
        document.getElementById('btnQuoteDraftDownload').classList.remove('d-none');
        document.getElementById('btnSendQuoteDraftToCustomer').classList.add('d-none');
    }
    const modalElement = document.getElementById("modalQuoteDraftDownload");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function downloadQuoteDraft(fname) {
    const btn = document.getElementById('btnQuoteDraftDownload');
    btn.disabled = true;
    btn.lastElementChild.classList.remove('d-none');
    const el = document.getElementById('quoteToDownloadDiv');
    // pdf options tuned for A4
    const opt = {
        margin: 10,
        filename: `${fname || 'quote'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    let res = document.getElementById('resultDraft');
    try {
        if (typeof html2pdf === 'undefined') {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js';
            s.onload = () => html2pdf().set(opt).from(el).save();
            document.body.appendChild(s);
        } else html2pdf().set(opt).from(el).save();
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        res.textContent = 'File scaricato correttamente';
        res.classList.add('text-success');
        setTimeout(() => {
            res.textContent = '';
            $('#modalQuoteDraftDownload').modal('hide');
        }, 3000);
    } catch (error) {
        btn.disabled = false;
        btn.lastElementChild.classList.add('d-none');
        res.textContent = 'Download del file non riuscito';
        res.classList.add('text-danger');
    }
}

async function shareQuoteToCustomer(fname) {
    const customer = document.getElementById('ddlCustomer').value;
    const btn = document.getElementById('btnQuoteDraftDownload');
    let result = document.getElementById('resultDraft');
    result.classList.add('d-none');
    if (customer === '') {
        result.innerText = "È richiesta la selezione di una persona";
        result.classList.add("text-danger");
        result.classList.remove("d-none");
        return;
    }
    result.innerText = "La funzionalità è in fase di elaborazione...";
    result.classList.remove("text-danger");
    result.classList.add("text-success");
    result.classList.remove("d-none");
    return;
    btn.lastElementChild.classList.remove('d-none');
    const el = document.getElementById('quoteToDownloadDiv');
    // pdf options tuned for A4
    const opt = {
        margin: 10,
        filename: `${fname || 'quote'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    btn.disabled = true;
}