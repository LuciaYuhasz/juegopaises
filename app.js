//app.js
const express = require('express');
const gameRoutes = require('./gameRoutes.js');  // Importa usando require

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// Rutas
app.use('/api', gameRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});



/* app.js
- quizController.js
- rankingModels.js
- public/
   ---styles.css
   ---game. js
   ---index.html
- ranking.jsonl
- gamesroutes.js
- dato/
    ---ranking.json*/


