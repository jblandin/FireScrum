(function() {
  'use strict';

  angular
    .module('app.auth')
    .directive('authForm', gzAuthForm);

  function gzAuthForm() {
    return {
      templateUrl: 'app/auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        submitAction: '&',
        error: '=',
        formTitle: '@',
        showName: '@'
      },
      transclude: true
    }
  }

  function AuthFormController() {
    var vm = this;

    vm.user = {
      email: '',
      password: '',
      name: ''
    };
  }

})();