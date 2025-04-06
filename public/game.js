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
    const questionText = document.getElementById('questionText');
    const optionsList = document.getElementById('optionsList');
    const resultMessage = document.getElementById('resultMessage');
    let questionIndex = 0;
    let correct = 0;
    let incorrect = 0;
    let totalTime = 0;
    let startTime = 0;

    const startGame = async () => {
        try {
            gameArea.style.display = 'block';
            resultMessage.textContent = '';
            const response = await fetch('/api/question');
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            const data = await response.json();
            console.log("Respuesta de la API:", data);


            if (!data || !data.question || !data.options) {
                throw new Error("La respuesta de la API no tiene el formato esperado.");
            }

            questionText.textContent = data.question;
            optionsList.innerHTML = '';

            if (data.flag) {
                const img = document.createElement('img');
                img.src = data.flag;
                optionsList.appendChild(img);
            }





            data.options.forEach(option => {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = option;


                button.addEventListener('click', () => submitAnswer(option.toString()));//hacer metodo sub
                li.appendChild(button);
                optionsList.appendChild(li);
            });


            startTime = Date.now();

        } catch (error) {
            console.error("Error al obtener la pregunta:", error);
            resultMessage.textContent = "Hubo un problema al cargar la pregunta.";
        }




    };


    startGame();

});