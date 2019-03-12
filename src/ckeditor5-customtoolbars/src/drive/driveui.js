import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import driveIcon from '../../theme/icons/drive.svg'
import DriveCommand from './driveCommand';
import Options from './options';

const DRIVE = 'drive';


export default class DriveUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		
	  var pickerApiLoaded = false;

	  function handleClientLoad() {
		  gapi.load("client:auth2");
		  gapi.load("picker", { callback: onPickerApiLoad });
	  }

	  function onPickerApiLoad() {
		  pickerApiLoaded = true;
	  }

	  
		const script = document.createElement('script');
		script.src = 'https://apis.google.com/js/api.js';
		script.id = 'googledrive';
	
		if(!document.getElementById(script.id))
		{
			console.log("Script Added");
			document.body.appendChild(script);
		}

		script.onload = () => {
			handleClientLoad();
		};

		
		//console.log( 'DriveUI was initialized' );

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( DRIVE, locale => {
			const view = new ButtonView( locale );

			
		// Create DRIVE command.
		editor.commands.add( DRIVE, new DriveCommand(this.editor,view) );

		// Set the Ctrl+D keystroke.
		editor.keystrokes.set( 'CTRL+D', DRIVE );


		const command = editor.commands.get( DRIVE );
            	
            view.set( {
                label: t( 'Upload from Google Drive' ),
				icon: driveIcon,
				keystroke: 'CTRL+D',
				tooltip: true
			} );
			
			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			// Execute command.
		
			this.optionobj = new Options(editor);

			this.listenTo( view, 'execute', () => editor.execute(DRIVE, this.optionobj) );

			return view;
		} );
		
	}
}
