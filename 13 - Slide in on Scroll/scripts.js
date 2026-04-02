/**
 * Slide in on Scroll - Script
 * @author Damian Szczypka <info@damianszczypka.com>
 */

/**
 * Application settings
 * @namespace
 * @property {Object} ui - Collection of application UI elements
 * @property {Object} domSelectors - Default DOM selector(s)
 * @property {string} domSelectors.media - DOM selector for media
 * @property {Object} stateClasses - Default state class name(s)
 * @property {string} stateClasses.isActive - Class name for active media
 * @property {IntersectionObserver | null} watcher - Instance of IntersectionObserver to watch media
 * @property {Object} watcherEntryThreshold - Default IntersectionObserver entries threshold(s)
 * @property {number} watcherEntryThreshold.none - Threshold for fully-hidden entry
 * @property {number} watcherEntryThreshold.half - Threshold for half-visible entry
 */
const app = {
	ui: {},
	domSelectors: {
		media: '[data-media]',
	},
	stateClasses: {
		isActive: 'active',
	},
	watcher: null,
	watcherEntryThreshold: {
		none: 0,
		half: 0.5,
	},
};

/**
 * Toggle visibility of media called by watcher
 * @param {IntersectionObserverEntry[]} watcherEntries
 * @returns {undefined}
 */
function toggleMediaVisibility(watcherEntries) {
	const { stateClasses, watcherEntryThreshold } = app;

	watcherEntries.forEach(({ intersectionRatio, isIntersecting, target }) => {
		if (isIntersecting && intersectionRatio >= watcherEntryThreshold.half) {
			target.classList.add(stateClasses.isActive);
		}

		if (!isIntersecting) {
			target.classList.remove(stateClasses.isActive);
		}
	});
}

/**
 * Set watcher instance to observe all medias
 * @returns {undefined}
 */
function setMediaWatcher() {
	const { ui, watcherEntryThreshold: watcherMediaThreshold } = app;
	const watcher = new IntersectionObserver(toggleMediaVisibility, {
		threshold: [watcherMediaThreshold.none, app.watcherEntryThreshold.half],
	});

	ui.medias.forEach((media) => watcher.observe(media));
}

/**
 * Collect UI elements into `app.ui {Object}`
 * @returns {undefined}
 */
function setUIElements() {
	const { ui, domSelectors } = app;

	ui.medias = Array.from(document.querySelectorAll(domSelectors.media));
}

/**
 * Initialize script
 * @returns {undefined}
 */
function init() {
	setUIElements();
	setMediaWatcher();
}

init();
