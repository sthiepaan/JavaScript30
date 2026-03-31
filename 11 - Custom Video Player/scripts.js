/**
 * Custom Video Player - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.video - DOM selector for video
 * @property {string} domSelectors.progress - DOM selector for progress bar
 * @property {string} domSelectors.toggle - DOM selector for toggle button
 * @property {string} domSelectors.range - DOM selector for range slider
 * @property {string} domSelectors.skip - DOM selector for skip button
 * @property {string} domSelectors.fullscreen - DOM selector for fullscreen button
 * @property {Object} stateClasses - Default state class name(s)
 * @property {boolean} isButtonDown - Has user interacted with progress bar
 */
const app = {
	ui: {},
	domSelectors: {
		video: '[data-video]',
		progress: '[data-progress]',
		toggle: '[data-toggle]',
		range: '[data-range]',
		skip: '[data-skip]',
		fullscreen: '[data-fullscreen]',
	},
	stateClasses: {},
	isButtonDown: false,
};

/**
 * Set video to fullscreen
 * @returns {undefined}
 */
function handleFullscreenClick() {
	app.ui.video.requestFullscreen();
}

/**
 * Set video time after user interact with progress UI element
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function handleProgressMousemove(event) {
	app.isButtonDown && handleProgressClick(event);
}

/**
 * Disable button status into `app.isButtonDown {boolean}`
 * @returns {undefined}
 */
function handleProgressMouseup() {
	app.isButtonDown = false;
}

/**
 * Enable button status into `app.isButtonDown {boolean}`
 * @returns {undefined}
 */
function handleProgressMousedown() {
	app.isButtonDown = true;
}

/**
 * Set video time after user click progress UI element
 * @param {Event} event
 * @returns {undefined}
 */
function handleProgressClick({ offsetX }) {
	const { ui } = app;

	ui.video.currentTime = (offsetX / ui.progress.offsetWidth) * ui.video.duration;
}

/**
 * Set progress UI element styling after video time update
 * @returns {undefined}
 */
function handleProgressChange() {
	const { ui } = app;
	const percent = (ui.video.currentTime / ui.video.duration) * 100;

	ui.progress.style.setProperty('--progress', `${percent}%`);
}

/**
 * Set video property after user interact with range UI element
 * @param {Event} event
 * @returns {undefined}
 */
function handleRangeChange({ target }) {
	app.ui.video[target.dataset.range] = target.value;
}

/**
 * Set forward or backward video time after user interact with skip UI element
 * @param {Event} event
 * @returns {undefined}
 */
function handleSkipClick({ target }) {
	app.ui.video.currentTime += parseFloat(target.dataset.skip);
}

/**
 * Set toggle UI element text to play or pause symbol
 * @param {Event} event
 * @returns {undefined}
 */
function toggleButtonText({ target }) {
	app.ui.toggle.textContent = target.paused ? '►' : '❚ ❚';
}

/**
 * Play/Pause video after user interaction
 * @returns {undefined}
 */
function toggleVideo() {
	if (app.ui.video.paused) {
		app.ui.video.play();
	} else {
		app.ui.video.pause();
	}
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.toggle.addEventListener('click', toggleVideo);
	app.ui.progress.addEventListener('click', handleProgressClick);
	app.ui.progress.addEventListener('mousedown', handleProgressMousedown);
	app.ui.progress.addEventListener('mouseup', handleProgressMouseup);
	app.ui.progress.addEventListener('mousemove', handleProgressMousemove);
	app.ui.video.addEventListener('click', toggleVideo);
	app.ui.video.addEventListener('play', toggleButtonText);
	app.ui.video.addEventListener('pause', toggleButtonText);
	app.ui.video.addEventListener('timeupdate', handleProgressChange);
	app.ui.ranges.forEach((range) => {
		range.addEventListener('click', handleRangeChange);
	});
	app.ui.skips.forEach((skip) => {
		skip.addEventListener('click', handleSkipClick);
	});
	app.ui.fullscreen.addEventListener('click', handleFullscreenClick);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.video = document.querySelector(domSelectors.video);
	ui.progress = document.querySelector(domSelectors.progress);
	ui.toggle = document.querySelector(domSelectors.toggle);
	ui.ranges = Array.from(document.querySelectorAll(domSelectors.range));
	ui.skips = Array.from(document.querySelectorAll(domSelectors.skip));
	ui.fullscreen = document.querySelector(domSelectors.fullscreen);
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
