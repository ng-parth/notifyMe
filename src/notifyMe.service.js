/**
 * @ngdoc service
 * @name notifyMe.notifyMe
 * @description
 *
 * This service contains apis to create beautiful notifications.
 *
 */

angular.module('notifyMe')
    .service('notifyMe',
        ['notifyMeConfig', '$rootScope', '$compile', '$timeout', '$log',
            function(notifyMeConfig, $rootScope, $compile, $timeout, $log) {
                var notifications = [];
                var index = 0;
                var container;
                var containerEl;
                /**
                 * @ngdoc
                 * @name notifyMe.notifyMe#ofError
                 * @methodOf notifyMe.notifyMe
                 *
                 * @description
                 * Method to create ERROR notification.
                 * @example
                 * notifyMe.ofError(message, title, options);
                 * @param {string} msg Message to be shown in notification
                 * @param {string} title Title of notification
                 * @param {object} options Params to customise this notification. Valid options for this parameters are:
                 *
                 *  - `autoDismiss`: Option to clear notification automatically after given timeout. By default true for info notification, false for other notification.
                 *  - `closeable`: Option to make notification closeable: Defaults to true.
                 *  - `timeout`: Timer in ms to make notifications dismiss. Defaults to 90000ms. 0ms will close the notification instantenously.
                 */

                this.ofError = _error;

                /**
                 * @ngdoc
                 * @name notifyMe.notifyMe#ofInfo
                 * @methodOf notifyMe.notifyMe
                 *
                 * @description
                 * Method to create INFO notification.
                 * @example
                 * notifyMe.ofInfo(message, title, options);
                 * @param {string} msg Message to be shown in notification
                 * @param {string} title Title of notification
                 * @param {object} options Params to customise this notification. Valid options for this parameters are:
                 *
                 *  - `autoDismiss`: Option to clear notification automatically after given timeout. By default true for info notification, false for other notification.
                 *  - `closeable`: Option to make notification closeable: Defaults to true.
                 *  - `timeout`: Timer in ms to make notifications dismiss. Defaults to 90000ms. 0ms will close the notification instantenously.
                 */

                this.ofInfo = _info;

                /**
                 * @ngdoc
                 * @name notifyMe.notifyMe#ofWarning
                 * @methodOf notifyMe.notifyMe
                 *
                 * @description
                 * Method to create WARNING notification.
                 * @example
                 * notifyMe.ofWarning(message, title, options);
                 * @param {string} msg Message to be shown in notification
                 * @param {string} title Title of notification
                 * @param {object} options Params to customise this notification. Valid options for this parameters are:
                 *
                 *  - `autoDismiss`: Option to clear notification automatically after given timeout. By default true for info notification, false for other notification.
                 *  - `closeable`: Option to make notification closeable: Defaults to true.
                 *  - `timeout`: Timer in ms to make notifications dismiss. Defaults to 90000ms. 0ms will close the notification instantenously.
                 */

                this.ofWarning = _warning;

                /**
                 * @ngdoc
                 * @name notifyMe.notifyMe#clear
                 * @methodOf notifyMe.notifyMe
                 *
                 * @description
                 * Dismisses or clears notifications.
                 * If notification object is passed, it dismisses that notification
                 * else it will clear all notifications.
                 * @example
                 * notifyMe.clear([notifObj]);
                 * @param {notificationObject} notifObj (Optional) Notification object which needs to be cleared.
                 */

                this.clear = _clear;


                function Notification(type, msg, title, options) {
                    this.type = type;
                    this.message = msg;
                    this.title = title;
                    this.close = _clear.bind(this, this);
                    this.options = options;
                }

                function _error(msg, title, options) {
                    var notif = new Notification('error', msg, title, options);
                    _makeNotification(notif);
                }
                function _info(msg, title, options) {
                    var notif = new Notification('info', msg, title, options);
                    _makeNotification(notif);
                }
                function _warning(msg, title, options) {
                    var notif = new Notification('warning', msg, title, options);
                    _makeNotification(notif);
                }
                function _clear(notif) {
                    if (!notif) {
                        for (var i = 0; i < notifications.length; i++ ) {
                            if (angular.isDefined(notifications[0].dismissPromise)) {
                                $timeout.cancel(notifications[0].dismissPromise)
                            }
                        }
                        notifications.splice(0, notifications.length);
                        return;
                    }
                    var notifIdx = notifications.indexOf(notif);
                    if (angular.isDefined(notif.dismissPromise)) {
                        $timeout.cancel(notif.dismissPromise);
                    }
                    notifications.splice(notifIdx, 1);
                }
                function _getOptions() {
                    return angular.extend({}, notifyMeConfig);
                }

                function _makeNotification(notif) {
                    if (notifications.length >= notifyMeConfig.maxNotif) {
                        $log.error('Max limit reached');
                        return
                    }
                    if (!container && !containerEl) {
                        _createContainer();
                    }
                    notif.options = notif.options || {};
                    var optionsOverride = angular.extend(_getOptions(), _cleanupOptions(notif.options));
                    _setNotifOptions(notif, optionsOverride);

                    notif.notifId = notif.type + index;
                    if (notif.autoDismiss) {
                        notif.dismissPromise = $timeout(notif.close, notif.timeout);
                    }
                    notifications.push(notif);
                    index++;
                }

                function _createContainer() {
                    container = angular.element('<div notify-me notifications="notifications"></div>');
                    container.attr('id', _getOptions().containerId);

                    var scope = $rootScope.$new();
                    scope.notifications = notifications;
                    var containerEl = $compile(container)(scope);
                    var target = angular.element('body');
                    if (!target || !target.length) {
                        throw 'Target for notification doesn\'t exist';
                    }
                    if (container && target) {
                        target.append(containerEl)
                    }
                }

                function _cleanupOptions(options) {
                    var excludeOptions = ['containerId', 'maxNotifs', 'type'];
                    for (var i = 0; i < excludeOptions.length; i++) {
                        delete options[excludeOptions[i]];
                    }
                    return options;
                }

                function _setNotifOptions(notif, opts) {
                    delete notif.options;
                    notif.timeout = opts.timeout;
                    notif.autoDismiss = angular.isDefined(opts.autoDismiss) ? opts.autoDismiss : opts.type[notif.type].autoDismiss;
                    notif.closeable = angular.isDefined(opts.closeable) ? opts.closeable : opts.type[notif.type].closeable;

                }
            }
        ]
    );