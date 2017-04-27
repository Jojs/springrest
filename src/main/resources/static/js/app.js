(function(angular) {
  'use strict';
angular.module('jojs', ['jojs.auth', 'jojs.Address', 'jojs.Person', 'jojs.Company', 'jojs.User', 'ngResource', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
        .run(['$rootScope', '$location', 'authProvider', function ($rootScope, $location, authProvider) {
            $rootScope.$on('$routeChangeStart', function (event) {

                if (!authProvider.isLoggedIn() && $location.$$path != '/welcome') {
                  // console.log('DENY : Redirecting to Login');
                  event.preventDefault();
                  $location.path('welcome');
                }
                else {
                  if (authProvider.isLoggedIn() && $location.$$path == '/welcome')
                  {
                      $location.path('/');
                  }
                  // console.log('ALLOW');
                }
            });
        }])
        .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/frontend/companyindex/companies.html'
            }).when('/companies', {
                templateUrl: '/frontend/companyindex/companies.html'
            }).when('/companies/:companyId', {
                templateUrl: '/frontend/companyindex/company.html'
            }).when('/addresses', {
                templateUrl: '/frontend/companyindex/addresses.html'
            }).when('/addresses/:addressId', {
                templateUrl: '/frontend/companyindex/address.html'
            }).when('/people', {
                templateUrl: '/frontend/companyindex/people.html'
            }).when('/people/:personId', {
                templateUrl: '/frontend/companyindex/person.html'
            }).when('/welcome', {
                templateUrl: '/frontend/public/welcome.html'
            }).otherwise({
                redirectTo: '/companies'
            });
    }])
    .controller('jojsNavigationController', function ($rootScope, $scope, $location, $http, $uibModal, authProvider) {
      $scope.navigateTo = function (path) {
            $location.path(path);
      };
      var $ctrl = this;

      $ctrl.animationsEnabled = true;

      $ctrl.openModal = function (size, templateUrl, controller) {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          templateUrl: templateUrl,
          controller: controller,
          controllerAs: '$ctrl',
          size: size
        });
      };

      $rootScope.openComponentModal = function (modalComponent) {
          var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            component: modalComponent
          });
      };

      $rootScope.authenticate = function(callback) {
          $http.get('user').then(function(success) {
            if (success.data.name) {
              $rootScope.authenticated = true;
              authProvider.setUser(success.data.name);
            } else {
              $rootScope.authenticated = false;
              authProvider.setUser(null);
            }
            callback && callback();
          }, function(error) {
            $rootScope.authenticated = false;
              authProvider.setUser(null);
            callback && callback();
          });
        }
        $rootScope.authenticate();

      $scope.logout = function() {
        $http.post('logout', {}).finally(function() {
          $rootScope.authenticated = false;
          authProvider.setUser(null);
          $location.path("welcome");
        });
      }

      $rootScope.login = function() {
          $ctrl.openModal(null, '/frontend/auth/login.html', 'jojsLoginController')
          // $ctrl.openComponentModal('jojsLoginComponent')
      };
      $rootScope.signup = function() {
          $ctrl.openModal(null, '/frontend/auth/signup.html', 'jojsSignupController')
          // $ctrl.openComponentModal('jojsSignupComponent')
      };
    })
   .controller('JojsIndexController', function($scope, $http){
       $http.get('/').then(function(success) {
           $scope.index = success.data;
       }, function(error){});
   })
   .controller('JojsCompaniesController', function($scope, $http, Company, Person, Address) {
       $http.get('/companies').then(function(success) {
           var companies = [];
           angular.forEach(success.data._embedded.companies, function(value, key) {
               this.push(new Company(value, Person, Address));
            }, companies);
            $scope.companies = companies;
       }, function(error){});
   })
   .controller('JojsCompanyController', function($scope, $http, Company, Person, Address, $routeParams) {
       $http.get('/companies/' + $routeParams.companyId).then(function(success) {
           $scope.company = new Company(success.data, Person, Address);
       }, function(error){});
   })
   .controller('JojsAddressesController', function($scope, $http, Address){
       $http.get('/addresses').then(function(success) {
          var addresses = [];
          angular.forEach(success.data._embedded.addresses, function(value, key) {
              this.push(new Address(value));
          }, addresses);
           $scope.addresses = addresses;
       }, function(error){});
   })
   .controller('JojsAddressController', function($scope, $http, $routeParams, Address){
       $http.get('/addresses/' + $routeParams.addressId).then(function(success) {
           $scope.address = new Address(success.data);
       }, function(error){});
   })
   .controller('JojsPeopleController', function($scope, $http, Person, Address){
       $http.get('/people').then(function(success) {
           var people = [];
           angular.forEach(success.data._embedded.people, function(value, key) {
               this.push(new Person(value, Person, Address));
           }, people);
           $scope.people = people;
       }, function(error){});
   })
   .controller('JojsPersonController', function($scope, $http, $routeParams, Person, Address) {
       $scope.person = new Person(null, Address);
       $scope.person.load($routeParams.personId);
   })
   .controller('JojsPersonCreateController', function($scope, $http, Person){
       this.error = false;
       $scope.person = new Person();
       this.createPerson = function() {
           $scope.person.create();
       };
   })
   .controller('jojsLoginController', function($rootScope, $scope, $location, $http, $uibModalInstance, User) {
       this.error = false;
       var $ctrl = this;
       $scope.credentials = {};

       $ctrl.ok = function () {
         $uibModalInstance.close({$value: 'ok'});
       };

       $ctrl.cancel = function () {
         $uibModalInstance.close({$value: 'cancel'});
       };

       $ctrl.close = function () {
         $uibModalInstance.close({$value: 'cancel'});
       };
       $ctrl.login = function() {
           var req = {
            method: 'POST',
            url: 'login',
            headers: {
              'Content-Type': "application/x-www-form-urlencoded"
            },
            params: $scope.credentials,
            paramSerializer: '$httpParamSerializerJQLike'
           }
           $http(req
           ).then(function(data) {
             $rootScope.authenticate(function() {
               if ($rootScope.authenticated) {
                   $ctrl.error = false;
                   $uibModalInstance.close({$value: ''});
                   $location.path('/');
               } else {
                   $ctrl.error = true;
               }
             });
           }, function() {
             $ctrl.error = true;
             $rootScope.authenticated = false;
           })
         };
   })
   .controller('jojsSignupController', function($rootScope, $scope, $http, $uibModalInstance, User){
       this.error = false;
       var $ctrl = this;
       $scope.user = new User();

       $ctrl.ok = function () {
         $uibModalInstance.close({$value: 'ok'});
       };

       $ctrl.cancel = function () {
         $uibModalInstance.close({$value: 'cancel'});
       };

       $ctrl.close = function () {
         $uibModalInstance.close({$value: 'cancel'});
       };

       $ctrl.signup = function () {
         $scope.user.create(function(data)
         {
             $uibModalInstance.close({$value: ''});
             $rootScope.login();
         },
         function(data)
         {
            $ctrl.error = true;
         });
       }
   })
})(window.angular);
