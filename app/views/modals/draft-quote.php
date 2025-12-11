<div id="modalQuoteDraftDownload" class="modal fade" tabindex="-1" aria-labelledby="modalQuoteDraftDownloadLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalQuoteDraftDownloadLabel"><i class="bi bi-buildings me-3"></i>Scarica il PDF</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="quoteToDownloadDiv" class="modal-body">
                <div id="selectCustomerSection" class="row mb-3 d-none">
                    <label for="ddlCustomer" class="col-sm-4 col-form-label">Cliente<span class="text-danger ms-2">*</span></label>
                    <div class="col-sm-8">
                        <select id="ddlCustomer" class="form-select">
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="d-flex align-items-center bg-blue w-100 text-center text-white py-2 px-4 rounded-2 fw-bold mb-2">
                            <span class="me-3">Rendita netta annua:</span>
                            <span id="netAnnualIncomeDraft" class="fs-4">€ 00</span>
                        </div>
                        <div class="pai-title fw-bold text-blue mb-2">Preventivi <span id="estimateIdDraft">#P2024-<?php echo $eid; ?></span></div>
                        <div id="dateDraft"></span></div>
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
                                <span id="customerNameDraft" class="text-end fw-semibold">Mario Rossi</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Email:</span>
                                <span id="customerEmailDraft" class="text-end fw-semibold">mario.rossi@email.com</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Telefono:</span>
                                <span id="customerPhoneDraft" class="text-end fw-semibold">+39 333 1234567</span>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="">
                            <div class="text-blue pai-title mb-3 fw-bold">Informazioni immobile</div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Indirizzo:</span>
                                <span id="propertyAddressDraft" class="text-end fw-semibold">Via Roma 1, 10123 Torino</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Tipologia:</span>
                                <span id="propertyTypeDraft" class="text-end fw-semibold">Appartamento</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Superficie:</span>
                                <span id="propertySizeDraft" class="text-end fw-semibold">85 mq</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span>Rif. Catastale:</span>
                                <span id="propertyRegistryRefDraft" class="text-end fw-semibold">F.23, Part. 123, Sub. 4</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <h3 class="pai-title mb-3 fw-bold text-blue">Entrate stimate</h3>
                            <table class="table table-borderless mb-1">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Mese</th>
                                        <th scope="col" class="text-center">Rendita giornaliera</th>
                                        <th scope="col" class="text-center">Giorni stimati</th>
                                        <th scope="col" class="text-end">Totale</th>
                                    </tr>
                                </thead>
                                <tbody id="tBodyMonthlyEstimateDraft">
                                </tbody>
                                <tfoot id="tFooterMonthlyEstimateDraft" class="table-light" style="border-top: 2px solid #000; border-bottom: 2px solid #000;">
                                </tfoot>
                            </table>
                        </div>
                        <div id="divFixedCostDraft" class="">
                            <h3 class="pai-title mb-3 fw-bold text-blue">Spese fisse</h3>
                            <table class="table table-borderless mb-1">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Descrizione</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col" class="text-end">Costo</th>
                                    </tr>
                                </thead>
                                <tbody id="tBodyFixedCostDraft">
                                </tbody>
                                <tfoot id="tFooterFixedCostDraft" class="table-light" style="border-top: 2px solid #000; border-bottom: 2px solid #000;">
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <span id="resultDraft"></span>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnQuoteDraftDownload" type="button" class="btn btn-blue" onclick="downloadQuoteDraft('Dettaglio Preventivi #P2024-<?= $eid; ?>')">
                    <i class="bi bi-check-lg"></i> Scarica il PDF
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnSendQuoteDraftToCustomer" type="button" class="btn btn-blue d-none" onclick="shareQuoteToCustomer('Dettaglio Preventivi #P2024-<?= $eid; ?>')">
                    <i class="bi bi-check-lg"></i> Inviare
                    <div id="spinnerNewProperty" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>