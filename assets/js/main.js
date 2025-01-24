document.addEventListener('DOMContentLoaded', function() {
    // Header ve Footer'ı yükle
    Promise.all([
        loadComponent('header'),
        loadComponent('footer')
    ]).then(() => {
        // Her iki component de yüklendikten sonra aktif menüyü işaretle
        setActiveMenuItem();
    });
});

function loadComponent(component) {
    return fetch(`components/${component}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(component).innerHTML = data;
        })
        .catch(error => {
            console.error(`Component ${component} yüklenirken hata oluştu:`, error);
            document.getElementById(component).innerHTML = `<div class="alert alert-danger">Sayfa yüklenirken bir hata oluştu.</div>`;
        });
}

function setActiveMenuItem() {
    try {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `${currentPage}.html` || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Menü öğesi işaretlenirken hata oluştu:', error);
    }
} 
// Dynamically load header and footer
document.addEventListener("DOMContentLoaded", function() {
    // Load header
    fetch("components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));

    // Load footer
    fetch("components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});
