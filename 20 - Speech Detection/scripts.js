/**
 * Speech Detection - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.words - DOM selector for words
 * @property {Object} stateClasses - Default state class name(s)
 * @property {SpeechRecognition | null} recognition - Instance of SpeechRecognition to record speech
 * @property {HTMLParagraphElement | null} sentence - Paragraph used to collect recorded sentence(s)
 */
const app = {
	ui: {},
	domSelectors: {
		words: '[data-words]',
	},
	stateClasses: {},
	recognition: null,
	sentence: null,
};

/**
 * Get transcript and set it to paragraph
 * @param {SpeechRecognitionEvent} event
 * @returns {undefined}
 */
function setTranscript({ results }) {
	const transcript = Array.from(results)
		.map(([{ transcript }]) => transcript)
		.join('');

	app.sentence.textContent = transcript;

	if (!results[0].isFinal) return;

	setParagraph();
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { recognition } = app;

	recognition.addEventListener('result', setTranscript);
	recognition.addEventListener('end', setRecording);
}

/**
 * Start speech recognition recording
 * @returns {undefined}
 */
function setRecording() {
	app.recognition.start();
}

/**
 * Create and start an instance of speech recognition
 * @returns {undefined}
 */
function setSpeechRecognition() {
	window.SpeechRecognition ??= window.webkitSpeechRecognition;

	app.recognition = new SpeechRecognition();
	app.recognition.interimResults = true;

	setRecording();
}

/**
 * Create new paragraph with recently recorded sentence
 * @returns {undefined}
 */
function setParagraph() {
	app.sentence = document.createElement('p');

	app.ui.words.appendChild(app.sentence);
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.words = document.querySelector(domSelectors.words);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setParagraph();
	setSpeechRecognition();
	setEventListeners();
}

init();
