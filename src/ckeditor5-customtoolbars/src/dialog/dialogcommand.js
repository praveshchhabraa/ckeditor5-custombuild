
import Command from '@ckeditor/ckeditor5-core/src/command';


export default class DialogCommand extends Command {
	constructor(editor) {
		super(editor);
	}
	execute( options = {} ) {
		window['angularComponentRef'].zone.run(() => {
			window['angularComponentRef'].component.HelpDialogBox();
		}); 
	}
			
}
