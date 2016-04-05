/**
 * Created by xhtg4382 on 05/11/2015.
 */
angular.module('navBarCtrl', [])
    .controller('navBarCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function ($scope, $http, $location, $routeParams, $rootScope) {

        $scope.version = "undefined";
        $http({method: 'GET', url: '/version'})
            .success(function (data) {
                $scope.version = data.version;
                $scope.versionDate = data.date;
            })
            .error(function (data, status, headers, config) {
                console.log("error while getting app version");
            });


        // side menu
        $scope.leftVisible = false;
        $scope.rightVisible = false;

        $scope.close = function () {
            console.log('close !');
            $scope.leftVisible = false;
            $scope.rightVisible = false;
        };

        $scope.showLeft = function (e) {
            console.log('showLeft !');
            $scope.leftVisible = true;
            e.stopPropagation();
        };

        $scope.showRight = function (e) {
            $scope.rightVisible = true;
            e.stopPropagation();
        }

        $rootScope.$on("docClicked", _close);
        $rootScope.$on("escPressed", _close);

        function _close() {
            console.log('_close !');
            $scope.$apply(function () {
                $scope.close();
            });
        }

        $scope.myFunct = function(keyEvent) {
            console.log('myFunct ! key='+keyEvent);
            if (keyEvent.which === 13)
                alert('I am an alert');
        }

    }])
