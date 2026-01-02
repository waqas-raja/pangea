<div class="row">
    <div class="col-md-12">
        <div class="pai-card">
            <form class="mt-3" autocomplete="off">
                <div class="row mb-3">
                    <label for="ddlPropertyType" class="col-sm-4 col-form-label">Tipi di immobili</label>
                    <div class="col-sm-8">
                        <select id="ddlPropertyType" class="form-select">
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="ddlPropertyStatus" class="col-sm-4 col-form-label">Stato degli immobili</label>
                    <div class="col-sm-8">
                        <select id="ddlPropertyStatus" class="form-select">
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="ddlCurrencyFormat" class="col-sm-4 col-form-label">Valute e formati dei prezzi</label>
                    <div class="col-sm-8">
                        <select id="ddlCurrencyFormat" class="form-select">
                            <option value="" selected>Seleziona</option>
                            <option value="1">&euro; (Eura)</option>
                            <option value="2">&dollar; (Dollaro)</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span id="resultPropertyManagement"></span>
                    </div>
                    <button id="btnUpdatePropertyManagement" type="button" class="btn btn-blue" onclick="updatePropertyManagement()">
                        <i class="bi bi-check-lg"></i> Salva
                        <div id="" class="spinner-border spinner-border-sm d-none" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>