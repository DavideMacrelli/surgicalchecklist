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
    var checklistURL = "content/checklist.json";
    var nonConformitySheetURL = "content/non-conformity-sheet.json";
    $scope.checklist = [];
    $scope.nonConformitySheet = [];

    $http.get(checklistURL).then(function(response) {
        //callback promise fullfilled
        if(typeof(response.data) == 'object'){
            //risposta valida
            $log.log("risposta valida");
            $scope.checklist = response.data;
            $log.log($scope.checklist);
        } else {
            //risposta invalida
            $log.log("risposta invalida");
            signalError("01", "C'è stato un errore nell recupero della checklist");
        }

    },function(response) {
        //callback rejected promise
        $log.log("la get ha avuto esito negativo" + response);
        signalError(response.status, response.statusText);
    });

    $http.get(nonConformitySheetURL).then(function(response) {
        //callback promise fullfilled
        if(typeof(response.data) == 'object'){
            //risposta valida
            $log.log("risposta valida");
            $scope.nonConformitySheet = response.data;
            $log.log($scope.nonConformitySheet);
        } else {
            //risposta invalida
            $log.log("risposta invalida");
            signalError("01", "C'è stato un errore nell recupero della scheda non-conformità");
        }

    },function(response) {
        //callback rejected promise
        $log.log("la get ha avuto esito negativo" + response);
        signalError(response.status, response.statusText);
    });

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

        signalNonConformity: function () {
            $scope.nonConformityView = true;
        }
    };

    $scope.nonConformityControls = {
        nextStep: function () {            
        },

        prevStep: function () {
            listState.prevStep();
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
