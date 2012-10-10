#HTML Source Editor - Aloha Plugin.

Load the plugin and configure the toolbar to show the component "htmlsource".
When clicking the button a dialog should be displayed for editing the source.


* Download the plugin and save it as /plugins/extra/htmlsource/
* Add "extra/htmlsource" to the list of plugins to load
* Adapt the Aloha Editor configuration for the toolbar:


```javascript
Aloha.settings = {
	toolbar: {
		tabs: [
			{
				label: 'tab.format.label'
			},
			{
				label: 'tab.insert.label'
			},
			{
				label: 'Actions',
				showOn: {
					scope: 'Aloha.continuoustext'
				},
				components: [['htmlsource']]
			}
		]
	}
 }
```

The "View HTML Source" button ("htmlsource") will be added to a new tab labeled "Actions". That tab will be on the 3rd position after the "Format" and "Insert" tab.