<?php
$title = 'Dettaglio Preventivi';
ob_start();
$eid = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hEstimateId" type="hidden" value="<?= $eid ?>">

<div id="estimate_detail_page">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
                <div class="pai-title fw-bold text-blue me-2">Dettaglio Preventivi <span id="estimateId">#P2024-<?php echo $eid; ?></span></div>
                <!-- <span class="text-muted text-small">Visualizza i dettagli del preventivo per l'immobile e il cliente.</span> -->
                <div class="d-flex justify-content-start align-items-center">
                    <div class="position-relative" style="width: 230px;">
                        <span id="iconAllowEditGenericInfo" class="editIcon" role="button" title="Edit" onclick="allowEditGeneralInfo()">
                            <i class="bi bi-pencil"></i>
                        </span>
                        <button id="iconSaveEditGenericInfo" class="btn btn-blue-inverted position-absolute saveIcon d-none px-2" role="button" style="right:0px;top:-18px;" title="Save" onclick="updateGenericInfo()">
                            <i class="bi bi-floppy"></i> Salva
                        </button>
                        <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none px-2" role="button" style="right:80px;top:-18px;" title="Cancel" onclick="cancelEditGeneralInfo()">
                            <i class="bi bi-x-circle"></i> Annulla
                        </button>
                    </div>
                    <!-- <button type="button" class="btn btn-link text-danger border" onclick="deleteCustomerModal()">
                        <i class="bi bi-trash3 me-2"></i> Elimina Cliente
                    </button> -->
                </div>
            </div>
            <div class="d-flex align-items-center bg-blue w-25 text-center text-white py-2 px-4 rounded-2 fw-bold">
                <span class="me-3">Rendita Netta Annua:</span>
                <span class="fs-4">€ 5.720,00</span>
            </div>
        </div>
        <div id="errEditEstimate" class="text-danger"></div>
    </div>
    <?php //require_once __DIR__ . "/../partials/customer-overview.php"; 
    ?>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 mb-3">
        <div class="col">
            <div class="pai-card mb-3">
                <div class="text-blue pai-title mb-3 fw-bold"><i class="bi bi-person me-2"></i>Informazioni Cliente</div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Cliente:</span>
                    <span class="text-end fw-semibold">Mario Rossi</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Email:</span>
                    <span class="text-end fw-semibold">mario.rossi@email.com</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Telefono:</span>
                    <span class="text-end fw-semibold">+39 333 1234567</span>
                </div>
            </div>
            <div class="pai-card mb-3">
                <div class="text-blue pai-title mb-3 fw-bold"><i class="bi bi-house-door me-2"></i>Informazioni Immobile</div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Indirizzo:</span>
                    <span class="text-end fw-semibold">Via Roma 1, 10123 Torino</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Tipologia:</span>
                    <span class="text-end fw-semibold">Appartamento</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Superficie:</span>
                    <span class="text-end fw-semibold">85 mq</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>Rif. Catastale:</span>
                    <span class="text-end fw-semibold">F.23, Part. 123, Sub. 4</span>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="pai-card mb-3">
                <h3 class="pai-title mb-3 fw-bold text-blue">Entrate Stimate</h3>
                <table class="table table-borderless mb-1">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Mese</th>
                            <th scope="col" class="text-center">Rendita giornaliera</th>
                            <th scope="col" class="text-center">Giorni stimati</th>
                            <th scope="col" class="text-end">Totale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="">Gennaio</td>
                            <td class="text-center">20 €</td>
                            <td class="text-center">20 €</td>
                            <td class="fw-semibold text-end">4000 €</td>
                        </tr>
                        <tr>
                            <td class="">Febbraio</td>
                            <td class="text-center">20 €</td>
                            <td class="text-center">20 €</td>
                            <td class="fw-semibold text-end">4000 €</td>
                        </tr>
                        <tr>
                            <td class="">Marzo</td>
                            <td class="text-center">20 €</td>
                            <td class="text-center">20 €</td>
                            <td class="fw-semibold text-end">4000 €</td>
                        </tr>
                    </tbody>
                    <tfoot class="table-light" style="border-top: 2px solid #000;">
                        <tr>
                            <td class="fw-bold">Totale Annuo</td>
                            <td class="text-success fw-semibold"></td>
                            <td class="text-danger fw-semibold"></td>
                            <td class="text-success fw-bold text-end">7.740,00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="pai-card mb-3">
                <h3 class="pai-title mb-3 fw-bold text-blue">Spese Fisse</h3>
                <table class="table table-borderless mb-1">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Descrizione</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col" class="text-end">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="">Spesa 1</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="fw-semibold text-end">200 €</td>
                        </tr>
                        <tr>
                            <td class="">Spesa 2</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="fw-semibold text-end">200 €</td>
                        </tr>
                    </tbody>
                    <tfoot class="table-light" style="border-top: 2px solid #000;">
                        <tr>
                            <td class="fw-bold">Totale</td>
                            <td class=""></td>
                            <td class=""></td>
                            <td class="text-danger fw-bold text-end">400 €</td>
                        </tr>
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
    const customerId = '<?= $cid ?>';
</script>
<script src="/static/js/views/estimate-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
