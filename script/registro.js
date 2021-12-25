const nombre = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("formulario-registro");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault();
    parrafo.innerHTML = "";
    let alerta = "";
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let cumpleRegistro = false
    if(nombre.value.length <3){
        alerta += `El nombre no es valido <br>`;
        cumpleRegistro = true;
    }
    if(!email.value.match(regex)){
        alerta += `El email no es valido <br>`;
        cumpleRegistro = true;
    }
    if(password.value.length <8){
        alerta += `La contraseña no es valida, minimo 8 caracteres<br>`;
        cumpleRegistro = true;
    }

    if(cumpleRegistro){
        parrafo.innerHTML = alerta;
    }else{
        parrafo.innerHTML = `Exito<br>`;
    }    
})