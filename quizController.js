const axios = require('axios');

let gameState = {
    player: '',
    questions: [],
    currentQuestionIndex: 0,
    correct: 0,
    incorrect: 0,
    score: 0, // Nuevo campo para el puntaje total
    startTime: null
};


const getQuestion = async (req, res) => {
    try {
        // Si es la primera pregunta, inicializa el juego
        if (!gameState.startTime) {
            gameState.startTime = Date.now();
            gameState.questions = [];
            gameState.correct = 0;
            gameState.incorrect = 0;
            gameState.currentQuestionIndex = 0; // Inicializa el índice
        }

        // Si se terminó el juego, no envíes más preguntas
        if (gameState.currentQuestionIndex >= 5) {
            return res.status(400).json({ message: 'El juego ha terminado. Ve a /api/end.' });
        }

        // Obtener datos de la API
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        // Seleccionar pregunta al azar
        const types = ['capital', 'flag', 'borders'];
        const type = types[Math.floor(Math.random() * types.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];

        // Validar que los datos del país sean completos
        if (!country || !country.name || !country.name.common || (type === 'capital' && !country.capital)) {
            console.error("Datos de país inválidos o incompletos:", country);
            return res.status(500).json({ error: 'Error al obtener los datos del país.' });
        }

        let question, correctAnswer, options;

        // Generar pregunta según el tipo seleccionado
        switch (type) {
            case 'capital':
                question = `¿Cuál es el país de la capital ${country.capital}?`;
                correctAnswer = country.name.common;
                options = generateOptions(countries, correctAnswer);
                break;
            case 'flag':
                question = `¿Qué país está representado por esta bandera?`;
                correctAnswer = country.name.common;
                options = generateOptions(countries, correctAnswer);
                break;
            case 'borders':
                question = `¿Cuántos países limítrofes tiene ${country.name.common}?`;
                correctAnswer = country.borders ? country.borders.length : 0;
                options = generateNumericOptions(correctAnswer);
                break;
        }



        const newQuestion = { question, type, correctAnswer, options };
        gameState.questions.push(newQuestion); // Agregar la pregunta al estado
        console.log("Pregunta generada y almacenada:", newQuestion);
        // Guardar la pregunta actual
        //gameState.questions.push({ question, type, correctAnswer, options });
        const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

        // Enviar la pregunta generada al cliente
        res.json({
            question: currentQuestion.question,
            options: currentQuestion.options,
            flag: country.flags ? country.flags.png : null
        });
    } catch (error) {
        console.error("Error en getQuestion:", error);
        res.status(500).json({ error: 'Error al generar la pregunta.' });
    }
};
// Funciones auxiliares
const generateOptions = (countries, correctAnswer) => {
    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        options.add(randomCountry.name.common);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
};

const generateNumericOptions = (correctAnswer) => {
    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        options.add(Math.floor(Math.random() * 10));
    }

    return Array.from(options).sort((a, b) => a - b);
};

// Exportar la función para su uso en otros módulos
module.exports = { getQuestion };
