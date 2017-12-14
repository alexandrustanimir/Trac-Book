angular.module('myApp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        console.log(response);
        if (response.data.success) {
            vm.message = 'Congratulations! You are now signed in.';
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.username;
        }
      }).catch(function(error) {
        console.log(error);
      })

    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  }

   
}
