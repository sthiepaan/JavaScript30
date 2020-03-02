/**
 * JS + CSS Clock - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

const UPDATE_TIMEOUT = 1000;
const HAND_INITIAL_POSITION = 90;
const CLOCK_FACE_DEGREE = 360;
const CLOCK_SECONDS_IN_MINUTE_AMOUNT = 60;
const CLOCK_MINUTES_IN_HOUR_AMOUNT = 60;
const CLOCK_HOURS_IN_ROUND_AMOUNT = 12;

 /**
  * Application settings
  * @namespace
  * @property {Object} ui - Collection of application UI elements
  * @property {Object} domSelectors - Default DOM selector(s)
  * @property {Object} domSelectors.hours - DOM selector for hours hand
  * @property {Object} domSelectors.minutes - DOM selector for minutes hand
  * @property {Object} domSelectors.seconds - DOM selector for seconds hand
  * @property {Object} stateClasses - Default state class name(s)
  */
 const app = {
  ui: {},
  domSelectors: {
    hours: '[data-clock-hours]',
    minutes: '[data-clock-minutes]',
    seconds: '[data-clock-seconds]',
  },
  stateClasses: {},
};

/**
 * Set clock hands position
 * @param {Element} element
 * @param {Number} degree
 * @returns {undefined}
 */
function setHandPosition(element, degree) {
  element.style.transform = `rotate(${degree}deg)`;
}

/**
 * Calculate seconds hand position
 * @param {Date} time
 * @returns {Number}
 */
function getSecondsDegree(time) {
  const seconds = time.getSeconds();
  const secondsDegree =
    seconds * CLOCK_FACE_DEGREE
    / CLOCK_SECONDS_IN_MINUTE_AMOUNT
    + HAND_INITIAL_POSITION;

  return secondsDegree;
}

/**
 * Calculate minutes hand position
 * @param {Date} time
 * @returns {Number}
 */
function getMinutesDegree(time) {
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const minutesDegree =
    minutes * CLOCK_FACE_DEGREE / CLOCK_MINUTES_IN_HOUR_AMOUNT
    + (seconds * CLOCK_FACE_DEGREE / CLOCK_SECONDS_IN_MINUTE_AMOUNT)
    / CLOCK_MINUTES_IN_HOUR_AMOUNT
    + HAND_INITIAL_POSITION;

  return minutesDegree;
}

/**
 * Calculate hours hand position
 * @param {Date} time
 * @returns {Number}
 */
function getHoursDegree(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const hoursDegree =
    hours * CLOCK_FACE_DEGREE / CLOCK_HOURS_IN_ROUND_AMOUNT
    + (minutes * CLOCK_FACE_DEGREE / CLOCK_MINUTES_IN_HOUR_AMOUNT)
    / CLOCK_HOURS_IN_ROUND_AMOUNT
    + HAND_INITIAL_POSITION;
  
  return hoursDegree;
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setClock() {
  const now = new Date();
  const hoursDegree = getHoursDegree(now);
  const minutesDegree = getMinutesDegree(now);
  const secondsDegree = getSecondsDegree(now);
  const { ui } = app;

  setHandPosition(ui.hourHand, hoursDegree);
  setHandPosition(ui.minuteHand, minutesDegree);
  setHandPosition(ui.secondHand, secondsDegree);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
  const { ui, domSelectors } = app;

  ui.hourHand = document.querySelector(domSelectors.hours);
  ui.minuteHand = document.querySelector(domSelectors.minutes);
  ui.secondHand = document.querySelector(domSelectors.seconds);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
  setUIElements();
  setInterval(setClock, UPDATE_TIMEOUT);
}

init();
