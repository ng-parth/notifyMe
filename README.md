# notifyMe

**notifyMe** is a angular 1.x module which can be used to show notification messages within a SPA. The notifications will be used to display information which give the user a feedback, but do not disturb them at the current work.
The notification will appear on top right side of the screen.


## APIs to consume:
Following are the APIs which you can use in your project after injecting this module in your angular application.

**Info notification:**
`notifyMe.ofInfo(msg, title);`

**Warning notification:**
`notifyMe.ofWarning(msg, title);`

**Error notification:**
`notifyMe.ofError(msg, title);`

**Clear all notification:**
`notifyMe.clear();`

### Building notifyMe

To build notifyMe module, you will need [node](http://nodejs.org) installed.

```
npm install -g gulp
npm install
```
At this point the dependencies have been installed for this module.
- Run the build by `gulp build`
- Run the test by `gulp test`(TBD)
- Check the docs by running
```
gulp buildDocs
gulp runDocs
```
and then open http://localhost:8083 in your browser.

### Follow 3 Easy Steps to use this module.

1. Build the module to generate 2 files in `build` folder named `notify-me.css` and `notifyMe.js`..
```
gulp build
```

2. Include these 2 files in your project after including jquery, angular and angular-animate libraries.
  - Link the CSS file as  `<link href="notify-me.css" rel="stylesheet"/>`
  - Link the JS file as  `<script src="motifyMe.js"></script>`
  - Inject `notifyMe` while creating your angular app as `angular.module('yourApp', ['notifyMe', 'otherDIs'])`. Now you can use the `notifyMe` service throughout your application by injecting the service in your controllers.

3. use notifyMe apis to display notifications for info, warning or error
	```js
	// Display an info notification
	notifyMe.ofInfo('Hello world! This is a info notification message.', 'Info notification title');
	```

### Other Options

```js
// Display warning notification
notifyMe.ofWarning('Warning: Cigarette smoking is injurious to health.', 'Hazardous warning')

// Display an error notification
notifyMe.ofError('Array index out of bound.', 'Erroneous code!')

// Clear all notification
NotifyMe.clear()

```
### Close Button

The cross on top right corner of notification will dismiss the current notification.
This is available in all types of notifications.

### Auto-dismiss/Timeouts
At present, only `info` notification are dismissed automatically after 5000ms.
This can be customised by overriding the timeout parameter in config file.

