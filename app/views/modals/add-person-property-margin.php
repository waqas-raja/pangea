<div id="modalAddPersonPropertyMargin" class="modal fade" tabindex="-1" aria-labelledby="modalAddPersonPropertyMarginLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPersonPropertyMarginLabel"><i class="bi bi-terminal-split me-3"></i></i>Nuovi margini</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hPersonPropertyMarginId">
                <form id="">
                    <div class="">
                        <div class="row mb-3">
                            <label for="ddlMarginPerson" class="col-sm-4 col-form-label">Persone<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <select id="ddlMarginPerson" class="form-select"></select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ddlMarginProperty" class="col-sm-4 col-form-label">Immobili<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <select id="ddlMarginProperty" class="form-select"></select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtMarginValue" class="col-sm-4 col-form-label">Valore<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input type="number" id="txtMarginValue" class="form-control" required="" min="0">
                                    <select id="ddlMarginValueType" class="form-select">
                                        <option value="0">Valore fisso</option>
                                        <option value="1">Percentuale</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ddlMarginCurrency" class="col-sm-4 col-form-label">Valuta<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <select id="ddlMarginCurrency" class="form-select">
                                    <option value="1">EUR</option>
                                    <option value="2">USD</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtMarginUsageType" class="col-sm-4 col-form-label">Tipo di utilizzo<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input id="txtMarginUsageType" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="ddlMarginPriority" class="col-sm-4 col-form-label">Priorità<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <select id="ddlMarginPriority" class="form-select">
                                    <option value="1">Normale</option>
                                    <option value="2">Urgente</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="swMarginStatus" class="col-sm-4 col-form-label">È attivo<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <div class="form-check form-switch pt-2">
                                    <input id="swMarginStatus" class="form-check-input" type="checkbox" role="switch" checked>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtMarginValidFrom" class="col-sm-4 col-form-label">Valido dal</label>
                            <div class="col-sm-8">
                                <input type="datetime-local" id="txtMarginValidFrom" class="form-control" required="">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtMarginValidTo" class="col-sm-4 col-form-label">Valido fino a</label>
                            <div class="col-sm-8">
                                <input type="datetime-local" id="txtMarginValidTo" class="form-control" required="">
                            </div>
                        </div>
                    </div>
                    <span id="resultPersonPropertyMargin" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSavePersonPropertyMargin" type="button" class="btn btn-blue" onclick="savePersonPropertyMargin(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdatePersonPropertyMargin" type="button" class="btn btn-blue d-none" onclick="updatePersonPropertyMargin(this)">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>