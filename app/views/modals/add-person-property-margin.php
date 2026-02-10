<div id="modalAddPersonPropertyMargin" class="modal fade" tabindex="-1" aria-labelledby="modalAddPersonPropertyMarginLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPersonPropertyMarginLabel"><i class="bi bi-terminal-split me-3"></i></i>Nuovi margini</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hLandId">
                <form id="">
                    <div id="agricultureLandFields" class="">
                        <div class="row mb-3">
                            <label for="txtAgricultureLandName" class="col-sm-4 col-form-label">Nome<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="txtAgricultureLandName" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtAgricultureLandArea" class="col-sm-4 col-form-label">Superficie<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input type="number" id="txtAgricultureLandArea" class="form-control" required="" min="0">
                                    <span class="input-group-text">(mq)</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtAgricultureLandLocation" class="col-sm-4 col-form-label">Ubicazione<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="txtAgricultureLandLocation" required>
                            </div>
                        </div>
                    </div>
                    <span id="spNewLandResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveLand" type="button" class="btn btn-blue" onclick="">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewLand" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdateLand" type="button" class="btn btn-blue d-none" onclick="">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div id="" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>