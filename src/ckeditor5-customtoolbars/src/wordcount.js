
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WordCountPlugin from './wordcount/wordcountplugin'

export default class WordCount extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ WordCountPlugin ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'WordCountPlugin';
	}
}
