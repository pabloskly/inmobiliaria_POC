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

    function validarDatos(e) {
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
            // Guardar datos del usuario en localStorage
            const userData = {
                fullname: fullnameInput.value.trim(),
                username: usernameInput.value.trim(),
                email: emailValue,
                password: passwordValue
            };
            
            // Obtener usuarios existentes o crear array vacío
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Verificar si el email ya existe
            const existingUser = users.find(user => user.email === emailValue);
            if (existingUser) {
                showError(emailInput, 'Este correo electrónico ya está registrado.');
                return;
            }
            
            // Agregar nuevo usuario
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Mostrar mensaje de éxito y limpiar formulario
            successMessage.style.display = 'block';
            form.reset();
            
            // Redirigir al apartado de ingreso después de 1.5 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    }

    form.addEventListener('submit', validarDatos);

    // Limpiar errores al escribir
    const inputs = [fullnameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
});
