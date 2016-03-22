(function(angular) {
  'use strict';
angular.module('jojs.service', []);

angular.module('jojs.Address', [])
    .factory('Address', ['$http', function($http) {
    function Address(addressData) {
        if (addressData) {
            this.setData(addressData);
        }
        // Some other initializations related to book
    };
    Address.prototype = {
        setData: function(addressData) {
            this.address = addressData.address;
            this.city = addressData.city;
            this.country = addressData.country;
            this.email = addressData.email;
            this.phoneNumber = addressData.phoneNumber;
            this.href = addressData._links.self.href;
            this.id = this.href.substr(this.href.lastIndexOf('/', this.href.length));
        },
        load: function(id) {
            var scope = this;
            $http.get('ourserver/books/' + bookId).success(function(addressData) {
                scope.setData(addressData);
            });
        },
        delete: function() {
            $http.delete('ourserver/books/' + bookId);
        },
        update: function() {
            $http.put('ourserver/books/' + bookId, this);
        },
        getImageUrl: function(width, height) {
            return 'our/image/service/' + this.book.id + '/' + width + '/' + height;
        },
        isAvailable: function() {
            if (!this.book.stores || this.book.stores.length === 0) {
                return false;
            }
            return this.book.stores.some(function(store) {
                return store.quantity > 0;
            });
        }
    };
    return Address;
}]);

angular.module('jojs.Person', ['jojs.Address'])
    .factory('Person', ['$http', 'Address', function($http) {
    function Person(personData, Address) {
        if (personData) {
            this.setData(personData);
        }
        // Some other initializations related to book
    };
    Person.prototype = {
        setData: function(personData, Address) {
            this.firstName = personData.firstName;
            this.lastName = personData.lastName;
            this.address = this.loadAddress(personData, Address);
            this.href = personData._links.self.href;
            this.id = this.href.substr(this.href.lastIndexOf('/', this.href.length));
        },
        load: function(id) {
            var scope = this;
            $http.get('ourserver/books/' + bookId).success(function(personData) {
                scope.setData(personData);
            });
        },
        loadAddress : function(personData, Address) {
            var address;
            $http.get(personData._links.address.href).success(function(data) {
                address = new Address(data);
             });
             return address;
        },

        delete: function() {
            $http.delete('ourserver/books/' + bookId);
        },
        update: function() {
            $http.put('ourserver/books/' + bookId, this);
        },
        getImageUrl: function(width, height) {
            return 'our/image/service/' + this.book.id + '/' + width + '/' + height;
        },
        isAvailable: function() {
            if (!this.book.stores || this.book.stores.length === 0) {
                return false;
            }
            return this.book.stores.some(function(store) {
                return store.quantity > 0;
            });
        }
    };
    return Person;
}]);

angular.module('jojs.Company', ['jojs.Person', 'jojs.Address'])
    .factory('Company', ['$http', 'Person', 'Address', function($http) {
             function Company(companyData, Person, Address) {
                 if (companyData) {
                     this.setData(companyData, Person, Address);
                 }
                 // Some other initializations related to book
             };
             Company.prototype = {
                 setData: function(companyData, Person, Address) {
                     this.name = companyData.name;
                     this.address = this.loadAddress(companyData, Address);
                     this.directors = this.loadDirectors(companyData, Person);
                     this.owners = this.loadOwners(companyData, Person);
                     this.href = companyData._links.self.href;
                     this.id = this.href.substr(this.href.lastIndexOf('/', this.href.length));
                 },
                 loadDirectors : function(companyData, Person) {
                    var directors = [];
                    $http.get(companyData._links.directors.href).success(function(data) {
                               angular.forEach(data._embedded.people, function(value, key) {
                                this.push(new Person(value));
                                }, directors);
                              });
                     return directors;
                 },
                 loadOwners : function(companyData, Person) {
                    var owners = [];
                    $http.get(companyData._links.owners.href).success(function(data) {
                               angular.forEach(data._embedded.people, function(value, key) {
                                this.push(new Person(value));
                                }, owners);
                              });
                     return owners;
                 },
                 loadAddress : function(companyData, Address) {
                    return $http.get(companyData._links.address.href).success(function(data) {
                        return new Address(data);
                     });
                 },
                 load: function(id) {
                     var scope = this;
                     $http.get(id).success(function(companyData) {
                         scope.setData(companyData);
                     });
                 },
                 delete: function() {
                     $http.delete('ourserver/books/' + bookId);
                 },
                 update: function() {
                     $http.put('ourserver/books/' + bookId, this);
                 }
             };
             return Company;
         }]);

angular.module('jojs.directive', []);

angular.module('jojs.filter', [])
    .filter('stripParamDecl', function() {
      return function(href) {
        return href.substr(0, href.indexOf("{"));
      };
    });

angular.module('jojs', ['jojs.service', 'jojs.directive', 'jojs.filter', 'jojs.Address', 'jojs.Person', 'jojs.Company', 'ngResource', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/frontend/parts/companies.html'
            }).when('/companies', {
                templateUrl: '/frontend/parts/companies.html'
            }).when('/companies/:companyId', {
                templateUrl: '/frontend/parts/company.html'
            }).when('/addresses', {
                templateUrl: '/frontend/parts/addresses.html'
            }).when('/people', {
                templateUrl: '/frontend/parts/people.html'
            }).when('/people/:personId', {
                templateUrl: '/frontend/parts/person.html'
            }).otherwise({
                redirectTo: '/companies'
            });
    }])
    .controller('NavigationController', function ($scope, $location) {
        $scope.navigateTo = function (path) {
            $location.path(path);
        };
        $scope.isCodeCollapsed = true;
        $scope.isResponseCollapsed = true;
        $scope.isProcessedResponseCollapsed = true;
    })
  .controller('JojsIndexController', function($scope, $http){
    $http.get('/').success(function(data) {
            $scope.index = data;
          });
  })
  .controller('JojsCompaniesController', function($scope, $http, Company, Person) {
    $http.get('/companies').success(function(data) {
           var companies = [];
           angular.forEach(data._embedded.companies, function(value, key) {
            this.push(new Company(value, Person));
            }, companies);
            $scope.companies = companies;
          });
  })
  .controller('JojsCompanyController', function($scope, $http, Company, Person, Address, $routeParams) {
    $http.get('/companies/' + $routeParams.companyId).success(function(data) {
            $scope.company = new Company(data, Person, Address);
          });
  })
  .controller('JojsPersonController', function($scope, $http, Person, Address, $routeParams) {
    $http.get('/people/' + $routeParams.personId).success(function(data) {
            $scope.person = new Person(data, Address);
          });
  })
  .controller('JojsAdressesController', function($scope, $http){
    $http.get('/addresses').success(function(data) {
            $scope.addresses = data;
          });
  })
  .controller('JojsPeopleController', function($scope, $http){
    $http.get('/people').success(function(data) {
            $scope.people = data;
          });
  })

})(window.angular);
