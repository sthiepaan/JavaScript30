/**
 * Follow Along Link Highlighter - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.trigger - DOM selector for trigger
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isHighlighted - Class name for highlighted trigger
 * @property {HTMLSpanElement} highlighter - HTML element for highlighter
 */
const app = {
	ui: {},
	domSelectors: {
		trigger: 'a[href]',
	},
	stateClasses: {
		isHighlighted: 'highlight',
	},
	highlighter: document.createElement('span'),
};

/**
 * Set highlighter UI element on page
 * @returns {undefined}
 */
function setHighlighter() {
	const { highlighter, stateClasses } = app;

	highlighter.classList.add(stateClasses.isHighlighted);
	document.body.appendChild(highlighter);
}

/**
 * Set highlighter for specific trigger on user interaction
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function highlightTrigger({ target }) {
	const { height, left, top, width } = target.getBoundingClientRect();

	app.highlighter.style.width = `${width}px`;
	app.highlighter.style.height = `${height}px`;
	app.highlighter.style.transform = `translate(${left + window.scrollX}px, ${top + window.scrollY}px)`;
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.triggers.forEach((trigger) => {
		trigger.addEventListener('mouseenter', highlightTrigger);
	});
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.triggers = Array.from(document.querySelectorAll(domSelectors.trigger));
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setEventListeners();
	setHighlighter();
}

init();
