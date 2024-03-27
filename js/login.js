

document.addEventListener("DOMContentLoaded", function(){
    let usuario=localStorage.getItem('usuario');
    let token=localStorage.getItem('token');
    if(usuario!=null && token!=null){
        sessionStorage.setItem('usuario',usuario);
        sessionStorage.setItem('token',token);
        window.location = "profile.html";
    }
    
    const formRegister = document.querySelector('.register .form');
    const formLogin = document.querySelector('.login .form');

    formRegister.addEventListener('submit', function(event) {
        event.preventDefault(); 
        //proximamente
    });

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    });
});

function login() {
    let user = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let record = document.getElementById('recordar').checked;

    sessionStorage.setItem('usuario', user);
    sessionStorage.setItem('password', pass);
    if (record) {
        localStorage.setItem('usuario', user);
        localStorage.setItem('password', pass);
    }

    if ((user !== "") && (pass !== "")) {
        window.location.replace("profile.html");
    } else {
        alert('Error en nombre de usuario o contraseña');
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



