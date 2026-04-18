/**
 * Event Capture, Propagation, Bubbling and Once - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.box - DOM selector for box
 * @property {string} domSelectors.trigger - DOM selector for trigger
 * @property {Object} stateClasses - Default state class name(s)
 */
const app = {
	ui: {},
	domSelectors: {
		box: '[data-box]',
		trigger: '[data-trigger]',
	},
	stateClasses: {},
};

/**
 * Log custom message in console after user interaction
 * @returns {undefined}
 */
function logMessage() {
	console.log('Custom message');
}

/**
 * Log UI element classnames in console after user interaction
 * @param {PointerEvent} event
 * @returns {undefined}
 */
function logClassname(event) {
	event.stopPropagation();
	console.log(event.currentTarget.classList.value);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.boxes.forEach((box) => box.addEventListener('click', logClassname, { capture: true }));
	ui.trigger.addEventListener('click', logMessage, { once: true });
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.boxes = Array.from(document.querySelectorAll(domSelectors.box));
	ui.trigger = document.querySelector(domSelectors.trigger);
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
