document.addEventListener("DOMContentLoaded", function () {
    const btnMenu = document.getElementById("btn-menu");
    const menuNav = document.getElementById("menu-principal") || document.querySelector("nav");

    if (btnMenu && menuNav) {
        btnMenu.addEventListener("click", function () {
            menuNav.classList.toggle("aberto");
            const aberto = menuNav.classList.contains("aberto");
            btnMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
        });
    }
});