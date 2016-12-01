'use strict';

angular.module('checklistApp.checklistView', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checklist-view', {
        templateUrl: 'checklist-view/checklist-view.html',
        controller: 'checklistController'
    });
}])

.controller('checklistController',['$scope', '$log', 'listState', function($scope, $log, listState) {
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

    //Struttura scheda rivelazione anomalie
    var anomalySheet = [
        {
            legend: "Identità Paziente:",
            options: [
                "No braccialetto",
                "No barcode/nosologico",
                "No nosologico",
                "No cartella"
            ]
        },

        {
            legend: "Sede intervento:",
            options: [
                "Non conferma della sede"
            ]
        },

        {
            legend: "Procedura Chirurgica",
            options: [
                "Non conferma della Procedura"
            ]
        },

        {
            legend: "Consenso",
            options: [
                "mancata firma del consenso chirurgico",
                "mancata firma del consenso anestesiologico",
                "mancata firma del consenso emocomponenti"
            ]
        },

        {
            legend: "Il sito dell'intervento marcato",
            options: [
                "Sito non marcato",
                "errata marcatura del sito"
            ]
        },

        {
            legend: "Controlli apparecchiature anestesia",
            options: [
                "test apparecchiature non effettuati",
                "non corretto posizionamento"
            ]
        },
    ];

    $scope.checklistData = {
        steps: checklist
    };

    $scope.anomalySheetData = {
        steps: anomalySheet
    };

    //lega il modello allo stato della checklist sul service
    $scope.listSession = listState.getCurrentSession();

    $scope.nextStep = function() {
        listState.nextStep();
    };

    //ogni volta che il controller viene eliminato, fa il listen sull'evento $destroy
    //e salva la sessione corrente
    $scope.$on('$destroy', function() {
        listState.exitSession();
    });

    $scope.signalAnomaly = function(step) {
            $log.log("Anomaly in step N: " + step);
            $scope.anomalyDetectionMode = true;
    };

    $scope.submitAnomaly = function(){
            $scope.anomalyDetectionMode = false;
    };

    $scope.anomalyDetectionMode = false;
}])
;
