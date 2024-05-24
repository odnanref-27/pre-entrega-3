

function verificadorCampoVacio() {
    const inputValue = document.querySelector("#txtSearch").value;
    if (inputValue === "") {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Hay campos vacios",
            showConfirmButton: false,
            timer: 3000
          });
        return true;
    }
    return false;
}

// Creando en el html una "card" con su formato para mostar las peliculas

function getCardHTML(img, title) {
    return `
            <div class="card">
                <img src="${IMAGE_URL}${img}" />
                <h3>${title}</h3>
                <a href="${API_URL_SEARCH}${encodeURIComponent(title)}" target="_blank">Ver Más</a>
                <button onclick="agregarPeliculaAPendientes({ title: '${title}', descripcion: '' })">Agregar a mi lista de pendientes</button>
              </div>
    `;
}

function agregarPeliculaAPendientes(pelicula) {
    agregarPelicula(pelicula); // llama a la función agregarPelicula en lista.js
}

function showMovies(movies) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    for (let movie of movies) {
        container.innerHTML += getCardHTML(movie.poster_path, movie.title);
    }

}

async function submitSearchEvent(e) {
    e.preventDefault();
    if (verificadorCampoVacio()) {
        return;
    }

    const response = await getMovies(document.getElementById("txtSearch").value);
    if (response.status === "ok") {
        showMovies(response.data.results);
    } else {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Ocurrio un error",
            showConfirmButton: false,
            timer: 3000
          });
    }
}

window.addEventListener("load", function () {
    
    const formSearch = document.getElementById("formSearch");
    formSearch.addEventListener("submit", submitSearchEvent);
});

//-----------------------------------------------------------------------

const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
