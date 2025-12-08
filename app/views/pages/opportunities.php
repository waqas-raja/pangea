<?php
    $title = 'Valutazione della proprietà';
    ob_start();
    require_once __DIR__ . '/../modals/add-opportunity.php';
?>
    <div id="page-opportunities">
        <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
            <span class="pai-title">Valutazione della proprietà</span>
            <!-- <div class="bg-light p-3 mt-3"><i>Page under constructions</i></div> -->
             <button type="button" class="btn btn-blue" onclick="showModalAddOpportunity(null, 'Aggiungi valutazione')"><i class="bi bi-plus-lg me-2"></i> Aggiungi Valutazione</button>
        </div>
        <div class="pai-card">
            <div id="opportunityGrid" class=""></div>
        </div>
    </div>
    <script src="/static/js/views/opportunities.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
