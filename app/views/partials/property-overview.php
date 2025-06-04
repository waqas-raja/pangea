<div class="row">
    <div class="col-sm-12">
        <div class="pai-card mb-3">
            <div class="position-relative">
                <p class="lato-black text-blue mb-0"><i class="bi bi-person-vcard"></i>&nbsp;&nbsp;Informazioni proprietà</p>
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
                    <label for="ddlCustomer" class="col-sm-5 col-form-label">Cliente:</label>
                    <div class="col-sm-7">
                        <span id="spCustomer" class="valueControl"></span>
                        <select id="ddlCustomer" class="form-select editControl d-none mb-1">
                        </select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="ddlOpportunity" class="col-sm-5 col-form-label">Opportunità:</label>
                    <div class="col-sm-7">
                        <span id="spOpportunity" class="valueControl"></span>
                        <select id="ddlOpportunity" class="form-select editControl d-none mb-1">
                        </select>
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtAlias" class="col-sm-5 col-form-label">Alias:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spAlias" class="valueControl"></span>
                        <input type="text" id="txtAlias" class="form-control editControl d-none mb-1" value="">
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
                <div class="row mb-0 align-items-center">
                    <label for="txtCity" class="col-sm-5 col-form-label">Città:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spCity" class="valueControl"></span>
                        <input type="text" id="txtCity" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtAddress" class="col-sm-5 col-form-label">Indirizzo:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spAddress" class="valueControl"></span>
                        <input type="text" id="txtAddress" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtZip" class="col-sm-5 col-form-label">CAP:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spZip" class="valueControl"></span>
                        <input type="text" id="txtZip" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <hr>
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
                    <label for="txtSize" class="col-sm-5 col-form-label">Dimensione:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spSize" class="valueControl"></span>
                        <input type="number" id="txtSize" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
                <div class="row mb-0 align-items-center">
                    <label for="txtFloor" class="col-sm-5 col-form-label">Floor:<span class="text-danger ms-2 editControl d-none">*</span></label>
                    <div class="col-sm-7">
                        <span id="spFloor" class="valueControl"></span>
                        <input type="number" id="txtFloor" class="form-control editControl d-none mb-1" value="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="pai-card position-relative">
            <div class="row mb-0 align-items-center">
                <label for="txtRoom" class="col-sm-5 col-form-label">Stanze:</label>
                <div class="col-sm-7">
                    <span id="spRoom" class="valueControl"></span>
                    <input type="number" id="txtRoom" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtBathroom" class="col-sm-5 col-form-label">Bagno:</label>
                <div class="col-sm-7">
                    <span id="spBathroom" class="valueControl"></span>
                    <input type="number" id="txtBathroom" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtGarden" class="col-sm-5 col-form-label">Giardino:</label>
                <div class="col-sm-7">
                    <span id="spGarden" class="valueControl"></span>
                    <input type="number" id="txtGarden" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtBox" class="col-sm-5 col-form-label">Box:</label>
                <div class="col-sm-7">
                    <span id="spBox" class="valueControl"></span>
                    <input type="number" id="txtBox" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtElevator" class="col-sm-5 col-form-label">Ascensore:</label>
                <div class="col-sm-7">
                    <span id="spElevator" class="valueControl"></span>
                    <input type="number" id="txtElevator" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <hr>
            <div class="row mb-0 align-items-center">
                <label for="txtAcqPrice" class="col-sm-5 col-form-label">Prezzo acquisizione:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spAcqPrice" class="valueControl"></span>
                    <input type="number" id="txtAcqPrice" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtRenPrice" class="col-sm-5 col-form-label">Prezzo di ristrutturazione:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spRenPrice" class="valueControl"></span>
                    <input type="number" id="txtRenPrice" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtExtraPrice" class="col-sm-5 col-form-label">Prezzo aggiuntivo:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spExtraPrice" class="valueControl"></span>
                    <input type="number" id="txtExtraPrice" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>
            <div class="row mb-0 align-items-center">
                <label for="txtSellPrice" class="col-sm-5 col-form-label">Prezzo di vendita:<span class="text-danger ms-2 editControl d-none">*</span></label>
                <div class="col-sm-7">
                    <span id="spSellPrice" class="valueControl"></span>
                    <input type="number" id="txtSellPrice" class="form-control editControl d-none mb-1" value="">
                </div>
            </div>

        </div>
    </div>
</div>