/**
 * Drum Kit - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {Object} domSelectors.keysWrapper - DOM selector for keys wrapper
 * @property {Object} domSelectors.key - DOM selector for key
 * @property {Object} stateClasses - Default state class name(s)
 * @property {Object} stateClasses.isPlaying - Class name for active key
 * @property {Object} sounds - Default sound(s)
 * @property {string} sounds.clap - Source path to 'clap' sound
 * @property {string} sounds.hihat - Source path to 'hihat' sound
 * @property {string} sounds.kick - Source path to 'kick' sound
 * @property {string} sounds.openhat - Source path to 'openhat' sound
 * @property {string} sounds.boom - Source path to 'boom' sound
 * @property {string} sounds.ride - Source path to 'ride' sound
 * @property {string} sounds.snare - Source path to 'snare' sound
 * @property {string} sounds.tom - Source path to 'tom' sound
 * @property {string} sounds.tink - Source path to 'tink' sound
 */
const app = {
	ui: {},
	domSelectors: {
		keysWrapper: '[data-keys]',
		key: '[data-key]',
	},
	stateClasses: {
		isPlaying: 'playing',
	},
	sounds: {
		clap: './sounds/clap.wav',
		hihat: './sounds/hihat.wav',
		kick: './sounds/kick.wav',
		openhat: './sounds/openhat.wav',
		boom: './sounds/boom.wav',
		ride: './sounds/ride.wav',
		snare: './sounds/snare.wav',
		tom: './sounds/tom.wav',
		tink: './sounds/tink.wav',
	},
};

/**
 * Add class and remove it after animation is finished
 * @param {HTMLElement} key
 * @returns {undefined}
 */
function toggleKey(key) {
	key.classList.add(app.stateClasses.isPlaying);
	key.addEventListener('transitionend', () => key.classList.remove(app.stateClasses.isPlaying));
}

/**
 * Play sound and execute `toggleKey {Function}`
 * @param {HTMLElement} key
 * @returns {undefined}
 */
function playSound(key) {
	const audioElement = new Audio();

	audioElement.src = app.sounds[key.dataset.sound];

	audioElement.addEventListener('loadeddata', () => {
		audioElement.pause();
		audioElement.play();
		toggleKey(key);
	});
}

/**
 * Get `key {HTMLElement}` based on `keyCode {string}`
 * @param {string} keyCode
 * @returns {HTMLElement}
 */
function getKey(keyCode) {
	return app.ui.keys.find((key) => key.dataset.key === keyCode);
}

/**
 * Get normalized key code
 * @param {string} code
 * @returns {string}
 */
function getFormattedKeyCode(code) {
	return code.replace('Key', '').toLowerCase();
}

/**
 * Get clicked user key and execute `playSound {Function}`
 * @param {KeyboardEvent} event
 * @returns {undefined}
 */
function keydownHandler({ code }) {
	const keyCode = getFormattedKeyCode(code);
	const key = getKey(keyCode);

	if (key) playSound(key);
}

/**
 * Get clicked button key and execute `playSound {Function}`
 * @param {PointerEvent} event
 * @returns {undefined}
 */
function clickHandler({ target }) {
	if (target.hasAttribute(app.domSelectors.key.slice(1, -1))) {
		playSound(target);
	}
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.keysWrapper.addEventListener('click', clickHandler);
	window.addEventListener('keyup', keydownHandler);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.keysWrapper = document.querySelector(domSelectors.keysWrapper);
	ui.keys = Array.from(document.querySelectorAll(domSelectors.key));
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setEventListeners();
}

init();
