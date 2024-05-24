

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

// Login de usuario

function login() {
    let user = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let record = document.getElementById("recordar").checked;

    const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuariosExistentes = usuariosAlmacenados.some(u => u.email === user && u.password === pass);

    if (usuariosExistentes) {
        sessionStorage.setItem("usuario", user);
        if (record) {
            localStorage.setItem("usuario", user);
        }
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Usuario ingresado con Éxito",
            showConfirmButton: false,
            timer: 2000
        });
        window.location.replace("list.html");
    } else {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Error de usuario o contraseña. POR FAVOR SI NO ERES USUARIO REGÍSTRATE",
            showConfirmButton: false,
            timer: 5000
        });
    }
}

// Registro de usuario

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
            title: "Por favor complete los campos",
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }

    const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuariosAlmacenados.find(user => user.email === emailValue)) {
        Swal.fire({
            position: "top",
            icon: "error",
            title: "El correo electrónico ya está en uso",
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }
    usuariosAlmacenados.push({ nombreCompleto: nameValue, email: emailValue, password: passwordValue });
    localStorage.setItem("usuarios", JSON.stringify(usuariosAlmacenados));

    sessionStorage.setItem("nombreCompleto", nameValue);
    sessionStorage.setItem("usuario", emailValue);
    sessionStorage.setItem("password", passwordValue);

    Swal.fire({
        title: "Registro exitoso!",
        text: "¡Bienvenido a Ojitus " + nameValue + "!",
        icon: "success",
        timer: 3000
    });
    window.location.replace("movie.html");
}

//----------------------------------------------------------------
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

//----------------------------------------------------------------
// Json creado para realizar la prueba

localStorage.setItem("usuarios", JSON.stringify([
    {
        nombreCompleto: "Pepito Hernandez",
        email: "pepito@gmail.com",
        password: "Pepito1"
    },
    {
        nombreCompleto: "Cristina",
        email: "cristina@gmail.com",
        password: "Cristina1"
    }
]));

