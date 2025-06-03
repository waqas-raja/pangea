<?php
$title = 'Dettaglio Cliente';
ob_start();
$cid = htmlspecialchars($cid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hCustomerId" type="hidden" value="<?= $cid ?>">

<div id="customer_detail">
    <div class="pai-card d-flex justify-content-between align-items-center mb-3">
        <span class="pai-title">Dettaglio Cliente</span>
        <button type="button" class="btn btn-link text-danger border" onclick="deleteCustomerModal()">
            <i class="bi bi-trash3 me-2"></i> Elimina Cliente
        </button>
    </div>
    <?php require_once __DIR__ . "/../partials/customer-overview.php"; ?>
</div>
<script>
    const customerId = '<?= $cid?>';
</script>
<script src="/static/js/views/customer-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
