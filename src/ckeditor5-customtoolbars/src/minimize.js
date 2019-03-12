
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import MinimizeUI from './minimize/minimizeui';

export default class Minimize extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ MinimizeUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Minimize';
	}
}
