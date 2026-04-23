/**
 * Whack A Mole - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.hole - DOM selector for hole
 * @property {string} domSelectors.mole - DOM selector for mole
 * @property {string} domSelectors.score - DOM selector for score
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isUp - Class name for active mole
 * @property {number} gameTime - Gameplay time
 * @property {HTMLElement | null} lastHole - Last selected mole
 * @property {number} score - Player score
 * @property {boolean} isGameRunning - Enable/disable gameplay
 */
const app = {
	ui: {},
	domSelectors: {
		hole: '[data-hole]',
		mole: '[data-mole]',
		score: '[data-score]',
	},
	stateClasses: {
		isUp: 'up',
	},
	gameTime: 10000,
	lastHole: null,
	score: 0,
	isGameRunning: false,
};

/**
 * Get point after user interaction
 * @param {PointerEvent} event
 * @returns {undefined}
 */
function getPoint(event) {
	if (!event.isTrusted) return;

	event.target.classList.remove(app.stateClasses.isUp);

	app.score += 1;
	app.ui.score.textContent = app.score;
}

/**
 * Get random hole
 * @returns {HTMLElement}
 */
function getRandomHole() {
	const hole = app.ui.holes[Math.floor(Math.random() * app.ui.holes.length)];

	if (hole === app.lastHole) {
		return getRandomHole();
	}

	app.lastHole = hole;

	return hole;
}

/**
 * Get random time
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

/**
 * Run game
 * @returns {undefined}
 */
function runGame() {
	const time = getRandomTime(200, 1000);
	const hole = getRandomHole();

	hole.classList.add(app.stateClasses.isUp);
	setTimeout(() => {
		hole.classList.remove(app.stateClasses.isUp);

		if (!app.isGameRunning) {
			runGame();
		}
	}, time);
}

/**
 * Stop game
 * @returns {undefined}
 */
function stopGame() {
	setTimeout(() => {
		app.isGameRunning = true;
	}, app.gameTime);
}

/**
 * Reset game
 * @returns {undefined}
 */
function resetGame() {
	app.ui.score.textContent = 0;
	app.isGameRunning = false;
	app.score = 0;
}

/**
 * Start game
 * @returns {undefined}
 */
function startGame() {
	resetGame();
	stopGame();
	runGame();
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	app.ui.moles.forEach((mole) => mole.addEventListener('click', getPoint));
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.holes = Array.from(document.querySelectorAll(domSelectors.hole));
	ui.moles = Array.from(document.querySelectorAll(domSelectors.mole));
	ui.score = document.querySelector(domSelectors.score);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setEventListeners();
	window.startGame = startGame;
}

init();
