app.controller("quizCtrl", function ($http, $scope, $routeParams, quizfactory) {
    $http.get('Quizs/' + $routeParams.id + '.js').then(function (res) {
        quizfactory.questions = res.data;
    });
});

function thoigian(x) {
    thoiluong = x;
    //đem nguoic
    demnguoc();
  }
  function demnguoc() {
    thoiluong--;
    sophut = Math.floor(thoiluong / 60);
    sogiay = thoiluong % 60;
    document.getElementById("sophut").innerHTML = sophut;
    document.getElementById("sogiay").innerHTML = sogiay;
    //đem nguoc
    setTimeout(demnguoc, 1000);
  }

app.directive('quiz', function (quizfactory, $routeParams) {
    return {
        restrict: "AE",
        scope: {},
        templateUrl: "template/inner_quiz.html",
        link: function (scope, elem, attrs) {
            scope.start = function () {
                quizfactory.getQuestions().then(function () {
                    scope.index = 0;
                    scope.inProgress = true;
                    scope.quizOver = false;
                    scope.getQuestion();
                })
            };
            scope.reset = function () {
                scope.inProgress = false;
                scope.mark = 0;
            };
            scope.getQuestion = function () {
                var quiz = quizfactory.getQuestion(scope.index);
                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.statusAns = true;
                } else {
                    scope.quizOver = true;
                }
            }
            scope.checkAnswer = function () {
                scope.statusAns = false;
                if (!$('input[name = answer]:checked'.length)) {
                    return;
                }
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    scope.mark++;
                    scope.correctAns = true;
                } else {
                    scope.correctAns = false;
                }
            }
            scope.subname = $routeParams.name;
            scope.subLogo = $routeParams.logo;
            scope.nextQuestion = function () {
                //scope.checkAnswer();
                scope.index++;
                scope.getQuestion();
            }
            scope.reset();
        }
    }
});

app.factory('quizfactory', function ($http, $routeParams) {
    return {
        getQuestions: function () {
            return $http.get('Quizs/' + $routeParams.id + '.js').then(function (res) {
                questions = res.data;
            });
        },
        getQuestion: function (index) {
            var max = questions.length;
            var rand = questions[Math.floor(Math.random() * questions.length)];
            if (max > 10) {
                max = 10;
            }
            if (index < max) {
                return rand;
            } else {
                return false;
            }
        }
    }
});