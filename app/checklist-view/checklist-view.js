'use strict';

angular.module('checklistApp.checklistView', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/checklist-view', {
        templateUrl: 'checklist-view/checklist-view.html',
        controller: 'checklistController'
    });
}])

.controller('checklistController',['$scope', '$log', 'listState', '$http', 'errorPage', function($scope, $log, listState, $http, signalError) {
    //TODO: fare un servizio che recupera risorse,
    var checklistStructure = listState.getChecklistStructure();
    $scope.checklist = checklistStructure.checklist;
    $scope.nonConformitySheet = checklistStructure.nonConformitySheet;

    //flag per il cambio di vista tra checklist e scheda Non-conformità
    $scope.nonConformityView = false;

    //lega il model allo stato della checklist sul service
    $scope.listState = listState.getState();

    $scope.checklistControls = {
        nextStep: function () {
            listState.nextStep();
        },

        stepControls: [
            {
                label: "Passo precedente",
                behaviour: function () {
                    listState.prevStep();
                },
            },

            {
                label: "N-C Mod 776/b",
                behaviour: function (phaseNum, stepNum) {
                    $log.log("Non conformità all passo: " + stepNum + " fase: " + phaseNum);
                    // controllo che esista un passo m alla fase n nella scheda delle non conformità
                    if ($scope.nonConformitySheet[phaseNum].steps[stepNum].legend != "Non Disponibile") {
                        $log.log("C'è!: " + $scope.nonConformitySheet[phaseNum].steps[stepNum].legend);
                        $scope.nonConformityView = true;
                    }

                },
            }

        ],

        endPhaseControls: [
            {
                label: "Torna al passo precedente",
                behaviour: function () {
                    listState.prevStep();
                },
            },

            {
                label: "Procedi alla prossima fase",
                behaviour: function () {
                    listState.nextPhase();
                }
            }

        ],

        endListControls: [
            {
                label: "Torna al passo precedente",
                behaviour: function () {
                    listState.prevStep();
                },
            },

            {
                label: "Completa Checklist",
                behaviour: function () {
                    $log.log("Checklist Completata");
                },
            },
        ]
    };

    $scope.nonConformityControls = {
        nextStep: function () { },

        stepControls: [
            {
                label: "Segnala non-conformità",
                behaviour: function (phaseNum, stepNum) {
                        $scope.nonConformityView = false;

                },
            }

        ],

        endPhaseControls: [],

        endListControls: []
    };

    //ogni volta che il controller viene eliminato, fa il listen sull'evento $destroy
    //e resetta lo stato della checklist
    $scope.$on('$destroy', function() {
        listState.resetState();
    });

}])
;
