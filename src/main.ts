import "./style.css";

const map: string[][] = [];
const mapSizeX = 7;
const mapSizeY = 6;
const tile = "";
let player: "red" | "yellow" = "red";
function game() {
  generateMap();
  renderMap();
}

game();

function generateMap() {
  for (let x = 0; x < mapSizeX; x++) {
    const mapRow: string[] = [];
    for (let y = 0; y < mapSizeY; y++) {
      mapRow.push(tile);
    }
    map.push(mapRow);
  }
}

function renderMap() {
  const renderedMap = document.querySelector(".gameMap");
  if (renderedMap !== null) {
    renderedMap.innerHTML = "";
  }
  for (let x = 0; x < mapSizeX; x++) {
    for (let y = 0; y < mapSizeY; y++) {
      const renderedTile = document.createElement("div") as HTMLDivElement;
      renderedTile.className = "tile";
      renderedMap?.appendChild(renderedTile);
      renderedTile.onclick = () => {
        placeTile(x, y);
      };
      if (map[x][y] === "red") {
        renderedTile.innerHTML = "🔴";
      } else if (map[x][y] === "yellow") {
        renderedTile.innerHTML = "🟡";
      }
    }
  }
}

function placeTile(x: number, y: number) {
  for (let i = mapSizeY - 1; i > 0; i--) {
    if (map[x][i] === "") {
      map[0][0] = "red";
    } else if (map[x][i] === "red" || map[x][i] === "yellow") {
      map[x][i] = "red";
    }
    renderMap();
  }
}
