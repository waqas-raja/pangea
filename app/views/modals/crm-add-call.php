<div id="modalAddCall" class="modal fade" tabindex="-1" aria-labelledby="modalAddCallLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddCallLabel"><i class="bi bi-telephone me-3"></i>Nuova chiamata</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtCallDate" class="col-sm-3 col-form-label">Data e ora<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="datetime-local" id="txtCallDate" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtCallWith" class="col-sm-3 col-form-label">Chiama con</label>
                        <div class="col-sm-9">
                            <input type="text" id="txtCallWith" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtCallOutcome" class="col-sm-3 col-form-label">Esito della chiamata<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="text" id="txtCallOutcome" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtNote" class="col-sm-3 col-form-label">Notes<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <div id="txtCallNote"></div>
                        </div>
                    </div>
                    <div id="crmCallResult"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveCall" type="button" class="btn btn-blue" onclick="saveCall(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewCall" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>