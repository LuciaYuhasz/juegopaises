//quizController.js
const fs = require('fs');
const axios = require('axios');


async function getQuestion() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        const countriesWithFlags = countries.filter(c => c.flags && c.name && c.name.common);

        const correctCountry = countriesWithFlags[Math.floor(Math.random() * countriesWithFlags.length)];
        const correctAnswer = correctCountry.name.common;

        let options = [correctAnswer];
        while (options.length < 4) {
            const random = countriesWithFlags[Math.floor(Math.random() * countriesWithFlags.length)].name.common;
            if (!options.includes(random)) {
                options.push(random);
            }
        }

        options = options.sort(() => Math.random() - 0.5);

        return {
            question: "¿Cuál es el nombre de este país por su bandera?",
            options,
            correctAnswer,
            flag: correctCountry.flags.png
        };

    } catch (error) {
        console.error('Error al generar la pregunta:', error);
        throw new Error('Error al generar la pregunta');
    }
}

module.exports = {
    getQuestion,
};

