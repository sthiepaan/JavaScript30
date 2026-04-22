/**
 * Countdown Timer - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.timeLeft - DOM selector for time left
 * @property {string} domSelectors.timeEnd - DOM selector for time end
 * @property {string} domSelectors.time - DOM selector for time
 * @property {string} domSelectors.form - DOM selector for form
 * @property {Object} stateClasses - Default state class name(s)
 * @property {number | null} countdown - Countdown unique identifier
 */
const app = {
	ui: {},
	domSelectors: {
		timeLeft: '[data-time-left]',
		timeEnd: '[data-time-end]',
		time: '[data-time]',
		form: '[data-form]',
	},
	stateClasses: {},
	countdown: null,
};

/**
 * Format number from 1-digit to 2-digits
 * @param {number} num
 * @returns {string}
 */
function formatDigit(num) {
	return num.toString().padStart(2, '0');
}

/**
 * Set text information for time end UI
 * @param {number} timestamp
 * @returns {undefined}
 */
function setTimeEnd(timestamp) {
	const end = new Date(timestamp);
	const hour = formatDigit(end.getHours());
	const minutes = formatDigit(end.getMinutes());

	app.ui.timeEnd.textContent = `Be back at ${hour}:${minutes}`;
}

/**
 * Set text information for time left UI
 * @param {number} secondsRemaining
 * @returns {undefined}
 */
function setTimeLeft(secondsRemaining) {
	const minutes = formatDigit(Math.floor(secondsRemaining / 60));
	const seconds = formatDigit(secondsRemaining % 60);

	app.ui.timeLeft.textContent = `${minutes}:${seconds}`;
}

/**
 * Set countdown time and update text information within UI
 * @param {number} then
 * @returns {undefined}
 */
function setTime(then) {
	app.countdown = setInterval(() => {
		const secondsRemaining = Math.round((then - Date.now()) / 1000);

		if (secondsRemaining <= 0) {
			clearInterval(app.countdown);
		}

		setTimeLeft(secondsRemaining);
	}, 1000);
}

/**
 * Set timer and text information into UI
 * @param {number} seconds
 * @returns {undefined}
 */
function setTimer(seconds) {
	clearInterval(app.countdown);

	const then = Date.now() + seconds * 1000;

	setTime(then);
	setTimeLeft(seconds);
	setTimeEnd(then);
}

/**
 * Set timer and clear form after user interaction
 * @param {SubmitEvent} event
 * @returns {undefined}
 */
function handleFormSubmit(event) {
	event.preventDefault();
	setTimer(event.target.minutes.value * 60);
	event.target.reset();
}

/**
 * Set timer after user interaction
 * @param {PointerEvent} event
 * @returns {undefined}
 */
function handleTimeClick(event) {
	setTimer(parseInt(event.target.dataset.time));
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.times.forEach((time) => time.addEventListener('click', handleTimeClick));
	ui.form.addEventListener('submit', handleFormSubmit);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.timeLeft = document.querySelector(domSelectors.timeLeft);
	ui.timeEnd = document.querySelector(domSelectors.timeEnd);
	ui.times = Array.from(document.querySelectorAll(domSelectors.time));
	ui.form = document.querySelector(domSelectors.form);
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
