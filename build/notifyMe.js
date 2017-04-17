/**
 * Created by parth on 15/04/17.
 */

angular.module('notifyMe', ['ngAnimate'])
    .controller('demoCtrl', ['notifyMe', function(NotifyMeService) {
        this.btnText = 'Click to see notification.';

        this.notifyError = function() {
            NotifyMeService.info('Hey bro, new error', 'Welcome');
        };
    }]);
/**
 * Created by parth on 15/04/17.
 */

angular.module('notifyMe')
    .constant('notifyMeConfig', {
        timeout: 5000,
        closeable: true,
        maxNotif: 5,
        containerId: 'notify-me-container'
    });
/**
 * Created by parth on 17/04/17.
 */

angular.module('notifyMe')
    .directive('notifyMe', [function() {
        var notifyMeTemplate = `
        <div class="notif"
             id="{{notif.notifId}}"
             ng-class="notif.type"
             ng-repeat="notif in notifications track by $index">
            <div class="title" ng-bind="notif.title" ng-if="notif.title"></div>
            <div class="message"ng-bind="notif.message" ng-if="notif.message"></div>
            <div class="close" ng-click="notif.close(notif)">&times;</div>
        </div>`;


        return {
            restrict: 'A',
            scope: {
                notifications: '='
            },
            template: notifyMeTemplate
        }
    }]);
/**
 * Created by parth on 17/04/17.
 */

angular.module('notifyMe')
    .service('notifyMe',
        ['notifyMeConfig', '$rootScope', '$compile', '$timeout', '$log',
            function(notifyMeConfig, $rootScope, $compile, $timeout, $log) {
                var notifications = [];
                var index = 0;
                var container;
                var containerEl;
                this.error = _error;
                this.info = _info;
                this.warning = _warning;
                this.clear = _clear;


                function Notification(type, msg, title) {
                    this.type = type;
                    this.message = msg;
                    this.title = title;
                    this.close = _clear.bind(this, this);
                }

                function _error(msg, title) {
                    var notif = new Notification('error', msg, title);
                    _makeNotification(notif);
                }
                function _info(msg, title) {
                    var notif = new Notification('info', msg, title);
                    _makeNotification(notif);
                    notif.dismissPromise = $timeout(notif.close, _getOptions().timeout);
                }
                function _warning(msg, title) {
                    var notif = new Notification('warning', msg, title);
                    _makeNotification(notif);
                }
                function _clear(notif) {
                    if (!notif) {
                        notifications = [];
                        return;
                    }
                    var notifIdx = notifications.indexOf(notif);
                    notifications.splice(notifIdx, 1);
                    if (notif.type == 'info') {
                        $timeout.cancel(notif.dismissPromise);
                    }
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
                    notif.notifId = notif.type + index;
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

}]);