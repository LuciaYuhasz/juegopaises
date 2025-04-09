const express = require('express'); // Importar express
const { getQuestion } = require('./quizController'); // Importar la función getQuestion del controlador

const router = express.Router(); // Crear una instancia del router

// Ruta para obtener preguntas
router.get('/question', async (req, res) => {
    try {
        // Llamar a la función getQuestion para manejar la solicitud
        await getQuestion(req, res);
    } catch (error) {
        console.error("Error en la ruta /question:", error);
        // Responder con un error en caso de que ocurra algo inesperado
        res.status(500).json({ error: 'Error en el servidor al procesar la pregunta.' });
    }
});


// Exportar el router para que sea utilizado en la aplicación principal
module.exports = router;


