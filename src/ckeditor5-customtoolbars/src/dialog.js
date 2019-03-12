import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DialogUI from './dialog/dialog'

export default class Dialog extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ DialogUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'DialogUI';
	}
}
