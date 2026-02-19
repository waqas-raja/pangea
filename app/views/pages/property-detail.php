<?php
$title = 'Dettaglio immobili';
ob_start();
$id = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/notary-sheet-property.php";
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hPropertyId" type="hidden" value="<?= $id ?>">

<div id="property_detail">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <span class="pai-title">Dettaglio immobili</span>
            <div class="d-flex justify-content-between align-items-center">
                <div class="position-relative me-2" style="width: 230px;">
                    <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:-20px;" title="Edit" onclick="allowEditGeneralInfo()">
                        <i class="bi bi-pencil-square fs-3"></i>
                    </span>
                    <button id="iconSaveEditGenericInfo" class="btn btn-blue-inverted position-absolute saveIcon d-none px-2" role="button" style="right:0px;top:-18px;" title="Save" onclick="updateGenericInfo()">
                        <i class="bi bi-floppy"></i> Salva
                    </button>
                    <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none px-2" role="button" style="right:80px;top:-18px;" title="Cancel" onclick="cancelEditGeneralInfo()">
                        <i class="bi bi-x-circle"></i> Annulla
                    </button>
                </div>
                <span id="" class="me-2" role="button" title="Foglio notarile" onclick="showNotarySheetModal()">
                    <i class="bi bi-file-earmark-pdf fs-3"></i>
                </span>
                <button type="button" class="btn btn-link text-danger border" onclick="deleteModal()">
                    <i class="bi bi-trash3 me-2"></i> Scarta
                </button>
            </div>
        </div>
        <div id="errMessage" class=""></div>
    </div>
    <?php require_once __DIR__ . "/../partials/property-overview.php"; ?>
</div>
<script>
    const propertyId = '<?= $id ?>';
</script>
<script src="/static/js/views/property-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
