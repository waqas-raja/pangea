document.addEventListener("DOMContentLoaded", async () => {
    loadEstimateDetail();
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
        document.getElementById('tFooterMonthlyEstimate').innerHTML = `<tr>
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
            document.getElementById('tFooterFixedCost').innerHTML = `<tr>
                            <td class="fw-bold">Totale</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="text-danger fw-bold text-end">${formatNumber(totalDeduct)}</td>
                        </tr>`;
        } else document.getElementById('divFixedCost').style.display = 'none';
        document.getElementById('netAnnualIncome').textContent = formatNumber(totalEstimate - totalDeduct);
    }
}