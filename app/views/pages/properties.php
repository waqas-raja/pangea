<?php
    $title = 'Properties';
    ob_start();
?>

    <div id="page-properties">
        <div class="pai-card">
            <span class="pai-title">Properties</span>
            <div class="bg-light p-3 mt-3"><i>Page under constructions</i></div>
        </div>
    </div>
    <script src="/static/js/views/properties.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
