angular.module('tableApp',['controllers','directives','ngAnimate', 'ngRoute'
])
    .config(function($routeProvider,$httpProvider)
    {
        $routeProvider
            .when('/',
            {controller: 'homeCtrl',
                templateUrl: 'home.html'
            })
            //.when('/allvideos/:vid',
            //{controller: 'allvideosCtrl',
            //    templateUrl: 'allvideos.html'
            //})
            .when('/404',
            {
                templateUrl: '404.html'
//                resolve: {
//                    'me': function (mymefactory) {
//                        return mymefactory.mybackurl().then(function(data) {
//                                return mymefactory.myme();}
//                        );}
//                    /*return mymefactory.mybackurl()}*/
//                }
            })
            .otherwise({
                redirectTo :'/404'
            });
        // interceptors to manipulate http request and response
        $httpProvider.interceptors.push(function ($q) {
            return {
                request: function (config) {
                    return config;
                },
                'responseError': function (rejection) {
                    if (rejection.status === 401) {
//                        $location.path('/login')
                    }
                    return $q.reject(rejection);
                }
            }
        });
    })
    .run(function($rootScope) {
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27) {
                $rootScope.$broadcast("escPressed", e.target);
            }
            if (e.keyCode === 37) {
                $rootScope.$broadcast("leftPressed", e.target);
            }
            if (e.keyCode === 39) {
                $rootScope.$broadcast("rightPressed", e.target);
            }
        });

        document.addEventListener("click", function(e) {
            $rootScope.$broadcast("docClicked", e.target);
        });
    })


// Add extern modules
angular.module('controllers', []);
angular.module('directives', []);
//angular.module('services', []);
//angular.module('services', []);
//angular.module('factories', []);
//angular.module('filters', []);
