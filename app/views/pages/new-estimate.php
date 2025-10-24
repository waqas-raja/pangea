<?php
$title = 'Nuovo Preventivi';
ob_start();
// require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<div id="new_estimate_page">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <div class="pai-title fw-bold text-blue">Nuovo Preventivo Immobiliare</div>
                <span class="text-muted text-small">Crea un nuovo preventivo per un cliente e un immobile.</span>
            </div>
            <div class="d-flex justify-content-between align-items-center gap-2">
                <button type="button" class="btn btn-light border" onclick="">Annulla</button>
                <button type="button" class="btn btn-blue" onclick="">Salva Preventivo</button>
            </div>
        </div>
        <div id="errAddNewEstimate" class="text-danger mt-3 d-none"></div>
    </div>
    <?php //require_once __DIR__ . "/../partials/customer-overview.php"; 
    ?>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="pai-card">
                        <div class="pai-title mb-3 fw-bold">Dati Generali</div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="ddlSelectClient" class="form-label">Seleziona Cliente</label>
                                <select id="ddlSelectClient" class="form-select">
                                    <option value="" selected>Cerca e seleziona un cliente</option>
                                    <option value="1">Mario Rossi</option>
                                    <option value="2">Rossi Mario</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="ddlSelectProperty" class="form-label">Seleziona Immobile</label>
                                <select id="ddlSelectProperty" class="form-select">
                                    <option value="" selected>Cerca e seleziona un immobile</option>
                                    <option value="1">Mario Rossi</option>
                                    <option value="2">Rossi Mario</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="pai-card">
                <div class="pai-title mb-3 fw-bold">Dati Generali</div>
                <div class="alert alert-primary text-center p-3">
                    <span>Rendita Annu Lorda Stimata</span><br>
                    <span class="fs-3 fw-bold mt-3">0,00 &euro;</span>
                </div>
                <button class="btn bg-green p-2 text-white w-100">Calcola Rendita</button>
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
