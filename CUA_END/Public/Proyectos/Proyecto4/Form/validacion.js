document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".custom-form");
    const nombresInput = document.getElementById("nombres");
    const apellidosInput = document.getElementById("apellidos");
    const emailInput = document.getElementById("email");
    const contrasenaInput = document.getElementById("contrasena");
    const aceptoTerminosCheckbox = document.getElementById("aceptoTerminos");
    const btnEnviar = document.getElementById("btnCrear");
    const togglePasswordBtn = document.getElementById("togglePassword");

    nombresInput.addEventListener("input", validarCampo);
    apellidosInput.addEventListener("input", validarCampo);
    emailInput.addEventListener("input", validarCampo);
    contrasenaInput.addEventListener("input", validarCampo);
    aceptoTerminosCheckbox.addEventListener("change", validarCampo);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validarNombres() || !validarApellidos() || !validarEmail() || !validarContrasena() || !aceptoTerminosCheckbox.checked) {
            return;
        }

        // Agrega más validaciones según sea necesario

        form.submit();
    });

    function validarCampo() {
        if (!validarNombres() || !validarApellidos() || !validarEmail() || !validarContrasena() || !aceptoTerminosCheckbox.checked) {
            btnEnviar.disabled = true;
        } else {
            btnEnviar.disabled = false;
        }
    }

    function validarNombres() {
        const nombresValue = nombresInput.value.trim();

        if (nombresValue === "" || /\d/.test(nombresValue)) {
            alert("Por favor, ingresa tus nombres sin números.");
            return false;
        }

        return true;
    }

    function validarApellidos() {
        const apellidosValue = apellidosInput.value.trim();

        if (apellidosValue === "" || /\d/.test(apellidosValue)) {
            alert("Por favor, ingresa tus apellidos sin números.");
            return false;
        }

        return true;
    }

    function validarEmail() {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dominioInstitucional = /@vallegrande\.edu\.pe$/;

        if (emailValue === "") {
            alert("Por favor, ingresa tu correo electrónico.");
            return false;
        }

        if (!emailRegex.test(emailValue)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return false;
        }

        if (!dominioInstitucional.test(emailValue)) {
            alert("Por favor, ingresa un correo institucional válido (ejemplo: usuario@vallegrande.edu.pe).");
            return false;
        }

        return true;
    }

    function validarContrasena() {
        const contrasenaValue = contrasenaInput.value.trim();

        if (contrasenaValue.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(contrasenaValue)) {
            alert("La contraseña debe tener al menos 6 caracteres y contener letras y números.");
            return false;
        }

        return true;
    }

    function togglePassword() {
        const type = contrasenaInput.type === "password" ? "text" : "password";
        contrasenaInput.type = type;
    }
});