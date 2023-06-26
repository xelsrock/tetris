import { SIZE_BLOCK, COLLUMNS, ROWS } from "../script.js";

export class View {
	constructor (container) {
		this.container = container;
		this.preview();
	};

	colors = {
		J: 'FireBrick',
		I: 'CadetBlue',
		O: 'Gold',
		L: 'SlateBlue',
		2: 'RoyalBlue',
		T: 'Indigo',
		S: 'MediumSeaGreen',
	};
	
	canvas = document.createElement('canvas');
	
	preview() {
		this.container.textContent = '';
		const preview = document.createElement('div');
		preview.classList.add('preview');

		const previewText = document.createElement('h3');
		previewText.classList.add('preview__text')
		previewText.textContent = 'Проверь свои силы в тетрисе';
		
		const previewBtn = document.createElement('button');
		previewBtn.classList.add('preview__btn');
		previewBtn.textContent = 'Начать игру';

		preview.append(previewText, previewBtn);
		this.container.append(preview);

		return previewBtn;
	};

	init() {
		this.container.textContent = '';
		this.canvas.style.gridArea = 'game';
		this.canvas.classList.add('game-area');
		this.container.append(this.canvas);
		this.canvas.width = SIZE_BLOCK * COLLUMNS;
		this.canvas.height = SIZE_BLOCK * ROWS;
	};

	createBlockSetting() {
		const settingBlock = document.createElement('div');
		settingBlock.classList.add('setting__block');

		const settingPause = document.createElement('button');
		settingPause.textContent = 'Pause'
		settingPause.classList.add('setting__pause');
		settingPause.innerHTML = `
		<svg width="25px" height="25px" viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="Dribbble-Light-Preview" transform="translate(-67.000000, -3765.000000)" fill="blue">
							<g id="icons" transform="translate(56.000000, 160.000000)">
									<path d="M11,3613 L13,3613 L13,3605 L11,3605 L11,3613 Z M15,3613 L17,3613 L17,3605 L15,3605 L15,3613 Z" id="pause-[#1010]">
								</path>
							</g>
					</g>
			</g>
		</svg>`

		settingBlock.append(settingPause);
		this.container.append(settingBlock);;

		return settingPause;
	};

	createBlockScore() {
		const scoreBlock = document.createElement('div');
		scoreBlock.style.cssText = `
			border: 2px solid black;
			font-size: 18px;
			padding: 20px;
			grid-area: score;
		`;

		const linesElem = document.createElement('p');
		const scoreElem = document.createElement('p');
		const levelElem = document.createElement('p');
		const recordElem = document.createElement('p');

		scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

		this.container.append(scoreBlock);

		return (lines, score, level, record) => {
			linesElem.textContent = `lines: ${lines}`;
			scoreElem.textContent = `score: ${score}`;
			levelElem.textContent = `level: ${level}`;
			recordElem.textContent = `record: ${record}`; 
		};
	};

	createBlockNextTetramino() {
		const tetraminoBlock = document.createElement('div');
		tetraminoBlock.style.cssText = `
			width: ${SIZE_BLOCK * 4}px;
			height: ${SIZE_BLOCK * 4}px;
			border: 2px solid black;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px;
			grid-area: next;
		`;

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		tetraminoBlock.append(canvas);

		this.container.append(tetraminoBlock);

		return (tetramino) => {
			canvas.width = SIZE_BLOCK * tetramino.length; 
			canvas.height = SIZE_BLOCK * tetramino.length;
			context.clearRect(0, 0,  canvas.width,  canvas.height);

			for (let y = 0; y < tetramino.length; y++) {
				const line = tetramino[y];

				for (let x = 0; x < line.length; x++) {
					const block = line[x];

					if (block !== 'o') {
						context.fillStyle = this.colors[block];
						context.strokeStyle = 'white';
						context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
						context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
					};
				};
			};  
		};
	};

	showArea(area) {
		const context = this.canvas.getContext('2d');

		context.clearRect(0, 0,  this.canvas.width,  this.canvas.height);

		for (let y = 0; y < area.length; y++) {
			const line = area[y];

			for (let x = 0; x < line.length; x++) {
				const block = line[x];

				if (block !== 'o') {
					context.fillStyle = this.colors[block];
					context.strokeStyle = 'white';
					context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
					context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
				};
			};
		};
	};
};