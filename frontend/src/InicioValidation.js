function Validation(values) {
    let error = {};
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const passwordPattern = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const usernamePattern = /^[a-zA-Z0-9]+$/;
     const EMAIL_ERROR_MESSAGE = "Por favor ingrese una dirección de correo electrónico válida";
    const PASSWORD_ERROR_MESSAGE = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.";
    const USERNAME_ERROR_MESSAGE = "El nombre de usuario solo puede contener letras y números";
    const REQUIRED_FIELD_ERROR_MESSAGE = "Este campo es requerido";
    const CONFIRM_PASSWORD_ERROR_MESSAGE = "Las contraseñas no coinciden";
     if (!values.email) {
      error.email = REQUIRED_FIELD_ERROR_MESSAGE;
    } else if (!emailPattern.test(values.email)) {
      error.email = EMAIL_ERROR_MESSAGE;
    } else {
      error.email = "";
    }
     if (!values.password) {
      error.password = REQUIRED_FIELD_ERROR_MESSAGE;
    } else if (!passwordPattern.test(values.password)) {
      error.password = PASSWORD_ERROR_MESSAGE;
    } else {
      error.password = "";
    }
     if (values.username && !usernamePattern.test(values.username)) {
      error.username = USERNAME_ERROR_MESSAGE;
    }
     if (values.confirmPassword && values.password !== values.confirmPassword) {
      error.confirmPassword = CONFIRM_PASSWORD_ERROR_MESSAGE;
    }
     return error;
  }
   export default Validation;