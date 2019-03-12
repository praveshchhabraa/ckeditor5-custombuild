/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module editor-classic/classiceditoruiview
 */

import CustomBoxedEditorUIView from '../../ckeditor5-ui/src/customboxededitoruiview';
import InlineEditableUIView from '@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview';
import CustomInlineEditableUIView from '../../ckeditor5-ui/src/custominlineeditableuiview';
import StickyPanelView from '@ckeditor/ckeditor5-ui/src/panel/sticky/stickypanelview';
import ToolbarView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview';
import CustomDivView from '../../ckeditor5-ui/src/customdivview';

import uid from '@ckeditor/ckeditor5-utils/src/uid';

import '../theme/classiceditor.css';

/**
 * Classic editor UI view. Uses an inline editable and a sticky toolbar, all
 * enclosed in a boxed UI view.
 *
 * @extends module:ui/editorui/boxed/boxededitoruiview~BoxedEditorUIView
 */
export default class ClassicEditorUIView extends CustomBoxedEditorUIView {
	/**
	 * Creates an instance of the classic editor UI view.
	 *
	 * @param {module:utils/locale~Locale} locale The {@link module:core/editor/editor~Editor#locale} instance.
	 */
	constructor(editor, locale ) {
		super( locale );

		/**
		 * Sticky panel view instance. This is a parent view of a {@link #toolbar}
		 * that makes toolbar sticky.
		 *
		 * @readonly
		 * @member {module:ui/panel/sticky/stickypanelview~StickyPanelView}
		 */
		this.stickyPanel = new StickyPanelView( locale );

		/**
		 * Toolbar view instance.
		 *
		 * @readonly
		 * @member {module:ui/toolbar/toolbarview~ToolbarView}
		 */
		this.toolbar = new ToolbarView( locale );

		/**
		 * Editable UI view.
		 *
		 * @readonly
		 * @member {module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView}
		 */
		// this.editable = new InlineEditableUIView( locale );

		// created custom editable ui view to override aria-label from control
		this.editable = new CustomInlineEditableUIView( locale );


		//-----------------------------Start Custom Code Add for CommonApp---------------------------------------

		// const ariaLabelUidForWordCount = uid();
		this.maxword = editor.config.get( 'maxword' );
		this.minword = editor.config.get( 'minword' );
		this.e = editor;
		if(this.minword == "")
		{
			this.minword=0;
		}

		this.wordCount = new CustomDivView( locale );
		this.wordCount.text =  '0/' + this.maxword + " words";

		this.wordCount.extendTemplate( {
			attributes: {
				class: 'wordCount',
				'aria-live': "polite",
				'atomic': "true",
				'role': "status"
			},
		} );


		const ariaLabelUidForMaxMin = uid();
		this.wordMinMax = new CustomDivView( locale );
		this.wordMinMax.text = `Min: ${ this.minword } / Max: ${ this.maxword }`;
		this.wordMinMax.extendTemplate( {
			attributes: {
				class: 'wordMinMax',
				id: `minmax_${ ariaLabelUidForMaxMin }`
			},

		} );


		const ariaLabelUidForrichtext = uid();
		this._richtexteditor = this._createVoiceLabel( ariaLabelUidForrichtext );
		this._richtexteditor.text =  `Rich Text Editor, Press Alt+0 for help`;

		this.editable.extendTemplate( {
			attributes: {
				'aria-labelledby': editor.config.get( 'ariadescribedby' ),
				'aria-describedby': editor.config.get( 'ariadescribedbyForErrorGroup' ) + " " + `minmax_${ ariaLabelUidForMaxMin }` + " " + `ck-editor__aria-label_${ ariaLabelUidForrichtext }`
			},
		} );

		const isrequired = editor.config.get('isrequired').toString();
		let requiredvalue='false';
		if(isrequired && isrequired === 'true'){
			requiredvalue='true'
		}

		this.editable.extendTemplate( {
			attributes: {
				'aria-required': requiredvalue
			}
		});

		this.ErrorMsg = new CustomDivView( locale );
		this.ErrorMsg.text = ``;
		this.ErrorMsg.extendTemplate( {
			attributes: {
				class: 'errorword'
			},
		} );


		this.wordCountTop = new CustomDivView( locale );
		this.wordCountTop.text =  '0/' + this.maxword + " words";
		this.wordCountTop.extendTemplate( {
			attributes: {
				class: 'word-count-top',
				'aria-live': "polite",
				'atomic': "true",
				'role': "status"
			},
		} );

		this.wordMinMaxTop = new CustomDivView( locale );
		this.wordMinMaxTop.text = `Min: ${ this.minword } / Max: ${ this.maxword }`;
		this.wordMinMaxTop.extendTemplate( {
			attributes: {
				class: 'word-min-max-top',
				id: `minmax_${ ariaLabelUidForMaxMin }`
			},
		} );

		this.LabelTop = new CustomDivView( locale );
		this.LabelTop.text = editor.config.get( 'questionlabel' );
		this.LabelTop.extendTemplate( {
			attributes: {
				class: 'questiontext'
			},
		} );


		//Set the asterisk if required
		//TODO: Need to a find a better way to this, with limited knowledge following the documentation @ https://ckeditor.com/docs/ckeditor5/latest/api/module_ui_label_labelview-LabelView.html
		if(editor.config.get( 'isrequired' )){
			this.LabelTop.render();
			this.LabelTop.element.innerHTML = `${this.LabelTop.text}<span class="has-text-red">*</span>`;
		}
		//-----------------------------End Custom Code Add for CommonApp---------------------------------------
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		// Set toolbar as a child of a stickyPanel and makes toolbar sticky.
		this.stickyPanel.content.add( this.toolbar );

		this.top.add( this.stickyPanel );
		this.main.add( this.editable );


		//Custom Added for CommonApp
		this.toplabels.add( this.LabelTop );
		this.toplabels.add( this.wordMinMaxTop );
		this.toplabels.add( this.wordCountTop );
		this.toplabels.add( this.ErrorMsg );
		this.wordsummary.add( this.wordMinMax );
		this.wordsummary.add( this.wordCount );
		this.main.add(this._richtexteditor);
		//End

	}

	/**
	 * @inheritDoc
	 */
	get editableElement() {
		return this.editable.element;
	}


	//Custom Added for CommonApp

	/**
	 * Creates a voice label view instance.
	 *
	 * @private
	 * @returns {module:ui/label/labelview~LabelView}
	 */
	_createVoiceLabel( ariaLabelUid ) {
		const t = this.t;
		const voiceLabel = new CustomDivView();
		voiceLabel.extendTemplate( {
			attributes: {
				id: `ck-editor__aria-label_${ ariaLabelUid }`,
				class: 'ck-voice-label'
			}
		} );

		return voiceLabel;
	}
}
