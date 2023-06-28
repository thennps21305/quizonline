app.controller('loginCtrl', function ($scope, $rootScope, $http) {
    var url = "http://localhost:3000/listStudents";
    $http.get(url);
    $rootScope.isLog = false;
    $http.get(url).then(
        function (res) {
            $scope.datas = res.data;
            console.log(res.data);
            localStorage.clear();
            $scope.Login = function () {
                console.log($scope.username);
                console.log($scope.password);

                var log = checkLogin($scope.username, $scope.password);
                console.log(log);
                if (log) {
                    $rootScope.isLog = true;
                    Swal.fire({
                        icon: 'info',
                        title: 'Đăng nhập thành công!',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600
                    });
                    window.location.href = "#!index";
                } else {
                    $rootScope.isLog = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi!',
                        text: 'Sai tài khoản hoặc mật khẩu!'
                    });
                }
            };
            function checkLogin(user, pass) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].username == user && res.data[i].password == pass) {
                        $rootScope.student = res.data[i];
                        window.localStorage.setItem('user',JSON.stringify($rootScope.student));
                        console.log(localStorage);
                        return res.data[i];
                    }
                }
                return false;
            }
        },
        function (error) { }
    );
});