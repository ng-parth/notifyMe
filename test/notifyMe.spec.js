    /**
 * Created by parth on 24/04/17.
 */

describe('notifyMe', function() {
    var _$rootScope, _notifyMeService, _$document;
    beforeEach(angular.mock.module('notifyMe'));
    beforeEach(inject(function($rootScope, notifyMe, $document) {
        _$rootScope = $rootScope;
        _notifyMeService = notifyMe;
        _$document = $document;
    }));
    afterEach(function() {
        // _$document.find('#notify-me-container').remove();
        // angular.copy(originalConfig, toastrConfig);
    });

    it('There should be no notifyContainer initially if no notification is opened.', function() {
        var size = _$document.find('#notify-me-container').length;
        var count = _notifyMeService.getActiveNotifs();
        expect(size).toBe(0);
        expect(count).toBe(0);
    });

    it('Verify one notification for each notification type.', function() {
        var title = 'This is notif title';
        var message = 'This is notif title';
        expect(_$document.find('#notify-me-container').length).toBe(0); //Works properly

        _notifyMeService.ofError(message, title);
        expect(_$document.find('#notify-me-container').length).toBe(1); // Works properly

        expect(_$document.find('.notif').length).toBe(1); //Fails

    });

    // Other test cases I can think of.
    it('Info notification should be auto dismissed after 90000ms.', function() {});
    it('No of Notifications should not exceed the limit.', function() {});
    it('Notification should be dismissed on closing it.', function() {});



});
