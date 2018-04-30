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
4. [White List](#white-list)
5. [Callbacks and Events](#callbacks-and-events)
6. [Refresh Destroy](#refresh-destroy)

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
	$('input[name="country"]').amsifySuggestags({}, 'destory');
```
