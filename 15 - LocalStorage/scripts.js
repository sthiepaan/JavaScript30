/**
 * LocalStorage - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.list - DOM selector for list
 * @property {string} domSelectors.form - DOM selector for form
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} listId - Identifier for a list
 * @property {{ text: string; done: boolean }[]} items - List of items from user
 */
const app = {
	ui: {},
	domSelectors: {
		form: '[data-form]',
		list: '[data-list]',
	},
	stateClasses: {},
	listId: 'items',
	items: [],
};

/**
 * Toggle status of a list item after user interaction
 * @param {Event} event
 */
function handleListChange(event) {
	const [, itemIndex] = event.target.id.split('-');

	app.items[itemIndex].done = !app.items[itemIndex].done;

	setList();
}

/**
 * Add new item to the list after user interaction
 * @param {SubmitEvent} event
 */
function handleFormSubmit(event) {
	event.preventDefault();
	app.items.push({ text: event.target.item.value, done: false });
	event.target.reset();
	setList();
}

/**
 * Set UI for list of items
 * @returns {undefined}
 */
function setList() {
	app.ui.list.innerHTML = app.items
		.map((item, index) => {
			return `
        <li>
          <input type="checkbox" id="item-${index}" ${item.done ? 'checked' : ''} />
          <label for="item-${index}">${item.text}</label>
        </li>
      `;
		})
		.join('');

	localStorage.setItem(app.listId, JSON.stringify(app.items));
}

/**
 * Set initial data of items
 * @returns {undefined}
 */
function setData() {
	let data = localStorage.getItem(app.listId);

	if (!data) return;

	app.items = JSON.parse(data);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.form.addEventListener('submit', handleFormSubmit);
	app.ui.list.addEventListener('change', handleListChange);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.form = document.querySelector(domSelectors.form);
	ui.list = document.querySelector(domSelectors.list);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setEventListeners();
	setData();
	setList();
}

init();
