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