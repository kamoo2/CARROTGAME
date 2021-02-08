'use strict';
import PopUp from './popup.js';
import Game from './game.js';
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameFinishBanner = new PopUp();
const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);

game.setGameStopListener((reason) => {
  // if (reason === 'cancel') {
  //   gameFinishBanner.showWithText('REPLAY ?');
  // } else if (reason === 'win') {
  //   gameFinishBanner.showWithText('WIN');
  // } else {
  //   gameFinishBanner.showWithText('LOSE');
  // }

  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay ❓';
      break;
    case 'win':
      message = 'YOU WON 💙';
      break;
    case 'lose':
      message = 'YOU LOST ❌';
      break;
    default:
      throw new Error('not valid reason!');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
