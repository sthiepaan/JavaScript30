/**
 * CSS Variables - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
  * Application settings
  * @namespace
  * @property {Object} ui - Collection of application UI elements
  * @property {Object} domSelectors - Default DOM selector(s)
  * @property {Object} domSelectors.controls - DOM selector for controls wrapper
  * @property {Object} stateClasses - Default state class name(s)
  */
const app = {
  ui: {},
  domSelectors: {
    controls: '[data-controls]',
  },
  stateClasses: {},
};

/**
 * Set CSS variables after user change input(s) value
 * @param {Event} event
 * @param {Element} event.target
 * @returns {undefined}
 */
function changeHandler({ target: { name, dataset, value } }) {
  const { sizing: suffix = '' } = dataset;

  app.ui.document.style.setProperty(`--${name}`, `${value}${suffix}`);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
  app.ui.controls.addEventListener('change', changeHandler);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
  const { ui, domSelectors } = app;

  ui.document = document.documentElement;
  ui.controls = document.querySelector(domSelectors.controls);
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
