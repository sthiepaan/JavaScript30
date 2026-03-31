/**
 * Hold Shift and Check Checkboxes - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.checkbox - DOM selector for checkbox
 * @property {Object} stateClasses - Default state class name(s)
 * @property {EventTarget | null} lastCheckbox - Last checkbox user interacted with
 */
const app = {
	ui: {},
	domSelectors: {
		checkbox: '[data-checkbox]',
	},
	stateClasses: {},
	lastCheckbox: null,
};

/**
 * Set checkbox element into `app.lastCheckbox {EventTarget}`
 * @param {HTMLInputElement} checkbox
 * @returns {undefined}
 */
function setLastCheckbox(checkbox) {
	app.lastCheckbox = checkbox;
}

/**
 * (Un)Check current and all within range checkboxes on user interaction
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function handleCheckboxClick({ shiftKey, target }) {
	const { lastCheckbox, ui } = app;
	let isCheckboxInBetween = false;

	if (lastCheckbox && shiftKey) {
		ui.checkboxes.forEach((checkbox) => {
			if (checkbox === target || checkbox === lastCheckbox) {
				isCheckboxInBetween = !isCheckboxInBetween;
			}

			if (isCheckboxInBetween) {
				checkbox.checked = target.checked;
			}
		});
	}

	setLastCheckbox(target);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('click', handleCheckboxClick);
	});
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.checkboxes = Array.from(document.querySelectorAll(domSelectors.checkbox));
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
