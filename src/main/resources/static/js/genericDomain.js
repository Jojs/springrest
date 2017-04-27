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
            $http.get(this.baseUrl + id).then(function(success) {
                self.setData(success.data);
            }, function(error){});
        },
        delete: function() {
            $http.delete(this.links.self.href);
        },
        create: function(callbackSucces,callbackError) {
            $http.post(this.baseUrl, this).then(function(data)
                {
                    callbackSucces && callbackSucces(data);
                },
                function(data)
                {
                    callbackError && callbackError(data);
                }
            );
        },
        update: function() {
            $http.patch(this.links.self.href, this);
        },
        getImageUrl: function(width, height) {
            return this.links.self.href + '/img/' + width + '/' + height;
        }
    };
    return DomainObject;
    }]);

