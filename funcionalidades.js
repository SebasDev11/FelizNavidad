var gravedad = 0.5;
var numHijos = 50;
var numParticulas = 100;
var particulasCreadas = 0;

// Crear partículas
function crearParticula() {
    var particula = document.createElement("div");
    particula.className = "particula";

    var y = window.innerHeight;
    var x = Math.random() * window.innerWidth;

    particula.style.top = y + "px";
    particula.style.left = x + "px";

    var velocidadY = -15 - (Math.random() * 15);

    particula.setAttribute("data-velocidad-y", velocidadY);
    particula.setAttribute("data-velocidad-x", "0");
    particula.setAttribute("data-padre", "true");

    particula.style.background = getRandomColor(); // Aquí se asigna un color aleatorio

    document.getElementById("fireworks-container").append(particula);

    particulasCreadas++;

    if (particulasCreadas < numParticulas) {
        setTimeout(crearParticula, 50 + (Math.random() * 150));
    }
}

// Función de actualización de las partículas
function update() {
    var particulas = document.getElementsByClassName("particula");
    for (var p = 0; p < particulas.length; p++) {
        var particula = particulas[p];

        var velocidadY = parseFloat(particula.getAttribute("data-velocidad-y"));
        velocidadY += gravedad;

        particula.setAttribute("data-velocidad-y", velocidadY);

        var top = parseFloat(particula.style.top.replace("px", ""));
        top += velocidadY;
        if (top < 0 || top > window.innerHeight) { // Evita que se desborden
            particula.remove();
            continue;
        }
        particula.style.top = top + "px";

        var velocidadX = parseFloat(particula.getAttribute("data-velocidad-x"));
        var left = parseFloat(particula.style.left.replace("px", ""));
        left += velocidadX;
        if (left < 0 || left > window.innerWidth) { // Evita que se desborden
            particula.remove();
            continue;
        }
        particula.style.left = left + "px";

        var padre = particula.getAttribute("data-padre");

        if (velocidadY >= 0 && padre === "true") {
            explotar(particula);
        }

        if (top > window.innerHeight) {
            particula.remove();
        }
    }

    setTimeout(update, 20);
}

// Función para explotar una partícula y generar los hijos
function explotar(particula) {
    for (var h = 0; h < numHijos; h++) {
        var hijo = document.createElement("div");
        hijo.className = "particula";

        hijo.style.top = particula.style.top;
        hijo.style.left = particula.style.left;
        hijo.style.background = particula.style.background;

        var velocidadY = (Math.random() * 20) - 18;
        hijo.setAttribute("data-velocidad-y", velocidadY);
        var velocidadX = (Math.random() * 16) - 8;
        hijo.setAttribute("data-velocidad-x", velocidadX);

        hijo.setAttribute("data-padre", false);

        // Agregar el hijo
        document.getElementById("fireworks-container").append(hijo);
    }

    particula.remove();
}

// Función para manejar la cuenta regresiva y habilitar el botón
function countdown() {
    const countDownDate = new Date().getTime() + 5000; // Simula que la Navidad es dentro de 5 segundos
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "¡Es Navidad! 🎉";
            document.getElementById("message-button").disabled = false; // Habilitar el botón para el mensaje
        }
    }, 1000);
}

window.onload = function () {
    countdown(); // Iniciar la cuenta regresiva

    // Asignar el evento "click" al botón para mostrar el mensaje y los fuegos artificiales
    var boton = document.getElementById("message-button");
    boton.addEventListener("click", showMessage); // Usamos addEventListener para escuchar el clic

    // Controlar la música
    var stopMusicButton = document.getElementById("stop-music");
    var music = document.getElementById("background-music");

    stopMusicButton.addEventListener("click", function () {
        if (music.paused) {
            music.play(); // Reproducir la música si está detenida
            stopMusicButton.innerText = "Detener música";
        } else {
            music.pause(); // Detener la música si está sonando
            stopMusicButton.innerText = "Reproducir música";
        }
    });
};

// Función para mostrar el mensaje y activar los fuegos artificiales
function showMessage() {
    // Mostrar el mensaje y permitir hacer clic en él
    document.getElementById("special-message").style.display = "block"; 

    // Mostrar las tarjetas de imágenes
    document.getElementById("image-cards-container").style.display = "flex";
    console.log("Tarjetas de imágenes mostradas");

    // Llamar a la función que crea las partículas (fuegos artificiales)
    crearParticula();
    // Llamar a la función de actualización de partículas
    update();
}

// Utilidad para generar colores aleatorios para las partículas
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
