'use strict';

angular.module('checklistApp.checklistView', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checklist-view', {
        templateUrl: 'checklist-view/checklist-view.html',
        controller: 'checklistController'
    });
}])

.controller('checklistController',['$scope', function($scope) {
    //La struttura della checklist
    //TODO: da mettere in un file json che viene recuperato con http get
    var checklist = [
        {
            legend: "Il paziente ha confermato:",
            options: [
                "Identità"
            ]
        },

        {
            legend: "Verifica presenza e correttezza della marchature del sito dell'intervento",
            options: [
                "1",
                "2",
                "3",
                "4"
            ]
        }
    ];

    $scope.checklistData ={
        steps: checklist
    };
}])
;
