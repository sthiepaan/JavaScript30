/**
 * Canvas - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.canvas - DOM selector for canvas
 * @property {Object} stateClasses - Default state class name(s)
 * @property {Object} brush - Default state of a brush
 * @property {number} brush.hue - Brush color hue
 * @property {number} brush.size - Brush size
 * @property {string} brush.type - Brush type
 * @property {boolean} brush.isGrowing - Brush growing direction
 * @property {CanvasRenderingContext2D | null} context - Canvas drawing context
 * @property {Object} position - Position state of a mouse cursor
 * @property {number | null} position.x - X coordinate
 * @property {number | null} position.y - Y coordinate
 * @property {boolean} isDrawing - Enable/disable drawing on a canvas
 */
const app = {
	ui: {},
	domSelectors: {
		canvas: '[data-canvas]',
	},
	stateClasses: {},
	brush: {
		hue: 0,
		size: 100,
		type: 'round',
		isGrowing: true,
	},
	context: null,
	position: {
		x: null,
		y: null,
	},
	isDrawing: false,
};

/**
 * Clear canvas from user drawings
 * @returns {undefined}
 */
function clearCanvas() {
	const { context, ui } = app;

	context.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
}

/**
 * Set mouse position into `app.position {object}`
 * @param {number} x
 * @param {number} y
 * @returns {undefined}
 */
function setMousePosition(x, y) {
	app.position.x = x;
	app.position.y = y;
}

/**
 * Set drawing status into `app.isDrawing {boolean}`
 * @param {boolean} isDrawing
 * @returns {undefined}
 */
function setDrawing(isDrawing) {
	app.isDrawing = isDrawing;
}

/**
 * Disable drawing
 * @returns {undefined}
 */
function drawStop() {
	setDrawing(false);
}

/**
 * Draw within context of a canvas and modify brush color and size
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function draw({ offsetX, offsetY }) {
	const { context, position, isDrawing } = app;

	if (!isDrawing) return;

	context.beginPath();
	context.moveTo(position.x, position.y);
	context.lineTo(offsetX, offsetY);
	context.stroke();
	setMousePosition(offsetX, offsetY);
	setBrushColor();
	setBrushSize();
}

/**
 * Enable drawing
 * @param {MouseEvent} event
 * @returns {undefined}
 */
function drawStart({ offsetX, offsetY }) {
	setDrawing(true);
	setMousePosition(offsetX, offsetY);
}

/**
 * Set event listeners
 * @returns {undefined}
 */
function setEventListeners() {
	const { ui } = app;

	ui.canvas.addEventListener('mousedown', drawStart);
	ui.canvas.addEventListener('mousemove', draw);
	ui.canvas.addEventListener('mouseup', drawStop);
	ui.canvas.addEventListener('mouseout', drawStop);
	ui.canvas.addEventListener('dblclick', clearCanvas);
}

/**
 * Set brush drawing shape
 * @returns {undefined}
 */
function setBrushType() {
	const { brush, context } = app;

	context.lineJoin = brush.type;
	context.lineCap = brush.type;
}

/**
 * Set brush size with its growing direction
 * @returns {undefined}
 */
function setBrushSize() {
	const { brush, context } = app;

	if (brush.size <= 1 || brush.size >= 100) {
		brush.isGrowing = !brush.isGrowing;
	}

	context.lineWidth = brush.size;
	brush.size += brush.isGrowing ? 1 : -1;
}

/**
 * Set brush color using HSL color model
 * @returns {undefined}
 */
function setBrushColor() {
	app.context.strokeStyle = `hsl(${app.brush.hue % 360}, 100%, 50%)`;
	app.brush.hue += 1;
}

/**
 * Set canvas context for drawing
 * @returns {undefined}
 */
function setCanvasContext() {
	app.context = app.ui.canvas.getContext('2d');
}

/**
 * Set canvas dimensions to size of window
 * @returns {undefined}
 */
function setCanvasSize() {
	const { ui } = app;

	ui.canvas.width = window.innerWidth;
	ui.canvas.height = window.innerHeight;
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.canvas = document.querySelector(domSelectors.canvas);
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setCanvasSize();
	setCanvasContext();
	setBrushColor();
	setBrushSize();
	setBrushType();
	setEventListeners();
}

init();
