
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DriveUI from './drive/driveui';

export default class Drive extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ DriveUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Drive';
	}
}
