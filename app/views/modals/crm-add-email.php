<div id="modalAddEmail" class="modal fade" tabindex="-1" aria-labelledby="modalAddEmailLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddEmailLabel"><i class="bi bi-envelope me-3"></i>Nuova email</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hEmailId">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtEmailDate" class="col-sm-3 col-form-label">Data e ora<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="datetime-local" id="txtEmailDate" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtEmailSubject" class="col-sm-3 col-form-label">Soggetto<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="text" id="txtEmailSubject" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtEmailRecipients" class="col-sm-3 col-form-label">Destinatari<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="email" id="txtEmailRecipients" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtEmailContent" class="col-sm-3 col-form-label">Contenuto<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <div id="txtEmailContent"></div>
                        </div>
                    </div>
                    <div id="crmEmailResult"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveEmail" type="button" class="btn btn-blue" onclick="saveEmail(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewEmail" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdateEmail" type="button" class="btn btn-blue d-none" onclick="updateEmail(this)">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div id="" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>