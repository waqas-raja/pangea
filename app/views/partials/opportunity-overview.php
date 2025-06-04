<div class="row">
    <div class="col-sm-12">
        <div class="pai-card mb-3">
            <div class="position-relative">
                <p class="lato-black text-blue mb-0"><i class="bi bi-person-vcard"></i>&nbsp;&nbsp;Informazioni opportunità</p>
                <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:0;" title="Edit" onclick="allowEditGeneralInfo()">
                    <i class="bi bi-pencil"></i>
                </span>
                <button id="iconSaveEditGenericInfo" class="btn btn-orange-inverted position-absolute saveIcon d-none py-0 px-2" role="button" style="right:0px;top:0;" title="Save" onclick="updateGenericInfo()">
                    <i class="bi bi-floppy"></i> Salva
                </button>
                <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none py-0 px-2" role="button" style="right:80px;top:0;" title="Cancel" onclick="cancelEditGeneralInfo()">
                    <i class="bi bi-x-circle"></i> Annulla
                </button>
            </div>
            <div id="errMessage" class="text-danger"></div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="pai-card position-relative">
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
                        <input type="text" id="txtSize" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlPropertyStatus" class="col-sm-5 col-form-label">Stato di opportunità:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPropertyStatus" class="valueControl"></span>
                        <select id="ddlPropertyStatus" class="form-select editControl d-none mb-1">
                            <option value="" selected>Seleziona</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtPrice" class="col-sm-5 col-form-label">Prezzo:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spPrice" class="valueControl"></span>
                        <input type="text" id="txtPrice" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtTaxes" class="col-sm-5 col-form-label">Tasse:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spTaxes" class="valueControl"></span>
                        <input type="text" id="txtTaxes" class="form-control editControl d-none mb-1" value="">
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
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="pai-card position-relative">
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
            <hr>
            <div class="row mb-0 align-items-center">
                <label for="txtAcqPrice" class="col-sm-5 col-form-label">Prezzo acquisizione:</label>
                <div class="col-sm-7">
                    <span id="spAcqPrice" class="valueControl"></span>
                    <input type="number" id="txtAcqPrice" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="ddlProServices" class="col-sm-5 col-form-label">Servizi professionali:</label>
                <div class="col-sm-7">
                    <span id="spProServices" class="valueControl"></span>
                    <select id="ddlProServices" class="form-select editControl d-none mb-1">
                        <option value="" selected>Seleziona</option>
                        <option value="1">Development</option>
                    </select>
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtNote" class="col-sm-5 col-form-label">Note:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spNote" class="valueControl"></span>
                    <input type="text" id="txtNote" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
        </div>
    </div>
</div>