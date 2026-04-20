/**
 * Click and Drag - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.items - DOM selector for items
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isActive - Class name for active items dragging
 * @property {number} scrollPosition - Position state of a scroll within items
 * @property {number} startPosition - Position state of a mouse cursor on start
 * @property {boolean} isDragging - Enable/disable dragging on an items
 */
const app = {
	ui: {},
	domSelectors: {
		items: '[data-items]',
	},
	stateClasses: {
		isActive: 'active',
	},
	scrollPosition: 0,
	startPosition: 0,
	isDragging: false,
};

/**
 * Set scroll position after user interaction
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function setScrollPosition(event) {
	event.preventDefault();

	const { scrollPosition, startPosition, isDragging } = app;

	if (!isDragging) return;

	const walk = event.pageX - event.currentTarget.offsetLeft - startPosition;

	event.currentTarget.scrollLeft = scrollPosition - walk;
}

/**
 * Unset click and drag after user interaction stopped
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function disableClickAndDrag(event) {
	app.isDragging = false;

	event.currentTarget.classList.remove(app.stateClasses.isActive);
}

/**
 * Set click and drag after user interaction
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function enableClickAndDrag(event) {
	app.scrollPosition = event.currentTarget.scrollLeft;
	app.startPosition = event.pageX - event.currentTarget.offsetLeft;
	app.isDragging = true;

	event.currentTarget.classList.add(app.stateClasses.isActive);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.items.addEventListener('mousedown', enableClickAndDrag);
	ui.items.addEventListener('mouseleave', disableClickAndDrag);
	ui.items.addEventListener('mouseup', disableClickAndDrag);
	ui.items.addEventListener('mousemove', setScrollPosition);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.items = document.querySelector(domSelectors.items);
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
