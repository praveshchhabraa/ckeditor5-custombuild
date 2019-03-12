import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import CustomButtonView from '../../../ckeditor5-ui/src/custombuttonview';

const CONTINUE = 'continue';


export default class ContinueUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {

		//console.log( 'ContinueUI was initialized' );

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( CONTINUE, locale => {
			const view = new CustomButtonView( locale );

	
            view.set( {
				label: t( 'Continue' ),
				buttontext: 'Continue',
				isVisible: false,
				withbuttontext: true
			} );
			
		
			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute(CONTINUE) );

			return view;
		} );
		
	}
}
