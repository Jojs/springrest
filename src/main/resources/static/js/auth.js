angular.module('jojs.auth', [])
    .factory('authProvider', function() {
        var user;
          return {
            setUser : function(aUser){
              user = aUser;
            },
            isLoggedIn : function(){
              return(user)? user : false;
            }
          };
      })
   .factory('PasswordStrength', ['$http', function($http) {
       return {
           score: function(password, callback) {
                if (password)
                {
                    var req = {
                        method: 'GET',
                        url: 'checkPassword',
                        params: {password : password},
                        paramSerializer: '$httpParamSerializerJQLike'
                    }
                    $http(req).then(function(success)
                        {
                            var passwordStrength = success.data;
                            callback && callback(passwordStrength);
                        }
                    );
                }
                else
                {
                    callback && callback(-1);
                }
           }
       };
   }])
   .directive('okPassword', ['PasswordStrength', function(PasswordStrength) {
       return {
           // restrict to only attribute and class
           restrict: 'AC',

           // use the NgModelController
           require: 'ngModel',

           // add the NgModelController as a dependency to your link function
           link: function($scope, $element, $attrs, ngModelCtrl) {
               $element.on('blur change keydown', function(evt) {
                   $scope.$evalAsync(function($scope) {
                       // update the $scope.password with the element's value
                       var password = $scope.password = $element.val();
                       PasswordStrength.score(password, function(score)
                       {
                            $scope.passwordStrength = score;
                       });
                   });
               });
           }
       };
   }]);
