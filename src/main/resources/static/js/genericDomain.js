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
        load: function(id, callbackSuccess,callbackError) {
            var self = this;
            $http.get(this.baseUrl + id).then(function(success) {
                    self.setData(success.data);
                    callbackSuccess && callbackSuccess(data);
                }, function(data)
                {
                    callbackError && callbackError(data);
                }
            );

        },
        delete: function(callbackSuccess,callbackError) {
            $http.delete(this.links.self.href).then(function(data)
                {
                    callbackSuccess && callbackSuccess(data);
                },
                function(data)
                {
                    callbackError && callbackError(data);
                }
            );
        },
        create: function(callbackSuccess,callbackError) {
            $http.post(this.baseUrl, this).then(function(data)
                {
                    callbackSuccess && callbackSuccess(data);
                },
                function(data)
                {
                    callbackError && callbackError(data);
                }
            );
        },
        update: function(callbackSuccess,callbackError) {
            $http.patch(this.links.self.href, this).then(function(data)
                {
                    callbackSuccess && callbackSuccess(data);
                },
                function(data)
                {
                    callbackError && callbackError(data);
                }
            );
        },
        getImageUrl: function(width, height) {
            return this.links.self.href + '/img/' + width + '/' + height;
        }
    };
    return DomainObject;
    }]);

