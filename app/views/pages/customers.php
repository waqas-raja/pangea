<?php
    $title = 'Clienti';
    ob_start();
    require_once __DIR__ . '/../modals/add-customer.php';
?>

    <div id="page-customers">
        <div class="pai-card mb-3 d-flex justify-content-between align-items-center">
            <span class="pai-title">Clienti</span>
            <!-- <div class="bg-light p-3 mt-3"><i>Page under constructions</i></div> -->
             <button type="button" class="btn btn-blue" onclick="showModalAddEditCustomer(null, 'Aggiungi proprietà')"><i class="bi bi-plus-lg me-2"></i> Aggiungi Cliente</button>
        </div>
        <div class="pai-card">
            <div id="customerGrid" class=""></div>
        </div>
    </div>
    <script src="/static/js/views/customers.js"></script>

<?php
    $content = ob_get_clean();
    require_once __DIR__ . '/../templates/authorized.php';
