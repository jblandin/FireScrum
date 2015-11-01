(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('planningPokerService', planningPokerService);

    planningPokerService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function planningPokerService($firebaseArray, firebaseDataService) {

        var service = {
            getAllPlanningPoker: getAllPlanningPoker,
            PlanningPoker: PlanningPoker
        };

        return service;

        ////////////

        function getAllPlanningPoker(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('planningPoker'));
        }

        function PlanningPoker() {
            this.name = '';
            this.owner = '';
        }
    }

})();