<?php
$title = 'Immobili';
ob_start();
require_once __DIR__ . '/../modals/add-property.php';
?>

<div id="page-properties">
    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <span class="pai-title">Immobili</span>
        <!-- <div class="bg-light p-3 mt-3"><i>Page under constructions</i></div> -->
        <button type="button" class="btn btn-blue" onclick="showModalAddProperty(null, 'Aggiungi Immobili')"><i class="bi bi-plus-lg me-2"></i> Aggiungi Immobili</button>
    </div>
    <div class="pai-card">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="property-tab" data-bs-toggle="tab" data-bs-target="#property" type="button" role="tab" aria-controls="property" aria-selected="true">Immobili</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="under-managemanet-tab" data-bs-toggle="tab" data-bs-target="#under-managemanet" type="button" role="tab" aria-controls="under-managemanet" aria-selected="false">In gestione</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="under-evaluation-tab" data-bs-toggle="tab" data-bs-target="#under-evaluation" type="button" role="tab" aria-controls="under-evaluation" aria-selected="false">In valutazione</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade border border-top-0 p-3 show active" id="property" role="tabpanel" aria-labelledby="property-tab">
                <div id="propertyGrid" class=""></div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="under-managemanet" role="tabpanel" aria-labelledby="under-managemanet-tab">
                <div id="propertyUnderManagemanetGrid" class=""></div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="under-evaluation" role="tabpanel" aria-labelledby="under-evaluation-tab">
                <div id="propertyUnderEvaluationGrid" class=""></div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/properties.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
