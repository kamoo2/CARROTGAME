'use strict';
import PopUp from './popup.js';
import { GameBuilder } from './game.js';

const gameFinishBanner = new PopUp();
// 생성자에 인자가 3개이상인경우는 숫자로 전달하는것은 좋지않다 (빌더패던사용)
// game.js에서 GameBuilder를 생성하고 그안에 game 생성자에 필요한 인자들을 메소드로 받아서 그 class 자체를 리턴해준다.
// 그러면 다음과 같이 체이닝하여 사용할수있다.
// 마지막 build()에서는 Game오브젝트를 생성해주는 코드가 들어가있다
const game = new GameBuilder().withGameDuration(60).withCarrotCount(15).withBugCount(10).build();
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
