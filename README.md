# CKEditor 5 - Custom Build by Pravesh Chhabra

CKEditor 5 is distributed as [four ready-to-use rich text editor builds](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#available-builds) which you can [install from npm](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installation.html#npm).

You can also [customize the existing builds](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html) or build your own editors and features by using the [CKEditor 5 Framework](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/overview.html).

## Documentation

See:

* [Architecture](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/architecture/intro.html)
* [Creating custom builds](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html) for how to customize the build (configure and rebuild the editor bundle).
* [Creating custom Plugin](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/plugins.html)
* [Integrating Google Sign-In using listeners](https://developers.google.com/identity/sign-in/web/listeners)
* [Google Sign-in Sample](https://developers.google.com/api-client-library/javascript/samples/samples)
* [Google Doc API](https://developers.google.com/docs/api/quickstart/js)


## Features
In this Custom Build, we provided below new custome features:
* Google Drive Integration
* Minimize / Maximize
* Word Count
* Angular Application Integration ( Call Angular side developed function from editor)

## Sample 

## How to Create Google Dirve Integration Custom Plugin

In CkEditor 5, one Plugin is divided into below two parts:
* UI : Where we can add button in which is displayed on the editor
```js
editor.ui.componentFactory.add(DRIVE, locale => {
			const view = new ButtonView(locale);
			// Create DRIVE command.
			editor.commands.add(DRIVE, new DriveCommand(this.editor, view));

			// Set the Ctrl+D keystroke.
			editor.keystrokes.set('CTRL+D', DRIVE);

			const command = editor.commands.get(DRIVE);

			view.set({
				label: t('Upload from Google Drive'),
				icon: driveIcon,
				keystroke: 'CTRL+D',
				tooltip: true
			});

			view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
			// Execute command.
			this.optionobj = new Options(editor);
			this.listenTo(view, 'execute', () => editor.execute(DRIVE, this.optionobj));
			return view;
		}
```
* Command : Where we can write set of code, which is execute by UI click or by keystroke.

	* For google drive integration we follow below steps:
	
		* Load Google client and get auth token
			```js
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
			```
		* Open Google doc selecter window
			```js
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
			```
		* Import the document
			```js
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
			```
		* Remove unsupported tags from the document and Set the data into Editor
			```js
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
			```
