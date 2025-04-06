//quizController.js
const fs = require('fs');
const axios = require('axios');


async function getQuestions() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        return countries;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        return [];
    }
}

module.exports = {
    getQuestions,
};

