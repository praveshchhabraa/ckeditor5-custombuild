import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import minimizeIcon from '../../theme/icons/minimize.svg'
const MINIMZE = 'minimize';


export default class MinimizeUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {

		//console.log( 'ContinueUI was initialized' );

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( MINIMZE, locale => {
			const view = new ButtonView( locale );

			view.set( {
                label: t( 'Minimize' ),
				icon: minimizeIcon,
				keystroke: 'CTRL+M',
				tooltip: true,
				isVisible: false
			} );
			
		
			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute(MINIMZE) );

			return view;
		} );
		
	}
}
