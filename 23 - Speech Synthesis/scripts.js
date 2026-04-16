/**
 * Speech Synthesis - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.voiceinator - DOM selector for voiceinator
 * @property {string} domSelectors.voices - DOM selector for voices
 * @property {string} domSelectors.stop - DOM selector for stop
 * @property {string} domSelectors.speak - DOM selector for speak
 * @property {string} domSelectors.text - DOM selector for text
 * @property {Object} stateClasses - Default state class name(s)
 * @property {SpeechSynthesisUtterance | null} synthesis - Instance of SpeechSynthesisUtterance to synthesize speech
 * @property {SpeechSynthesisVoice[]} voices - List of available voices to use
 */
const app = {
	ui: {},
	domSelectors: {
		voiceinator: '[data-voiceinator]',
		voices: '[data-voices]',
		stop: '[data-stop]',
		speak: '[data-speak]',
		text: '[data-text]',
	},
	stateClasses: {},
	synthesis: null,
	voices: [],
};

/**
 * Pause synthesized speech
 * @returns {undefined}
 */
function stopVoiceinator() {
	speechSynthesis.cancel();
}

/**
 * Play synthesized speech
 * @returns {undefined}
 */
function playVoiceinator() {
	stopVoiceinator();
	speechSynthesis.speak(app.synthesis);
}

/**
 * Handle changes within UI after user interaction
 * @param {Event} event
 * @returns {undefined}
 */
function handleVoiceinatorChange({ target }) {
	const { synthesis, voices } = app;
	const { name, value } = target;

	if (name === 'voice') {
		synthesis.voice = voices.find((voice) => voice.name === value);
	} else {
		synthesis[name] = value;
	}

	playVoiceinator();
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.voiceinator.addEventListener('change', handleVoiceinatorChange);
	ui.speak.addEventListener('click', playVoiceinator);
	ui.stop.addEventListener('click', stopVoiceinator);
}

/**
 * Create and init an instance of speech synthesis
 * @returns {undefined}
 */
function setSpeechSynthesis() {
	app.synthesis = new SpeechSynthesisUtterance();
	app.synthesis.text = app.ui.text.value;
}

/**
 * Set voices options to UI
 * @returns {undefined}
 */
function setVoicesOptions() {
	const { ui, voices } = app;

	ui.voices.outerHTML = voices.map(
		(voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`,
	);
}

/**
 * Set list of available voices
 * @returns {undefined}
 */
function setVoices() {
	app.voices = speechSynthesis.getVoices();
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.voiceinator = document.querySelector(domSelectors.voiceinator);
	ui.voices = document.querySelector(domSelectors.voices);
	ui.stop = document.querySelector(domSelectors.stop);
	ui.speak = document.querySelector(domSelectors.speak);
	ui.text = document.querySelector(domSelectors.text);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setVoices();
	setVoicesOptions();
	setSpeechSynthesis();
	setEventListeners();
}

init();
