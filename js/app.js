document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

    // Función para mostrar error
    const showError = (inputElement, message) => {
        const group = inputElement.parentElement;
        group.classList.add('error');
        const errorMsg = group.querySelector('.error-msg');
        if (message) {
            errorMsg.textContent = message;
        }
    };

    // Función para limpiar error
    const clearError = (inputElement) => {
        const group = inputElement.parentElement;
        group.classList.remove('error');
    };

    // Validar formato de email usando Regex
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se envíe el formulario por defecto
        
        let isValid = true;
        successMessage.style.display = 'none';

        // 0. Validar Nombre Completo (no vacío)
        if (fullnameInput.value.trim() === '') {
            showError(fullnameInput, 'El nombre completo es obligatorio.');
            isValid = false;
        } else {
            clearError(fullnameInput);
        }

        // 1. Validar Usuario (no vacío)
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'El usuario es obligatorio.');
            isValid = false;
        } else {
            clearError(usernameInput);
        }

        // 2. Validar Email (formato regex)
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'El correo electrónico es obligatorio.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, 'Ingresa un correo electrónico con formato válido.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // 3. Validar Contraseña (al menos 8 caracteres)
        const passwordValue = passwordInput.value;
        if (passwordValue.length < 8) {
            showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        // 4. Validar Confirmación de Contraseña (coincide con la contraseña)
        const confirmPasswordValue = confirmPasswordInput.value;
        if (confirmPasswordValue === '') {
            showError(confirmPasswordInput, 'Confirma tu contraseña.');
            isValid = false;
        } else if (confirmPasswordValue !== passwordValue) {
            showError(confirmPasswordInput, 'Las contraseñas no coinciden.');
            isValid = false;
        } else {
            clearError(confirmPasswordInput);
        }

        // Si todo es válido
        if (isValid) {
            // Aquí puedes procesar los datos (enviar al servidor, etc.)
            console.log('Datos válidos:', {
                fullname: fullnameInput.value.trim(),
                username: usernameInput.value.trim(),
                email: emailValue,
                password: passwordValue
            });
            
            // Mostrar mensaje de éxito y limpiar formulario
            successMessage.style.display = 'block';
            form.reset();
        }
    });

    // Limpiar errores al escribir
    const inputs = [fullnameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
});
