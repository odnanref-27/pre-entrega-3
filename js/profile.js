document.addEventListener("DOMContentLoaded", function () {
    const buttonGuardar = document.getElementById('button');
    const nombreUser = document.getElementById('nombreUser');
    const emailUser = document.getElementById('emailUser');

    buttonGuardar.addEventListener('click', function () {
        const nombre = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;

        if (nombre === '' || email === '') {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error",
                text: "Por favor, completa todos los campos",
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
        
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(email)) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Error",
                text: "Por favor, ingresa un correo electrónico válido",
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        // Almacenar nombre y email en session storage
        sessionStorage.setItem('nombre', nombre);
        sessionStorage.setItem('usuario', email);

        Swal.fire({
            position: "top",
            icon: "success",
            title: "Cambio exitoso",
            showConfirmButton: false,
            timer: 3000
        });

        nombreUser.textContent = nombre;
        emailUser.textContent = email;

    });

    const emailAlmacenado = sessionStorage.getItem("usuario");
    //console.log("Email almacenado:", emailAlmacenado); // Verificación adicional del email modificado

    if (emailAlmacenado) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        if (usuarios) {
            const usuarioLogueado = usuarios.find(user => user.email === emailAlmacenado);

            if (usuarioLogueado) {
                nombreUser.textContent = usuarioLogueado.nombreCompleto;
                emailUser.textContent = usuarioLogueado.email;

                if (!sessionStorage.getItem("nombre")) {
                    sessionStorage.setItem('nombre', usuarioLogueado.nombreCompleto);
                }
                document.getElementById("firstName").value = usuarioLogueado.nombreCompleto;
                document.getElementById("email").value = usuarioLogueado.email;
            } else {
                console.error('Usuario no encontrado en la lista de usuarios.');
                nombreUser.textContent = "Usuario no encontrado";
            }
        } else {
            console.error('No hay usuarios en el localStorage.');
            nombreUser.textContent = "No hay usuarios almacenados";
        }
    } else {
        console.error('No hay email logueado en sessionStorage.');
        nombreUser.textContent = "No hay email logueado";
    }
});

//-----------------------------------------------------------------------

const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {
    sessionStorage.clear();
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Cerró sesión correctamente",
        showConfirmButton: false,
        timer: 3000
    }).then(() => {
        window.location.href = "index.html";
    });
}

//-----------------------------------------------------------------------

