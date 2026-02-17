window.addEventListener('load', async () => {
    if (window.location.pathname === '/') return;
    handleSidebarExpension();
    setUserLoggedSettings();
    setCopyright();
    setMenuActive();
});

async function get_user_ip() {
    return await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Errore durante il recupero dell\'IP:', error);
            return '';
        });
}

function get_user_os() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'W';
    if (userAgent.indexOf('Mac') !== -1) return 'M';
    if (userAgent.indexOf('X11') !== -1 || userAgent.indexOf('Linux') !== -1) return 'L';
    if (/Android/i.test(userAgent)) return 'A';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'I';
    return 'N/A';
}

function setMenuActive() {
    const currentPage = window.location.pathname.split('/')[1];
    const sidebar_links = document.querySelectorAll('#main-sidebar .nav-link > a');
    const sidebar_links_alt = document.querySelectorAll('#main-sidebar-alt .nav-link > a');
    const header_links = document.querySelectorAll('#main-content > div:first-child a');
    sidebar_links.forEach(link => { link.classList.remove('active'); });
    sidebar_links_alt.forEach(link => { link.classList.remove('active'); });
    header_links.forEach(link => { link.classList.remove('active'); });
    let activeMenuId = '';
    switch (currentPage) {
        //sidebar
        case 'dashboard': activeMenuId = 'Dashboard'; break;
        case 'customers':
        case 'customer': activeMenuId = 'Customers'; break;
        case 'property':
        case 'properties': activeMenuId = 'Properties'; break;
        case 'estimate':
        case 'estimates': activeMenuId = 'Quotes'; break;
        case 'opportunity':
        case 'opportunities': activeMenuId = 'Opportunities'; break;
        case 'lands':
        case 'land': activeMenuId = 'Lands'; break;
        //header
        case 'settings': activeMenuId = 'Settings'; break;
        case 'users': activeMenuId = 'Users'; break;
        case 'user-profile': activeMenuId = 'UserProfile'; break;
        default: return;
    }
    const activeMenu = document.querySelector(`#menu${activeMenuId}`);
    if (activeMenu) activeMenu.classList.add('active');
    const activeMenuAlt = document.querySelector(`#menu${activeMenuId}Alt`);
    if (activeMenuAlt) activeMenuAlt.classList.add('active');
}

function setCopyright() {
    const span = document.getElementById("copyright");
    const startY = 2025;
    const currentY = new Date().getFullYear();
    span.textContent = startY === currentY ? `©${startY}` : `©${startY}-${currentY}`;
}

