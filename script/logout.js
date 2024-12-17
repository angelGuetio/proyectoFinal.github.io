document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar elementos
    const logoutButton = document.querySelector('.logout-btn');
    const registerForm = document.querySelector('.register-form');
    const tableBody = document.querySelector('.user-table tbody');
    const userCountHeader = document.querySelector('.user-count'); // Conteo de usuarios
    let userCode = 1; // Inicialización del código de usuario
    let editRow = null; // Variable para almacenar la fila que se va a editar

    // Funcionalidad: Cerrar Sesión
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            window.location.href = "index.html";
        });
    }

    // Funcionalidad: Agregar o Editar Usuario
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Capturar valores del formulario
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const area = document.getElementById('area').value;
            const userType = document.getElementById('user-type').value;
            const password = document.getElementById('password').value;

            // Validar que no haya campos vacíos
            if (firstName && lastName && email && area && userType && password) {
                if (editRow) {
                    // Actualizar fila existente
                    editRow.cells[1].innerText = firstName;
                    editRow.cells[2].innerText = lastName;
                    editRow.cells[3].innerText = area;
                    editRow.cells[4].innerText = email;
                    editRow.cells[5].innerText = userType;
                    editRow.cells[6].innerText = password;
                    editRow = null; // Reiniciar variable
                } else {
                    // Crear nueva fila con código de usuario
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${userCode}</td>
                        <td>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${area}</td>
                        <td>${email}</td>
                        <td>${userType}</td>
                        <td>${password}</td>
                        <td>
                            <button class="edit-btn">Editar</button>
                            <button class="delete-btn">Eliminar</button>
                        </td>
                    `;

                    tableBody.appendChild(newRow); // Agregar fila a la tabla
                    userCode++; // Incrementar el código de usuario
                }

                registerForm.reset(); // Limpiar formulario
                addTableEventListeners(); // Reasignar eventos
                updateUserCount(); // Actualizar el conteo de usuarios
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // Funcionalidad: Eliminar y Editar
    function addTableEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                this.closest('tr').remove(); // Eliminar fila
                updateUserCount(); // Actualizar el conteo
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                editRow = this.closest('tr');
                const cells = editRow.querySelectorAll('td');
                document.getElementById('first-name').value = cells[1].innerText;
                document.getElementById('last-name').value = cells[2].innerText;
                document.getElementById('area').value = cells[3].innerText;
                document.getElementById('email').value = cells[4].innerText;
                document.getElementById('user-type').value = cells[5].innerText;
                document.getElementById('password').value = cells[6].innerText;
            });
        });
    }

    // Función para actualizar el conteo de usuarios
    function updateUserCount() {
        const rowCount = tableBody.querySelectorAll('tr').length;
        userCountHeader.innerText = `Total de Usuarios: ${rowCount}`;
    }

    // Asignar eventos iniciales
    addTableEventListeners();
    updateUserCount(); // Actualizar el conteo al cargar la página
});
