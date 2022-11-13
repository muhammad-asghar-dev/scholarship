let navbar = document.getElementById("nav-links")
function toggleNavbar() {
    navbar.classList.toggle("toggle-nav-links");
    const overLay = navbar.nextElementSibling;
    if (overLay.style.display == 'block') {
        overLay.style.display = 'none';
    } else {
        overLay.style.display = 'block';
    }
}