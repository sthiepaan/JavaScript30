/**
 * Geolocation - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.arrow - DOM selector for arrow
 * @property {string} domSelectors.speed - DOM selector for speed
 * @property {Object} stateClasses - Default state class name(s)
 */
const app = {
	ui: {},
	domSelectors: {
		arrow: '[data-arrow]',
		speed: '[data-speed]',
	},
	stateClasses: {},
};

/**
 * Set user position to UI element
 * @param {number | null} value
 * @returns {undefined}
 */
function setArrow(position) {
	app.ui.arrow.style.transform = `rotate(${position}deg)`;
}

/**
 * Set user speed to UI element
 * @param {number | null} value
 * @returns {undefined}
 */
function setSpeed(value) {
	app.ui.speed.textContent = value;
}

/**
 * Set geolocation watcher for user position
 * @returns {undefined}
 */
function setGeolocation() {
	navigator.geolocation.watchPosition(({ coords }) => {
		setSpeed(coords.speed);
		setArrow(coords.heading);
	}, console.error);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.arrow = document.querySelector(domSelectors.arrow);
	ui.speed = document.querySelector(domSelectors.speed);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setGeolocation();
}

init();
