<div id="modalNotarySheetDownload" class="modal fade" tabindex="-1" aria-labelledby="modalNotarySheetDownloadLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalNotarySheetDownloadLabel"><i class="bi bi-buildings me-3"></i>Scarica il PDF</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="notaryToDownloadDiv" class="modal-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="pai-title fw-bold text-blue mb-2">Immobile <span id="propertyIdNotry"><?= ' #' . $id ?></span></div>
                        <div id="propertyDateNotry"></span></div>
                    </div>
                    <div><img src="/static/imgs/logo.png" alt="" style="height: 150px;"></div>
                </div>
                <hr>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 mb-3 pb-3 border-bottom">
                    <div class="col">
                        <div class="">
                            <div class="text-blue pai-title mb-3 fw-bold">Informazioni cliente</div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Cliente:</span>
                                <span id="customerNameNotary" class="text-end fw-semibold">Mario Rossi</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Email:</span>
                                <span id="customerEmailNotary" class="text-end fw-semibold">mario.rossi@email.com</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Telefono:</span>
                                <span id="customerPhoneNotary" class="text-end fw-semibold">+39 333 1234567</span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <div class="text-blue pai-title mb-3 fw-bold">Informazioni immobile</div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Indirizzo:</span>
                                <span id="propertyAddressNotary" class="text-end fw-semibold">Via Roma 1, 10123 Torino</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Tipologia:</span>
                                <span id="propertyTypeNotary" class="text-end fw-semibold">Appartamento</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Superficie:</span>
                                <span id="propertySizeNotary" class="text-end fw-semibold">85 mq</span>
                            </div>
                            <!-- <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Rif. Catastale:</span>
                                <span id="propertyRegistryRefNotary" class="text-end fw-semibold">F.23, Part. 123, Sub. 4</span>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="text-blue pai-title mb-3 fw-bold">Informazioni su costi e margini</div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Costo di acquisizione:</span>
                            <span id="notaryAcqCost" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Costo di ristrutturazione:</span>
                            <span id="notaryRenCost" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Costo aggiuntivo:</span>
                            <span id="notaryExtCost" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Prezzo di vendita:</span>
                            <span id="notarySellPrice" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Profitto:</span>
                            <span id="notaryProfit" class="text-end fw-semibold"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <span id="resultNotary"></span>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnNotaryDownload" type="button" class="btn btn-blue" onclick="downloadPropertyNotary('Notary #-<?= $id; ?>')">
                    <i class="bi bi-check-lg"></i> Scarica il PDF
                    <div id="" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>