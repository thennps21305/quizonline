app.controller('indexCtrl', function($scope, $rootScope) {
    $scope.begin = 0;
    $scope.pageCount = Math.ceil($rootScope.subjects.length / 4);
    $scope.back = function() {
        if ($scope.begin > 0) {
            $scope.begin -= 4;
        }
    }
    $scope.next = function() {
        if ($scope.begin < ($scope.pageCount - 1) * 4) {
            $scope.begin += 4;
        }
    }
});