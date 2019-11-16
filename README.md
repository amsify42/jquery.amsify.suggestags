Jquery Suggestags
------------------------
This is a simple JQuery plugin for input tags with auto complete suggestion.

```js
$('input').amsifySuggestags();
```

## npm installation
```cmd
npm i suggestags
```


# Table of Contents
1. [Simple](#simple-tags)
2. [Default Value](#default-value)
3. [Suggestions](#suggestions)
4. [Suggestions Through Ajax](#suggestions-through-ajax)
5. [White List](#white-list)
6. [Custom Stylings](#custom-stylings)
7. [Callbacks and Events](#callbacks-and-events)
8. [Tag Limit](#tag-limit)
9. [Refresh Destroy](#refresh-destroy)
10. [More Settings](#more-settings)
11. [Programmatically](#programmatically)

## Simple Tags
For simple initialization
```html
<input type="text" class="form-control" name="country"/>
```
```js
$('input[name="country"]').amsifySuggestags();
```
## Default Value
If input is already having value separated by comma, it will load the tags by default
```html
<input type="text" class="form-control" name="country" value="India,UAE,Nepal"/>
```
```js
$('input[name="country"]').amsifySuggestags();
```

## Suggestions
List of values can be passed to get the suggestions.
```html
<input type="text" class="form-control" name="country"/>
```
```js
$('input[name="country"]').amsifySuggestags({
	suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh']
});
```
List if objects can also be set to have tag/value pair.
```html
<input type="text" class="form-control" name="color"/>
```
```js
$('input[name="color"]').amsifySuggestags({
	suggestions: [
					{tag: 'Black', value: 1},
					{tag: 'White', value: 2},
					{tag: 'Red', value: 3},
					{tag: 'Blue', value: 4},
					{tag: 'Green', value: 5},
					{tag: 'Orange', value: 6}
				]
});
```
Input will store `value` separated by comma like this
```html
<input type="text" class="form-control" name="1,2,3,4,5,6"/>
```
**Note:** While setting the default value for the input, set actual value separated by comma not tag names.

## Suggestions Through Ajax
We can also get suggestions through Ajax
```html
<input type="text" class="form-control" name="country"/>
```
```js
$('input[name="country"]').amsifySuggestags({
	suggestionsAction : {
		url: 'http://www.site.com/suggestions'
	}
});
```

Ajax method type will be **GET**, structure of request data you will receive is
```json
{
	"existing": ["one", "two", "three"],
	"term": "something"
}
```
**existing** is an array of already loaded tags and **term** is the string you are trying to search.
<br/>
The success response should at least contain **suggestions** key and its value should be of type list/array:
```json
{
	"suggestions": ["four", "five", "six"]
}
```
<br/><br/>
You can also add ajax callbacks to this option
```js
$('input[name="country"]').amsifySuggestags({
	suggestionsAction : {
		url: 'http://www.site.com/suggestions',
		beforeSend : function() {
			console.info('beforeSend');
		},
		success: function(data) {
			console.info('success');
		},
		error: function() {
			console.info('error');
		},
		complete: function(data) {
			console.info('complete');
		}
	}
});
```
**Note**: **success** and **complete** callbacks does not directly override the original ajax callbacks, rather it gets called after original ones are executed.


## White List
This option simply does not allow any other inputs other than from suggestions.
```html
<input type="text" class="form-control" name="country"/>
```
```js
$('input[name="country"]').amsifySuggestags({
	suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
	whiteList: true
});
```

## Custom Stylings
```html
<input type="text" class="form-control" name="country"/>
```
For setting default class for tags, you can pass this setting
```js
$('input[name="country"]').amsifySuggestags({
	suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
	whiteList: true,
	defaultTagClass: 'badge'
});
````
We can pass list of classes, colors or backgrounds through settings
```js
$('input[name="country"]').amsifySuggestags({
	suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
	whiteList: true,
	classes: ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info']
});
```
Each class will apply to each suggestion tag through their corresponding keys. We can also pass backgrounds and colors.
```js
$('input[name="country"]').amsifySuggestags({
	suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
	whiteList: true,
	backgrounds: ['blue', 'green', 'red', 'orange', '#424242'],
	colors: ['white', 'black', 'white', 'black', 'white'],
});
```

## Callbacks and Events
We can set callbacks on add/remove tag elements
```js
$('input[name="country"]').amsifySuggestags({
	afterAdd : function(value) {
		console.info(value); // Parameter will be value
	},
	afterRemove : function(value) {
		console.info(value); // Parameter will be value
	},
});
```

or we can also subscribe to add/remove events
```js
$('input[name="country"]').on('suggestags.add', function(e){
	// Do something after adding tag
});
$('input[name="country"]').on('suggestags.change', function(e){
	// Do something while add/remove tag
});
$('input[name="country"]').on('suggestags.remove', function(e){
	// Do something before removing tag
});
```

## Tag Limit
We can also set tags limit
```js
$('input[name="country"]').amsifySuggestags({
	tagLimit: 5
});
```

## Refresh Destroy
For refreshing the values, you can use
```js
var params = {
	// Make sure you have parameters which used during first execution
};
$('input[name="country"]').amsifySuggestags(params, 'refresh');
```
For destroying the instance, you can do
```js
$('input[name="country"]').amsifySuggestags({}, 'destroy');
```

## More Settings
### selectOnHover
```js
$('input[name="country"]').amsifySuggestags({
	selectOnHover: false
});
```
It will not select the suggested tag value when the mouse hover the suggestion item. By default the value is `true`
### noSuggestionMsg
This will show message when there is no suggested item appears matching the input.
```js
$('input[name="country"]').amsifySuggestags({
	noSuggestionMsg: 'Enter to generate new tag'
});
```
### showAllSuggestions
This will show all the suggestion item on input focus. By default this is `false`
```js
$('input[name="country"]').amsifySuggestags({
	showAllSuggestions: true
});
```

## Programmatically
This is also one of the approach you can use this plugin.
### Initilization
You can initialize by creating an instance of `AmsifySuggestags` and passing selector to it.
```js
amsifySuggestags = new AmsifySuggestags($('input[name="country"]'));
amsifySuggestags._init();
```
### Settings
You need to set it before initialization and you can use all the setting options shown in previous approach.
```js
amsifySuggestags._settings({
	suggestions: ['Black', 'White', 'Red', 'Blue', 'Green', 'Orange']
})
amsifySuggestags._init();
````
### Add/Remove Tag
You can call these methods to add/remove tag with instance of `AmsifySuggestags`
```js
amsifySuggestags.addTag('Purple');
amsifySuggestags.removeTag('Red');

```
### Refresh Destroy
You can call these methods to refresh/destroy
```js
amsifySuggestags.refresh();
amsifySuggestags.destroy();

```
**Note**: This approach only works for single selector element not for multiple elements having same selector.
<br/>
For making it work for selector having multiple elements, you can do something like this:
```js
$('.tags-input').each(function(){
	amsifySuggestags = new AmsifySuggestags($(this));
	amsifySuggestags._init();
});
```