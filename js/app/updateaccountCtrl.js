app.controller('updateaccountCtrl', function ($rootScope, $scope, dataService) {
    $scope.update = function () {
        // $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
        var id = $rootScope.student.id;
        console.log(id);
        var data = {
            username: $rootScope.student.username,
            password: $rootScope.student.password,
            fullname: $scope.student.fullname,
            email: $scope.student.email,
            gender: $scope.student.gender,
            birthday: $scope.student.birthday,
            schoolfee: $scope.student.schoolfee,
            marks: $scope.student.marks,
            image: "profile1.jpg"
        }
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user',JSON.stringify(data));
        dataService.updateData(id, data).then(function () {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công !Bạn được chuyển tới trang đăng nhập!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            });
        })
        // window.location.href = "#!login";
        if(localStorage){
            $rootScope.student = JSON.parse(window.localStorage.getItem('user'));
            console.log($rootScope.student);
        }
        
        

    }
});