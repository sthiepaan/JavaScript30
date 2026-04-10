/**
 * Adding Up Times with Reduce - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.time - DOM selector for time
 * @property {Object} stateClasses - Default state class name(s)
 * @property {number} timeTotal - Total time in seconds
 */
const app = {
	ui: {},
	domSelectors: {
		time: '[data-time]',
	},
	stateClasses: {},
	timeTotal: 0,
};

/**
 * Get formatted part of time
 * @param {number} time
 * @param {number} part
 * @returns {string}
 */
function getTimePart(time, part) {
	return Math.floor(time / part)
		.toString()
		.padStart(2, '0');
}

/**
 * Log total time collected
 * @returns {undefined}
 */
function logTotalTime() {
	console.log(
		[
			getTimePart(app.timeTotal, HOUR),
			getTimePart(app.timeTotal % HOUR, MINUTE),
			getTimePart(app.timeTotal % MINUTE, SECOND),
		].join(':'),
	);
}

/**
 * Set total time in seconds to `app.timeTotal {number}`
 * @returns {undefined}
 */
function setTimeTotal() {
	app.timeTotal = app.ui.times
		.map((time) => time.dataset.time.split(':').map(parseFloat))
		.map(([min, sec]) => min * MINUTE + sec)
		.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.times = Array.from(document.querySelectorAll(domSelectors.time));
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setTimeTotal();
	logTotalTime();
}

init();
