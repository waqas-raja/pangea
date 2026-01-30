<?php
$title = 'Terre';
ob_start();
require_once __DIR__ . '/../modals/add-land.php';
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<div id="page-Lands">
    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <span class="pai-title">Terre</span>
        <button type="button" class="btn btn-blue" onclick="showModalAddLand()"><i class="bi bi-plus-lg me-2"></i> Aggiungi terre</button>
    </div>
    <?php require_once __DIR__ . "/../partials/land-overview.php"; ?>
</div>
<script src="/static/js/views/lands.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';