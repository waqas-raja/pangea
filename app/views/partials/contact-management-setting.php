<div class="row">
    <div class="col-md-12">
        <div class="pai-card">
            <form class="mt-3" autocomplete="off">
                <div class="row mb-3">
                    <label for="ddlInterfaceLanguage" class="col-sm-4 col-form-label">Tipo di contatto</label>
                    <div class="col-sm-8">
                        <select id="ddlInterfaceLanguage" class="form-select">
                            <option value="" selected>Seleziona tipo di contatto</option>
                            <option value="1">Cliente</option>
                            <option value="2">Agente</option>
                            <option value="3">Proprietario</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtName" class="col-sm-4 col-form-label">Nome</label>
                    <div class="col-sm-8">
                        <input id="txtName" class="form-control" type="text" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtSurname" class="col-sm-4 col-form-label">Cognome</label>
                    <div class="col-sm-8">
                        <input id="txtSurname" class="form-control" type="text" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtEmail" class="col-sm-4 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input id="txtEmail" class="form-control" type="text" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtPhone" class="col-sm-4 col-form-label">Telefono</label>
                    <div class="col-sm-8">
                        <input id="txtPhone" class="form-control" type="text" value="">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtTagCategory" class="col-sm-4 col-form-label">Tag o categorie</label>
                    <div class="col-sm-8">
                        <input id="txtTagCategory" class="form-control" type="text" value="">
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span id="resultContactManagement"></span>
                    </div>
                    <button id="btnUpdateContactManagement" type="button" class="btn btn-blue" onclick="updateContactManagement()">
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