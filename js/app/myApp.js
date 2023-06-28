var app = angular.module("myApp", ['ngRoute', 'ngAnimate']);


app.run(function ($rootScope, $http, $timeout, dataService) {
    dataService.getData().then(function (res) {
        $scope.list_user = res.data;
        console.log($scope.list_user);
    });

    

    if(localStorage){
        $rootScope.student = JSON.parse(window.localStorage.getItem('user'));
        console.log($rootScope.student);
    }else{
        $rootScope.student = null;
    }


    $http.get("db/Subjects.js").then(function (response) {
        $rootScope.subjects = response.data;
    });

    $rootScope.logoff = function () {
        $rootScope.student = null;
        window.localStorage.clear();
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!index";
    }
});


app.service("dataService", function ($http) {
    this.getData = function () {
        return $http.get("http://localhost:3000/listStudents");
    };
    this.updateData = function (id, data) {
        return $http.put("http://localhost:3000/listStudents/" + id, data);
    };
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/index",
            {
                templateUrl: "template/index.html"
            })
        .when("/about",
            {
                templateUrl: "template/about.html"
            })
        .when("/contact",
            {
                templateUrl: "template/contact.html"
            })
        .when("/feedback",
            {
                templateUrl: "template/feedback.html"

            })
        .when("/qa",
            {
                templateUrl: "template/QA.html"
            })
        .when("/quiz",
            {
                templateUrl: "template/quiz_list.html",
                controller: "indexCtrl"
            })
        .when("/login",
            {
                templateUrl: "template/login.html",
                controller: "loginCtrl"
            })
        .when("/register",
            {
                templateUrl: "template/register.html",
                controller: "registerCtrl"
            })
        .when("/forgotpassword",
            {
                templateUrl: "template/forgotpassword.html",
                controller: "forgotpasswordCtrl"
            })
        .when("/updateaccount",
            {
                templateUrl: "template/updateaccount.html",
                controller: "updateaccountCtrl"
            })
        .when("/changepassword",
            {
                templateUrl: "template/changepassword.html",
                controller: "changepasswordCtrl"
            })
        .when("/quiz/:id/:name/:logo",
            {
                templateUrl: "template/quizview.html",
                controller: "quizCtrl"
            })
        .otherwise(
            {
                redirectTo: "/index"
            });



});

app.directive('rePass', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function rePas(value) {
                var pass = scope.studentR.password;
                if (pass == value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(rePas);
        }
    }
});
app.directive('fee', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function Sfee(value) {
                var pass = parseInt(value)
                if (pass >= 2000000) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(Sfee);
        }
    }
});


