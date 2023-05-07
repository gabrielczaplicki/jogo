const gridSize = 10;
let playerPosition;
let treasurePosition;
let enemyPositions = [];
let score = 0;
let time = 60;

generateGrid();
generatePlayer();
generateTreasure();
generateEnemies();

setInterval(() => {
  moveEnemies();
}, 1000);

setInterval(() => {
  time--;
  document.querySelector('.time').textContent = time + ' segundos';
  if (time === 0) {
    alert('Tempo acabou! Sua pontuação foi ' + score);
    resetGame();
  }
}, 1000);

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const playerCell = document.querySelectorAll('.cell')[playerPosition];

  switch (key) {
    case 'ArrowLeft':
      if (playerPosition % gridSize !== 0) playerPosition -= 1;
      break;
    case 'ArrowUp':
      if (playerPosition >= gridSize) playerPosition -= gridSize;
      break;
    case 'ArrowRight':
      if ((playerPosition + 1) % gridSize !== 0) playerPosition += 1;
      break;
    case 'ArrowDown':
      if (playerPosition < gridSize * (gridSize - 1)) playerPosition += gridSize;
      break;
  }

  const newPlayerCell = document.querySelectorAll('.cell')[playerPosition];

  if (newPlayerCell.classList.contains('treasure')) {
    removeTreasure();
    generateTreasure();
    score++;
    document.querySelector('.score').textContent = score;
  }

  if (newPlayerCell.classList.contains('enemy')) {
    alert('Você foi pego pelos inimigos!');
    resetGame();
  }

  playerCell.classList.remove('player');
  newPlayerCell.classList.add('player');
});

function generateGrid() {
  const grid = document.querySelector('.grid');
  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
  }
}

function generatePlayer() {
  playerPosition = Math.floor(Math.random() * gridSize ** 2);
  const playerCell = document.querySelectorAll('.cell')[playerPosition];
  playerCell.classList.add('player');
}

function generateTreasure() {
  treasurePosition = Math.floor(Math.random() * gridSize ** 2);
  const treasureCell = document.querySelectorAll('.cell')[treasurePosition];
  treasureCell.classList.add('treasure');
}

function removeTreasure() {
  const treasureCell = document.querySelectorAll('.cell')[treasurePosition];
  treasureCell.classList.remove('treasure');
}

function generateEnemies() {
  for (let i = 0; i < 3; i++) {
    let enemyPosition = Math.floor(Math.random() * gridSize ** 2);
    while (enemyPositions.includes(enemyPosition) || enemyPosition === treasurePosition || enemyPosition === playerPosition) {
      enemyPosition = Math.floor(Math.random() * gridSize ** 2);
    }
    enemyPositions.push(enemyPosition);
    const enemyCell = document.querySelectorAll('.cell')[enemyPosition];
    enemyCell.classList.add('enemy');
  }
}

function moveEnemies() {
  const directions = [-gridSize, 1, gridSize, -1];
  enemyPositions.forEach((enemyPosition) => {
    let direction = directions[Math.floor(Math.random() * directions.length)];
    let newEnemyPosition = enemyPosition + direction;
    while (newEnemyPosition < 0 || newEnemyPosition >= gridSize ** 2 ||
        (newEnemyPosition % gridSize === 0 && direction === -1) ||
        ((newEnemyPosition + 1) % gridSize === 0 && direction === 1) ||
        enemyPositions.includes(newEnemyPosition)) {
      direction = directions[Math.floor(Math.random() * directions.length)];
      newEnemyPosition = enemyPosition + direction;
    }
    
          const enemyCell = document.querySelectorAll('.cell')[enemyPosition];
          const newEnemyCell = document.querySelectorAll('.cell')[newEnemyPosition];
          enemyCell.classList.remove('enemy');
          newEnemyCell.classList.add('enemy');
          enemyPositions[enemyPositions.indexOf(enemyPosition)] = newEnemyPosition;
          if (newEnemyCell.classList.contains('player')) {
            alert('Você foi pego pelos inimigos!');
            resetGame();
          }
        });
      }
      
      function resetGame() {
        score = 0;
        time = 60;
        enemyPositions = [];
        document.querySelectorAll('.cell').forEach((cell) => {
          cell.classList.remove('player', 'treasure', 'enemy');
        });
        generatePlayer();
        generateTreasure();
        generateEnemies();
        document.querySelector('.score').textContent = score;
        document.querySelector('.time').textContent = time + ' segundos';
      }
      