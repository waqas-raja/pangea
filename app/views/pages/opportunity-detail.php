<?php
$title = 'Dettaglio opportunità';
ob_start();
$oid = htmlspecialchars($oid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hOpportunityId" type="hidden" value="<?= $cid ?>">

<div id="opportunity_detail">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <span class="pai-title">Dettaglio opportunità</span>
            <div class="d-flex justify-content-between align-items-center">
                <div class="position-relative me-2" style="width: 230px;">
                    <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:-10px;" title="Edit" onclick="allowEditGeneralInfo()">
                        <i class="bi bi-pencil"></i>
                    </span>
                    <button id="iconSaveEditGenericInfo" class="btn btn-orange-inverted position-absolute saveIcon d-none px-2" role="button" style="right:0px;top:-18px;" title="Save" onclick="updateGenericInfo()">
                        <i class="bi bi-floppy"></i> Salva
                    </button>
                    <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none px-2" role="button" style="right:80px;top:-18px;" title="Cancel" onclick="cancelEditGeneralInfo()">
                        <i class="bi bi-x-circle"></i> Annulla
                    </button>
                </div>
                <button type="button" class="btn btn-link text-danger border" onclick="deleteModal()">
                    <i class="bi bi-trash3 me-2"></i> Elimina opportunità
                </button>
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
