<div id="modalAddLand" class="modal fade" tabindex="-1" aria-labelledby="modalAddLandLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddLandLabel"><i class="bi bi-columns-gap me-3"></i>Aggiungi Terre</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hLandId">
                <form id="">
                    <div class="row mb-3">
                        <label for="ddlLandType" class="col-sm-4 col-form-label">Tipo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select id="ddlLandType" class="form-select" onchange="showRelevantFields(this.value)"></select>
                        </div>
                    </div>
                    <div id="agricultureLandFields" class="d-none">
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
                    <div id="residentialLandFields" class="d-none"></div>
                    <div id="industrialLandFields" class="d-none">
                        <div class="row mb-3">
                            <label for="txtIndustarialLandName" class="col-sm-4 col-form-label">Industria<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="txtIndustarialLandName" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtIndustarialLandArea" class="col-sm-4 col-form-label">Superficie<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <div class="input-group">
                                    <input type="number" id="txtIndustarialLandArea" class="form-control" required="" min="0">
                                    <span class="input-group-text">(mq)</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="txtIndustarialLandLocation" class="col-sm-4 col-form-label">Ubicazione<span class="text-danger ms-2">*</span></label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="txtIndustarialLandLocation" required>
                            </div>
                        </div>
                    </div>
                    <span id="spNewLandResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveLand" type="button" class="btn btn-blue" onclick="saveLand(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewLand" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdateLand" type="button" class="btn btn-blue d-none" onclick="updateLand(this)">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div id="" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>