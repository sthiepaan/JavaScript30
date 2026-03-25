/**
 * Flex Panel Gallery - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.panel - DOM selector for panel
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isOpen - Class name for selected panel
 * @property {string} stateClasses.isActive - Class name for active panel
 * @property {string[]} transitionProperties - List of transition properties to watch
 */
const app = {
	ui: {},
	domSelectors: {
		panel: '[data-panel]',
	},
	stateClasses: {
		isOpen: 'open',
		isActive: 'active',
	},
	transitionProperties: ['flex', 'flex-grow'],
};

/**
 * Toggle class after user click
 * @returns {undefined}
 */
function toggleOpen() {
	this.classList.toggle(app.stateClasses.isOpen);
}

/**
 * Toggle class after animation is finished
 * @param {TransitionEvent} event
 * @returns {undefined}
 */
function toggleActive(event) {
	const { stateClasses, transitionProperties } = app;

	if (transitionProperties.includes(event.propertyName)) {
		event.target.classList.toggle(stateClasses.isActive);
	}
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.panels.forEach((panel) => {
		panel.addEventListener('click', toggleOpen);
		panel.addEventListener('transitionend', toggleActive);
	});
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.panels = Array.from(document.querySelectorAll(domSelectors.panel));
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
