<div class="d-flex justify-content-between align-items-center mb-3">
    <div>
        <div id="resultGenericInfo"></div>
    </div>
    <div>
        <button class="btn btn-blue" onclick="allowEditGeneralInfo(this)">Modificare</button>
        <div id="noteModifySection" class="d-none">
            <button class="btn btn-outline-secondary px-2 me-2" role="button" title="Cancel" onclick="cancelEditGeneralInfo(this)">
                <i class="bi bi-x-circle"></i> Annulla
            </button>
            <button id="iconSaveEditGenericInfo" class="btn btn-blue-inverted px-2" role="button" title="Save" onclick="updateGenericInfo(this)">
                <i class="bi bi-floppy"></i> Salva
            </button>
        </div>
    </div>
</div>
<div id="opportunityDetailSec" class="row">
    <div class="col-sm-6">
        <div class="pai-card position-relative cardHeight">
            <div id="divInfo">
                <div class="row mb-0 align-items-center">
                    <label for="txtAlias" class="col-sm-5 col-form-label">Alias:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spAlias" class="valueControl"></span>
                        <input type="text" id="txtAlias" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlSource" class="col-sm-5 col-form-label">Fonte:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spSource" class="valueControl"></span>
                        <select id="ddlSource" class="form-select editControl d-none mb-1">
                            <option value="" selected>Seleziona</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlPropertyType" class="col-sm-5 col-form-label">Tipo di proprietà:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPropertyType" class="valueControl"></span>
                        <select id="ddlPropertyType" class="form-select editControl d-none mb-1">
                            <option value="" selected>Seleziona</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtSize" class="col-sm-5 col-form-label">Dimensione:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spSize" class="valueControl"></span>
                        <input type="number" id="txtSize" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlOpportunityStatus" class="col-sm-5 col-form-label">Stato di opportunità:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spOpportunityStatus" class="valueControl"></span>
                        <select id="ddlOpportunityStatus" class="form-select editControl d-none mb-1">
                            <option value="" selected>Seleziona</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtPrice" class="col-sm-5 col-form-label">Prezzo:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPrice" class="valueControl"></span>
                        <input type="number" id="txtPrice" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtTaxes" class="col-sm-5 col-form-label">Tasse:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spTaxes" class="valueControl"></span>
                        <input type="number" id="txtTaxes" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <hr>
                <div class="row mb-0 align-items-center">
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
                    <label for="ddlState" class="col-sm-5 col-form-label">Stato:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spState" class="valueControl"></span>
                        <select id="ddlState" class="form-select editControl d-none mb-1">
                            <option value="" selected>Seleziona</option>
                        </select>
                    </div>
                </div>
                <div class="mb-0">
                    <label class="form-label">Mappa:</label>
                    <div id="mapContainer"></div>
                </div>
                <hr>
                <div class="row mb-0 align-items-center">
                    <label for="txtUrl" class="col-sm-5 col-form-label">URL:</label>
                    <div class="col-sm-7">
                        <span id="spUrl" class="valueControl"></span>
                        <input type="text" id="txtUrl" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <hr>
                <div class="row mb-0 align-items-center">
                    <label for="txtRefName" class="col-sm-5 col-form-label">Nome di riferimento:</label>
                    <div class="col-sm-7">
                        <span id="spRefName" class="valueControl"></span>
                        <input type="text" id="txtRefName" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtRefSurname" class="col-sm-5 col-form-label">Cognome di riferimento:</label>
                    <div class="col-sm-7">
                        <span id="spRefSurname" class="valueControl"></span>
                        <input type="text" id="txtRefSurname" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtRefEmail" class="col-sm-5 col-form-label">Email di riferimento:</label>
                    <div class="col-sm-7">
                        <span id="spRefEmail" class="valueControl"></span>
                        <input type="text" id="txtRefEmail" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtRefPhone" class="col-sm-5 col-form-label">Telefono di riferimento:</label>
                    <div class="col-sm-7">
                        <span id="spRefPhone" class="valueControl"></span>
                        <input type="text" id="txtRefPhone" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="pai-card position-relative cardHeight">
            <div class="row mb-0 align-items-center">
                <label for="ddlPropertyStatus" class="col-sm-5 col-form-label">Stato di proprietà:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spPropertyStatus" class="valueControl"></span>
                    <select id="ddlPropertyStatus" class="form-select editControl d-none mb-1">
                        <option value="" selected>Seleziona</option>
                    </select>
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtFloor" class="col-sm-5 col-form-label">Piano:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spFloor" class="valueControl"></span>
                    <input type="number" id="txtFloor" class="form-control editControl d-none mb-1" min="0" value="0">
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <label for="txtRoom" class="col-sm-5 col-form-label">Stanze:</label>
                <div class="col-sm-7">
                    <span id="spRoom" class="valueControl"></span>
                    <input id="txtRoom" type="number" class="form-control editControl d-none" value="1" min="1" required>
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <label for="txtBathroom" class="col-sm-5 col-form-label">Bagno:</label>
                <div class="col-sm-7">
                    <span id="spBathroom" class="valueControl"></span>
                    <input id="txtBathroom" type="number" class="form-control editControl d-none" value="1" min="1" required>
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <label for="txtGarden" class="col-sm-5 col-form-label">Giardino:</label>
                <div class="col-sm-7">
                    <span id="spGarden" class="valueControl"></span>
                    <div class="input-group editControl d-none">
                        <input id="txtGarden" type="number" class="form-control" value="0" min="0" required>
                        <span class="input-group-text">(mq)</span>
                    </div>
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <label for="txtBox" class="col-sm-5 col-form-label">Box:</label>
                <div class="col-sm-7">
                    <span id="spBox" class="valueControl"></span>
                    <div class="input-group editControl d-none">
                        <input id="txtBox" type="number" class="form-control" value="0" min="0" required>
                        <span class="input-group-text">(mq)</span>
                    </div>
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtElevator" class="col-sm-5 col-form-label">Ascensore:</label>
                <div class="col-sm-7">
                    <span id="spElevator" class="valueControl"></span>
                    <div class="form-check form-switch editControl d-none">
                        <input id="txtElevator" class="form-check-input" type="checkbox" role="switch">
                    </div>
                </div>
            </div>
            <hr>
            <div class="row mb-0 align-items-center">
                <label for="txtAcqPrice" class="col-sm-5 col-form-label">Prezzo acquisizione:</label>
                <div class="col-sm-7">
                    <span id="spAcqPrice" class="valueControl"></span>
                    <input type="number" id="txtAcqPrice" class="form-control editControl d-none mb-1" min="0" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtEstimatedSellPrice" class="col-sm-5 col-form-label">Prezzo stima vendita:</label>
                <div class="col-sm-7">
                    <span id="spEstimatedSellPrice" class="valueControl"></span>
                    <input type="number" id="txtEstimatedSellPrice" class="form-control editControl d-none mb-1" min="0" value="">
                </div>
            </div>
            <hr>
            <div class="row mb-0 align-items-center">
                <label for="txtProcessingTime" class="col-sm-5 col-form-label">Tempo di elaborazione:</label>
                <div class="col-sm-7">
                    <span id="spProcessingTime" class="valueControl"></span>
                    <input id="txtProcessingTime" type="text" class="form-control editControl d-none mb-1" value="" placeholder="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtEstimatedProcessingTime" class="col-sm-5 col-form-label">Tempi di lavorazione stimati:</label>
                <div class="col-sm-7">
                    <span id="spEstimatedProcessingTime" class="valueControl"></span>
                    <div class="input-group editControl d-none">
                        <input id="txtEstimatedProcessingTime" type="text" class="form-control" value="" placeholder="3 - 5">
                        <span class="input-group-text">Months</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>