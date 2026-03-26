/**
 * Type Ahead - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.search - DOM selector for search input
 * @property {string} domSelectors.suggestions - DOM selector for suggestions list
 * @property {Object} stateClasses - Default state class name(s)
 * @property {Object} endpoints - Collection of API endpoints
 * @property {Object} endpoints.cities - API endpoint for cities
 * @property {string} endpoints.cities.url - API Endpoint URL
 * @property {unknown | null} endpoints.cities.data - API Endpoint data
 * @property {RegExp | null} pattern - API Endpoint data
 * @property {string | null} searchValue - API Endpoint data
 */
const app = {
	ui: {},
	domSelectors: {
		search: '[data-search]',
		suggestions: '[data-suggestions]',
	},
	stateClasses: {},
	endpoints: {
		cities: {
			url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
			data: null,
		},
	},
	pattern: null,
	searchValue: null,
};

/**
 * Format raw number to comma-separated number
 * @param {number} number
 * @returns {string}
 */
function formatNumber(number) {
	return Intl.NumberFormat('en-us').format(number);
}

/**
 * Highlight part of a text which match pattern
 * @param {string} text
 * @returns {string}
 */
function highlightText(text) {
	return text.replace(app.pattern, `<span class="hl">${app.searchValue}</span>`);
}

/**
 * Filter matching data and render results
 * @returns {undefined}
 */
function setSuggestions() {
	app.ui.suggestions.innerHTML = app.endpoints.cities.data
		?.filter(({ city, state }) => city.match(app.pattern) || state.match(app.pattern))
		.map((entry) => {
			const highlightedName = highlightText(entry.city);
			const highlightedState = highlightText(entry.state);
			const formattedPopulation = formatNumber(entry.population);

			return `
        <li>
          <span class="name">${highlightedName}, ${highlightedState}</span>
          <span class="population">${formattedPopulation}</span>
        </li>
      `;
		})
		.join('');
}

/**
 * Set case-insensitive search pattern into `app.pattern {RegExp}`
 * @returns {undefined}
 */
function setPattern() {
	app.pattern = RegExp(app.searchValue, 'i');
}

/**
 * Set user input into `app.searchValue {string}`
 * @param {string} value
 * @returns {undefined}
 */
function setSearchValue(value) {
	app.searchValue = value;
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	app.ui.search.addEventListener('keyup', (event) => {
		setSearchValue(event.target.value);
		setPattern();
		setSuggestions();
	});
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.search = document.querySelector(domSelectors.search);
	ui.suggestions = document.querySelector(domSelectors.suggestions);
}

/**
 * Collect API endpoint data into `app.endpoints {Object}`
 * @param {string} endpointName
 * @returns {Promise<undefined>}
 */
async function setEndpointData(endpointName) {
	const endpoint = app.endpoints[endpointName];
	const data = await fetch(endpoint.url);

	endpoint.data = await data.json();
}

/**
 * Initialize script
 * @returns {undefined}
 */
async function init() {
	await setEndpointData('cities');
	setUIElements();
	setEventListeners();
}

init();
