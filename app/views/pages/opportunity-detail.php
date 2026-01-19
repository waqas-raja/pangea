<?php
$title = 'Dettaglio valutazione';
ob_start();
$oid = htmlspecialchars($oid, ENT_QUOTES, 'UTF-8');
require_once __DIR__ . "/../modals/confirm-delete.php";
?>

<input id="hOpportunityId" type="hidden" value="<?= $oid ?>">

<div id="opportunity_detail">
    <div class="pai-card mb-3">
        <div class="d-flex justify-content-between align-items-center">
            <span class="pai-title">Dettaglio valutazione</span>
            <div class="d-flex justify-content-between align-items-center">
                <div class="position-relative me-2" style="width: 230px;">
                    <span id="iconAllowEditGenericInfo" class="position-absolute editIcon" role="button" style="right:0px;top:-20px;" title="Edit" onclick="allowEditGeneralInfo()">
                        <i class="bi bi-pencil-square fs-3"></i>
                    </span>
                    <button id="iconSaveEditGenericInfo" class="btn btn-blue-inverted position-absolute saveIcon d-none px-2" role="button" style="right:0px;top:-18px;" title="Save" onclick="updateGenericInfo()">
                        <i class="bi bi-floppy"></i> Salva
                    </button>
                    <button id="iconCancelEditGenericInfo" class="btn btn-outline-secondary position-absolute cancelIcon d-none px-2" role="button" style="right:80px;top:-18px;" title="Cancel" onclick="cancelEditGeneralInfo()">
                        <i class="bi bi-x-circle"></i> Annulla
                    </button>
                </div>
                <div>
                    <button type="button" class="btn btn-link text-danger border" onclick="deleteModal()">
                        <i class="bi bi-trash3 me-2"></i> Scarta
                    </button>
                </div>
            </div>
        </div>
        <div id="errMessage" class="text-danger"></div>
    </div>
    <div class="pai-card">
        <ul class="nav nav-tabs" id="valuationDetailTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="property-valuation-tab" data-bs-toggle="tab" data-bs-target="#property-valuation" type="button" role="tab" aria-controls="property-valuation" aria-selected="false">Immobili</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="document-valuation-tab" data-bs-toggle="tab" data-bs-target="#document-valuation" type="button" role="tab" aria-controls="document-valuation" aria-selected="false">Documenti</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="note-valuation-tab" data-bs-toggle="tab" data-bs-target="#note-valuation" type="button" role="tab" aria-controls="note-valuation" aria-selected="false">Nota</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="stat-valuation-tab" data-bs-toggle="tab" data-bs-target="#stat-valuation" type="button" role="tab" aria-controls="stat-valuation" aria-selected="false">Statistiche</button>
            </li>
        </ul>
        <div class="tab-content" id="valuationDetailTabsContent">
            <div class="tab-pane fade border border-top-0 p-3 show active" id="property-valuation" role="tabpanel" aria-labelledby="property-valuation-tab">
                property valuation content
                <?php require_once __DIR__ . "/../partials/opportunity-overview.php"; ?>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="document-valuation" role="tabpanel" aria-labelledby="document-valuation-tab">
                document valuation content
                <div id="" class=""></div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="note-valuation" role="tabpanel" aria-labelledby="note-valuation-tab">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <div id="resultNote"></div>
                    </div>
                    <div>
                        <button class="btn btn-blue" onclick="allowNoteModification(this)">Modificare Nota</button>
                        <div id="noteModifySection" class="d-none">
                            <button class="btn btn-outline-secondary px-2 me-2" role="button" title="Cancel" onclick="cancelNoteModification(this)">
                                <i class="bi bi-x-circle"></i> Annulla
                            </button>
                            <button class="btn btn-blue-inverted px-2" role="button" title="Save" onclick="updateNote(this)">
                                <i class="bi bi-floppy"></i> Salva
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row mb-0 align-items-center">
                            <label for="txtNote" class="col-sm-3 col-form-label">Nota:<span class="text-danger ms-2 editControl d-none">*</span></label>
                            <div class="col-sm-9">
                                <span id="spNote" class="valueControl"></span>
                                <div id="txtNote" class="form-control editControl d-none mb-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade border border-top-0 p-3" id="stat-valuation" role="tabpanel" aria-labelledby="stat-valuation-tab">
                stats valuation content
                <div id="" class=""></div>
            </div>
        </div>
    </div>
</div>
<script>
    const opportunityId = '<?= $oid ?>';
</script>
<script src="/static/js/views/opportunity-detail.js"></script>

<?php
$content = ob_get_clean();
require_once __DIR__ . '/../templates/authorized.php';
