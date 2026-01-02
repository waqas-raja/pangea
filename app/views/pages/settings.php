<?php
$title = 'Impostazioni di sistema';
ob_start();
require_once __DIR__ . '/../modals/confirm-delete.php';
?>

<div id="settings">
    <div class="pai-card mb-3">
        <span class="pai-title">Impostazioni</span>
    </div>
    <div class="pai-card mb-3">
        <ul class="nav nav-tabs" id="settingTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="user-profile-tab" data-bs-toggle="tab" data-bs-target="#user-profile" type="button" role="tab" aria-controls="user-profile" aria-selected="false">Profilo utente</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="preferences-tab" data-bs-toggle="tab" data-bs-target="#preferences" type="button" role="tab" aria-controls="preferences" aria-selected="false">Preferenze</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="property-management-tab" data-bs-toggle="tab" data-bs-target="#property-management" type="button" role="tab" aria-controls="property-management" aria-selected="false">Gestione della immobile</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-management-tab" data-bs-toggle="tab" data-bs-target="#contact-management" type="button" role="tab" aria-controls="contact-management" aria-selected="false">Gestione dei contatti</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="integration-tab" data-bs-toggle="tab" data-bs-target="#integration" type="button" role="tab" aria-controls="integration" aria-selected="false">Integrazioni</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="safety-tab" data-bs-toggle="tab" data-bs-target="#safety" type="button" role="tab" aria-controls="safety" aria-selected="false">Sicurezza</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="backup-data-tab" data-bs-toggle="tab" data-bs-target="#backup-data" type="button" role="tab" aria-controls="backup-data" aria-selected="false">Backup e dati</button>
            </li>
        </ul>
        <div class="tab-content" id="settingTabContent">
            <div class="tab-pane fade border border-top-0 p-3 show active" id="user-profile" role="tabpanel" aria-labelledby="user-profile-tab">
                <?php require_once __DIR__ . "/../partials/user-profile-setting.php"; ?>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="preferences" role="tabpanel" aria-labelledby="preferences-tab">
                <?php require_once __DIR__ . "/../partials/preferences-setting.php"; ?>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="property-management" role="tabpanel" aria-labelledby="property-management-tab">
                <?php require_once __DIR__ . "/../partials/property-management-setting.php"; ?>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="contact-management" role="tabpanel" aria-labelledby="contact-management-tab">
                <?php require_once __DIR__ . "/../partials/contact-management-setting.php"; ?>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="integration" role="tabpanel" aria-labelledby="integration-tab">
                <div id="" class="">integration</div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="safety" role="tabpanel" aria-labelledby="safety-tab">
                <div id="" class="">safety</div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="backup-data" role="tabpanel" aria-labelledby="backup-data-tab">
                <div id="" class="">backup-data</div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/settings.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
