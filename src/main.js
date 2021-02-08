'use strict';
import PopUp from './popup.js';
import Field from './field.js';
const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener((item) => {
  onItemClick(item);
});

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  }
}
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameFinishBanner.setClickListener(() => {
  startGame();
});

function startGame() {
  started = true;
  playSound(bgSound);
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY ❓');
  playSound(alertSound);
  bgSound.pause();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  bgSound.pause();
  gameFinishBanner.showWithText(win ? 'YOU WON 💙' : 'YOU LOST ❌');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  gameTimer.textContent = `${min}:${sec}`;
}

function initGame() {
  score = 0;
  gameScore.textContent = CARROT_COUNT;
  gameField.init();
}

function playSound(audio) {
  audio.play();
  if (audio.currentTime > 0) {
    audio.currentTime = 0;
  }
}

function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score;
}
