/**
 * Webcam Fun - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.player - DOM selector for player
 * @property {string} domSelectors.canvas - DOM selector for canvas
 * @property {string} domSelectors.strip - DOM selector for strip
 * @property {string} domSelectors.snap - DOM selector for snap
 * @property {Object} stateClasses - Default state class name(s)
 * @property {CanvasRenderingContext2D | null} context - Canvas drawing context
 */
const app = {
	ui: {},
	domSelectors: {
		player: '[data-player]',
		canvas: '[data-canvas]',
		strip: '[data-strip]',
		snap: '[data-snap]',
	},
	stateClasses: {},
	context: null,
};

/**
 * Set video snapshot and create a downloadable preview
 * @returns {undefined}
 */
function setStripImage() {
	const { ui } = app;
	const data = ui.canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');

	link.href = data;
	link.innerHTML = `<img src="${data}" alt="">`;

	link.setAttribute('download', 'image');
	ui.strip.insertBefore(link, ui.strip.firstChild);
}

/**
 * Play sound of taking a photo
 * @returns {undefined}
 */
function playPhotoSound() {
	const { ui } = app;

	ui.snap.currentTime = 0;

	ui.snap.play();
}

/**
 * Custom filter to shift color layers
 * @param {ImageData} pixels
 * @returns {ImageData}
 */
function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0]; // RED
		pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
		pixels.data[i - 550] = pixels.data[i + 2]; // BLUE
	}

	return pixels;
}

/**
 * Set custom image filter
 * @returns {undefined}
 */
function setImageFilter() {
	const { context, ui } = app;
	const imageData = context.getImageData(0, 0, ui.canvas.width, ui.canvas.height);

	context.putImageData(rgbSplit(imageData), 0, 0);
}

/**
 * Draw video with a filter within context of a canvas
 * @returns {undefined}
 */
function draw() {
	const { context, ui } = app;

	setInterval(() => {
		context.drawImage(ui.player, 0, 0, ui.canvas.width, ui.canvas.height);
		setImageFilter();
	}, 16);
}

/**
 * Set canvas dimensions to size of window
 * @returns {undefined}
 */
function setCanvasSize() {
	const { ui } = app;

	ui.canvas.width = ui.player.videoWidth;
	ui.canvas.height = ui.player.videoHeight;
}

/**
 * Set video source and play it
 * @returns {Promise<undefined>}
 */
async function setVideoPlayer() {
	app.ui.player.srcObject = await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: true,
	});

	await app.ui.player.play();
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.player.addEventListener('canplay', draw);
}

/**
 * Set canvas context for video
 * @returns {undefined}
 */
function setCanvasContext() {
	app.context = app.ui.canvas.getContext('2d');
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.player = document.querySelector(domSelectors.player);
	ui.canvas = document.querySelector(domSelectors.canvas);
	ui.strip = document.querySelector(domSelectors.strip);
	ui.snap = document.querySelector(domSelectors.snap);
}

/**
 * Initialize script
 * @returns {Promise<undefined>}
 */
async function init() {
	setUIElements();
	setCanvasContext();
	setEventListeners();
	await setVideoPlayer();
	setCanvasSize();
	window.takePhoto = () => {
		playPhotoSound();
		setStripImage();
	};
}

init();
