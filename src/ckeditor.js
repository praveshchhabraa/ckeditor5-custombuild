/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

// The editor creator to use.
import ClassicEditorBase from './ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Maximize from './ckeditor5-customtoolbars/src/maximize';
import Minimize from './ckeditor5-customtoolbars/src/minimize'
import Dialog from './ckeditor5-customtoolbars/src/dialog';
import WordCount from './ckeditor5-customtoolbars/src/wordcount';
import Drive from './ckeditor5-customtoolbars/src/drive';
import Continue from './ckeditor5-customtoolbars/src/continue';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Underline,
	Paragraph,
	Maximize,
	Dialog,
	Minimize,
	WordCount,
	Drive,
	Continue
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'underline',
			'|',
			'maximize',
			'minimize',
			'|',
			'drive',
			'Continue'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en',
	maxword: 100,
	minword: 10,
	gdAllowedHtmlTags: 'div,p,span,i,em,b,strong,u,ul,ol,li',
	gdAllowedMimeTypes: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.google-apps.document',
	questionlabel: 'Please write an essay on the topic selected. You can type directly into the box, or you can paste text from another source.',
	clientId: '606662169925-d1nina39aght307e62ia9jngh7q5kse5.apps.googleusercontent.com',
	ariadescribedby: 'test',
	isrequired: false // Default value
};
