/**
 * CSS Variables - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.controls - DOM selector for controls wrapper
 * @property {Object} stateClasses - Default state class name(s)
 */
const app = {
	ui: {},
	domSelectors: {
		controls: '[data-controls]',
	},
	stateClasses: {},
};

/**
 * Set CSS variable after user change input value
 * @param {Event} event
 * @returns {undefined}
 */
function changeHandler({ target: { dataset, id, value } }) {
	const { unit = '' } = dataset;

	app.ui.document.style.setProperty(`--${id}`, `${value}${unit}`);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.controls.addEventListener('change', changeHandler);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.document = document.documentElement;
	ui.controls = document.querySelector(domSelectors.controls);
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
