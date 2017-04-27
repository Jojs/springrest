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
        $http.get(this.links.address.href).then(function(success) {
            self.address = new Address(success.data);
        }, function(error){});
    };
    Person.prototype.setAddress = function(addressId) {
        var self = this;
        $http.put(this.links.address.href, addressId).then(function(success) {
            self.address = new Address(success.data);
        }, function(error){});
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
        $http.get(this.links.address.href).then(function(success) {
            self.address = new Address(success.data);
        }, function(error){});
    };
    Company.prototype.loadDirectors = function() {
        var directors = [];
        this.directors = directors;
        $http.get(this.links.directors.href).then(function(success) {
            angular.forEach(success.data._embedded.people, function(value, key) {
                this.push(new Person(value, Address));
            }, directors);
        }, function(error){});
    };
    Company.prototype.loadOwners = function() {
        var owners = [];
        this.owners = owners;
        $http.get(this.links.owners.href).then(function(success) {
            angular.forEach(success.data._embedded.people, function(value, key) {
                this.push(new Person(value, Address));
            }, owners);
        }, function(error){});
    };
    Company.prototype.setAddress = function(addressId) {
        var self = this;
        $http.put(this.links.address.href, addressId).then(function(success) {
            self.address = new Address(success.data);
        }, function(error){});
    };
    return Company;
    }]);

