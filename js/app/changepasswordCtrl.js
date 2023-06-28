app.controller('changepasswordCtrl', function ($rootScope, $scope, dataService) {
    $scope.change = function () {
        if ($rootScope.student.password == $scope.oldpassword) {
            if ($rootScope.student.password == $scope.studentR.password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mật khẩu mới trùng với mật khẩu cũ!'
                });
            } else {
                var arr = {
                    username: $rootScope.student.username,
                    password: $scope.studentR.password,
                    fullname: $rootScope.student.fullname,
                    email: $rootScope.student.email,
                    gender: $rootScope.student.gender,
                    birthday: $rootScope.student.birthday,
                    schoolfee: $rootScope.student.schoolfee,
                    marks: $rootScope.student.marks,
                    image: "profile1.jpg"
                }
                dataService.updateData($rootScope.student.id, arr).then(function () {
                    Swal.fire({
                        title: 'Đổi mật khẩu thành công',
                        // text: "Bạn có muốn quay lại trang chủ!",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Có!',
                        cancelButtonText: 'Không'
                    })
                    
                    // 
                })
                if(localStorage){
                    $rootScope.student = JSON.parse(window.localStorage.getItem('user'));
                    console.log($rootScope.student);
                }else{
                    window.location.href = "#!login";
                }
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mật khẩu cũ không đúng!'
            });
        }
        $scope.oldpassword = "";
        $scope.studentR.password = "";
        $scope.renewpassword = "";
    }
});