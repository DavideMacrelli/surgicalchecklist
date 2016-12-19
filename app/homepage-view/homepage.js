'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$log', 'listState', '$http', 'errorPage', function($scope, $log, listState, $http, signalError) {

    var checklistURL = "content/checklist.json";
    var nonConformitySheetURL = "content/non-conformity-sheet.json";

    $scope.startForm = {};

    var checklistStructure = {
        checklist: [],
        nonConformitySheet: []
    };

    $scope.startSession = function() {
        $http.get(checklistURL).then(function(response) {
            //callback promise fullfilled
            if(typeof(response.data) == 'object'){
                //risposta valida
                $log.log("risposta checklistData valida");
                checklistStructure.checklist = response.data;


                //ora recupero la non conformity sheet
                $http.get(nonConformitySheetURL).then(function(response) {
                    //callback promise fullfilled
                    if(typeof(response.data) == 'object'){
                        //risposta valida
                        $log.log("Risposta nc valida");
                        checklistStructure.nonConformitySheet = response.data;
                        $log.log(checklistStructure);
                        $log.log("inizio checklist");
                        listState.setChecklistInfo($scope.startForm);
                        listState.startList(checklistStructure);
                    } else {
                        //risposta invalida
                        $log.log("risposta nc invalida");
                        signalError("01", "C'è stato un errore nell recupero della scheda non-conformità");
                    }

                },function(response) {
                    //callback rejected promise
                    $log.log("la get ha avuto esito negativo" + response);
                    signalError(response.status, response.statusText);
                });
            } else {
                //risposta invalida
                $log.log("risposta checklistdata invalida");
                signalError("01", "C'è stato un errore nell recupero della checklist");
            }
        },function(response) {
            //callback rejected promise
            $log.log("la get csData ha avuto esito negativo" + response);
            signalError(response.status, response.statusText);
        });


    };
}]);
