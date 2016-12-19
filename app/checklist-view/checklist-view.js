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

        prevStep: function () {
            listState.prevStep();
        },

        signalNonConformity: function (phaseNum, stepNum) {
            $log.log("Non conformità all passo: " + stepNum + " fase: " + phaseNum);
            // controllo che esista un passo m alla fase n nella scheda delle non conformità
            if ($scope.nonConformitySheet[phaseNum].steps[stepNum].legend != "Non Disponibile") {
                $log.log("C'è!: " + $scope.nonConformitySheet[phaseNum].steps[stepNum].legend);
                $scope.nonConformityView = true;
            }
        },

        nextPhase: function () {
            listState.nextPhase();
        }
    };

    $scope.nonConformityControls = {
        nextStep: function () {
        },

        prevStep: function () {

        },

        signalNonConformity: function () {
            $scope.nonConformityView = false;
        }
    };

    //ogni volta che il controller viene eliminato, fa il listen sull'evento $destroy
    //e resetta lo stato della checklist
    $scope.$on('$destroy', function() {
        listState.resetState();
    });

}])
;
