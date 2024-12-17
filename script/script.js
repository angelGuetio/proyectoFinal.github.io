function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica credenciales
    if (username === "admin" && password === "1234") {
        // Redirige a la página home.html
        window.location.href = "home.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
