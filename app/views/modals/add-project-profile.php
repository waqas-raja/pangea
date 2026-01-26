<div id="modalAddProjectProfile" class="modal fade" tabindex="-1" aria-labelledby="modalAddProjectProfileLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddProjectProfileLabel"><i class="bi bi-terminal me-3"></i>Aggiungi profilo progetto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hProjectProfileId">
                <form id="">
                    <div class="row mb-3 align-items-center">
                        <label for="txtProjectName" class="col-sm-4 col-form-label">Nome progetto:<span class="text-danger ms-2 editControl">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" id="txtProjectName" class="form-control editControl mb-1" placeholder="Inserisci nome progetto" value="">
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <label for="txtProjectCode" class="col-sm-4 col-form-label">Codice progetto:<span class="text-danger ms-2 editControl">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" id="txtProjectCode" class="form-control editControl mb-1" placeholder="Inserisci codice progetto" value="">
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <label for="txtProjectAddress" class="col-sm-4 col-form-label">Indirizzo del progetto:<span class="text-danger ms-2 editControl">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" id="txtProjectAddress" class="form-control editControl mb-1" placeholder="Inserisci indirizzo del progetto" value="">
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <label for="txtProjectContact" class="col-sm-4 col-form-label">Contatto del progetto:<span class="text-danger ms-2 editControl">*</span></label>
                        <div class="col-sm-8">
                            <input type="tell" id="txtProjectContact" class="form-control editControl mb-1" placeholder="Inserisci contatto del progetto" value="" maxlength="16">
                        </div>
                    </div>
                    <span id="spProjectProfileResult" class="d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveProjectProfile" type="button" class="btn btn-blue" onclick="saveProjectProfile(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerProjectProfile" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdateProjectProfile" type="button" class="btn btn-blue d-none" onclick="editProjectProfile(this)">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div id="spinnerUpdateProjectProfile" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>