const peliculas = [];

function agregarPelicula() {
    const nombre = document.getElementById('name-movie').value;
    const descripcion = document.getElementById('description-movie').value;

    if (nombre && descripcion) {
        const pelicula = {
            nombre: nombre,
            descripcion: descripcion
        };
        peliculas.push(pelicula);
        mostrarPeliculas();
        limpiarFormulario();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function mostrarPeliculas() {
    const listaPeliculas = document.getElementById('movie-list');
    listaPeliculas.innerHTML = '';
    peliculas.forEach(pelicula => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${pelicula.nombre}</strong>: ${pelicula.descripcion}`;
        listaPeliculas.appendChild(item);
    });
}

function limpiarFormulario() {
    document.getElementById('name-movie').value = '';
    document.getElementById('description-movie').value = '';
}

const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);


function cerrarSesion(){
    sessionStorage.clear();
    window.location.href = "index.html";
}