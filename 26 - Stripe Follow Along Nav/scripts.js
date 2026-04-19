/**
 * Stripe Follow Along Nav - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.nav - DOM selector for nav
 * @property {string} domSelectors.flyout - DOM selector for flyout
 * @property {string} domSelectors.flyoutBg - DOM selector for flyout background
 * @property {string} domSelectors.flyoutContent - DOM selector for flyout content
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isEntering - Class name for entering flyout
 * @property {string} stateClasses.isActive - Class name for marking active flyout
 * @property {string} stateClasses.isOpen - Class name for flyout background visibility
 */
const app = {
	ui: {},
	domSelectors: {
		nav: '[data-nav]',
		flyout: '[data-flyout]',
		flyoutBg: '[data-flyout-bg]',
		flyoutContent: '[data-flyout-content]',
	},
	stateClasses: {
		isEntering: 'trigger-enter',
		isActive: 'trigger-enter-active',
		isOpen: 'open',
	},
};

/**
 * Hide flyout after user interaction
 * @param {PointerEvent} event
 * @returns {undefined}
 */
function handleFlyoutMouseleave(event) {
	const { stateClasses, ui } = app;

	event.target.classList.remove(stateClasses.isEntering, stateClasses.isActive);
	ui.flyoutBg.classList.remove(stateClasses.isOpen);
}

/**
 * Set flyout background visibility and position
 * @param {HTMLElement} flyout
 * @returns {undefined}
 */
function setFlyoutBackground(flyout) {
	const { domSelectors, stateClasses, ui } = app;
	const flyoutContentBox = flyout.querySelector(domSelectors.flyoutContent).getBoundingClientRect();
	const navBox = ui.nav.getBoundingClientRect();

	ui.flyoutBg.classList.add(stateClasses.isOpen);
	ui.flyoutBg.style.setProperty('width', `${flyoutContentBox.width}px`);
	ui.flyoutBg.style.setProperty('height', `${flyoutContentBox.height}px`);
	ui.flyoutBg.style.setProperty(
		'transform',
		`translate(
			${flyoutContentBox.left - navBox.left}px,
			${flyoutContentBox.top - navBox.top}px
		)`,
	);
}

/**
 * Show flyout after user interaction
 * @param {PointerEvent} event
 * @returns {undefined}
 */
function handleFlyoutMouseenter({ target }) {
	const { stateClasses } = app;

	target.classList.add(stateClasses.isEntering);
	setTimeout(() => {
		target.classList.contains(stateClasses.isEntering) &&
			target.classList.add(stateClasses.isActive);
	}, 150);
	setFlyoutBackground(target);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.flyouts.forEach((flyout) => {
		flyout.addEventListener('mouseenter', handleFlyoutMouseenter);
		flyout.addEventListener('mouseleave', handleFlyoutMouseleave);
	});
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.nav = document.querySelector(domSelectors.nav);
	ui.flyouts = Array.from(document.querySelectorAll(domSelectors.flyout));
	ui.flyoutBg = document.querySelector(domSelectors.flyoutBg);
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
