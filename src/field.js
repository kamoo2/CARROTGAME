'use strict';
import * as sound from './sound.js';
const CARROT_SIZE = 80;

export const ClickItem = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();

    //어떤 클래스 안에있는 함수를 콜백함수로 전달할때는 그함수가 포함되어져 있는
    //클래스의 정보가 사라집니다. 그래서 this와 함수를 묶을수있는
    //바인딩 이란걸 해줘야함
    //방법 1. ArrowFunction사용하는 방법
    // this.field.addEventListener('click', (event) => this.onClick(event));
    //방법 2. 단 이방법은 onClick 자체에 event => 걸어줘야함
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, '../img/carrot.png');
    this._addItem('bug', this.bugCount, '../img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
    console.log(this.onItemClick);
  }

  // 자바스크립트는 아직 private한 멤버변수를 만들수없기때문에 (typesrcript에서는 가능)
  // underbar를 붙여서 아 얘는 외부에서는 사용할수 없겠구나 하고 체크만 해둔 것
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      // 당근 !!
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ClickItem.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ClickItem.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
