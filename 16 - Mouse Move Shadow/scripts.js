/**
 * Mouse Move Shadow - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.hero - DOM selector for hero
 * @property {string} domSelectors.text - DOM selector for text
 * @property {Object} stateClasses - Default state class name(s)
 * @property {number} walk - Maximum movement in pixels
 */
const app = {
	ui: {},
	domSelectors: {
		hero: '[data-hero]',
		text: '[data-text]',
	},
	stateClasses: {},
	walk: 500,
};

/**
 * Calculate "walk" value for cursor position in specific dimension
 * @param {number} position
 * @param {number} dimension
 * @returns {number}
 */
function getWalkValue(position, dimension) {
	const { walk } = app;

	return Math.round((position / dimension) * walk - walk / 2);
}

/**
 * Set text shadow for UI element
 * @param {number} xWalk
 * @param {number} yWalk
 * @returns {undefined}
 */
function setTextShadow(xWalk, yWalk) {
	app.ui.text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
  `;
}

/**
 * Get cursor position on top of UI element and set text shadow after user interaction
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function handleHeroMousemove({ clientX, clientY, currentTarget }) {
	const { height, left, top, width } = currentTarget.getBoundingClientRect();

	setTextShadow(getWalkValue(clientX - left, width), getWalkValue(clientY - top, height));
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.hero.addEventListener('mousemove', handleHeroMousemove);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.hero = document.querySelector(domSelectors.hero);
	ui.text = document.querySelector(domSelectors.text);
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
