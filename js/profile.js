
document.addEventListener("DOMContentLoaded", function() {

    const buttonGuardar = document.getElementById('button');
    const nombreUser = document.getElementById('nombreUser');

    buttonGuardar.addEventListener('click', function() {
        const nombre = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;

        nombreUser.textContent = nombre;

        sessionStorage.setItem('nombre', nombre);
        sessionStorage.setItem('email', email);

        Swal.fire({
            position: "top",
            icon: "success",
            title: "Cambio exitoso",
            showConfirmButton: false,
            timer: 3000
          });
    });

    const nombreAlmacenado = sessionStorage.getItem('nombre');
    const emailAlmacenado = sessionStorage.getItem('email');

    if (nombreAlmacenado && emailAlmacenado) {
        document.getElementById('firstName').value = nombreAlmacenado;
        document.getElementById('email').value = emailAlmacenado;
        nombreUser.textContent = nombreAlmacenado;

    } 

    //Agrego comentario 
    // No logre hacer funcionar que el nombre de usuario se mantenga
    // y aparezca en su span 
    // punto a mejorar
    
});

//-----------------------------------------------------------------------

const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {
    sessionStorage.clear();
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Cerro cession correctamente",
        showConfirmButton: false,
        timer: 3000
      });
    window.location.href = "index.html";
}

//-----------------------------------------------------------------------
