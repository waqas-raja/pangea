<?php
$title = 'Dettaglio proprietà';
ob_start();
$id = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hPropertyId" type="hidden" value="<?= $id ?>">

<div id="property_detail">
    <div class="pai-card d-flex justify-content-between align-items-center mb-3">
        <span class="pai-title">Dettaglio proprietà</span>
        <button type="button" class="btn btn-link text-danger border" onclick="deleteModal()">
            <i class="bi bi-trash3 me-2"></i> Elimina proprietà
        </button>
    </div>
    <?php require_once __DIR__ . "/../partials/property-overview.php"; ?>
</div>
<script>
    const propertyId = '<?= $id?>';
</script>
<script src="/static/js/views/property-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
