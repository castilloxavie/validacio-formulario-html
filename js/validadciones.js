export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validaciones[tipoDeInput]) {
        validaciones[tipoDeInput](input)
    }
    
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }

}

const tipoErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
] 

const mensajesDeError = {
    nombre : {
        valueMissing: 'El campo nombre no puede estar vacio'
    },
    email : {
        valueMissing: 'El campo correo no puede estar vacio',
        typeMismatch: 'Correo no es valido'
    },
    password : {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: 'Al menos 6 caracateres y un maximo de 12 caracteres, debe de contener al menos una letra en mayuscula, una en minuscula, un numero   y no puede contener caracteres especiales'
    },
    nacimiento : {
        valueMissing: 'El campo fecha de nacimiento no puede estar vacio',
        customError: 'Debes de tener  18 años de edad para registrarse en este sitio'
    },
    numero : {
        valueMissing: 'El campo numero no puede estar vacio',
        patternMismatch: 'El formato requerido es (xxxxxxxxxx) 10 numeros'
    },
    direccion : {
        valueMissing: 'El campo direccion no puede estar vacio',
        patternMismatch: 'la direccion debe de contener entre 10 a 40 caracteres'
    },
    ciudad : {
        valueMissing: 'El campo ciudad no puede estar vacio',
        patternMismatch: 'El nombre de la ciudad no es valido. ¡Corregir!'
    },
    departamento : {
        valueMissing: 'El campo departamento no puede estar vacio',
        patternMismatch: 'El nombre del departamento no es valido. ¡Corregir!'
    }
}

const validaciones = {
    nacimiento : input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje =mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if (!mayorEdad(fechaCliente)){
        mensaje = "debes de tener  18 años de edad para registrarse en este sitio"
    }

    input.setCustomValidity(mensaje)
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFecha <= fechaActual;
}