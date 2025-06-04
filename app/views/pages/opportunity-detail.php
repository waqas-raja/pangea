<?php
$title = 'Dettaglio opportunità';
ob_start();
$oid = htmlspecialchars($oid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hOpportunityId" type="hidden" value="<?= $cid ?>">

<div id="opportunity_detail">
    <div class="pai-card d-flex justify-content-between align-items-center mb-3">
        <span class="pai-title">Dettaglio opportunità</span>
        <button type="button" class="btn btn-link text-danger border" onclick="deleteModal()">
            <i class="bi bi-trash3 me-2"></i> Elimina opportunità
        </button>
    </div>
    <?php require_once __DIR__ . "/../partials/opportunity-overview.php"; ?>
</div>
<script>
    const opportunityId = '<?= $oid?>';
</script>
<script src="/static/js/views/opportunity-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
