'use strict';

angular.module('checklistApp.checklistView', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checklist-view', {
        templateUrl: 'checklist-view/checklist-view.html',
        controller: 'checklistController'
    });
}])

.controller('checklistController',['$scope', '$log', function($scope, $log) {
    //La struttura della checklist
    //TODO: da mettere in un file json che viene recuperato con http get
    //TODO: completare la prima fase
    var checklist = [
        {
            legend: "Il paziente ha confermato:",
            options: [
                "Identità"
            ]
        },

        {
            legend: "Il paziente ha confermato:",
            options: [
                "Sede intervento"
            ]
        },

        {
            legend: "Il paziente ha confermato:",
            options: [
                "Procedura"
            ]
        },

        {
            legend: "Il paziente ha confermato:",
            options: [
                "Consensi ( anestesiologico/chirurgico/emocomponeneti)"
            ]
        },

        {
            legend: "Verifica presenza e correttezza della marchature del sito dell'intervento",
            options: [
                "",
                "non applicabile"
            ]
        },

        {
            legend: "Controlli delle apparecchiature di anestesia completati(compreso pulsiossimetro presente)",
            options: [
                ""
            ]
        },
    ];

    $scope.checklistData ={
        steps: checklist
    };

    $scope.activeStep = 0;
    $scope.nextStep = function() {
        $scope.activeStep++;
        $log.log($scope.activeStep);

    };
}])
;
