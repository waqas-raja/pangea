<?php
$title = 'Terre';
ob_start();
require_once __DIR__ . '/../modals/add-land.php';
?>

<div id="page-Lands">
    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <span class="pai-title">Terre</span>
        <button type="button" class="btn btn-blue" onclick="showModalAddLand()"><i class="bi bi-plus-lg me-2"></i> Aggiungi terre</button>
    </div>
    <div class="pai-card mb-3">
        <div id="landGrid" class=""></div>
    </div>
</div>
<script src="/static/js/views/lands.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';