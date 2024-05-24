
let peliculas = [];
let peliculasPendientes = [];

function agregarPelicula() {
    const nombre = document.getElementById("name-movie").value.trim();
    const descripcion = document.getElementById("description-movie").value.trim();
    const listaSelector = document.getElementById("lista-selector");
    const listaSeleccionada = listaSelector.value;

    if (nombre && descripcion) {
        const peliculaExistente = buscarPelicula(nombre);

        if (peliculaExistente) {
            Swal.fire({
                title: "Película ya existe",
                text: `La película ya está en la lista "${peliculaExistente.lista}". ¿Quieres modificarla o borrarla?`,
                icon: "warning",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Modificar",
                denyButtonText: "Borrar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    modificarPelicula(nombre, peliculaExistente.lista);
                } else if (result.isDenied) {
                    borrarPelicula(nombre, peliculaExistente.lista);
                }
            });
        } else {
            const pelicula = {
                nombre: nombre,
                descripcion: descripcion,
                fecha: new Date().toISOString(),
                calificacion: null
            };

            if (listaSeleccionada === "misPeliculas") {
                peliculas.push(pelicula);
                mostrarPeliculas(peliculas, "movie-list");
            } else if (listaSeleccionada === "peliculasPendientes") {
                peliculasPendientes.push(pelicula);
                mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
            }

            Swal.fire({
                position: "top",
                icon: "success",
                title: "Película agregada con éxito",
                showConfirmButton: false,
                timer: 3000
            });

            limpiarFormulario();
            guardarEnSessionStorage();
        }
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

function buscarPelicula(nombre) {
    for (let pelicula of peliculas) {
        if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
            return { lista: "misPeliculas" };
        }
    }
    for (let pelicula of peliculasPendientes) {
        if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
            return { lista: "peliculasPendientes" };
        }
    }
    return null;
}

function modificarPelicula(nombre, lista) {
    let nuevaDescripcion = "";
    let nuevoTitulo = "";

    Swal.fire({
        title: "Introduce la nueva descripción para la película",
        input: "text",
        inputValue: nuevaDescripcion,
        inputPlaceholder: "Descripción",
        inputAttributes: {
            maxlength: 500
        },
        showCancelButton: true,
        confirmButtonText: "Modificar",
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            nuevaDescripcion = value;
            if (!nuevaDescripcion || !/^[a-zA-Z\s]+$/.test(nuevaDescripcion)) {
                Swal.showValidationMessage(`La descripción solo puede contener letras y espacios.`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Introduce el nuevo título para la película",
                input: "text",
                inputValue: nuevoTitulo,
                inputPlaceholder: "Título",
                inputAttributes: {
                    maxlength: 50
                },
                showCancelButton: true,
                confirmButtonText: "Modificar",
                showLoaderOnConfirm: true,
                preConfirm: (value) => {
                    nuevoTitulo = value;
                    if (!nuevoTitulo) {
                        Swal.showValidationMessage(`El título no puede estar vacío.`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    if (lista === "misPeliculas") {
                        peliculas = peliculas.map(pelicula => {
                            if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
                                return { ...pelicula, nombre: nuevoTitulo, descripcion: nuevaDescripcion };
                            }
                            return pelicula;
                        });
                        mostrarPeliculas(peliculas, "movie-list");
                    } else if (lista === "peliculasPendientes") {
                        peliculasPendientes = peliculasPendientes.map(pelicula => {
                            if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
                                return { ...pelicula, nombre: nuevoTitulo, descripcion: nuevaDescripcion };
                            }
                            return pelicula;
                        });
                        mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
                    }
                    guardarEnSessionStorage();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Película modificada con éxito",
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
        }
    });
}

function borrarPelicula(nombre, lista) {
    if (lista === "misPeliculas") {
        peliculas = peliculas.filter(pelicula => pelicula.nombre.toLowerCase() !== nombre.toLowerCase());
        mostrarPeliculas(peliculas, "movie-list");
    } else if (lista === "peliculasPendientes") {
        peliculasPendientes = peliculasPendientes.filter(pelicula => pelicula.nombre.toLowerCase() !== nombre.toLowerCase());
        mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
    }
    guardarEnSessionStorage();
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Película borrada con éxito",
        showConfirmButton: false,
        timer: 3000
    });
}

function mostrarPeliculas(peliculasArray, containerId) {
    const listaPeliculas = document.getElementById(containerId);
    listaPeliculas.innerHTML = "";

    peliculasArray.forEach(pelicula => {
        const item = document.createElement("li");
        item.innerHTML = `
            <strong>${pelicula.nombre}</strong>: ${pelicula.descripcion} 
            ${pelicula.calificacion ? ` - Calificación: ${pelicula.calificacion} estrellas` : ''}
            <button onclick="editarPelicula('${pelicula.nombre}', '${containerId}')">Editar</button>
            <button onclick="borrarPeliculaManual('${pelicula.nombre}', '${containerId}')">Borrar</button>
            <button class="calificar-btn" onclick="calificarPelicula('${pelicula.nombre}', '${containerId === 'movie-list' ? 'misPeliculas' : 'peliculasPendientes'}')">Calificar</button>
        `;
        listaPeliculas.appendChild(item);
    });
}

//----------------------------------------------------------------

