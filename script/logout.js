document.addEventListener("DOMContentLoaded", function () {
    // ============================
    // SECCIÓN 1: Gestión de Usuarios
    // ============================
    const logoutButton = document.querySelector('.logout-btn');
    const registerForm = document.querySelector('.register-form');
    const tableBody = document.querySelector('.user-table tbody');
    const userCountHeader = document.querySelector('.user-count');
    let userCode = 1; // Código inicial para usuarios
    let editRow = null; // Variable para manejar la edición de filas

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

            // Capturar valores
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const area = document.getElementById('area').value;
            const userType = document.getElementById('user-type').value;
            const password = document.getElementById('password').value;

            // Validar campos
            if (firstName && lastName && email && area && userType && password) {
                if (editRow) {
                    // Editar fila existente
                    editRow.cells[1].innerText = firstName;
                    editRow.cells[2].innerText = lastName;
                    editRow.cells[3].innerText = area;
                    editRow.cells[4].innerText = email;
                    editRow.cells[5].innerText = userType;
                    editRow.cells[6].innerText = password;
                    editRow = null;
                } else {
                    // Crear nueva fila
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
                    tableBody.appendChild(newRow);
                    userCode++;
                }

                registerForm.reset();
                addTableEventListeners();
                updateUserCount();
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // Funcionalidad: Eliminar y Editar
    function addTableEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                this.closest('tr').remove();
                updateUserCount();
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

    function updateUserCount() {
        const rowCount = tableBody.querySelectorAll('tr').length;
        userCountHeader.innerText = `Total de Usuarios: ${rowCount}`;
    }

    addTableEventListeners();
    updateUserCount();

    // ============================
    // SECCIÓN 2: Slider de Imágenes
    // ============================
    const slidesContainer = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    let currentIndex = 0;
    const totalImages = images.length;
    const intervalTime = 3000; // Tiempo entre imágenes (3 segundos)
    let slideInterval;

    // Función para mostrar una imagen específica
    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    // Función para avanzar a la siguiente imagen
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        showSlide(currentIndex);
    }

    // Función para pausar y reanudar el slider
    function pauseSlider() {
        clearInterval(slideInterval);
    }

    function playSlider() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Iniciar el slider automáticamente
    slideInterval = setInterval(nextSlide, intervalTime);

    // Agregar controles opcionales
    document.body.insertAdjacentHTML("beforeend", `
        <div class="slider-controls">
            <button id="prevBtn">Anterior</button>
            <button id="pauseBtn">Pausar</button>
            <button id="playBtn">Reanudar</button>
            <button id="nextBtn">Siguiente</button>
        </div>
    `);

    // Eventos de los botones
    document.getElementById('prevBtn').addEventListener('click', () => {
        pauseSlider();
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showSlide(currentIndex);
    });

    document.getElementById('pauseBtn').addEventListener('click', pauseSlider);
    document.getElementById('playBtn').addEventListener('click', playSlider);

    document.getElementById('nextBtn').addEventListener('click', () => {
        pauseSlider();
        nextSlide();
    });
});
