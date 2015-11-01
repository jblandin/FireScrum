(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', 'firebaseDataService'];

  function authService($rootScope, $firebaseAuth, firebaseDataService) {
    var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

    var currentUser;

    firebaseAuthObject.$onAuth(function(auth) {
      currentUser = auth;
      observeLogin(auth);
    });

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      saveUserInfo: saveUserInfo,
      sendWelcomeEmail: sendWelcomeEmail
    };

    return service;

    ////////////

    function register(user) {
      return firebaseAuthObject.$createUser(user);
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user);
    }

    function observeLogin(auth) {
      if (auth != null) {
        var onlineRef = firebaseDataService.users.child(auth.uid).child('online');
        var connectedRef = firebaseDataService.infoConnected;
        connectedRef.on('value', function (snap) {
          if (snap.val() === true) {
            // We're connected (or reconnected)!  Set up our presence state and
            // tell the server to set a timestamp when we leave.
            onlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
            onlineRef.set(true);
          }
        });
      }
      return auth;
    }

    function logout() {
      $rootScope.$broadcast('logout');
      // gestion de la mise à jour du timestamp à la déconnexion
      var onlineRef = firebaseDataService.users.child(currentUser.uid).child('online');
      onlineRef.set(Firebase.ServerValue.TIMESTAMP);
      firebaseAuthObject.$unauth();
    }

    function isLoggedIn() {
      return currentUser;
    }

    function sendWelcomeEmail(emailAddress) {
      firebaseDataService.emails.push({
        emailAddress: emailAddress
      });
    }

    function saveUserInfo(uid, user) {
      firebaseDataService.users.child(uid).set({
        userName: user.name
      });
    }

  }

})();