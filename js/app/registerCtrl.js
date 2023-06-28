app.controller('registerCtrl', function ($rootScope, $scope,$http) {
    $scope.register = function () {
        var a = {
            id: Math.floor(),
            username: $scope.studentR.username,
            password: $scope.studentR.password,
            fullname: $scope.studentR.fullname,
            email: $scope.studentR.email,
            gender: $scope.studentR.gender,
            birthday: $scope.studentR.birthday,
            schoolfee: $scope.studentR.schoolfee,
            marks: $scope.studentR.marks,
            image: "profile1.jpg"
        }
        console.log(a);
        $http.post("http://localhost:3000/listStudents",a).then(
                function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký thành công!',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600
                    });
                    window.location.href = "#!register";
                },
                function () {
                    alert("false");
                }
            );
    };
});