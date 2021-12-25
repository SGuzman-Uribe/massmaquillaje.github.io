const nav = document.querySelector('.nav-menu');
const navegacion = document.querySelector('.navegacion');
const abrirBtn = document.querySelector('.hamburguesa');
const cerrarBtn = document.querySelector('.cerrar');
let URLactual = jQuery(location).attr('href');

abrirBtn.addEventListener("click", () => {
    navegacion.classList.add("show");
    nav.classList.add("show");
    document.body.classList.add("show");
});

cerrarBtn.addEventListener("click", () => {
    navegacion.classList.remove("show");
    nav.classList.remove("show");
    document.body.classList.remove("show");
});


// Fixed Nav
const navBar = document.querySelector(".navegacion");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener('scroll', () => {
    const scrollALtura = window.pageYOffset;
    if (scrollALtura > navHeight) {
        navBar.classList.add("fix-nav");
    } else {
        navBar.classList.remove("fix-nav");
    }
})

if (URLactual.includes('index',0)) {
    // PopUp
    const popup = document.querySelector(".popup");
    const closePopup = document.querySelector(".popup-close");

    closePopup.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    window.addEventListener("load", () => {
        setTimeout(() => {
            popup.classList.add("show");
        }, 5000);
    });

}

// preloader
window.addEventListener("load", () => {
    const loader = document.getElementById("pre-loader");
    setTimeout(() => {
        loader.classList.add("hide");
    }, 2000);
});


// Smoth scroll
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const id = e.target.getAttribute("href").slice(1);
        const elemento = document.getElementById(id);
        const fixNax = navBar.classList.contains("fix-nav");
        let posicion = elemento.offsetTop - navHeight;

        if (!fixNax) {
            posicion = posicion - navHeight;
        }

        window.scrollTo({
            top: posicion,
            left: 0,
        })

        navegacion.classList.remove("show");
        nav.classList.remove("show");
        document.body.classList.remove("show");
    })
})