function ordenarPeliculas(peliculasArray, criterio) {
    return peliculasArray.slice().sort((a, b) => {
        if (criterio === "fecha") {
            return new Date(a.fecha) - new Date(b.fecha);
        } else if (criterio === "calificacion") {
            return (b.calificacion || 0) - (a.calificacion || 0);
        }
        return 0;
    });
}

document.getElementById("ordenarMisPeliculas").addEventListener("change", (event) => {
    const criterio = event.target.value;
    const peliculasOrdenadas = ordenarPeliculas(peliculas, criterio);
    mostrarPeliculas(peliculasOrdenadas, "movie-list");
});

document.getElementById("ordenarPeliculasPendientes").addEventListener("change", (event) => {
    const criterio = event.target.value;
    const peliculasOrdenadas = ordenarPeliculas(peliculasPendientes, criterio);
    mostrarPeliculas(peliculasOrdenadas, "peliculasPendientesList");
});


//----------------------------------------------------------------

function calificarPelicula(nombre, lista) {
    Swal.fire({
        title: 'Califica esta película',
        html: `
            <div class="calificacion">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Calificar',
        showLoaderOnConfirm: true,
        didOpen: () => {
            const stars = document.querySelectorAll('.calificacion .star');
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    stars.forEach(s => s.classList.remove('seleccionado'));
                    star.classList.add('seleccionado');
                });
            });
        },
        preConfirm: () => {
            const stars = document.querySelectorAll('.calificacion .star');
            let calificacion = 0;
            stars.forEach((star, index) => {
                if (star.classList.contains('seleccionado')) {
                    calificacion = index + 1;
                }
            });

            if (!calificacion) {
                Swal.showValidationMessage('Por favor, selecciona una calificación.');
            }

            return calificacion;
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const calificacion = result.value;
            if (lista === 'misPeliculas') {
                peliculas = peliculas.map(pelicula => {
                    if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
                        return { ...pelicula, calificacion };
                    }
                    return pelicula;
                });
                mostrarPeliculas(peliculas, 'movie-list');
            } else if (lista === 'peliculasPendientes') {
                peliculasPendientes = peliculasPendientes.map(pelicula => {
                    if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
                        return { ...pelicula, calificacion };
                    }
                    return pelicula;
                });
                mostrarPeliculas(peliculasPendientes, 'peliculasPendientesList');
            }
            guardarEnSessionStorage();
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Película calificada con éxito',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
}


function editarPelicula(nombre, containerId) {
    let nuevaDescripcion = "";
    let nuevoTitulo = "";

    Swal.fire({
        title: "Introduce la nueva descripción para la película",
        input: "text",
        inputValue: nuevaDescripcion,
        inputPlaceholder: "Descripción",
        inputAttributes: {
            maxlength: 500
        },
        showCancelButton: true,
        confirmButtonText: "Modificar",
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            nuevaDescripcion = value;
            if (!nuevaDescripcion || !/^[a-zA-Z\s]+$/.test(nuevaDescripcion)) {
                Swal.showValidationMessage(`La descripción solo puede contener letras y espacios.`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Introduce el nuevo título para la película",
                input: "text",
                inputValue: nuevoTitulo,
                inputPlaceholder: "Título",
                inputAttributes: {
                    maxlength: 50
                },
                showCancelButton: true,
                confirmButtonText: "Modificar",
                showLoaderOnConfirm: true,
                preConfirm: (value) => {
                    nuevoTitulo = value;
                    if (!nuevoTitulo) {
                        Swal.showValidationMessage(`El título no puede estar vacío.`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    if (containerId === "movie-list") {
                        peliculas = peliculas.map(pelicula => {
                            if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
                                return { ...pelicula, nombre: nuevoTitulo, descripcion: nuevaDescripcion };
                            }
                            return pelicula;
                        });
                        mostrarPeliculas(peliculas, "movie-list");
                    } else if (containerId === "peliculasPendientesList") {
                        peliculasPendientes = peliculasPendientes.map(pelicula => {
                            if (pelicula.nombre.toLowerCase() === nombre.toLowerCase()) {
                                return { ...pelicula, nombre: nuevoTitulo, descripcion: nuevaDescripcion };
                            }
                            return pelicula;
                        });
                        mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
                    }
                    guardarEnSessionStorage();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Película modificada con éxito",
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            });
        }
    });
}

function borrarPeliculaManual(nombre, containerId) {
    if (containerId === "movie-list") {
        peliculas = peliculas.filter(pelicula => pelicula.nombre.toLowerCase() !== nombre.toLowerCase());
        mostrarPeliculas(peliculas, "movie-list");
    } else if (containerId === "peliculasPendientesList") {
        peliculasPendientes = peliculasPendientes.filter(pelicula => pelicula.nombre.toLowerCase() !== nombre.toLowerCase());
        mostrarPeliculas(peliculasPendientes, "peliculasPendientesList");
    }
    guardarEnSessionStorage();
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Película borrada con éxito",
        showConfirmButton: false,
        timer: 3000
    });
}

function limpiarFormulario() {
    document.getElementById("name-movie").value = "";
    document.getElementById("description-movie").value = "";
}

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

//----------------------------------------------------------------------

const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {

    sessionStorage.clear();
    sessionStorage.removeItem("usuarioAutenticado");
    sessionStorage.removeItem("peliculas");
    sessionStorage.removeItem("peliculasPendientes");

    window.location.href = "index.html";
}

//----------------------------------------------------------------------
