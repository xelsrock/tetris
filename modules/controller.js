export class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
  };

  init() {
    const startBtn = this.view.preview();
    
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.view.init();
      this.start();
    });
  };
  
  start() {
    this.view.showArea(this.game.viewArea);
    const showScore = this.view.createBlockScore();
    const [settingPause, settingAudio] = this.view.createBlockSetting();
    const showNextTetramino = this.view.createBlockNextTetramino();
    this.game.createUpdatePanels(showScore, showNextTetramino);
    this.game.musicOn();
    
    settingAudio.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (this.game.musicPause) {
        this.game.musicOn();
        this.game.musicPause = false;
      } else {
        this.game.musicStop();
        this.game.musicPause = true;
      }
    });

    settingPause.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.game.pause) {
        this.game.pause = false
        tick();
      } else {
        this.game.pause = true;
      }
    });

    const tick = () => {
      const time = (1100 - 100 * this.game.level);

      if (this.game.gameOver) {
        this.gameEnd();
        return;
      }

      if (this.game.pause) {
        return;
      }

      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick();
      }, time > 100 ? time : 100);
    };

    if (!this.game.pause) {
      tick();
    }
    

    // window.addEventListener('touchstart', () => console.log('touch'));
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      event.preventDefault();

      switch(key) {
        case 'ArrowLeft':
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowRight':
          this.game.moveRight();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowDown':
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowUp':
          this.game.rotateTetramino();
          this.view.showArea(this.game.viewArea);
        break;
      };
    }); 
  };

  gameEnd() {
    this.game.musicStop();

    const gameOverMusic = new Audio('audio/gameOver.mp3');
    gameOverMusic.play();
      
    const gameOverMask = document.createElement('div');
    gameOverMask.classList.add('game__over-mask');

    const gameOver = document.createElement('div');
    gameOver.classList.add('game__over');

    const gameOverText = document.createElement('p');
    gameOverText.classList.add('game__over-text');
    gameOverText.textContent = 'Game Over!';

    const gameOverResult = document.createElement('p');
    gameOverResult.classList.add('game__over-result');
    gameOverResult.textContent = `${this.game.score > this.game.record
      ? `Вы побили свой прежний рекорд и набрали: ${this.game.score} очков`
      : `Что-то пошло не так... Всего ${this.game.score} очков`
    }`;

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('game__over-btn');
    resetBtn.textContent = 'На главную';

    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      location.reload();
    });

    gameOver.append(gameOverText, gameOverResult, resetBtn);
    gameOverMask.append(gameOver);

    this.view.container.append(gameOverMask);
  };
};