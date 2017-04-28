/**
 * Created by parth on 15/04/17.
 */

angular.module('notifyMe')
    .constant('notifyMeConfig', {
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