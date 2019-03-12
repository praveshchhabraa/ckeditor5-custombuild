const ValidateWordCountApiMixin = {
	
	getwordcount() {
        
        
        this.htmlFromEditor = this.data.get();
        this.wordLen = 0;
        this.charLen=0;


        this.htmlFromEditor = this.htmlFromEditor.replace(/(\r\n|\n|\r)/gm, " ")
                                                .replace(/^\s+|\s+$/g, "")
                                                .replace("&nbsp;", " ")
                                                .replace(/<p>/g,"")
                                                .replace(/<\/p>/g," ").trim();
        //console.log(this.htmlFromEditor);

        this.tmp = document.createElement("div");
        this.tmp.innerHTML = this.htmlFromEditor;

        if (this.tmp.textContent == "" && typeof this.tmp.innerText == "undefined") {
            this.htmlFromEditor = "";
        }
        else {
            this.htmlFromEditor = this.tmp.textContent || this.tmp.innerText;
        }

        this.words = this.htmlFromEditor.split(/\s+/);

        for (var wordIndex = this.words.length - 1; wordIndex >= 0; wordIndex--) {
            if (this.words[wordIndex].match(/^([\s\t\r\n]*)$/)) {
                this.words.splice(wordIndex, 1);
            }
        }

        this.wordLen = this.words.length;
        this.charLen = this.htmlFromEditor.length;

        return '{ "NumberOfWord": "' + this.wordLen + '" , "NumberOfChar": "' + this.charLen + '"}'; 
	}

};

export default ValidateWordCountApiMixin;