# notifyMe

**notifyMe** is a angular 1.x module which can be used to show notification messages within a SPA. The notifications will be used to display information which give the user a feedback, but do not disturb them at the current work.
The notification will appear on top right side of the screen.

## Demo
You can check the demo at [https://ng-parth.github.io/notifyMe/](https://ng-parth.github.io/notifyMe/)

## Installation

Use bower to add this package:
```
$ bower install notify-me --save
```
## Usage
notify-me is very simple to use. It comes with three types of notification messages:
```js
// Display an info notification
notifyMe.ofInfo('Hello world! This is a info notification message.', 'Info notification title');
```
![alt text](img/notifyMe.ofInfo.png "Info notification")
```js
// Display warning notification
notifyMe.ofWarning('Warning: Cigarette smoking is injurious to health.', 'Hazardous warning');
```
![alt text](img/notifyMe.ofWarning.png "Warning notification")
```js
// Display an error notification
notifyMe.ofError('Array index out of bound.', 'Erroneous code!');
```
![alt text](img/notifyMe.ofError.png "Error notification")

## Generate and access docs for notifyMe
Support for documentation is added using [ngDocs (built on Dgeni)](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation). So you can follow the comment style given there and generate the documentation.
  The documantation is also available at [https://ng-parth.github.io/notifyMe/docs](https://ng-parth.github.io/notifyMe/docs)

Altenatively, to generate the docs:
```
npm install -g gulp
npm install
gulp buildDocs
gulp runDocs
```
and then open http://localhost:8083 in your browser to access the notifyMe docs.

## Running Tests
To execute all the test, use:
```
gulp test
```

## Customization notifications
If you want to customise notification, you can do it by modifying `notifyMeConfig` in config of your angular app:

```javascript
app.config(function(notifyMeConfig) {
  angular.extend(notifyMeConfig, {
        timeout: 90000,
        maxNotif: 5,
        containerId: 'notify-me-container',
        type: {
            info: {
                closeable: true,
                autoDismiss: true
            },
            error: {
                closeable: true,
                autoDismiss: false
            },
            warning: {
                closeable: true,
                autoDismiss: false
            }
        }
  });
});
```

You can override the above defaults with your values.

* **timeout** Delay in ms after which the notification auto-dismisses.
* **maxNotif**: Maximum number of notification that can be opened at once.
* **containerId**: The id of the notification container which will be appended to body to show notification.
* **type.closeable**: This property set the weather the notification of this particular type will be closeable or not.
* **type.autoDismiss**: This property set the weather the notification of this particular type will be auto-dismissed or not.


## APIs:
Following are the APIs which you can use in your project after injecting this module in your angular application.

**Notification class**
Notification is a class with following properties.
- `notifId` : Unique id for this notification.
- `type` : Type of notification
- `message` : Notification message
- `title` : Notification title
- `close` : Close function to dismiss the notification
- `options` : Notification options

    **options**
    The options contains key-value pairs for customizing the notification. It can accept only following keys.
    - `closeable` : boolean | default: true. This option controls weather you want the notification closeable ot not
    - `autoDismiss` :  boolean | default: false. This option controls weather the notification will be auto-dismissed.
    - `timeout` : time in ms | default: 90000. This options set the timespan after which the the notification will be auto-dismissed.
    - *NOTE:* `autoDismiss` and `timeout` both are required to auto-dismiss notification. If `timeout` is set to 0, it will set the delay to infinity, so that notification wont be auto-dismissed.

**Info notification:**
`notifyMe.ofInfo(msg, title, [options(optional)]);`
returns `notificationObj`

**Warning notification:**
`notifyMe.ofWarning(msg, title, [options(optional)]);`
returns `notificationObj`

**Error notification:**
`notifyMe.ofError(msg, title, [options(optional)]);`
returns `notificationObj`

**Clear all notification:**
`notifyMe.clear([notificationObj(optional)]);`


### Close Button

The cross on top right corner of notification will dismiss the current notification.
This is available in all types of notifications. Customise using `closeable` params in `options` while triggering the notification.

### Auto-dismiss/Timeouts
At present, only `info` notification are dismissed automatically after 90000ms.
This can be customised by overriding the timeout parameter in config file.
This can also be customised using `timeout` and `autoDismiss` params in options while triggering the notifications.
INFO and ERROR notification can also be made autodismissable by setting `autoDismiss` property to `true` in options while creating notification.
   *Note:* Setting `timeout` to 0 with `autoDismiss` to `true` will dismiss the notification automatically.
