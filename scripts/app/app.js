var app = angular.module('myApp', ['LocalStorageModule']);

app.run(function(localStorageService){
    if(!localStorageService.get('students'))
        localStorageService.set('students', [{firstName: 'Milan', lastName: 'Milić', gender: 'M', dateOfEntry: new Date(2016, 3, 3, 3, 3, 3)},
                                             {firstName: 'Filip', lastName: 'Filipović', gender: 'M', dateOfEntry: new Date(2016, 1, 1, 1, 1, 1)},
                                             {firstName: 'Ana', lastName: 'Anić', gender: 'F', dateOfEntry: new Date(2016, 1, 1, 1, 1, 1)}]);  
});

app.controller('studentController', function($scope, localStorageService){

    $scope.allStudents = localStorageService.get('students') || [];

    $scope.addNewStudent = function(){
       $scope.allStudents.push({firstName: $scope.firstName, lastName: $scope.lastName, gender: $scope.gender, dateOfEntry: new Date(Math.random()*new Date())});
       localStorageService.set('students', $scope.allStudents);

       $scope.firstName = null;
       $scope.lastName = null;
       $scope.gender = null;
    }

    $scope.getFilteredStudents = function(){
        return !$scope.search ? $scope.allStudents : _.filter($scope.allStudents, function(student){return _.includes(student.lastName, $scope.search)});
    }
});