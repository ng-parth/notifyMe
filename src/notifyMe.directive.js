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