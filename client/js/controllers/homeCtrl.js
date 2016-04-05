angular.module('homeCtrl', [])
    .controller('homeCtrl', ['$rootScope','$scope','$window','$http','$timeout','$sce',function ($rootScope,$scope,$window,$http,$timeout,$sce) {

        $scope.pageClass = 'page-home';

        //$http({method: 'GET', url: 'json/homedata.json'})
        //    .success(function (data) {
        //        $scope.hdata = data;
        //        console.log(JSON.stringify($scope.hdata));
        //    });

        $http.defaults.headers.common['Authorization'] = 'Basic b3N6ZnJvbnQ6b3N6ZnJvbnQyMDE2Xw==';
        $http({method: 'GET', url: '/topvideos'})
            .success(function (data, status, headers, config) {
                // console.log('top videos / client side : '+JSON.stringify($scope.hdata));

                // hack to manage shows without any primary hashtag
                if (data != null) {
                    if (data.yesterday != null) {
                        for (var i = 0; i < data.yesterday.length; i++) {
                            if (data.yesterday[i].primaryHashtag == '')
                                data.yesterday[i].primaryHashtag = "no hashtag";
                        }
                    }
                    if (data.week != null) {
                        for (var i = 0; i < data.week.length; i++) {
                            if (data.week[i].primaryHashtag == '')
                                data.week[i].primaryHashtag = "no hashtag";
                        }
                    }
                    if (data.topbuzz != null) {
                        for (var i = 0; i < data.topbuzz.length; i++) {
                            if (data.topbuzz[i].primaryHashtag == '')
                                data.topbuzz[i].primaryHashtag = "no hashtag";
                        }
                    }
                    $scope.hdata = data;
                }
            })
            .error(function (data, status, headers, config) {
            console.log("error while getting videos data");
        });

    }]);
