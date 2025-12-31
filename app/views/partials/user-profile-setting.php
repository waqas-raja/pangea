<div class="row mb-3">
    <div class="col-sm-6 m-auto">
        <div class="pai-card">
            <div class="pai-title mb-2">Modifica l'immagine del profilo</div>
            <div>
                <div id="previewProfilePhoto" class="rounded-circle m-auto position-relative" role="button" onclick="document.getElementById('userProfilePhoto').click();" style="width: 150px; height: 150px; background-color: #ddd;">
                </div>
                <input id="userProfilePhoto" class="d-none" type="file" accept="image/*" onchange="previewProfilePhoto()">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span id="profilePhotoResult"></span>
                    </div>
                    <button id="btnUploadProfilePhoto" class="btn btn-blue d-none" onclick="uploadUserProfilePhoto(this)">
                        Carica foto
                        <div class="spinner-border spinner-border-sm d-none" role="status"><span class="visually-hidden">Loading...</span></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="pai-card">
            <span class="pai-title">Modifica dati personali</span>
            <form class="mt-3" autocomplete="off">
                <div class="row mb-3">
                    <label for="txtName" class="col-sm-3 col-form-label text-small">Nome</label>
                    <div class="col-sm-9">
                        <input type="text" id="txtName" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtSurname" class="col-sm-3 col-form-label text-small">Cognome</label>
                    <div class="col-sm-9">
                        <input type="text" id="txtSurname" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtEmail" class="col-sm-3 col-form-label text-small">Email</label>
                    <div class="col-sm-9">
                        <input type="email" id="txtEmail" class="form-control">
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span id="resultPersonalData"></span>
                    </div>
                    <button id="btnUpdatePersonalData" type="button" class="btn btn-blue" onclick="updatePersonalData()">
                        <i class="bi bi-check-lg"></i> Salva
                        <div id="spinnerPersonalData" class="spinner-border spinner-border-sm d-none" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>

            </form>
        </div>
    </div>
    <div class="col-md-6">
        <div class="pai-card">
            <span class="pai-title">Modifica password</span>
            <form class="mt-3" autocomplete="off">
                <div class="row mb-3">
                    <label for="txtOldPassword" class="col-sm-3 col-form-label text-small">Vecchia password</label>
                    <div class="col-sm-9 position-relative">
                        <input type="password" id="txtOldPassword" class="form-control">
                        <i class="bi bi-eye-slash position-absolute" role="button" onclick="togglePassword(this)" style="right:24px; top:8px;"></i>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtNewPassword" class="col-sm-3 col-form-label text-small">Nuova password</label>
                    <div class="col-sm-9 position-relative">
                        <input type="password" id="txtNewPassword" class="form-control">
                        <i class="bi bi-eye-slash position-absolute" onclick="togglePassword(this)" role="button" style="right:24px; top:8px;"></i>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtConfirmPassword" class="col-sm-3 col-form-label text-small">Conferma password</label>
                    <div class="col-sm-9 position-relative">
                        <input type="password" id="txtConfirmPassword" class="form-control">
                        <i class="bi bi-eye-slash position-absolute" role="button" onclick="togglePassword(this)" style="right:24px; top:8px;"></i>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span id="resultChangePsw"></span>
                    </div>
                    <button id="btnUpdatePassword" type="button" class="btn btn-blue" onclick="updatePassword()">
                        <i class="bi bi-check-lg"></i> Salva
                        <div id="spinnerPassword" class="spinner-border spinner-border-sm d-none" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>