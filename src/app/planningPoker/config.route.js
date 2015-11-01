(function() {
  'use strict';

  angular
    .module('app.planningPoker')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/planningpoker', {
      templateUrl: 'app/planningPoker/planningPoker.html',
      controller: 'PlanningPokerController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();
