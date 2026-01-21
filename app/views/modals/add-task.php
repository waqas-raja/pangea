<div id="modalAddTask" class="modal fade" tabindex="-1" aria-labelledby="modalAddTaskLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddTaskLabel"><i class="bi bi-list-task me-3"></i>Aggiungi attività</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="text" id="hTaskId" value="" hidden>
                <form id="">
                    <fieldset class="row mb-3">
                        <legend class="col-form-label col-sm-4 pt-0">Valutazione dello scenario:</legend>
                        <div class="col-sm-8">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="rbScenarioEvaluation" id="rbBestCase" value="best" checked>
                                <label class="form-check-label" for="rbBestCase">
                                    Nel migliore dei casi
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="rbScenarioEvaluation" id="rbAverageCase" value="average">
                                <label class="form-check-label" for="rbAverageCase">
                                    Caso medio
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="rbScenarioEvaluation" id="rbWorstCase" value="worst">
                                <label class="form-check-label" for="rbWorstCase">
                                    Il caso peggiore
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div class="row mb-0 align-items-center">
                        <label for="txtInputTask" class="col-sm-4 col-form-label">Attività:<span class="text-danger ms-2 editControl">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" id="txtInputTask" class="form-control editControl mb-1" placeholder="Enter task..." value="">
                        </div>
                    </div>
                    <span id="spNewTaskResult" class="d-none"></span>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveTask" type="button" class="btn btn-blue" onclick="saveTask(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewTask" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
                <button id="btnUpdateTask" type="button" class="btn btn-blue d-none" onclick="editTask(this)">
                    <i class="bi bi-check-lg"></i> Modificare
                    <div id="spinnerUpdateTask" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>