const express = require('express');
const { getQuestion } = require('./quizController');  // Importa usando require

const router = express.Router();

// Ruta para obtener preguntas
router.get('/question', async (req, res) => {
    try {
        const questions = await getQuestion();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener preguntas' });
    }
});

module.exports = router;  // Exporta el router con CommonJS


