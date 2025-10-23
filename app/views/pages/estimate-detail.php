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
            <div>
                <div class="pai-title fw-bold text-blue">Dettaglio Preventivi <span id="estimateId">#P2024-045</span></div>
                <span class="text-muted text-small">Visualizza i dettagli del preventivo per l'immobile e il cliente.</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="position-relative me-2" style="width: 230px;">
                    <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:-10px;" title="Edit" onclick="allowEditGeneralInfo()">
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
        <div id="errEditCustomer" class="text-danger"></div>
    </div>
    <?php //require_once __DIR__ . "/../partials/customer-overview.php"; 
    ?>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 mb-3">
        <div class="col">
            <div class="pai-card h-100">
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
        </div>
        <div class="col">
            <div class="pai-card h-100">
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
    </div>
    <div class="row mb-3">
        <div class="col-sm-12">
            <h3 class="pai-title text-blue fw-bold"><i class="bi bi-file-earmark-text me-2"></i>Riepilogo Economico</h3>
            <div class="pai-card">
                <h3 class="pai-title mb-3 fw-bold">Stime Mensili</h3>
                <table class="table">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">MESE</th>
                            <th scope="col">ENTRATE STIMATE (€)</th>
                            <th scope="col">USCITE STIMATE (€)</th>
                            <th scope="col">SALDO MENSILE (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold">Gennaio</td>
                            <td class="text-success">800,00</td>
                            <td class="text-danger">-150,00</td>
                            <td class="text-success fw-semibold">650,00</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold">Febbraio</td>
                            <td class="text-success">800,00</td>
                            <td class="text-danger">-150,00</td>
                            <td class="text-success fw-semibold">650,00</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold">Marzo</td>
                            <td class="text-success">800,00</td>
                            <td class="text-danger">-150,00</td>
                            <td class="text-success fw-semibold">650,00</td>
                        </tr>
                    </tbody>
                    <tfoot class="table-light">
                        <tr>
                            <td class="fw-bold">Totale Annuo</td>
                            <td class="text-success fw-semibold">9.600,00</td>
                            <td class="text-danger fw-semibold">-1.860,00</td>
                            <td class="text-success fw-semibold">7.740,00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 mb-3">
        <div class="col">
            <div class="pai-card h-100">
                <h3 class="pai-title mb-3 fw-bold">Σ Calcolo Rendita Ipotetica</h3>
                <div class="bg-light d-flex justify-content-between align-items-center p-2 mb-2 rounded-2">
                    <span>Entrate Totali Annue</span>
                    <span class="fw-bold text-green">€ 9.600,00</span>
                </div>
                <div class="bg-light d-flex justify-content-between align-items-center p-2 mb-2 rounded-2">
                    <span>Uscite Totali Annue</span>
                    <span class="fw-bold text-red">€ 1.860,00</span>
                </div>
                <div class="d-flex justify-content-between align-items-center p-2 mb-2 rounded-2" style="background-color: #b5b5b5;">
                    <span class="fw-bold text-blue">Uteile Lordo</span>
                    <span class="fw-bold fs-5 text-blue">€ 7.740,00</span>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="pai-card h-100">
                <h3 class="pai-title mb-3 fw-bold"><i class="bi bi-file-earmark-text me-2"></i>Voci Fisse di Decrtazione</h3>
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <span>IMU</span>
                    <span class="text-red text-end">- € 850,00</span>
                </div>
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <span>TARI</span>
                    <span class="text-red text-end">- € 320,00</span>
                </div>
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <span>Spese Condominiali Annuali</span>
                    <span class="text-red text-end">- € 600,00</span>
                </div>
                <div class="d-flex justify-content-between align-items-center py-2">
                    <span>Assicurazione</span>
                    <span class="text-red text-end">- € 250,00</span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <div class="pai-card bg-blue">
                <div class="w-50 mx-auto my-3 text-center text-white">
                    <h3 style="color: #abcabc; font-weight:bold;">Fedita Annua Netta Stimata</h3>
                    <h1 style="font-weight: 800;">€ 5.720,00</h1>
                    <div class="d-flex justify-content-center align-items-center">
                        <span class="bg-green p-2 rounded-pill">ROI: 4.77%</span>
                        <i class="bi bi-info-circle fs-5 ms-2"></i>
                    </div>
                </div>
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
