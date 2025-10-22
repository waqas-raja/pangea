<div id="modalAddOpportunity" class="modal fade" tabindex="-1" aria-labelledby="modalAddOpportunityLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddOpportunityLabel"><i class="bi bi-file-earmark-text me-3"></i>Aggiungi Opportunità</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6">
                            <div class="row mb-3">
                                <label for="txtAlias" class="col-sm-4 col-form-label">Alias<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtAlias" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="ddlSource" class="col-sm-4 col-form-label">Fonte<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <select id="ddlSource" class="form-select"></select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="ddlPropertyType" class="col-sm-4 col-form-label">Tipo di proprietà<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <select id="ddlPropertyType" class="form-select"></select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtSize" class="col-sm-4 col-form-label">Dimensione<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="txtSize" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtAddress" class="col-sm-4 col-form-label">Indirizzo<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtAddress" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtCity" class="col-sm-4 col-form-label">Città<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtCity" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-6">
                            <div class="row mb-3">
                                <label for="ddlState" class="col-sm-4 col-form-label">Stato:<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <select id="ddlState" class="form-select">
                                        <option value="" selected>Seleziona nazione</option>
                                        <option value="IT">IT</option>
                                        <option value="PK">PK</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="ddlPropertyStatus" class="col-sm-4 col-form-label">Stato di opportunità<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <select id="ddlPropertyStatus" class="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtPrice" class="col-sm-4 col-form-label">Prezzo<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="txtPrice" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtTaxes" class="col-sm-4 col-form-label">Tasse<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtTaxes" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtNote" class="col-sm-4 col-form-label">Note<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtNote" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span id="spNewOpportunityResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveOpportunity" type="button" class="btn btn-orange" onclick="saveOpportunity()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewOpportunity" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>