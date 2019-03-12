
import Command from '@ckeditor/ckeditor5-core/src/command';


export default class ESCCommand extends Command {

	constructor(editor, view) {
		super(editor);
		this.e = editor;
		this.view = view;
	}
	execute(options = {}) {

		if (this.e.sourceElement.nextSibling.classList.contains("ckeditorfullsize")) {

			//TODO: remove Duplication of Code
			//Add Aria role and Label
			this.e.sourceElement.nextSibling.setAttribute("role","application");
			this.e.sourceElement.nextSibling.removeAttribute("aria-modal");

			// Set Title
			document.getElementById(this.e.sourceElement.nextSibling.getAttribute('aria-labelledby')).innerText = "Text area minimized."; // TODO: temporary, need confirmation from Product

			this.e.ui.view.toolbar.items._items[8].element.classList.add("ck-hidden");
			this.e.ui.view.toolbar.items._items[4].element.classList.remove("ck-hidden");
			this.e.ui.view.toolbar.items._items[5].element.classList.add("ck-hidden");

			this.view.element.classList.remove("ck-on");
			this.view.element.classList.add("ck-off");

			this.e.sourceElement.nextSibling.classList.remove("ckeditorfullsize");
			this.e.sourceElement.nextSibling.style = "";
			this.e.sourceElement.nextSibling.children[3].children[0].style = "";
			document.getElementsByTagName('html')[0].style.overflow = ''
			this.e.ui.view.toplabels._parentElement.classList.add("ck-hidden")
			this.e.ui.view.wordsummary._parentElement.classList.remove("ck-hidden")
		}
	}

}
