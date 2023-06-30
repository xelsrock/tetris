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
    const [pauseBtn, musicBtn, soundBtn] = this.view.createBlockSetting();
    const showNextTetramino = this.view.createBlockNextTetramino();
    this.game.createUpdatePanels(showScore, showNextTetramino);
    this.view.createBlockInfo();
    
    musicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (this.game.musicPause) {
		    musicBtn.innerHTML = `<svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" id="music-1" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><circle id="secondary" cx="9.5" cy="17.5" r="3.5" style="fill: currentColor; stroke-width: 2;"/><path id="primary" d="M13,17.5V3a25.84,25.84,0,0,0,3.44,3c1.66,1.07,1.91,2.76,1.15,5" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><circle id="primary-2" data-name="primary" cx="9.5" cy="17.5" r="3.5" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></g></svg>`;
        this.game.musicOn();
        this.game.musicPause = false;
      } else {
        musicBtn.innerHTML = `<svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" id="music-disable" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><circle id="secondary" cx="9.5" cy="17.5" r="3.5" style="fill: currentColor; stroke-width: 2;"/><path id="primary" d="M13,17.5V3a25.84,25.84,0,0,0,3.44,3c1.66,1.07,1.91,2.76,1.15,5" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><circle id="primary-2" data-name="primary" cx="9.5" cy="17.5" r="3.5" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><line id="primary-3" data-name="primary" x1="19" y1="21" x2="5" y2="3" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></g></svg>`;
        this.game.musicStop();
        this.game.musicPause = true;
      }
    });

    soundBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.game.sound) {
        soundBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"> <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/> </svg>';
        this.game.sound = false;
      } else {
		    soundBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16"> <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/> <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/> <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/> </svg>'
        this.game.sound = true;
      }
    });

    pauseBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.game.pauseGame) {
	      pauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"> <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>';
        this.game.pauseGame = false;
        tick();
      } else {
        pauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>'
        this.game.pauseGame = true;
      }
    });

    const tick = () => {
      const time = (1100 - 100 * this.game.level);

      if (this.game.gameOver) {
        this.gameEnd();
        return;
      }

      if (this.game.pauseGame) {
        return;
      }

      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick();
      }, time > 300 ? time : 300);
    };

    if (!this.game.pauseGame) {
      tick();
    }
    
    /* Management */
    const gameArea = document.querySelector('.game-area');

    let touchStart;
    let touchEnd;

    gameArea.addEventListener('touchstart', (event) => {
      event.preventDefault();
      event.stopPropagation();
      touchStart = event.changedTouches[0];
    }, false);
    
    gameArea.addEventListener('touchend', (event) => {
      event.preventDefault();
      event.stopPropagation();
      touchEnd = event.changedTouches[0];
      let xAbs = Math.abs(touchStart.pageX - touchEnd.pageX);
      let yAbs = Math.abs(touchStart.pageY - touchEnd.pageY);

      if (!this.game.pauseGame) {
        if (xAbs === yAbs) {
          /*Касание*/
          this.game.rotateTetramino();
          this.view.showArea(this.game.viewArea);
        }

        if (xAbs > 20 || yAbs > 20) {
          if (xAbs > yAbs) {
            if (touchEnd.pageX < touchStart.pageX) {
              /*СВАЙП ВЛЕВО*/
              this.game.moveLeft();
              this.view.showArea(this.game.viewArea);
            } else {
              /*СВАЙП ВПРАВО*/
              this.game.moveRight();
              this.view.showArea(this.game.viewArea);
            }
          } else {
            if (touchEnd.pageY > touchStart.pageY) {
              /*СВАЙП ВНИЗ*/
              this.game.moveDown();
              this.view.showArea(this.game.viewArea);
            } else {
              /*СВАЙП ВВЕРХ*/
            }
          }
        }
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      const key = event.code;
      event.preventDefault();

      if (!this.game.pauseGame) {
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
      } 
    }); 
  };

  gameEnd() {
    this.game.musicStop();

    const gameOverMusic = new Audio('audio/gameOver.mp3');

    if (this.game.sound) {
      gameOverMusic.play();
    }
      
    const gameOverMask = document.createElement('div');
    gameOverMask.classList.add('game__over-mask');

    const gameOver = document.createElement('div');
    gameOver.classList.add('game__over');

    const gameOverText = document.createElement('p');
    gameOverText.classList.add('game__over-text');
    gameOverText.textContent = 'Game Over!';

    const gameOverResult = document.createElement('p');
    gameOverResult.classList.add('game__over-result');
    gameOverResult.textContent = `${this.game.score >= this.game.record
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