function setUserLoggedSettings() {
    document.getElementById("spUserLoggedName").innerText = `Ciao ${localStorage.uname}!`;
    if (localStorage.urole > 100) {
        document.getElementById("menuUsers").classList.remove("visually-hidden");
        document.getElementById("menuSettings").classList.remove("visually-hidden");
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
}

function enterToClick(selectorControls, idButton) {
    document.querySelectorAll(selectorControls).forEach(c => {
        c.addEventListener("keyup", e => {
            let key = e.key || e.keyCode;
            if (key === "Enter" || key === 13) {
                e.stopImmediatePropagation();
                document.getElementById(idButton).click();
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // const regx = /^(?:\+\d{2}|0|\d{2})\d{10,12}$/;
    const regx = /^(?:\+\d{2}|0)\s?\d(?:[\d\s]*\d){9,13}$/;
    return regx.test(phone);
}

function isValidPhoneNumber(num) {
    const regx = /^\d{10}$/;
    return regx.test(num);
}

function isValidZip(zip) {
    const regx = /^\d{4,6}$/;
    return regx.test(zip);
}

function isValidateNumber(number) {
    const regex = /^\d+$/;
    return regex.test(number);
}

function isValidLetter(text) {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(text);
}

function initInternalTabs() {
    const tabs = document.querySelectorAll(".pai-tab");
    const contents = document.querySelectorAll(".pai-tab-content");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            const contentId = tab.getAttribute("data-tab");
            document.getElementById(contentId).classList.add("active");
        });
    });
}

function initHtmlEditor(idEditor) {
    return $('#' + idEditor).dxHtmlEditor({
        height: 300,
        valueType: 'html',
        imageUpload: { tabs: ['file', 'url'], fileUploadMode: 'base64' },
        toolbar: {
            "items": [
                // "undo", "redo", "separator",
                "bold", "italic", "underline", "separator",
                {
                    name: "size",
                    acceptedValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt"]
                },
                {
                    name: "font",
                    acceptedValues: ["Arial", "Courier New", "Georgia", "Tahoma", "Verdana"]
                },
                "separator",
                "orderedList", "bulletList", "link",
            ]
        },
        mediaResizing: { enabled: true }
    }).dxHtmlEditor('instance');
}

function handleSidebarMenu() {
    const sidebarState = localStorage.getItem("sidebarState");
    if (sidebarState !== null) localStorage.removeItem("sidebarState");
    else localStorage.setItem("sidebarState", "alt");
    handleSidebarExpension();
}

function handleSidebarExpension() {
    const mainSidebar = document.getElementById('main-sidebar');
    const mainSidebarAlt = document.getElementById('main-sidebar-alt');
    const mainContent = document.getElementById('main-content');
    const sidebarState = localStorage.getItem("sidebarState");
    if (sidebarState !== null) {
        mainSidebar.classList.add('visually-hidden');
        mainSidebarAlt.classList.remove('visually-hidden');
        mainContent.style.width = 'calc(100vw - var(--sidebar-alt-width))';
        mainContent.firstElementChild.style.width = 'calc(100vw - var(--sidebar-alt-width))';
        mainContent.lastElementChild.style.maxWidth = 'calc(100vw - var(--sidebar-alt-width))';
    } else {
        mainSidebar.classList.remove('visually-hidden');
        mainSidebarAlt.classList.add('visually-hidden');
        mainContent.lastElementChild.style.maxWidth = 'calc(100vw - var(--sidebar-width))';
        mainContent.firstElementChild.style.width = 'calc(100vw - var(--sidebar-width))';
        mainContent.style.width = 'calc(100vw - var(--sidebar-width))';
    }
}

function formatNumber(num) {
    if (num === null) num = 0;
    return ((num).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }));
}

function initProjectAutocomplete(ctr_id, hidden_id, source = null) {
    const placeholderString = "Cerca per nome...";
    $(`#${ctr_id}`).dxAutocomplete({
        dataSource: source !== null ? source : new DevExpress.data.DataSource({
            key: "id",
            load: async function (txt) {
                try {
                    const response = await fetch("/api/contact/search", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({criteria: txt.searchValue}),
                    });
                    if(!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
                    const data = await response.json();
                    return data.payload || [];
                } catch (error) {
                    console.error("Errore nel caricamento dei dati:", error);
                    throw error;
                }
            },
        }),
        displayExpr: "id",
        valueExpr: "project_name",
        placeholder: placeholderString,
        minSearchLength: 3,
        searchExpr: ["project_name"],
        searchTimeout: 300,
        onSelectionChanged: el => {
            if (el.selectedItem) {
                // const selectedContact = el.selectedItem;
                document.getElementById(hidden_id).value = el.selectedItem.id;
            }
        }
    });
}

function toDatetimeLocal(val) {
    const [datePart, timePart] = val.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
    const pad = n => String(n).padStart(2, "0");
    return (
        year + "-" +
        pad(month) + "-" +
        pad(day) + "T" +
        pad(hour) + ":" +
        pad(minute)
    );
}

function showMessage(msg, id, cls) {
    const result = document.getElementById(id);
    result.innerHTML = msg;
    result.classList.add(cls);
    result.classList.remove('d-none');
    setTimeout(() => {
        result.innerHTML = '';
        result.classList.remove(cls);
        result.classList.add('d-none');
    }, 3000);
}

function showDeleteConfirmationModal(callback) {
    document.getElementById("deleteErrorMessage").innerHTML = '';
    const modalElement = document.getElementById("modalConfirmDelete");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    const confirmButton = document.getElementById("btnConfirmDelete");
    confirmButton.removeEventListener("click", confirmButton.clickHandler);
    confirmButton.clickHandler = function (e) {
        e.stopPropagation();
        callback(true);
    };
    confirmButton.addEventListener("click", confirmButton.clickHandler);
}

async function generatePdfBlob(el) {
    const opt = {
        margin: 10,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // load script if needed
    if (typeof html2pdf === "undefined") {
        await new Promise(resolve => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
            s.onload = resolve;
            document.body.appendChild(s);
        });
    }
    const blob = await html2pdf()
        .set(opt)
        .from(el)
        .toPdf()
        .outputPdf("blob");
    return blob;
}