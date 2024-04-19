let peliculas = [];
let peliculasPendientes = [];

function agregarPelicula() {
    const nombre = document.getElementById("name-movie").value;
    const descripcion = document.getElementById("description-movie").value;
    const listaSelector = document.getElementById("lista-selector");
    const listaSeleccionada = listaSelector.value;

    if (nombre && descripcion) {
        const pelicula = {
            nombre: nombre,
            descripcion: descripcion
        };

        if (listaSeleccionada === "misPeliculas") {
            peliculas.push(pelicula);
            mostrarPeliculas(peliculas, "movie-list");
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Pelicula agregada con exito",
                showConfirmButton: false,
                timer: 3000
            });
        } else if (listaSeleccionada === "peliculasPendientes") {
            peliculasPendientes.push(pelicula);
            mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Pelicula agregada con exito",
                showConfirmButton: false,
                timer: 3000
            });
        }

        limpiarFormulario();
        guardarEnSessionStorage();
    } else {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Hay campos incompletos",
            showConfirmButton: false,
            timer: 3000
        });
    }
}

function mostrarPeliculas(peliculasArray, containerId) {
    const listaPeliculas = document.getElementById(containerId);
    listaPeliculas.innerHTML = "";

    peliculasArray.forEach(pelicula => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${pelicula.nombre}</strong>: ${pelicula.descripcion}`;
        listaPeliculas.appendChild(item);
    });
}

function limpiarFormulario() {
    document.getElementById("name-movie").value = "";
    document.getElementById("description-movie").value = "";
}

//-----------------------------------------------------------------------

function guardarEnSessionStorage() {
    sessionStorage.setItem("peliculas", JSON.stringify(peliculas));
    sessionStorage.setItem("peliculasPendientes", JSON.stringify(peliculasPendientes));
}

function cargarDesdeSessionStorage() {
    const peliculasGuardadas = sessionStorage.getItem("peliculas");
    const peliculasPendientesGuardadas = sessionStorage.getItem("peliculasPendientes");

    if (peliculasGuardadas) {
        peliculas = JSON.parse(peliculasGuardadas);
        mostrarPeliculas(peliculas, "movie-list");
    }

    if (peliculasPendientesGuardadas) {
        peliculasPendientes = JSON.parse(peliculasPendientesGuardadas);
        mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
    }
}

window.addEventListener("load", cargarDesdeSessionStorage);

const btnAddMovie = document.getElementById("addMovie");

btnAddMovie.addEventListener("click", agregarPelicula);


//-----------------------------------------------------------------------

const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {

    sessionStorage.clear();
    sessionStorage.removeItem("usuarioAutenticado");
    sessionStorage.removeItem("peliculas");
    sessionStorage.removeItem("peliculasPendientes");

    window.location.href = "index.html";
}


