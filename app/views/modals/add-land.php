<div id="modalAddLand" class="modal fade" tabindex="-1" aria-labelledby="modalAddLandLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddLandLabel"><i class="bi bi-columns-gap me-3"></i>Aggiungi Terre</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="ddlLandType" class="col-sm-4 col-form-label">Tipo<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <select id="ddlLandType" class="form-select">
                                <option value="" selected>Seleziona tipo di terre</option>
                                <option value="1">Agricola</option>
                                <option value="2">Residenziale</option>
                                <option value="3">Industriale</option>
                            </select>
                        </div>
                    </div>
                    <!-- <div class="row mb-3">
                        <label for="txtLastName" class="col-sm-4 col-form-label">Cognome<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txtLastName" required>
                        </div>
                    </div> -->
                    <span id="spNewLandResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveLand" type="button" class="btn btn-blue" onclick="saveLand()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewLand" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>