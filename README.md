Amsify Jquery Suggestags
------------------------
This is a simple JQuery plugin for input tags with auto complete suggestion.

```js
$('input').amsifySuggestags();
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

Ajax method type will be **POST**, dataType will be **json** and structure of request data you will receive is
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
We can pass list of classes, colors or backgrounds through settings
```html
<input type="text" class="form-control" name="country"/>
```
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
	// Do something while adding tag
});
$('input[name="country"]').on('suggestags.remove', function(e){
	// Do something while removing tag
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
