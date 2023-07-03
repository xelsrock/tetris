import { tetraminoes } from "./tetraminoes.js";
import { ROWS, COLLUMNS } from "../script.js";


export class Game {
	score = 0;
	lines = 0;
	level = 1;
	record = localStorage.getItem('tetris-record') || 0;
	points = [0, 100, 300, 600, 1000];

	gameOver = false;
	pauseGame = false;
	musicPause = true;
	sound = true;

	area = [
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
		['o','o','o','o','o','o','o','o','o','o',],
	];
	
	activeTetramino = this.createTetromine();

	nextTetramino = this.createTetromine();

	headMusic = new Audio('audio/headMusic.mp3');
	stopMoveSound = new Audio('audio/stopMove.mp3');

	createTetromine() {
		const keys = Object.keys(tetraminoes);
		const letterTetromine = keys[Math.floor(Math.random() * keys.length)];
		const rotation = tetraminoes[letterTetromine];
		const rotationIndex = Math.floor(Math.random() * rotation.length); // 0 - не рандомная позиция
		const block = rotation[rotationIndex];
			
		return {
			block,
			rotationIndex, 
			rotation,
			x: 3,
			y: 0,
		};
	};

	changeTetramino() {
		this.activeTetramino = this.nextTetramino;
		this.nextTetramino = this.createTetromine();
	}

	moveLeft() {
		if (this.checkOutPosition(this.activeTetramino.x - 1, this.activeTetramino.y)) {
			this.activeTetramino.x -= 1;
		}
	};

	moveRight() {
		if (this.checkOutPosition(this.activeTetramino.x + 1, this.activeTetramino.y)) {
			this.activeTetramino.x += 1;
		}
	};

	moveDown() {
		if (this.gameOver) return;

		if (this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y + 1)) {
			this.activeTetramino.y += 1;
		} else {
			this.stopMove();
		};
	};

	rotateTetramino() {
		this.activeTetramino.rotationIndex = 
			this.activeTetramino.rotationIndex  < 3 ?
				this.activeTetramino.rotationIndex += 1 : 0;

		this.activeTetramino.block = 
			this.activeTetramino.rotation[this.activeTetramino.rotationIndex];
		
		if (!this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y)) {
			this.activeTetramino.rotationIndex = 
				this.activeTetramino.rotationIndex  > 0 ?
					this.activeTetramino.rotationIndex - 1 : 3;

			this.activeTetramino.block = 
				this.activeTetramino.rotation[this.activeTetramino.rotationIndex];
		};
	};

	get viewArea() {
		const area = JSON.parse(JSON.stringify(this.area));
		const {x, y, block: tetramino} = this.activeTetramino;
		for (let i = 0; i < tetramino.length; i++) {
			const row = tetramino[i];
			for (let j  = 0; j < row.length; j++) {
				if (row[j] !== 'o') {
					area[y + i][x + j] = tetramino[i][j];
				};
			};
		};
		return area;
	};

	dropTetramino() {
		for (let i = 0; i < this.activeTetramino.y; i++) {
			this.moveDown();
		}
	};

	checkOutPosition(x, y) {
		const tetramino = this.activeTetramino.block;

		for (let i = 0; i < tetramino.length; i++) {
			for (let j  = 0; j < tetramino[i].length; j++) {
				if (tetramino[i][j] === 'o') continue;

				if (!this.area[y + i] || !this.area[y + i][x + j] || 
					this.area[y + i][x + j] !== 'o') {
						return false;
				};
			};
		};
		return true;
	};

	stopMove() {
		if (this.sound) {
			this.stopMoveSound.play();
		}

		const {x, y, block: tetramino} = this.activeTetramino;

		for (let i = 0; i < tetramino.length; i++) {
			const row = tetramino[i];
			for (let j  = 0; j < row.length; j++) {
				if (row[j] !== 'o') {
					this.area[y + i][x + j] = tetramino[i][j];
				};
			};
		};

		this.changeTetramino();
		const countRow = this.clearRow();
		this.calcScore(countRow);
		this.updatePanels();
		this.gameOver = !this.checkOutPosition(this.activeTetramino.x, this.activeTetramino.y);
	};

	musicOn() {
		if (!this.headMusic.loop) {
			this.headMusic.loop = 'loop';
		}

		this.headMusic.play();
	};

	musicStop() {
		this.headMusic.pause();
	};

	clearRow() {
		const soundClear = new Audio('audio/soundClear.mp3');
		const rows = [];

		for (let i = ROWS - 1; i >= 0; i-- ) {
			let countBlock = 0;

			for (let j = 0; j < COLLUMNS; j++) {
				if (this.area[i][j] !== 'o') {
					countBlock += 1;
				};
			};

			if (!countBlock) break;

			if (countBlock === COLLUMNS) {
				if (this.sound) {
					soundClear.play();
				}
				rows.unshift(i);
			};
		};

		rows.forEach(i => {
			this.area.splice(i, 1);
			this.area.unshift(Array(COLLUMNS).fill('o'));
		});

		return rows.length;
	};

	calcScore(lines) {
		const gameArea = document.querySelector('.game__area');

		this.score += this.points[lines];
		this.lines += lines;
		this.level = Math.floor(this.lines / 10) + 1;

		if (this.level === 2 && !this.pauseGame) {
			gameArea.classList.add('shaking');
		} else {
			gameArea.classList.remove('shaking');
		}

		if (this.level === 3 && !this.pauseGame) {
			gameArea.classList.add('flicker');
		} else {
			gameArea.classList.remove('flicker');
		}

		if (this.score > this.record) {
			this.record = this.score;
			localStorage.setItem('tetris-record', this.score);
		};
	};

	createUpdatePanels(showScore, showNextTetramino, showTextObstacle) {
		showScore(this.lines, this.score, this.level, this.record);
		showNextTetramino(this.nextTetramino.block);	

		this.updatePanels = () => {
			showScore(this.lines, this.score, this.level, this.record);
			showNextTetramino(this.nextTetramino.block);

			switch (this.level) {
				case 2:
					showTextObstacle.textContent = 'Землетрясение';
					break;
				case 3:
					showTextObstacle.textContent = 'Проблемы с электричеством';
					break;
				case 4:
					showTextObstacle.textContent = 'Неисправный пульт управления';
					break;
				case 5:
					showTextObstacle.textContent = 'Камнепад';
					break;
				default:
					showTextObstacle.textContent = 'Без помех';
					break;
			};
		};
	};
};