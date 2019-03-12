import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class WordCountPlugin extends Plugin {
	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;
		const maxword = Number(editor.config.get( 'maxword' ));
		const minword = Number(editor.config.get( 'minword' ));
        editor.model.document.on( 'change', () => {
			const response=JSON.parse(this.editor.ui.editor.getwordcount());
			const totalword = Number(response.NumberOfWord);
			const totalchar = Number(response.NumberOfChar);
			const spanError = "<span aria-hidden='true' class='ck-long-error'>cancel</span>";
			//changed the DOM node index because we have removed voice label from DOM.
			editor.ui.view.wordsummary._items[1].text= totalword + "/" + maxword + " words";
			editor.ui.view.toplabels._items[2].text= totalword + "/" + maxword + " words";
			editor.ui.view.toplabels._items[3].element.classList.add("ck-hidden");

			if(totalchar > 7900)
			{
				editor.ui.view.toplabels._items[3].element.classList.remove("ck-hidden");
				editor.ui.view.toplabels._items[3].text= "Sorry, we can't keep an answer that long. Please shorten it."
			}
			else if(totalword < minword)
			{
				editor.ui.view.toplabels._items[3].element.classList.remove("ck-hidden");
				editor.ui.view.toplabels._items[3].element.innerHTML= spanError + "Add "+ (minword - totalword) +  " or more words to meet the " + minword + " word minimum."
			}
			else if(totalword > maxword)
			{
				editor.ui.view.toplabels._items[3].element.classList.remove("ck-hidden");
				editor.ui.view.toplabels._items[3].element.innerHTML= spanError + "Remove "+ (totalword-maxword) +" or more words to meet the " + maxword + " word maximum."
			}


        });

	}
}
