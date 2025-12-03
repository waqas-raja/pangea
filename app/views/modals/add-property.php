<div id="modalAddProperty" class="modal fade" tabindex="-1" aria-labelledby="modalAddPropertyLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddPropertyLabel"><i class="bi bi-buildings me-3"></i>Aggiungi Proprietà</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row mb-3">
                                <label for="ddlCustomer" class="col-sm-4 col-form-label">Cliente<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <select id="ddlCustomer" class="form-select">
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtAlias" class="col-sm-4 col-form-label">Alias<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtAlias" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="ddlState" class="col-sm-4 col-form-label">Stato<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <select id="ddlState" class="form-select">
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtCity" class="col-sm-4 col-form-label">Citta<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtCity" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtAddress" class="col-sm-4 col-form-label">Indirizzo<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="txtAddress" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtZip" class="col-sm-4 col-form-label">CAP<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="txtZip" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtSize" class="col-sm-4 col-form-label">Size<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="txtSize" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtFloor" class="col-sm-4 col-form-label">Floor<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="txtFloor" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">

                            <div class="row mb-1 align-items-center">
                                <label for="txtRoom" class="col-sm-5 col-form-label">Stanze</label>
                                <div class="col-sm-7">
                                    <div class="form-check form-switch mb-0">
                                        <input id="txtRoom" class="form-check-input" type="checkbox" role="switch">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1 align-items-center">
                                <label for="txtBathroom" class="col-sm-5 col-form-label">Bagno</label>
                                <div class="col-sm-7">
                                    <div class="form-check form-switch mb-0">
                                        <input id="txtBathroom" class="form-check-input" type="checkbox" role="switch">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1 align-items-center">
                                <label for="txtGarden" class="col-sm-5 col-form-label">Giardino</label>
                                <div class="col-sm-7">
                                    <div class="form-check form-switch mb-0">
                                        <input id="txtGarden" class="form-check-input" type="checkbox" role="switch">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1 align-items-center">
                                <label for="txtBox" class="col-sm-5 col-form-label">Box</label>
                                <div class="col-sm-7">
                                    <div class="form-check form-switch mb-0">
                                        <input id="txtBox" class="form-check-input" type="checkbox" role="switch">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2 align-items-center">
                                <label for="txtElevator" class="col-sm-5 col-form-label">Ascensore</label>
                                <div class="col-sm-7">
                                    <div class="form-check form-switch mb-0">
                                        <input id="txtElevator" class="form-check-input" type="checkbox" role="switch">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtAcqPrice" class="col-sm-5 col-form-label">Prezzo di acquisizione<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="number" class="form-control" id="txtAcqPrice" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtRenPrice" class="col-sm-5 col-form-label">Prezzo di ristrutturazione<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="number" class="form-control" id="txtRenPrice" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtExtraPrice" class="col-sm-5 col-form-label">Prezzo aggiuntivo<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="number" class="form-control" id="txtExtraPrice" required>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="txtSellPrice" class="col-sm-5 col-form-label">Prezzo di vendita<span class="text-danger ms-2">*</span></label>
                                <div class="col-sm-7">
                                    <input type="number" class="form-control" id="txtSellPrice" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span id="spNewPropertyResult" class="text-danger d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveProperty" type="button" class="btn btn-blue" onclick="saveProperty()">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>