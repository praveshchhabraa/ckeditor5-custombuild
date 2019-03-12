import Command from '@ckeditor/ckeditor5-core/src/command';
import $ from 'jquery';
import Options from './options';

export default class DriveCommand extends Command {

	constructor(editor, view) {
		super(editor);
		this.e = editor;
		this.view = view;
		this.tempdata = "";
	}
	execute(options = {}) {
		var auth = "";
		var editor = this.e;

		//console.log("First Time Clicked");
		const response = JSON.parse(options.Editor.ui.editor.getwordcount());
		const totalword = Number(response.NumberOfWord);

		if (totalword > 0) {
			let result = confirm("Replace current answer? \n By proceeding, we will replace your current answer with text from the Google document you select");

			if (result)
				LoadClient();
		} else {
			//options.Editor.setData("<p></p>");
			LoadClient();
		}


		var gdocDelete = function (fileId) {
			//console.log("gdocdelete");
			var deleteFileAction = gapi.client.drive.files.delete({
				fileId: fileId
			}).then(function (response) {

				},
				function (response) {

				});

		}

		var contentFilter = function (htmlData) {

			//create a jquery object to hold the data
			var $data = $(htmlData).wrapAll('<div />').first().parent();
			//Remove Comments
			$data.find('a[id*="cmnt"]').closest('div').remove();

			var l = $(htmlData).find(':not(' + options.Editor.config.get('gdAllowedHtmlTags') + ')').length;
			$data.find(':not(' + options.Editor.config.get('gdAllowedHtmlTags') + ')').remove();

			//wrap italics, underline, and bold text with relevant stylings.
			//Google uses inline styling font-weight:700 -> b, font-style:italics -> i, text-decoration:underline -> u
			//Internet explorer injects a space after the : so we have to search both with and without it.
			$data.find('[style*="font-weight:700"],[style*="font-weight: 700"]').wrap('<b />')
				//Remove styling to prevent duplicate <strong> tags in ckeditor.
				.attr('style', function (i, style) {
					return style.replace(/font-weight:.?700/g, '');
				});
			$data.find('[style*="font-style:italic"],[style*="font-style: italic"]').wrap('<i />')
				.attr('style', function (i, style) {
					return style.replace(/font-style:.?italic/g, '');
				});
			$data.find('[style*="text-decoration:underline"],[style*="text-decoration: underline"]').wrap('<u />')
				.attr('style', function (i, style) {
					return style.replace(/text-decoration:.?underline/g, '');
				});

			if (l > 0) {
				let result = confirm("Not all file content supported! \n Some items used in your document (such as tables, images, advanced formatting) are not supported here. Remove that formatting during the copy?");
				if (result)
					options.Editor.setData($data.html());
			} else if ($data.text() === '') {
				alert("No text found");
			} else {
				options.Editor.setData($data.html());
			}

			return false;
		}


		var gdocImport = function (fileId, deleteAfter) {
			//console.log("gdocImport");
			gapi.client.drive.files.export({
				fileId: fileId,
				mimeType: 'text/html'
			}).then(
				function (response) {
					if (deleteAfter) {
						gdocDelete(fileId);
					}

					var rawHtml = contentFilter(response.body);
					if (rawHtml != false)
						options.Editor.setData(rawHtml);
				},
				//Failure to load file
				function (response) {
					if (deleteAfter) {
						gdocDelete(fileId);
					}
					cleanup({
						content: null,
						success: false,
						code: response.status
					});
				}
			);
		}

		//picker callback function to handle initial loading of the picker, canceling the picker, and selecting a document.
		var pickerCallback = function (callbackObj) {
			console.log("pickercallback");
			//Do nothing when canceled.
			if (callbackObj.action == google.picker.Action.CANCEL) {
				return;
			}
			//Load document into CKEditor when picked.
			if (callbackObj.action == google.picker.Action.PICKED) {

				var selectDoc = callbackObj.docs[0];

				if (selectDoc.mimeType != 'application/vnd.google-apps.document') {

					gapi.client.drive.files.copy({
						fileId: selectDoc.id,
						mimeType: 'application/vnd.google-apps.document'
					}).then(function (response) {
							gdocImport(response.result.id, true);
						},
						function (response) {
							//unable to copy
							cleanup({
								content: null,
								code: response.status,
								success: false
							});
						}
					);
				} else {
					gdocImport(selectDoc.id, false);
				}
			}
		}

		var cleanup = function (response) {
			console.log(response);
			options.CallBackFrom = "Error";
			options.tempdata = "";
		}

		var loadPicker = function () {
			console.log("loadPicker");
			gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
			var pickerView = new google.picker.View(google.picker.ViewId.DOCUMENTS);

			pickerView.setMimeTypes(options.Editor.config.get('gdAllowedMimeTypes'));

			var pickerBuilder = new google.picker.PickerBuilder().
			addView(pickerView).
			setOAuthToken(auth.access_token).
			setOrigin(window.location.origin).
			setRelayUrl(window.location.origin).
			enableFeature(google.picker.Feature.NAV_HIDDEN).
			setCallback(pickerCallback);

			pickerBuilder.setSelectableMimeTypes(options.Editor.config.get('gdAllowedMimeTypes'));

			options.Editor.picker = pickerBuilder.build();
			options.Editor.picker.setVisible(true);
		}

		function LoadClient() {
			console.log("LoadClient");
			gapi.auth2.init({
				client_id: options.Editor.config.get('clientId'),
				scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
				discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
				fetch_basic_profile: false
			}).then(
				function (response) {
					//console.log(response);
					response.signIn()
						.then(function (response) {
							auth = gapi.client.getToken();
							loadPicker();
						});
				},
				function (response) {
					//console.log("Error");
					console.log(response);
				});

		}
	}
}