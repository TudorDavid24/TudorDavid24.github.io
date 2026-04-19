function inzializaparagrafo() {
    let titoli = document.querySelectorAll(".titolo")

    for (let i = 0; i < titoli.length; i++) {
        titoli[i].addEventListener("click", gestisciclicktitolo);
    }
}

function gestisciclicktitolo() {
    let contenuto = this.nextElementSibling;
    if (contenuto.classList.contains("visible")) {
        contenuto.classList.remove("visible")
    }
    else {
        let tuttiContenuti = document.querySelectorAll(".contenuto")
        for (let i = 0; i < tuttiContenuti.length; i++) {
            tuttiContenuti[i].classList.remove("visible");
        }
        contenuto.classList.add("visible");
    }
}

document.addEventListener("DOMContentLoaded", inzializaparagrafo);