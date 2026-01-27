<div id="modalAddAppointment" class="modal fade" tabindex="-1" aria-labelledby="modalAddAppointmentLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalAddAppointmentLabel"><i class="bi bi-calendar me-3"></i>Nuovo appuntamento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="">
                    <div class="row mb-3">
                        <label for="txtAppointmentDate" class="col-sm-3 col-form-label">Data e ora<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="datetime-local" id="txtAppointmentDate" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtAppointmentType" class="col-sm-3 col-form-label">Tipo di appuntamento<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <input type="text" id="txtAppointmentType" class="form-control" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="txtAppointmentNote" class="col-sm-3 col-form-label">Notes<span class="text-danger ms-2">*</span></label>
                        <div class="col-sm-9">
                            <div id="txtAppointmentNote"></div>
                        </div>
                    </div>
                    <div id="crmAppointmentResult"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"><i class="bi bi-x"></i> Annulla</button>
                <button id="btnSaveAppointment" type="button" class="btn btn-blue" onclick="saveAppointment(this)">
                    <i class="bi bi-check-lg"></i> Salva
                    <div id="spinnerNewAppointment" class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                </button>
            </div>
        </div>
    </div>
</div>