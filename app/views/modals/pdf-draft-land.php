<div id="modalPdfDraftLand" class="modal fade" tabindex="-1" aria-labelledby="modalPdfDraftLandLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalPdfDraftLandLabel"><i class="bi bi-columns-gap me-3"></i>Scarica il PDF</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="drftLandToDownloadDiv" class="modal-body">
                <input type="hidden" id="hFileName">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="pai-title fw-bold text-blue mb-2">Terre #: <span id="draftLandId"></span></div>
                        <div id="draftLandDate"></div>
                    </div>
                    <div><img src="/static/imgs/logo.png" alt="" style="height: 150px;"></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col">
                        <div class="text-blue pai-title mb-3 fw-bold">Informazioni relative al territorio</div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Land type:</span>
                            <span id="draftLandType" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Land name:</span>
                            <span id="draftLandName" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Land surface area:</span>
                            <span id="draftLandArea" class="text-end fw-semibold"></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span>Location:</span>
                            <span id="draftLandLocation" class="text-end fw-semibold"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <span id="resultLandDraft"></span>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnQuoteDraftDownload" type="button" class="btn btn-blue" onclick="downloadLandDraft(this)">
                    <i class="bi bi-check-lg"></i> Scarica il PDF
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnSendQuoteDraftToCustomer" type="button" class="btn btn-blue" onclick="showCustomerSelectionDiv(this)">
                    <i class="bi bi-check-lg"></i> Inviare
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
            <div id="shareToCustomerDiv" class="px-3 d-none">
                <div class="row mb-3">
                    <label for="ddlSelectCustomerToSharePdf" class="col-sm-4 col-form-label">Cliente</label>
                    <div class="col-sm-8">
                        <div class="input-group">
                            <select id="ddlSelectCustomerToSharePdf" class="form-select">
                            </select>
                            <button id="" type="button" class="btn btn-blue" onclick="sharePdfToCustomer(this)">
                                <i class="bi bi-check-lg"></i> Inviare
                                <div id="" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>