angular.module('jojs.User', ['jojs.DomainObject'])
    .factory('User', ['$http', 'DomainObject', function($http, DomainObject) {
    function User(userData) {
        this.init(userData);
    };
    User.inheritsFrom(DomainObject);
    User.prototype.init = function(userData) {
        this.parent.init.call(this, 'users/', userData);
    };
    User.prototype.setDomainData = function(userData) {
        this.userName = userData.userName;
        this.password = userData.password;
    };
    return User;
    }]);
