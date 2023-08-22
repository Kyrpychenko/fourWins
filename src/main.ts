import './style.css';

const map: string[][] = [];
const mapSizeX = 7;
const mapSizeY = 6;
const tile = '';
let player: 'red' | 'yellow' = 'red';

function game() {
  generateMap();
  renderMap();
  checkWin();
}

game();

function generateMap() {
  map.splice(0);
  for (let y = 0; y < mapSizeY; y++) {
    const mapRow: string[] = [];
    for (let x = 0; x < mapSizeX; x++) {
      mapRow.push(tile);
    }
    map.push(mapRow);
  }
}

function renderMap() {
  const renderedMap = document.querySelector('.gameMap');
  if (renderedMap !== null) {
    renderedMap.innerHTML = '';
  }
  for (let y = 0; y < mapSizeY; y++) {
    for (let x = 0; x < mapSizeX; x++) {
      const renderedTile = document.createElement('div') as HTMLDivElement;
      renderedTile.className = 'tile';
      renderedMap?.appendChild(renderedTile);
      renderedTile.onclick = () => {
        placeTile(x);
      };
      if (map[y][x] === 'red') {
        renderedTile.innerHTML = '🔴';
      } else if (map[y][x] === 'yellow') {
        renderedTile.innerHTML = '🟡';
      }
    }
  }
}

function placeTile(x: number) {
  const y = findLowestEmptySlot(x);
  if (y !== -1) {
    map[y][x] = player;
    checkWin();
    togglePlayer();
    renderMap();
  }
}

function findLowestEmptySlot(x: number): number {
  for (let i = mapSizeY - 1; i >= 0; i--) {
    if (map[i][x] === '') {
      return i;
    }
  }
  return -1;
}

function togglePlayer() {
  player = player === 'red' ? 'yellow' : 'red';
}

function checkWin() {
  const mapX0 = map.map((a, i, arr) => arr.flatMap(e => e[i]));
  if (mapX0.some(a => a.join('').includes('redredredred')) || mapX0.some(a => a.join('').includes('yellowyellowyellowyellow'))) {
    showWinner(player);
  }
  if (map.some(a => a.join('').includes('redredredred')) || map.some(a => a.join('').includes('yellowyellowyellowyellow'))) {
    showWinner(player);
  }
  for (let y = mapSizeY - 1; y > 0; y--) {
    for (let x = mapSizeX - 1; x > 0; x--) {
      if (map[y][x] === player && map[y - 1]?.[x - 1] === player && map[y - 2]?.[x - 2] === player && map[y - 3]?.[x - 3] === player) {
        showWinner(player);
      }
      if (map[y][x] === player && map[y + 1]?.[x - 1] === player && map[y + 2]?.[x - 2] === player && map[y + 3]?.[x - 3] === player) {
        showWinner(player);
      }
    }
  }
}

function showWinner(player: 'red' | 'yellow') {
  const p = document.querySelector('p') as HTMLParagraphElement;
  p.innerHTML = `${player} wins`;
  const dialog = document.querySelector('dialog') as HTMLDialogElement;
  dialog.showModal();
}

declare global {
  interface Window {
    game: () => void;
  }
}
window.game = game;
