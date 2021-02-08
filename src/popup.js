'use strict';

// 이클래스를 외부에서도 보고 만들수 있도록 확장해주는 것
export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpRefresh = this.popUp.querySelector('.pop-up__refresh');
    this.popUpMessage = this.popUp.querySelector('.pop-up__message');
    //PopUp이라는 클래스에 멤버변수 3개 선언 (생성자 안에서)
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(message) {
    this.popUpMessage.textContent = message;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}
