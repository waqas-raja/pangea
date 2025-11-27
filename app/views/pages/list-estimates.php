<?php
    $title = 'Preventivi';
    ob_start();
    require_once __DIR__ . '/../modals/confirm-delete.php';
?>

    <div id="page-list-estimates">
        <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
            <span class="pai-title">Preventivi</span>
             <button type="button" class="btn btn-blue" onclick="window.location.href='/estimate'">
                <i class="bi bi-plus-lg me-2"></i> Aggiungi Preventivi
            </button>
        </div>
        <div class="pai-card">
            <div id="listEstimatesGrid" class=""></div>
        </div> 
    </div>
    <script src="/static/js/views/list-estimates.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
