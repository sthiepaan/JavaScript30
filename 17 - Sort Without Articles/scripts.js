/**
 * Sort Without Articles - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

const BANDS = [
	'The Plot in You',
	'The Devil Wears Prada',
	'Pierce the Veil',
	'Norma Jean',
	'The Bled',
	'Say Anything',
	'The Midway State',
	'We Came as Romans',
	'Counterparts',
	'Oh, Sleeper',
	'A Skylit Drive',
	'Anywhere But Here',
	'An Old Dog',
];

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.list - DOM selector for list
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string[]} data - List of band names
 */
const app = {
	ui: {},
	domSelectors: {
		list: '[data-list]',
	},
	stateClasses: {},
	data: BANDS,
};

/**
 * Get entry name without article
 * @param {string} entry
 * @returns {string}
 */
function getEntryName(entry) {
	return entry.replace(/^(a|an|the)\s+/i, '');
}

/**
 * Set list items UI with band names
 * @returns {undefined}
 */
function setList() {
	const { data, ui } = app;

	ui.list.innerHTML = data.map((entry) => `<li>${entry}</li>`).join('');
}

/**
 * Set bands data sorted by names
 * @returns {undefined}
 */
function setData() {
	app.data = app.data.toSorted((a, b) => (getEntryName(a) > getEntryName(b) ? 1 : -1));
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.list = document.querySelector(domSelectors.list);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setData();
	setList();
}

init();
