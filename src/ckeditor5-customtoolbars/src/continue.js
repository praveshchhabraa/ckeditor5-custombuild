
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ContinueUI from './continue/continueui';

export default class Continue extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ContinueUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Continue';
	}
}
