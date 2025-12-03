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
                        <input type="tell" id="txtPhone" class="form-control editControl d-none mb-1" maxlength="11" value="">
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
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="pai-card position-relative cardHeight">
            <div id="">
                <div class="row mb-0 align-items-enter">
                    <label for="txtAddress" class="col-sm-5 col-form-label">Indirizzo:<span class="text-danger ms-2 editControl d-none">*</span></label>
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
                        <select id="ddlState" class="form-select editControl d-none mb-1">
                            <option value="" selected>Seleziona nazione</option>
                            <option value="IT">IT</option>
                            <option value="PK">PK</option>
                        </select>
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
    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <div class="pai-card position-relative cardHeight">
            <h3 class="pai-title">Immobili associate</h3>
            <div id="associatedPropertiesGrid" class=""></div>
        </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <div class="pai-card position-relative cardHeight">
            <h3 class="pai-title">Preventivi associate</h3>
            <div id="associatedQuoteGrid" class=""></div>
        </div>
    </div>
</div>