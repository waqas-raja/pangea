<div id="modalAddCustomer" class="modal fade" tabindex="-1" aria-labelledby="modalAddAgentLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddAgentLabel"><i class="bi bi-person-lines-fill me-3"></i>Aggiungi Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtFirstName" class="col-sm-4 col-form-label">Nome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtFirstName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtLastName" class="col-sm-4 col-form-label">Cognome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtLastName" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtEmail" class="col-sm-4 col-form-label">E-mail<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtEmail" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtPhone" class="col-sm-4 col-form-label">Telefono<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtPhone" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ckIsCompany" class="col-sm-4 col-form-label">È un'azienda</label>
                        <div class="col-sm-8">
                            <div class="form-check form-switch pt-2">
                                <input id="ckIsCompany" class="form-check-input" type="checkbox" role="switch" onchange="toggleCompanyFields(this)">
                            </div>
                        </div>
                    </div>
                    <div id="divCompanyFields" class="d-none">
                        <div class="row mb-3">
                            <label for="txtBizname" class="col-sm-4 col-form-label">Bizname<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="txtBizname" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtVat" class="col-sm-4 col-form-label">VAT<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="txtVat" required>
                            </div>
                        </div>
                    </div>
                    <span id="spNewCustomerResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveCustomer" type="button" class="btn btn-blue" onclick="saveCustomer()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewCustomer" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>