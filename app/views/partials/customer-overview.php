<div class="row mb-3">
    <div class="col-4">
        <div class="pai-card position-relative cardHeight">
            <div id="">
                <div class="row mb-0 align-items-center">
                    <label for="txtFirstName" class="col-sm-5 col-form-label">Nome:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spFirstName" class="valueControl"></span>
                        <input type="text" id="txtFirstName" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtLastName" class="col-sm-5 col-form-label">Cognome:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spLastName" class="valueControl"></span>
                        <input type="text" id="txtLastName" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtEmail" class="col-sm-5 col-form-label">E-mail:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spEmail" class="valueControl"></span>
                        <input type="text" id="txtEmail" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtPhone" class="col-sm-5 col-form-label">Telefono:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPhone" class="valueControl"></span>
                        <!-- <input type="tell" id="txtPhone" class="form-control editControl d-none mb-1" maxlength="16" value=""> -->
                        <div class="input-group editControl d-none">
                            <select id="ddlCountryCode" class="text-start form-select input-group-text mb-1 w-35">
                                <option value=""></option>
                                <option value="+39" selected>+39</option>
                                <option value="+92">+92</option>
                            </select>
                            <input type="tell" class="form-control mb-1 w-65" id="txtPhone" required>
                        </div>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlTag" class="col-sm-5 col-form-label">Etichetta persona<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spTag" class="text-capitalize valueControl"></span>
                        <select id="ddlTag" class="form-select editControl d-none mb-1" multiple style="height: 75px;">
                            <option value="">Seleziona il tag della persona</option>
                            <option value="Investitore">Investitore</option>
                            <option value="Proprietario">Proprietario</option>
                            <option value="Cliente">Cliente</option>
                            <option value="Agente">Agente</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="pai-card position-relative cardHeight">
            <div id="">
                <div class="row mb-3">
                    <label for="ckIsCompany" class="col-sm-5 col-form-label">È un'azienda</label>
                    <div class="col-sm-7">
                        <div class="form-check form-switch pt-2">
                            <input id="ckIsCompany" class="form-check-input" type="checkbox" role="switch" onchange="toggleCompanyFields(this)">
                        </div>
                    </div>
                </div>
                <div id="divCompanyFields" class="d-none">
                    <div class="row mb-0 align-items-center">
                        <label for="txtBizname" class="col-sm-5 col-form-label">Bizname:<span class="text-danger ms-2 editControl d-none">*</span></label>
                        <div class="col-sm-7">
                            <span id="spBizname" class="valueControl"></span>
                            <input type="text" id="txtBizname" class="form-control editControl d-none mb-1" value="">
                        </div>
                    </div>
                    <div class="row mb-0 align-items-center">
                        <label for="txtVat" class="col-sm-5 col-form-label">VAT:<span class="text-danger ms-2 editControl d-none">*</span></label>
                        <div class="col-sm-7">
                            <span id="spVat" class="valueControl"></span>
                            <input type="text" id="txtVat" class="form-control editControl d-none mb-1" value="">
                        </div>
                    </div>
                    <div class="row mb-0 align-items-center">
                        <label for="txtFiscal" class="col-sm-5 col-form-label">Codice fiscale:</label>
                        <div class="col-sm-7">
                            <span id="spFiscal" class="valueControl"></span>
                            <input type="text" id="txtFiscal" class="form-control editControl d-none mb-1" value="">
                        </div>
                    </div>
                    <div class="row mb-0 align-items-center">
                        <label for="txtSdi" class="col-sm-5 col-form-label">SDI:</label>
                        <div class="col-sm-7">
                            <span id="spSdi" class="valueControl"></span>
                            <input type="text" id="txtSdi" class="form-control editControl d-none mb-1" value="">
                        </div>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtPotentialInvestment" class="col-sm-5 col-form-label">Potenziale investimento:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPotentialInvestment" class="valueControl">n.d.</span>
                        <input type="text" id="txtPotentialInvestment" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="pai-card position-relative cardHeight">
            <div id="">
                <div class="row mb-0 align-items-enter">
                    <label for="txtAddress" class="col-sm-5 col-form-label">Indirizzo:</label>
                    <div class="col-sm-7">
                        <span id="spAddress" class="valueControl"></span>
                        <input type="text" id="txtAddress" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtCity" class="col-sm-5 col-form-label">Città:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spCity" class="valueControl"></span>
                        <input type="text" id="txtCity" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtZip" class="col-sm-5 col-form-label">CAP:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spZip" class="valueControl"></span>
                        <input type="number" id="txtZip" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlState" class="col-sm-5 col-form-label">Stato:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spState" class="valueControl"></span>
                        <select id="ddlState" class="form-select editControl d-none mb-1"></select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtNote" class="col-sm-5 col-form-label">Note:</label>
                    <div class="col-sm-7">
                        <span id="spNote" class="valueControl"></span>
                        <textarea id="txtNote" rows="3" class="form-control editControl d-none mb-1"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row mb-3">
    <div class="col-12 col-sm-6 col-md-4 col-lg-4">
        <div class="pai-card cardHeight">
            <!-- <label class="form-label">Mappa:</label> -->
            <div id="mapContainer"></div>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-8 col-lg-8">
        <div class="pai-card cardHeight">
            <div class="card-header d-flex justify-content-between align-items-center mb-3">
                <h5 class="pai-title mb-0">Attività CRM del cliente</h5>
                <span class="badge btn-blue">Interazioni</span>
            </div>
            <div id="" class="">
                <ul class="nav nav-tabs" id="crmActivityCardTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="crm-call-tab" data-bs-toggle="tab" data-bs-target="#crm-call" type="button" role="tab" aria-controls="crm-call" aria-selected="false">Chiamate</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="crm-appointment-tab" data-bs-toggle="tab" data-bs-target="#crm-appointment" type="button" role="tab" aria-controls="crm-appointment" aria-selected="false">Appuntamenti</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="crm-email-tab" data-bs-toggle="tab" data-bs-target="#crm-email" type="button" role="tab" aria-controls="crm-email" aria-selected="false">E-mail</button>
                    </li>
                </ul>
                <div class="tab-content" id="crmActivityCardTabsContent">
                    <div class="tab-pane fade border border-top-0 p-3 show active" id="crm-call" role="tabpanel" aria-labelledby="crm-call-tab">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="pai-title">Gestione delle chiamate</div>
                            <button class="btn btn-blue" onclick="showNewCallModal()">Nuova chiamata</button>
                        </div>
                        <hr>
                        <div id="callsList"></div>
                    </div>
                    <div class="tab-pane fade border border-top-0 p-3" id="crm-appointment" role="tabpanel" aria-labelledby="crm-appointment-tab">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="pai-title">Gestione degli appuntamenti</div>
                            <button class="btn btn-blue" onclick="showNewAppointmentModal()">Nuova appuntamento</button>
                        </div>
                        <hr>
                        <div id="appointmentsList"></div>
                    </div>
                    <div class="tab-pane fade border border-top-0 p-3" id="crm-email" role="tabpanel" aria-labelledby="crm-email-tab">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="pai-title">Gestione della posta elettronica</div>
                            <button class="btn btn-blue" onclick="showNewEmailModal()">Nuova email</button>
                        </div>
                        <hr>
                        <div id="emailsList"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row mb-3">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <div class="pai-card position-relative cardHeight">
            <h3 class="pai-title">Immobili associati</h3>
            <div id="associatedPropertiesGrid" class=""></div>
        </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <div class="pai-card position-relative cardHeight">
            <h3 class="pai-title">Preventivi associati</h3>
            <div id="associatedQuoteGrid" class=""></div>
        </div>
    </div>
</div>
<div class="row mb-3">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="pai-card position-relative cardHeight">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h3 class="pai-title">Margini immobiliari</h3>
                <button class="btn btn-blue" onclick="showNewMarginModal()">Nuovi margini</button>
            </div>
            <div id="personPropertyMargins"></div>
        </div>
    </div>
</div>
<div class="row mb-3">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="pai-card position-relative cardHeight">
            <h3 class="pai-title mb-3">
                Documenti condivisi
                <span id="spinnerSharedDocs" class="spinner-border spinner-border-sm ms-3 d-none" role="status">
                    <span class="visually-hidden">Loading...</span>
                </span>
            </h3>
            <div id="errorSharedDocs" class="mb-3"></div>
            <div id="sharedDocumentsGrid" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 mb-3"></div>
        </div>
    </div>
</div>