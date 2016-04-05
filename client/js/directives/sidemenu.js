/**
 * Created by atbe7403 on 14/12/2015.
 */

angular.module("menu", [])
    .directive("menu", function () {
        return {
            restrict: "E",
            template: "<div ng-class='{ show: visible, left: alignment === \"left\", bottom: alignment === \"bottom\" }' ng-transclude></div>",
            transclude: true,
            scope: {
                visible: "=",
                alignment: "@"
            }
        };
    })
    .directive("menuItem", function () {
        return {
            restrict: "E",
            template: "<div ng-click='navigate()' ng-transclude></div>",
            transclude: true,
            scope: {
                url: "@"
            },
            link: function ($scope) {
                $scope.navigate = function () {
                    if($scope.url != null)
                        window.location.href = $scope.url;
                }
            }
        }
    })
    .directive("menuItemCategory", function () {
        return {
            restrict: "E",
            template: "<div ng-click='navigate()' ng-transclude></div>",
            transclude: true,
            scope: {
                url: "@"
            },
            link: function ($scope) {
                $scope.navigate = function () {
                    if($scope.url != null)
                        window.location.href = $scope.url;
                }
            }
        }
    })
    .directive("menuItemNoLink", function () {
        return {
            restrict: "E",
            template: "<div  ng-transclude></div>",
            transclude: true,
            scope: {
                url: "@"
            },
            link: function ($scope) {

            }
        }
    })
