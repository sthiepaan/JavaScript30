/**
 * Key Sequence Detection - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} secretCode - Text expected to be typed by user
 * @property {string[]} pressedKeysHistory - List of pressed keys by user
 */
const app = {
	ui: {},
	domSelectors: {},
	stateClasses: {},
	secretCode: 'sthiepaan',
	pressedKeysHistory: [],
};

/**
 * Execute non-standard code after user pass verification
 * @returns {undefined}
 */
function callRestrictedCode() {
	window.cornify_add?.();
}

/**
 * Verify key sequence after user interaction
 * @param {KeyboardEvent}
 * @returns {undefined}
 */
function verifyCode({ key }) {
	const { pressedKeysHistory, secretCode } = app;

	pressedKeysHistory.push(key);
	pressedKeysHistory.length > secretCode.length && pressedKeysHistory.shift();
	pressedKeysHistory.join('') === secretCode && callRestrictedCode();
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	window.addEventListener('keyup', verifyCode);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setEventListeners();
}

init();
