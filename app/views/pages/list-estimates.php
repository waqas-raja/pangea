<?php
$title = 'Preventivi';
ob_start();
require_once __DIR__ . '/../modals/confirm-delete.php';
?>

<div id="page-list-estimates">
    <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
        <span class="pai-title">Preventivi</span>
        <button type="button" class="btn btn-blue" onclick="createNewEstimate()">
            <i class="bi bi-plus-lg me-2"></i> Crea nuovo preventivo
        </button>
    </div>
    <div class="pai-card">
        <ul class="nav nav-tabs" id="estimatesTabs" role="tablist">
            <!-- <li class="nav-item" role="presentation">
                <button class="nav-link active" id="estimates-tab" data-bs-toggle="tab" data-bs-target="#estimates-tab-content" type="button" role="tab" aria-controls="estimates-tab" aria-selected="true">Preventivi</button>
            </li> -->
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="under-managemanet-tab" data-bs-toggle="tab" data-bs-target="#under-managemanet-content" type="button" role="tab" aria-controls="under-managemanet" aria-selected="false">In gestione</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="acquired-tab" data-bs-toggle="tab" data-bs-target="#acquired-tab-content" type="button" role="tab" aria-controls="acquired-tab" aria-selected="false">Acquisito</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="under-evaluation-tab" data-bs-toggle="tab" data-bs-target="#under-evaluation-tab-content" type="button" role="tab" aria-controls="under-evaluation-tab" aria-selected="false">In valutazione e altri</button>
            </li>
        </ul>
        <div class="tab-content" id="estimatesTabsContent">
            <!-- <div class="tab-pane fade border border-top-0 p-3 show active" id="estimates-tab-content" role="tabpanel" aria-labelledby="estimates-tab">
                <div id="listEstimatesGrid" class=""></div>
            </div> -->
            <div class="tab-pane fade border border-top-0 p-3 show active" id="under-managemanet-content" role="tabpanel" aria-labelledby="under-managemanet">
                <div id="estimateUnderManagemanetGrid" class=""></div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="acquired-tab-content" role="tabpanel" aria-labelledby="acquired-tab">
                <div id="estimateAcquiredGrid" class=""></div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="under-evaluation-tab-content" role="tabpanel" aria-labelledby="under-evaluation-tab">
                <div id="estimateUnderEvaluationGrid" class=""></div>
            </div>
        </div>
    </div>
</div>
<script src="/static/js/views/list-estimates.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
