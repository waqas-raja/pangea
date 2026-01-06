<div class="row">
    <div class="col-md-12">
        <div class="pai-card">
            <form class="mt-3" autocomplete="off">
                <div class="row mb-3">
                    <label for="btnCreateBDBackup" class="col-sm-4 col-form-label">Backup del database</label>
                    <div class="col-sm-8">
                        <button id="btnCreateBDBackup" class="btn btn-blue" onclick="GenerateDatabaseBackup()">Generare</button>
                        <div id="progressBarSec" class="mt-2">
                            <div id="backupStatus" class="text-muted"></div>
                            <progress id="backupProgress" value="0" max="100" style="width: 100%; display:none;"></progress>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtActivityHistory" class="col-sm-4 col-form-label">Cronologia delle attività</label>
                    <div class="col-sm-8">
                        <div id="txtActivityHistory" class="list-group">
                            <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                            <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                            <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="txtDataDeletion" class="col-sm-4 col-form-label">Eliminazione dei dati</label>
                    <div class="col-sm-8">
                        <div id="txtDataDeletion" class="list-group">
                            <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                            <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                            <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>