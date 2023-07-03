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

		const previewTitle = document.createElement('h3');
		previewTitle.classList.add('preview__title');
		previewTitle.textContent = 'А что если в классический тетрис добавить немного помех?';
		
		const previewDescription = document.createElement('ul');
		previewDescription.classList.add('preview__description');

		const createPreviewLi = (text) => {
			const li = document.createElement('li');
			li.classList.add('preview__rules');
			li.textContent = text;

			return li;
		};

		const previewLiOne = createPreviewLi('Разрушь 10 линий и перейди на новый уровень');
		const previewLiTwo = createPreviewLi('На каждом уровне после первого есть помеха');
		const previewLiThree = createPreviewLi('Попробуй пройти как можно больше уровней');

		const previewBtn = document.createElement('button');
		previewBtn.classList.add('preview__btn', 'btn');
		previewBtn.textContent = 'Начать игру';

		previewDescription.append(previewLiOne, previewLiTwo, previewLiThree);
		preview.append(previewTitle, previewDescription, previewBtn);
		this.container.append(preview);

		return previewBtn;
	};

	init() {
		this.container.textContent = '';
		this.canvas.style.gridArea = 'game';
		this.canvas.classList.add('game__area');
		this.container.append(this.canvas);
		this.canvas.width = SIZE_BLOCK * COLLUMNS;
		this.canvas.height = SIZE_BLOCK * ROWS;
	};

	createTextObstacle() {
		const textObstacle = document.createElement('p');
		textObstacle.classList.add('header__obstacle');
		textObstacle.textContent = 'Без помех';
		this.container.before(textObstacle);

		return textObstacle;
	};

	createBlockSetting() {
		const settingBlock = document.createElement('div');
		settingBlock.classList.add('setting__block');

		const pauseBtn = document.createElement('button');
		pauseBtn.classList.add('setting__pause');
		pauseBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"> <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>';

		const musicBtn = document.createElement('button');
		musicBtn.classList.add('setting__music');
		musicBtn.innerHTML = `<svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" id="music-disable" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><circle id="secondary" cx="9.5" cy="17.5" r="3.5" style="fill: currentColor; stroke-width: 2;"/><path id="primary" d="M13,17.5V3a25.84,25.84,0,0,0,3.44,3c1.66,1.07,1.91,2.76,1.15,5" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><circle id="primary-2" data-name="primary" cx="9.5" cy="17.5" r="3.5" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/><line id="primary-3" data-name="primary" x1="19" y1="21" x2="5" y2="3" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></g></svg>`;

		const soundBtn = document.createElement('button');
		soundBtn.classList.add('setting__sound')
		soundBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16"> <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/> <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/> <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/> </svg>'

		settingBlock.append(pauseBtn, musicBtn, soundBtn);
		this.container.append(settingBlock);

		return [pauseBtn, musicBtn, soundBtn];
	};

	createBlockScore() {
		const scoreBlock = document.createElement('div');
		scoreBlock.classList.add('score__block');

		const linesElem = document.createElement('p');
		linesElem.classList.add('score__block-text');

		const scoreElem = document.createElement('p');
		scoreElem.classList.add('score__block-text');

		const levelElem = document.createElement('p');
		levelElem.classList.add('score__block-text');

		const recordElem = document.createElement('p');
		recordElem.classList.add('score__block-text');


		scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

		this.container.append(scoreBlock);

		return (lines, score, level, record) => {
			linesElem.textContent = `Линии: ${lines}`;
			scoreElem.textContent = `Очки: ${score}`;
			levelElem.textContent = `Уровень: ${level}`;
			recordElem.textContent = `Рекорд: ${record}`; 
		};
	};

	createBlockNextTetramino() {
		const tetraminoBlock = document.createElement('div');
		tetraminoBlock.style.cssText = `
			width: ${SIZE_BLOCK * 4}px;
			height: ${SIZE_BLOCK * 4}px;
		`;
		tetraminoBlock.classList.add('next__block');

		const canvas = document.createElement('canvas');
		canvas.classList.add('canvas__tetro');
		
		const context = canvas.getContext('2d');
		tetraminoBlock.append(canvas);

		this.container.append(tetraminoBlock);

		return (tetramino) => {
			canvas.width = SIZE_BLOCK * tetramino.length; 
			canvas.height = SIZE_BLOCK * tetramino.length;
			context.clearRect(0, 0, canvas.width, canvas.height);

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

	createPauseOpacity() {
		this.canvas.classList.toggle('pause');
	};

	createBlockInfo() {
		const infoBlock = document.createElement('div');
		infoBlock.classList.add('info__block')

		const infoControl = document.createElement('a');
		infoControl.classList.add('info__control');
		infoControl.textContent = 'Управление';

		const infoRules = document.createElement('a');
		infoRules.classList.add('info__rules');
		infoRules.textContent = 'Правила игры';

		const infoGame = document.createElement('a');
		infoGame.classList.add('info__game');
		infoGame.textContent = 'О игре';

		const infoVersion = document.createElement('a');
		infoVersion.classList.add('info__version');
		infoVersion.textContent = 'История версий';

		const infoControlText = document.createElement('p');
		infoControlText.classList.add('info__text', 'info__text_control');
		infoControlText.innerHTML = `
			<h4 class="info__title-control">На ПК:</h4>
			<p>ArrowLeft / A - влево</p>
			<p>ArrowRight / D - вправо</p>
			<p>ArrowDown / S - вниз</p>
			<p>ArrowUp / W - вращать</p>
			<p>Space - уронить</p>
			<h4 class="info__title-control">На смартфоне:</h4>
			<p>Свайп влево - влево</p>
			<p>Свайп вправо - вправо</p>
			<p>Свайп вниз - уронить</p>
			<p>Касание - вращать</p>
		`;

		infoControl.addEventListener('click', () => {
			infoControl.classList.toggle('active');
		});

		const infoRulesText = document.createElement('p');
		infoRulesText.classList.add('info_text', 'info__text_rules');
		infoRulesText.textContent = `
			Каждые 10 разрушенных линий повышают уровень.
			На каждом уровне после первого есть помеха, которая с каждым последующим уровнем становится сложнее.
			Игра считается пройденной по достижении 6 уровня.
			Попробуй пройти как можно больше уровней.
		`;

		infoRules.addEventListener('click', () => {
			infoRules.classList.toggle('active');
		});

		const infoGameText = document.createElement('p');
		infoGameText.classList.add('info__text', 'info__text_game');
		infoGameText.textContent = `
			История создания Тетриса началась в Советском Союзе в середине 1980-х годов. Основной разработчик игры — Алексей Пажитнов, молодой программист из Москвы, работавший в Научно-исследовательском центре компьютерного прикладного программирования.
		`;

		infoGame.addEventListener('click', () => {
			infoGame.classList.toggle('active');
		});

		const infoVersionText = document.createElement('p');
		infoVersionText.classList.add('info__text', 'info__text_version');
		infoVersionText.innerHTML = `
			<p>1.1.3v (07.07.2023)</p>
			<p class="info__developer">Связь с разработчиком: 
				<a class="info__email" href="mailto:xelsrock@gmail.com">xelsrock@gmail.com</a>
			</p>
		`;

		infoVersion.addEventListener('click', () => {
			infoVersion.classList.toggle('active');
		});

		infoControl.append(infoControlText);
		infoRules.append(infoRulesText);
		infoGame.append(infoGameText);
		infoVersion.append(infoVersionText);

		infoBlock.append(infoControl, infoRules, infoGame, infoVersion);
		this.container.append(infoBlock);
	};

	showArea(area) {
		const context = this.canvas.getContext('2d');

		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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