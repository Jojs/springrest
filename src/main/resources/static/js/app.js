// Source: http://phrogz.net/js/classes/OOPinJS2.html
Function.prototype.inheritsFrom = function( parentClassOrObject ){
	if ( parentClassOrObject.constructor == Function )
	{
		//Normal Inheritance
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}
	else
	{
		//Pure Virtual Inheritance
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	}
	return this;
};

(function(angular) {
  'use strict';
angular.module('jojs.service', []);

angular.module('jojs.DomainObject', [])
    .factory('DomainObject', ['$http', function($http) {
    function DomainObject() {
    };
    DomainObject.prototype = {
        init : function(newBaseUrl, data) {
            this.baseUrl = newBaseUrl;
            if (data) {
                this.setData(data);
            }
        },
        setData: function(data) {
            this.links = data._links;
            this.id = this.links.self.href.substr(this.links.self.href.lastIndexOf('/', this.links.self.href.length));
            this.setDomainData(data);
        },
        setDomainData: function(data) {
        },
        load: function(id) {
            var self = this;
            $http.get(this.baseUrl + id).success(function(data) {
                self.setData(data);
            });
        },
        delete: function() {
            $http.delete(this.baseUrl + this.id);
        },
        update: function() {
            $http.put(this.baseUrl + this.id, this);
        },
        getImageUrl: function(width, height) {
            return this.baseUrl + this.id + '/img/' + width + '/' + height;
        }
    };
    return DomainObject;
    }]);

angular.module('jojs.Address', ['jojs.DomainObject'])
    .factory('Address', ['$http', 'DomainObject', function($http, DomainObject) {
    function Address(addressData) {
        this.init(addressData);
    };
    Address.inheritsFrom(DomainObject);
    Address.prototype.init = function(addressData) {
        this.parent.init.call(this, 'addresses/', addressData);
    };

    Address.prototype.setDomainData = function(addressData) {
        this.address = addressData.address;
        this.city = addressData.city;
        this.country = addressData.country;
        this.email = addressData.email;
        this.phoneNumber = addressData.phoneNumber;
    };
    return Address;
    }]);

angular.module('jojs.Person', ['jojs.DomainObject', 'jojs.Address'])
    .factory('Person', ['$http', 'Address', 'DomainObject', function($http, Address, DomainObject) {
    function Person(personData) {
        this.init(personData);
    };
    Person.inheritsFrom(DomainObject);
    Person.prototype.init = function(personData) {
        this.parent.init.call(this, 'people/', personData);
    };
    Person.prototype.setDomainData = function(personData) {
        this.firstName = personData.firstName;
        this.lastName = personData.lastName;
        this.loadAddress();
    };
    Person.prototype.loadAddress = function() {
        var self = this;
        $http.get(this.links.address.href).success(function(data) {
            self.address = new Address(data);
        });
    };
    return Person;
    }]);

angular.module('jojs.Company', ['jojs.DomainObject', 'jojs.Person', 'jojs.Address'])
    .factory('Company', ['$http', 'Person', 'Address', 'DomainObject', function($http, Person, Address, DomainObject) {
    function Company(companyData) {
        this.init(companyData);
    };
    Company.inheritsFrom(DomainObject);
    Company.prototype.init = function(companyData) {
        this.parent.init.call(this, 'companies/', companyData);
    };
    Company.prototype.setDomainData = function(companyData) {
        this.name = companyData.name;
        this.loadAddress();
        this.loadDirectors();
        this.loadOwners();
    };
    Company.prototype.loadAddress = function() {
        var self = this;
        $http.get(this.links.address.href).success(function(data) {
            self.address = new Address(data);
        });
    };
    Company.prototype.loadDirectors = function() {
        var directors = [];
        this.directors = directors;
        $http.get(this.links.directors.href).success(function(data) {
            angular.forEach(data._embedded.people, function(value, key) {
                this.push(new Person(value, Address));
            }, directors);
        });
    };
    Company.prototype.loadOwners = function() {
        var owners = [];
        this.owners = owners;
        $http.get(this.links.owners.href).success(function(data) {
            angular.forEach(data._embedded.people, function(value, key) {
                this.push(new Person(value, Address));
            }, owners);
        });
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
            }).when('/addresses/:addressId', {
                templateUrl: '/frontend/parts/address.html'
            }).when('/people', {
                templateUrl: '/frontend/parts/people.html'
            }).when('/people/:personId', {
                templateUrl: '/frontend/parts/person.html'
            }).when('/signup/', {
                templateUrl: '/frontend/parts/create_person.html'
            }).otherwise({
                redirectTo: '/companies'
            });
    }])
    .controller('jojsNavigationController', function ($scope, $location) {
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
   .controller('JojsCompaniesController', function($scope, $http, Company, Person, Address) {
       $http.get('/companies').success(function(data) {
           var companies = [];
           angular.forEach(data._embedded.companies, function(value, key) {
               this.push(new Company(value, Person, Address));
            }, companies);
            $scope.companies = companies;
       });
   })
   .controller('JojsCompanyController', function($scope, $http, Company, Person, Address, $routeParams) {
       $http.get('/companies/' + $routeParams.companyId).success(function(data) {
           $scope.company = new Company(data, Person, Address);
       });
   })
   .controller('JojsAddressesController', function($scope, $http, Address){
       $http.get('/addresses').success(function(data) {
          var addresses = [];
          angular.forEach(data._embedded.addresses, function(value, key) {
              this.push(new Address(value, Person, Address));
          }, addresses);
           $scope.addresses = addresses;
       });
   })
   .controller('JojsAddressController', function($scope, $http, $routeParams, Address){
       $http.get('/addresses/' + $routeParams.addressId).success(function(data) {
           $scope.address = new Address(data);
       });
   })
   .controller('JojsPeopleController', function($scope, $http, Person, Address){
       $http.get('/people').success(function(data) {
           var people = [];
           angular.forEach(data._embedded.people, function(value, key) {
               this.push(new Person(value, Person, Address));
           }, people);
           $scope.people = people;
       });
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
   .controller('JojsSignupController', function($scope, $http, Person){
       this.error = true;
       $scope.person = new Person();
       this.signup = function() {
           // $scope.person.create();
       };
   })
   .controller('JojsLoginController', function($scope, $http, Person){
       this.error = true;
       $scope.person = new Person();
       this.login = function() {
           // $scope.person.create();
       };
   })

})(window.angular);
