$(document).ready(function () {
    // Inicializar EmailJS
    emailjs.init("_90_0oR5QXmoyDiOa");

    $("#contactForm").on("submit", function (e) {
        e.preventDefault(); // Evita el envío predeterminado del formulario

        // Obtener los valores del formulario
        const name = $("#name").val();
        const email = $("#mail").val(); // Ajustado a `mail` para coincidir con el HTML
        const message = $("#message").val();

        // Verificar que los campos no estén vacíos
        if (name === "" || email === "" || message === "") {
            $("#statusMensaje").text("Por favor, completa todos los campos.").css("color", "red");
            return;
        }

        // Enviar datos a través de EmailJS
        emailjs.send("service_5kqy6db", "template_emzl59e", {
            name: name,
            email: email,
            message: message,
        })
        .then(function (response) {
            $("#statusMensaje").text("Mensaje enviado con éxito.").css("color", "green");
            $("#contactForm")[0].reset(); // Limpiar el formulario
        })
        .catch(function (error) {
            console.error("Error:", error);
            $("#statusMensaje").text("Ocurrió un error. Intenta de nuevo.").css("color", "red");
        });
    });
});
