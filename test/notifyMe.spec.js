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
        // console.log('Doc: ', _$document);
        // var size = _$document.find('#notify-me-container').length;
        expect(0).toBe(0);
    });

    // Other test cases I can think of.
    it('Info notification should be auto dismissed after 90000ms.', function() {});
    it('No of Notifications should not exceed the limit.', function() {});
    it('Notification should be dismissed on closing it.', function() {});



});
