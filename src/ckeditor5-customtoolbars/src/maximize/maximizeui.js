import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import maximizeIcon from '../../theme/icons/maximize.svg';
import MaximizeCommand from './MaximizeCommand';
import ESCCommand from './ESCCommand';

const MAXIMIZE = 'maximize';
const EscCOMMAND = 'EscCommand'; 
const CONTINUE = 'continue'; 
const MINIMZE = 'minimize'; 


export default class MaximizeUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {

		//console.log( 'MaximizeUI was initialized' );

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( MAXIMIZE, locale => {
			const view = new ButtonView( locale );
				// Create Maximize command.
				editor.commands.add( MAXIMIZE, new MaximizeCommand(this.editor,view) );
				editor.commands.add( EscCOMMAND, new ESCCommand(this.editor, view) );
				editor.commands.add( CONTINUE, new ESCCommand(this.editor,view) );
				editor.commands.add( MINIMZE, new ESCCommand(this.editor,view) );

				// Set the Ctrl+M keystroke.
				editor.keystrokes.set( 'CTRL+M', MAXIMIZE );
				editor.keystrokes.set( 'ESC', EscCOMMAND );


				const command = editor.commands.get( MAXIMIZE );
            	
				view.set( {
					label: t( 'Maximize' ),
					icon: maximizeIcon,
					keystroke: 'CTRL+M',
					tooltip: true
				} );
			
				view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
				// Execute command.
				this.listenTo( view, 'execute', () => editor.execute(MAXIMIZE) );

				return view;
		} );
		
	}
}
