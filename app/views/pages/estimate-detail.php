<?php
$title = 'Dettaglio Preventivo';
ob_start();
$eid = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/draft-quote.php";
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hEstimateId" type="hidden" value="<?= $eid ?>">

<div id="estimate_detail_page">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
                <div class="pai-title fw-bold text-blue me-2">Preventivo <span id="estimateId">#P2024-<?php echo $eid; ?></span></div>
                <!-- <span class="text-muted text-small">Visualizza i dettagli del preventivo per l'immobile e il cliente.</span> -->
                <div class="d-flex justify-content-start align-items-center">
                    <div class="position-relative" style="width: 230px;">
                        <span id="iconAllowEditGenericInfo" class="editIcon me-2" role="button" title="Modifica" onclick="editQuote(<?= $eid ?>)">
                            <i class="bi bi-pencil-square fs-4"></i>
                        </span>
                        <span id="iconDownloadPdf" class="editIcon me-2" role="button" title="Scarica il pdf" onclick="showQuoteDraftModal()">
                            <i class="bi bi-download fs-4"></i>
                        </span>
                        <span id="iconSendQuoteToCustomer" class="editIcon me-2" role="button" title="Invia" onclick="showQuoteDraftModal('send')">
                            <i class="bi bi-send fs-4"></i>
                        </span>
                        <span id="iconDeleteQuote" class="editIcon text-danger" role="button" title="Scarta" onclick="deleteQuote(<?= $eid ?>)">
                            <i class="bi bi-trash fs-4"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between bg-blue w-20 text-white py-2 px-3 rounded-2 fw-bold">
                <span class="">Rendita netta annua:</span>
                <span id="netAnnualIncome" class="fs-4">€ 00</span>
            </div>
        </div>
        <div id="errEditEstimate" class="text-danger"></div>
    </div>
    <?php //require_once __DIR__ . "/../partials/customer-overview.php"; 
    ?>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 mb-3">
        <div class="col">
            <div class="pai-card mb-3">
                <div class="text-blue pai-title mb-3 fw-bold">Informazioni cliente</div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Cliente:</span>
                    <span id="customerName" class="text-end fw-semibold">Mario Rossi</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Email:</span>
                    <span id="customerEmail" class="text-end fw-semibold">mario.rossi@email.com</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Telefono:</span>
                    <span id="customerPhone" class="text-end fw-semibold">+39 333 1234567</span>
                </div>
            </div>
            <div class="pai-card mb-3">
                <div class="text-blue pai-title mb-3 fw-bold">Informazioni immobile</div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Indirizzo:</span>
                    <span id="propertyAddress" class="text-end fw-semibold">Via Roma 1, 10123 Torino</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Tipologia:</span>
                    <span id="propertyType" class="text-end fw-semibold">Appartamento</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Superficie:</span>
                    <span id="propertySize" class="text-end fw-semibold">85 mq</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Rif. Catastale:</span>
                    <span id="propertyRegistryRef" class="text-end fw-semibold">F.23, Part. 123, Sub. 4</span>
                </div>
                <div class="mb-0">
                    <label class="form-label">Mappa:</label>
                    <div id="mapContainer"></div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="pai-card mb-3">
                <h3 class="pai-title mb-3 fw-bold text-blue">Entrate stimate</h3>
                <table class="table table-borderless mb-1">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Mese</th>
                            <th scope="col" class="text-center">Rendita giornaliera</th>
                            <th scope="col" class="text-center">Giorni stimati</th>
                            <th scope="col" class="text-end">Totale</th>
                        </tr>
                    </thead>
                    <tbody id="tBodyMonthlyEstimate">
                    </tbody>
                    <tfoot id="tFooterMonthlyEstimate" class="table-light" style="border-top: 2px solid #000;">
                    </tfoot>
                </table>
            </div>
            <div id="divFixedCost" class="pai-card mb-3">
                <h3 class="pai-title mb-3 fw-bold text-blue">Spese fisse</h3>
                <table class="table table-borderless mb-1">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Descrizione</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col" class="text-end">Costo</th>
                        </tr>
                    </thead>
                    <tbody id="tBodyFixedCost">
                    </tbody>
                    <tfoot id="tFooterFixedCost" class="table-light" style="border-top: 2px solid #000;">
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <div class="text-center text-body-tertiary text-small">
                Preventivo generato il 24/10/2025. Ultima modifica da Mario Rossi.
            </div>
        </div>
    </div>
</div>
<script>
    const estimateId = '<?= $eid ?>';
</script>
<script src="/static/js/views/estimate-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
