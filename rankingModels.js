//rankingModels.js
import { promises as fs } from 'fs';

// Función para guardar una nueva partida en el ranking
function saveGameResult(gameResult) {
  const currentRanking = JSON.parse(fs.readFileSync('./data/ranking.json', 'utf8'));
  currentRanking.push(gameResult);
  fs.writeFileSync('./data/ranking.json', JSON.stringify(currentRanking, null, 2));
}

module.exports = {
  saveGameResult,
  // Otras funciones del modelo de ranking según sea necesario
};
