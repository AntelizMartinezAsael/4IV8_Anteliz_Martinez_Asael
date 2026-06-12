function validar(formulario) {
    // Validar longitud del nombre
    if (formulario.nombre.value.trim().length < 3) {
        alert("por favor ingrese un nombre mayor de 3 caracteres");
        formulario.nombre.focus();
        return false;
    }

    // Validar que la edad sean solo números
    var edadTexto = formulario.edad.value;
    var abcOK = "0123456789";
    var allValid = true;

    for (var i = 0; i < edadTexto.length; i++) {
        var caracteres = edadTexto.charAt(i);
        var esNumero = false;
        for (var j = 0; j < abcOK.length; j++) {
            if (caracteres == abcOK.charAt(j)) {
                esNumero = true;
                break;
            }
        }
        if (!esNumero) {
            allValid = false;
            break;
        }
    }

    if (!allValid || edadTexto === "") {
        alert("Por favor escriba unicamente numeros en el campo edad");
        formulario.edad.focus();
        return false;
    }

    // Validar formato de email
    var emailValor = formulario.email.value;
    var correoelectronico = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    
    if (!correoelectronico.test(emailValor)) {
        alert("Por favor ingrese un correo electronico valido");
        formulario.email.focus();
        return false;
    }

    alert("Formulario validado con éxito. Enviando datos...");
    return true;
}