<?php
$title = 'Dettaglio valutazione';
ob_start();
$oid = htmlspecialchars($oid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hOpportunityId" type="hidden" value="<?= $oid ?>">

<div id="opportunity_detail">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <span class="pai-title">Dettaglio valutazione</span>
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
                <div>
                    <button id="btnProjectProcess" type="button" class="btn btn-blue" onclick="togglePageSections(0, this)">
                        <i class="bi bi-flask me-2"></i> Progetto di processo
                    </button>
                    <button id="btnBack" type="button" class="btn btn-blue d-none" onclick="togglePageSections(1, this)">
                        Indietro
                    </button>
                    <button type="button" class="btn btn-link text-danger border" onclick="deleteModal()">
                        <i class="bi bi-trash3 me-2"></i> Scarta
                    </button>
                </div>
            </div>
        </div>
        <div id="errMessage" class="text-danger"></div>
    </div>
    <?php require_once __DIR__ . "/../partials/opportunity-overview.php"; ?>
</div>
<script>
    const opportunityId = '<?= $oid ?>';
</script>
<script src="/static/js/views/opportunity-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
