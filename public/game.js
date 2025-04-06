// game.js

document.getElementById('startGameButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Por favor ingresa tu nombre');
        return;
    }


    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';

    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '<h2>¡Bienvenido al juego!</h2><p>El juego está a punto de comenzar...</p>';

    // Para probar
    setTimeout(() => {
        gameArea.innerHTML = '<h2>¡Comienza la primera pregunta!</h2>';
    }, 3000);
});

