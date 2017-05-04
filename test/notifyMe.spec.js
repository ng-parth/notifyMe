    /**
 * Created by parth on 24/04/17.
 */

describe('notifyMe', function() {
    var _$rootScope, _notifyMeService, _$document, _notifyMeConfig, _$timeout;
    beforeEach(angular.mock.module('notifyMe'));
    beforeEach(inject(function($rootScope, notifyMe, $document, notifyMeConfig, $timeout) {
        _$rootScope = $rootScope;
        _notifyMeService = notifyMe;
        _$document = $document;
        _notifyMeConfig = notifyMeConfig;
        _$timeout = $timeout;
    }));
    afterEach(function() {
        _$document.find('#notify-me-container').remove();
    });
    function _createNotif(ofType, options) {
        var title = 'This is notification title';
        var message = 'Message';
        options = options || {};
        var notif = _notifyMeService[ofType](message, title, options);
        _$rootScope.$digest();
        return notif;
    }

    describe(':: Checks for default behaviour : ', function() {
        it('There should be no notifyContainer initially if no notification is opened.', function() {
            expect(_$document.find('#notify-me-container').length).toBe(0);
            expect(_notifyMeService.getActiveNotifs()).toBe(0);
            _createNotif('ofInfo');
            expect(_$document.find('#notify-me-container').length).toBe(1);
            expect(_notifyMeService.getActiveNotifs()).toBe(1);
        });

        it('Verify one notification for each notification type.', function() {
            expect(_$document.find('.notif.error').length).toBe(0);
            expect(_$document.find('.notif.info').length).toBe(0);
            expect(_$document.find('.notif.warning').length).toBe(0);
            expect(_notifyMeService.getActiveNotifs()).toBe(0);

            _createNotif('ofError');
            expect(_notifyMeService.getActiveNotifs()).toBe(1);
            expect(_$document.find('.notif').length).toBe(1);
            expect(_$document.find('.notif.error').length).toBe(1);

            _createNotif('ofWarning');
            expect(_notifyMeService.getActiveNotifs()).toBe(2);
            expect(_$document.find('.notif').length).toBe(2);
            expect(_$document.find('.notif.warning').length).toBe(1);

            _createNotif('ofInfo');
            expect(_notifyMeService.getActiveNotifs()).toBe(3);
            expect(_$document.find('.notif').length).toBe(3);
            expect(_$document.find('.notif.info').length).toBe(1);
        });

        it('If multiple error/info/warning, appropriate no of DOMElement should exist.', function() {
            _createNotif('ofError');
            _createNotif('ofInfo');
            expect(_$document.find('.notif').length).toBe(2);
            expect(_$document.find('.notif.info').length).toBe(1);
            expect(_$document.find('.notif.error').length).toBe(1);

            _createNotif('ofError');
            _createNotif('ofInfo');
            _createNotif('ofError');
            expect(_$document.find('.notif').length).toBe(5);
            expect(_$document.find('.notif.info').length).toBe(2);
            expect(_$document.find('.notif.error').length).toBe(3);
        });

        it('No of Notifications should not exceed the maxlimit.', function() {
            var maxLimit = _notifyMeConfig.maxNotif;
            expect(_$document.find('.notif').length).toBe(0);
            expect(_$document.find('.notif.warning').length).toBe(0);
            for (var i = 0; i < maxLimit + 5 ; i++) {
                _createNotif('ofWarning');
            }
            expect(_$document.find('.notif').length).toBe(maxLimit);
            expect(_$document.find('.notif.warning').length).toBe(maxLimit);
            expect(_notifyMeService.getActiveNotifs()).toBe(maxLimit)
        });

        it('Notification should be dismissed on closing it.', function() {
            expect(_$document.find('.notif.warning').length).toBe(0);
            var notification = _createNotif('ofWarning');
            expect(_$document.find('.notif.warning').length).toBe(1);
            notification.close();
            _$rootScope.$digest();
            expect(_$document.find('.notif.warning').length).toBe(0);
        });

        it('All notification should be dismissed on clearing the notifications.', function() {
            expect(_$document.find('.notif').length).toBe(0);
            expect(_notifyMeService.getActiveNotifs()).toBe(0);
            _createNotif('ofWarning');
            _createNotif('ofError');
            _createNotif('ofError');
            _createNotif('ofInfo');
            _createNotif('ofWarning');
            expect(_$document.find('.notif').length).toBe(5);
            expect(_notifyMeService.getActiveNotifs()).toBe(5);
            _notifyMeService.clear();
            expect(_$document.find('.notif').length).toBe(0);
            expect(_$document.find('#notify-me-container').length).toBe(0);
            expect(_notifyMeService.getActiveNotifs()).toBe(0);
        });

        it('Info notification should be autodismissed after 90sec by default.', function() {
            expect(_$document.find('.notif.info').length).toBe(0);
            _createNotif('ofInfo');
            expect(_$document.find('.notif.info').length).toBe(1);
            _$timeout.flush(_notifyMeConfig.timeout);
            expect(_$document.find('.notif.info').length).toBe(0);
        });

        it('By default, all notifications should have close button.', function() {
            expect(_$document.find('.notif.info .close').length).toBe(0);
            expect(_$document.find('.notif.error .close').length).toBe(0);
            expect(_$document.find('.notif.warning .close').length).toBe(0);
            _createNotif('ofWarning');
            _createNotif('ofError');
            _createNotif('ofInfo');
            expect(_$document.find('.notif.info .close').length).toBe(1);
            expect(_$document.find('.notif.error .close').length).toBe(1);
            expect(_$document.find('.notif.warning .close').length).toBe(1);

        });

        it('should bind correct title and message as passed while creating notification', function() {
            var title = 'You have received a new notification';
            var message = 'You order no 12123 has been shipped and will be delivered shortly';
            var notification = _notifyMeService.ofInfo(message, title);
            _$rootScope.$digest();
            var notifDOM = _$document.find('#info0');
            var domTitle = notifDOM.find('.title').html();
            var domMsg = notifDOM.find('.message').html();
            expect(domTitle).toBe(title);
            expect(domMsg).toBe(message);
        })

    });

    describe(':: Checks for custom config behaviour: ', function() {
        it('Any notification should be autodismissed if autodismiss and timeout > 0 options are given.', function() {
            expect(_$document.find('.notif.error').length).toBe(0);
            var options = {autoDismiss: true, timeout: 10000};
            _createNotif('ofError', options);
            expect(_$document.find('.notif.error').length).toBe(1);
            _$timeout.flush(options.timeout);
            expect(_$document.find('.notif.error').length).toBe(0);
        });

        it('Notification should not have close button if closeable option is false.', function(){
            var options = {closeable: false};
            var notification = _createNotif('ofWarning', options);
            expect(_$document.find('#' + notification.notifId).length).toBe(1);
            expect(_$document.find('#' + notification.notifId + ' .close').length).toBe(0);
        });

    });

});
