/**
 * Sticky Nav - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.sticky - DOM selector for sticky
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isSticky - Class name for sticky indication
 */
const app = {
	ui: {},
	domSelectors: {
		sticky: '[data-sticky]',
	},
	stateClasses: {
		isSticky: 'sticky',
	},
};

/**
 * Toggle sticky indication on body called by watcher
 * @param {IntersectionObserverEntry[]} watcherEntries
 * @returns {undefined}
 */
function toggleStickyClassname([{ isIntersecting }]) {
	const { stateClasses } = app;

	document.body.classList.toggle(stateClasses.isSticky, !isIntersecting);
}

/**
 * Set watcher instance to observe UI element before sticky
 * @returns {undefined}
 */
function setStickyWatcher() {
	const { ui } = app;
	const watcher = new IntersectionObserver(toggleStickyClassname);

	watcher.observe(ui.sticky.previousElementSibling);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.sticky = document.querySelector(domSelectors.sticky);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setStickyWatcher();
}

init();
