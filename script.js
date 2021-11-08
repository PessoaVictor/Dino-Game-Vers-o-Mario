const mario = document.querySelector('.mario');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          mario.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      mario.style.bottom = position + 'px';
    }
  }, 20);
}

function createCano() {
  const cano = document.createElement('div');
  let canoPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cano.classList.add('cano');
  background.appendChild(cano);
  cano.style.left = canoPosition + 'px';

  let leftTimer = setInterval(() => {
    if (canoPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cano);
    } else if (canoPosition > 0 && canoPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Game Over</h1>,<img src="browser.png" class="game-over-img">';
	} else {
      canoPosition -= 10;
      cano.style.left = canoPosition + 'px';
    }
  }, 20);

  setTimeout(createCano, randomTime);
}

createCano();
document.addEventListener('keyup', handleKeyUp);
