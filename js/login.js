

document.addEventListener("DOMContentLoaded", function () {
    let usuario = localStorage.getItem("usuario");
    let token = localStorage.getItem("token");
    if (usuario != null && token != null) {
        sessionStorage.setItem("usuario", usuario);
        sessionStorage.setItem("token", token);
        window.location = "list.html";
    }

    const formRegister = document.querySelector(".register .form");
    const formLogin = document.querySelector(".login .form");

    formRegister.addEventListener("submit", function (event) {
        event.preventDefault();
        register();
    });

    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        login();
    });
});

function login() {
    let user = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let record = document.getElementById("recordar").checked;

    sessionStorage.setItem("usuario", user);
    sessionStorage.setItem("password", pass);
    if (record) {
        localStorage.setItem("usuario", user);
        localStorage.setItem("password", pass);
    }

    if ((user !== "") && (pass !== "")) {
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Usuario ingresado con Exito",
            showConfirmButton: false,
            timer: 2000
          });
        window.location.replace("list.html");
    } else {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Error de usuario o contraseña",
            showConfirmButton: false,
            timer: 2000
          });
    }
}

// Cambio de formulario 

const btnlogin = document.getElementById("sigIn")
const btnloginUp = document.getElementById("sigUp")
const formregister = document.querySelector(".register")
const formlogin = document.querySelector(".login")

btnlogin.addEventListener("click", (e) => {
    formregister.classList.add("hide");
    formlogin.classList.remove("hide");
})

btnloginUp.addEventListener("click", (e) => {
    formlogin.classList.add("hide");
    formregister.classList.remove("hide");
})

// Registro

function register() {
    let name = document.getElementById("nombreCompleto");
    let email = document.getElementById("correoElectronico");
    let password = document.getElementById("clave");

    const nameValue = name.value;
    const emailValue = email.value;
    const passwordValue = password.value;

    if (nameValue.trim() === "" || emailValue.trim() === "" || passwordValue.trim() === "") {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Porfavor complete los campos",
            showConfirmButton: false,
            timer: 3000
          });
        return;
    }

    localStorage.setItem('nombreCompleto', nameValue);

    sessionStorage.setItem("nombreCompleto", nameValue);
    sessionStorage.setItem("clave", emailValue);
    sessionStorage.setItem("password", passwordValue);

    Swal.fire({
        title: "Registro exitosos!",
        text: "¡Bienvenido a Ojitus " + nameValue + " !",
        icon: "success",
        timer: 3000
      });
    window.location.replace("movie.html");
};

