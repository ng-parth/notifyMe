/**
 * Created by parth on 15/04/17.
 */

angular.module('notifyMe')
    .constant('notifyMeConfig', {
        timeout: 90000,
        closeable: true,
        maxNotif: 5,
        containerId: 'notify-me-container'
    });