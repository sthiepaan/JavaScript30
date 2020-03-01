/**
 * Drum Kit - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

 /**
  * Application settings
  * @namespace
  * @property {Object} ui - Collection of application UI elements
  * @property {Object} domSelectors - Default DOM selector(s)
  * @property {Object} domSelectors.key - DOM selector for key
  * @property {Object} stateClasses - Default state class name(s)
  * @property {Object} stateClasses.isPlaying - Class name for active key
  * @property {Object} sounds - Default sound(s)
  * @property {string} sounds.clap - Source of _clap_ sound
  * @property {string} sounds.hihat - Source of _hihat_ sound
  * @property {string} sounds.kick - Source of _kick_ sound
  * @property {string} sounds.openhat - Source of _openhat_ sound
  * @property {string} sounds.boom - Source of _boom_ sound
  * @property {string} sounds.ride - Source of _ride_ sound
  * @property {string} sounds.snare - Source of _snare_ sound
  * @property {string} sounds.tom - Source of _tom_ sound
  * @property {string} sounds.tink - Source of _tink_ sound
  */
const app = {
  ui: {},
  domSelectors: {
    keysWrapper: '[data-keys]',
    key: '[data-key]',
  },
  stateClasses: {
    isPlaying: 'playing',
  },
  sounds: {
    clap: './sounds/clap.wav',
    hihat: './sounds/hihat.wav',
    kick: './sounds/kick.wav',
    openhat: './sounds/openhat.wav',
    boom: './sounds/boom.wav',
    ride: './sounds/ride.wav',
    snare: './sounds/snare.wav',
    tom: './sounds/tom.wav',
    tink: './sounds/tink.wav',
  },
};

/**
 * Add class and remove it after animation is finished
 * @param {Element} key
 * @returns {undefined}
 */
function toggleKey(key) {
  key.classList.add(app.stateClasses.isPlaying);
  key.addEventListener('transitionend', function () {
    key.classList.remove(app.stateClasses.isPlaying);
  });
}

/**
 * Play sound and execute `toggleKey {Function}`
 * @param {Element} key
 * @returns {undefined}
 */
function playSound(key) {
  const audioElement = new Audio();
  audioElement.src = app.sounds[key.dataset.sound];

  audioElement.addEventListener('loadeddata', function () {
    this.pause();
    this.play();
    toggleKey(key);
  });
}

/**
 * Get `key {Element}` based on `keyCode {String}`
 * @param {String} keyCode
 * @returns {Element}
 */
function getKey(keyCode) {
  return app.ui.keys.find(key => key.dataset.key === keyCode)
}

/**
 * Get key without unnecessary data
 * @param {String} code
 * @returns {String}
 */
function getFormattedKeyCode(code) {
  return code.replace('Key', '').toLowerCase();
}

/**
 * Get clicked user key and execute `playSound {Function}`
 * @param {Event} event 
 * @param {String} event.code
 * @returns {undefined}
 */
function keydownHandler({ code }) {
  const keyCode = getFormattedKeyCode(code);
  const key = getKey(keyCode);

  if (key) playSound(key);
}

/**
 * Get clicked button key and execute `playSound {Function}`
 * @param {Event} event
 * @param {Element} event.target
 * @returns {undefined}
 */
function clickHandler({ target }) {
  if (target.hasAttribute(app.domSelectors.key.slice(1, -1))) {
    playSound(target);
  }
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
  app.ui.keysWrapper.addEventListener('click', clickHandler);
  window.addEventListener('keyup', keydownHandler);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
  const { ui, domSelectors } = app;

  ui.keysWrapper = document.querySelector(domSelectors.keysWrapper);
  ui.keys = Array.from(document.querySelectorAll(domSelectors.key));
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
