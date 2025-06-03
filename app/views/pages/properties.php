<?php
    $title = 'Properties';
    ob_start();
    require_once __DIR__ . '/../modals/add-property.php';
?>

    <div id="page-properties">
        <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
            <span class="pai-title">Properties</span>
            <!-- <div class="bg-light p-3 mt-3"><i>Page under constructions</i></div> -->
             <button type="button" class="btn btn-orange" onclick="showModalAddProperty(null, 'Aggiungi proprietà')"><i class="bi bi-plus-lg me-2"></i> Aggiungi Proprietà</button>
        </div>
        <div class="pai-card">
            <div id="propertyGrid" class=""></div>
        </div>
    </div>
    <script src="/static/js/views/properties.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
