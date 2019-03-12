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
		* Open Google doc selecter window
		* Import the document
		* Remove unsupported tags from the document
		* Set the data into Editor
