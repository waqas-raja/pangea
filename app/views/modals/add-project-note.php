<div id="modalAddProjectNote" class="modal fade" tabindex="-1" aria-labelledby="modalAddProjectNoteLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddProjectNoteLabel"><i class="bi bi-stickies me-3"></i>Aggiungi nota progetto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hProjectProfileId">
                <input type="hidden" id="hProjectNoteId">
                <form id="">
                    <div class="row mb-3 align-items-center">
                        <label for="txtProjectNoteAutoComplete" class="col-sm-3 col-form-label">Progetto:<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <div id="txtProjectNoteAutoComplete" class="form-control"></div>
                        </div>
                    </div>
                    <div class="row mb-3 align-items-center">
                        <label for="txtProjectNote" class="col-sm-3 col-form-label">Note:<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <div id="txtProjectNote" class="form-control"></div>
                        </div>
                    </div>
                    <span id="spProjectNoteResult" class="d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveProjectNote" type="button" class="btn btn-blue" onclick="saveProjectNote(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerProjectNote" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdateProjectNote" type="button" class="btn btn-blue d-none" onclick="editProjectNote(this)">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div id="spinnerUpdateProjectNote" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>