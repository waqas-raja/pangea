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
                <button type="button" id="btnCancel" class="btn btn-light border" onclick="">Annulla</button>
                <button id="btnSaveNewEstimate" type="button" class="btn btn-blue" onclick="saveNewEstimate()" disabled>
                    <i class="bi bi-check-lg"></i> Salva Preventivo
                    <div id="spinnerNewEstimate" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
        <div id="errAddNewEstimate" class="mt-3 d-none"></div>
    </div>
    <?php //require_once __DIR__ . "/../partials/customer-overview.php"; 
    ?>
    <div class="row">
        <div class="col-sm-8">
            <div class="row mb-3">
                <div class="col-sm-12">
                    <div class="pai-card">
                        <div class="pai-title mb-3 fw-bold">Dati Generali</div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="ddlSelectClient" class="form-label">Seleziona Cliente</label>
                                <select id="ddlSelectClient" class="form-select"></select>
                            </div>
                            <div class="col-md-6">
                                <label for="ddlSelectProperty" class="form-label">Seleziona Immobile</label>
                                <select id="ddlSelectProperty" class="form-select"></select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-12">
                    <div class="pai-card">
                        <div class="pai-title mb-3 fw-bold">Stime di Affitto Mensili</div>
                        <div class="d-flex justify-content-between align-items-center fw-semibold gap-3 mb-3">
                            <span class="w-20">Mese</span>
                            <span class="w-40">Prezzo Medio Giornaliero (&euro;)</span>
                            <span class="w-40">Giorni Affittati Stimati</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span style="width: 20%;">Gennio</span>
                            <input type="number" id="averageJen" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedJen" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Febbraio</span>
                            <input type="number" id="averageFeb" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedFeb" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Marzo</span>
                            <input type="number" id="averageMar" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedMar" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Aprile</span>
                            <input type="number" id="averageApr" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedApr" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Maggio</span>
                            <input type="number" id="averageMay" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedMay" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Giugno</span>
                            <input type="number" id="averageJun" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedJun" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Luglio</span>
                            <input type="number" id="averageJul" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedJul" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Agosto</span>
                            <input type="number" id="averageAug" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedAug" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Settembre</span>
                            <input type="number" id="averageSep" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedSep" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Ottobre</span>
                            <input type="number" id="averageOct" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedOct" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Novembre</span>
                            <input type="number" id="averageNov" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedNov" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center gap-3">
                            <span class="w-20">Dicembre</span>
                            <input type="number" id="averageDec" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <input type="number" id="estimatedDec" class="form-control w-40" maxlength="5" value="0" placeholder="0" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-12">
                    <div class="pai-card">
                        <div class="pai-title mb-3 fw-bold">Spese Fisse</div>
                        <div id="deductionFixedCost">
                            <div id="costSection_1" class="d-flex justify-content-between align-items-center gap-3 mb-3">
                                <input type="text" id="txtCostDesc_1_1" class="form-control w-80" value="" placeholder="Es. TARI, SPESE Condominiali...">
                                <input type="number" id="txtCost_1_1" class="form-control w-15 costToDeduct" maxlength="5" value="" placeholder="€" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                                <span class="w-5 text-center" role="button" onclick="removeCostSection(this)"><i class="bi bi-trash"></i></span>
                            </div>
                            <div id="costSection_2" class="d-flex justify-content-between align-items-center gap-3 mb-3">
                                <input type="text" id="txtCostDesc_2_1" class="form-control w-80" value="" placeholder="Es. Assicurazione">
                                <input type="number" id="txtCost_2_1" class="form-control w-15 costToDeduct" maxlength="5" value="" placeholder="€" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                                <span class="w-5 text-center" role="button" onclick="removeCostSection(this)"><i class="bi bi-trash"></i></span>
                            </div>
                        </div>
                        <div class="text-blue fw-semibold" role="button" onclick="addCostVariant()">
                            <i class="bi bi-plus-circle me-2"></i> Aggiungi Voce
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
                    <span id="calculatedTotal" class="fs-3 fw-bold mt-3">0,00 &euro;</span>
                </div>
                <button id="btnCalculateEstimate" class="btn bg-green p-2 text-white w-100 mb-3" onclick="calculateEstimate()">
                    <i class="bi bi-file-earmark-diff me-2"></i>Calcola Rendita
                </button>
                <div class="text-center text-body-tertiary">
                    Clicca "Calcola Rendita" per aggiornare la stima. Il pulsante "Salva Preventivo" si attivera dopo il primo calcolo.
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/new-estimate.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
