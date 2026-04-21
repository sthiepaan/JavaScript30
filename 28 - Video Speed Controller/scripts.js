/**
 * Video Speed Controller - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.speed - DOM selector for speed
 * @property {string} domSelectors.speedBar - DOM selector for speed bar
 * @property {string} domSelectors.video - DOM selector for video
 * @property {Object} stateClasses - Default state class name(s)
 * @property {number} max - Maximum speed rate of video
 * @property {number} min - Minimum speed rate of video
 */
const app = {
	ui: {},
	domSelectors: {
		speed: '[data-speed]',
		speedBar: '[data-speed-bar]',
		video: '[data-video]',
	},
	stateClasses: {},
	max: 4,
	min: 0.4,
};

/**
 * Set video playback rate after user interaction
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function setVideoSpeed(event) {
	const { max, min, ui } = app;
	const pointerPosition = event.pageY - event.currentTarget.offsetTop;
	const positionRatio = pointerPosition / event.currentTarget.offsetHeight;
	const playbackRate = positionRatio * (max - min) + min;

	ui.speedBar.style.height = Math.round(positionRatio * 100) + '%';
	ui.speedBar.textContent = playbackRate.toFixed(2) + '×';
	ui.video.playbackRate = playbackRate;
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.speed.addEventListener('mousemove', setVideoSpeed);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.speed = document.querySelector(domSelectors.speed);
	ui.speedBar = document.querySelector(domSelectors.speedBar);
	ui.video = document.querySelector(domSelectors.video);
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
