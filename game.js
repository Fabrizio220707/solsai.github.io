let correctVase = 0;
let attempts = 2;
let speed = 220;
let positions = [20, 120, 220];
let vases = document.querySelectorAll(".vase");
let emoji = document.getElementById("emoji");
let attemptsDisplay = document.getElementById("attempts");
let isMixing = false; // Nueva variable para bloquear clics mientras mezcla

// **Coloca los vasos en su posición inicial**
function setInitialPositions() {
    vases.forEach((vase, index) => {
        vase.style.left = positions[index] + "px";
        vase.style.top = "20px";
        vase.style.transform = "translateY(0)";
    });
}

// **Actualiza los intentos en pantalla**
function updateAttempts() {
    attemptsDisplay.innerText = `Intentos: ${attempts}`;
}

// **Inicia el juego**
function startGame() {
    document.getElementById("message").innerText = "Mezclando...";
    document.getElementById("start").style.display = "none";
    document.getElementById("restart").style.display = "none";
    emoji.style.display = "none";
    correctVase = Math.floor(Math.random() * 3);
    attempts = 2;
    updateAttempts();
    setInitialPositions();
    shuffleVases();
}

// **Mezcla los vasos**
function shuffleVases() {
    isMixing = true; // Bloquea clics mientras mezcla
    let mixCount = 5;
    let currentMix = 0;
    let shuffleInterval = setInterval(() => {
        let newPositions = [...positions].sort(() => Math.random() - 0.5);
        vases.forEach((vase, index) => {
            vase.style.left = newPositions[index] + "px";
        });

        currentMix++;
        if (currentMix >= mixCount) {
            clearInterval(shuffleInterval);
            setTimeout(() => {
                document.getElementById("message").innerText = "¿Dónde está el dinosaurio? ¡Elige un vaso!";
                isMixing = false; // Desbloquea clics cuando termine de mezclar
            }, 500);
        }
    }, speed);
}

// **Verifica si el jugador acertó**
function checkChoice(index) {
    if (isMixing || attempts <= 0) return; // Bloquea clics si mezcla o si ya no hay intentos

    vases[index].style.transform = "translateY(-50px)";

    setTimeout(() => {
        if (index === correctVase) {
            document.getElementById("message").innerText = "¡Correcto! 🎉";
            showEmoji(vases[index]);
            setTimeout(resetRound, 1500);
        } else {
            attempts--;
            updateAttempts();
            document.getElementById("message").innerText = `Incorrecto. Intentos restantes: ${attempts}`;
            if (attempts <= 0) {
                setTimeout(gameOver, 1000);
            }
        }
    }, 500);
}

// **Muestra el emoji debajo del vaso correcto**
function showEmoji(vase) {
    emoji.style.top = vase.offsetTop + 60 + "px";
    emoji.style.left = vase.offsetLeft + "px";
    emoji.style.display = "block";
}

// **Reinicia la ronda tras ganar**
function resetRound() {
    attempts = 2;
    updateAttempts();
    vases.forEach(vase => vase.style.transform = "translateY(0)");
    setTimeout(() => {
        emoji.style.display = "none";
        shuffleVases();
    }, 1000);
}

// **Finaliza el juego si se quedan sin intentos**
function gameOver() {
    document.getElementById("message").innerText = "GAME OVER 😵‍💫";
    document.getElementById("restart").style.display = "block";
}

// **Reinicia el juego**
function resetGame() {
    document.getElementById("message").innerText = "Adivina dónde está el dinosaurio (2 intentos)";
    emoji.style.display = "none";
    attempts = 2;
    updateAttempts();
    document.getElementById("restart").style.display = "none";
    document.getElementById("start").style.display = "block";
    vases.forEach(vase => vase.style.transform = "translateY(0)");
    setTimeout(setInitialPositions, 300);
}

// **Coloca los vasos en su posición inicial al cargar la página**
setInitialPositions();