
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'celebControllers'
  ]);

         /*------------controller-----------*/

var celebControllers = angular.module('celebControllers', []);

	celebControllers.controller('ListController', 
		['$scope', '$http', function($scope, $http) {
		    $http.get('js/celebrities.json')
		        .success(function(data) {
			        $scope.celebs = data;
			          $scope.celebrities = data;
			        console.log('success');
                })
                .error(function(data, status ){
                    console.log('error');
                    console.log('status');
			    });
	    }]);

	celebControllers.controller('DetailsController',
	    ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
		    $http.get('js/celebrities.json')
		        .success(function(data) {
			        $scope.celebs = data;
			        $scope.whichItem = $routeParams.itemId;
			        console.log('success');
                })
                .error(function(data, status ){
                    console.log('error');
                    console.log('status');
				});
	    }]);

         /*------------router-----------*/

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  when('/details/:itemId', {
    templateUrl: 'partials/details.html',
    controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/list'
  });
}]);

        /*-------filter------*/

myApp.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});