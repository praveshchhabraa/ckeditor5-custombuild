
import Command from '@ckeditor/ckeditor5-core/src/command';
import global from '@ckeditor/ckeditor5-utils/src/dom/global';
import $ from 'jquery';


export default class MaximizeCommand extends Command {

	constructor(editor, view) {
		super(editor);
		this.e = editor;
		this.view = view;
	}
	execute(options = {}) {


		if (this.e.sourceElement.nextSibling.classList.contains("ckeditorfullsize")) {
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
			this.e.sourceElement.nextSibling.children[4].children[0].style = "";
			document.getElementsByTagName('html')[0].style.overflow = ''
			this.e.ui.view.toplabels._parentElement.classList.add("ck-hidden")
			this.e.ui.view.wordsummary._parentElement.classList.remove("ck-hidden")
		}
		else {
			this.e.ui.view.toplabels._parentElement.classList.remove("ck-hidden")
			this.e.ui.view.wordsummary._parentElement.classList.add("ck-hidden")

			this.e.ui.view.toolbar.items._items[8].element.classList.remove("ck-hidden");
			this.e.ui.view.toolbar.items._items[4].element.classList.add("ck-hidden");
			this.e.ui.view.toolbar.items._items[5].element.classList.remove("ck-hidden");
			this.e.ui.view.toolbar.items._items[5].element.classList.remove("ck-on"); //fix for PTS-1461


			this.e.sourceElement.nextSibling.classList.add("ckeditorfullsize");

			//Add Aria role and Label
			this.e.sourceElement.nextSibling.setAttribute("role", "dialog");
			this.e.sourceElement.nextSibling.setAttribute("aria-modal", "true");

			// Set Aria live
			document.getElementById(this.e.sourceElement.nextSibling.getAttribute('aria-labelledby')).setAttribute("aria-live", "polite");
			// Set Title
			document.getElementById(this.e.sourceElement.nextSibling.getAttribute('aria-labelledby')).innerText = "Text area maximized. To minimize the text box, press ESC.";

			//var fullstyle="display: block; z-index: 999; position: fixed; left: 0px; top: 0px; width: 100%;";
			//this.e.sourceElement.nextSibling.style=fullstyle;
			document.getElementsByTagName('html')[0].style.overflow = 'hidden';

			this.e.ui.view.main._items[0].editableElement.focus();

			this.e.ui.view.main._items[0].editableElement.onkeydown = function (value) {
				if (value.srcElement.parentNode.parentNode.classList.contains("ckeditorfullsize")) {
					if (value.keyCode === 9 || value.keyCode === 27) {
						value.srcElement.focus();
						value.preventDefault();
					}
				}
			}
			var ed = this.e;
			for (let entry of this.e.ui.view.toolbar.element.getElementsByClassName("ck-button")) {
				entry.onkeydown = function (value) {
					if (ed.ui.view.element.classList.contains("ckeditorfullsize")) {
						if (value.keyCode === 13 || value.keyCode === 37 || value.keyCode === 38 ||
							value.keyCode === 39 || value.keyCode === 40 || (value.keyCode === 9 && value.shiftKey === false)) {
							//Do Nothing
						}
						else {
							value.srcElement.focus();
							value.preventDefault();
						}
					}
				}
			}

			// $( window ).resize(function() {
			// 	if(ed.ui.view.element.classList.contains("ckeditorfullsize"))
			// 			{
			// 				var heightvalue = window.innerHeight - ed.sourceElement.nextSibling.children[1].offsetHeight - 40;
			// 				var stylevalue= "height: " + heightvalue + "px !important; resize:none;";
			// 				ed.sourceElement.nextSibling.children[3].children[0].style=stylevalue;
			// 			}
			// });

			// var heightvalue = window.innerHeight - this.e.sourceElement.nextSibling.children[1].offsetHeight - 40;
			//  var stylevalue= "height: " + heightvalue + "px !important; resize:none;";
			//  this.e.sourceElement.nextSibling.children[3].children[0].style=stylevalue;

		}
	}

}
