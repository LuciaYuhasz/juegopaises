const express = require('express');
const { getQuestions } = require('./quizController.js');  // Importa usando require

const router = express.Router();

// Ruta para obtener preguntas
router.get('/questions', async (req, res) => {
    try {
        const questions = await getQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener preguntas' });
    }
});

module.exports = router;  // Exporta el router con CommonJS


