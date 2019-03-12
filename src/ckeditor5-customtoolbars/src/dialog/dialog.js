import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DialogCommand from './dialogcommand';

const DIALOG = 'dialog';


export default class DialogUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {

		//console.log( 'ContinueUI was initialized' );

		const editor = this.editor;

		editor.commands.add( DIALOG, new DialogCommand(this.editor) );

		// Set the Ctrl+M keystroke.
		editor.keystrokes.set( 'ALT+0', DIALOG );
	}
}
