(function() {
    'use strict';

    angular
        .module('app.planningPoker')
        .controller('PlanningPokerController', PlanningPokerController);

    PlanningPokerController.$inject = ['$rootScope', 'partyService', 'user'];

    function PlanningPokerController($rootScope, partyService, user) {
        var vm = this;

        vm.parties = partyService.getPartiesByUser(user.uid);

        $rootScope.$on('logout', function() {
            vm.parties.$destroy();
        });
    }

})();
