<div class="row">
    <div class="col-md-12">
        <div class="pai-card">
            <form class="mt-3" autocomplete="off">
                <div class="row mb-3">
                    <label for="ddlInterfaceLanguage" class="col-sm-4 col-form-label">Linguaggio dell'interfaccia</label>
                    <div class="col-sm-8">
                        <select id="ddlInterfaceLanguage" class="form-select">
                            <option value="" selected>Seleziona linguaggio dell'interfaccia</option>
                            <option value="1">Italiano</option>
                            <option value="2">Inglese</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="ddlTheme" class="col-sm-4 col-form-label">Tema</label>
                    <div class="col-sm-8">
                        <select id="ddlTheme" class="form-select">
                            <option value="" selected>Seleziona tema</option>
                            <option value="1">Leggero</option>
                            <option value="2">Buio</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cbNotification" class="col-sm-4 col-form-label">Notifiche via email e push</label>
                    <div class="col-sm-8">
                        <input id="cbNotification" class="form-check-input" type="checkbox" value="">
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span id="resultPreferences"></span>
                    </div>
                    <button id="btnUpdatePreferences" type="button" class="btn btn-blue" onclick="updatePreferences()">
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