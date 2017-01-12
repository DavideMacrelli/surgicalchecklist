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
                label: "Salva Checklist",
                behaviour: function () {
                    $log.log("Checklist Completata");
                    var dataToPost = {
                        "modelID" : "mod-001",
                        "date" : "20150110",
                        "operatorID" : "op-001",
                        "patientID" : "pat-001",
                        "hospitalID" : "hosp-001",
                        "room" : "sala operatoria",
                        "checkStages" : [ {
                            "checks" : [ {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : -1
                            }, {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : 0
                            } ]
                        }, {
                            "checks" : [ {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : 0
                            }, {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : -1
                            } ]
                        }, {
                            "checks" : [ {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : -1
                            }, {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : -1
                            }, {
                                "optionChosen" : 0,
                                "nonComplianceDetected" : 0
                            } ]
                        } ],
                        "_id" : "chklst-20150110-000"
                    }

                    var queryParams = {params: {op: 'saveEmployee'}};/* Query Parameters*/
                    $http.post("URL" , dataToPost, queryParams)
                        .success(function(serverResponse, status, headers, config) {
                        // Updating the $scope postresponse variable to update theview
                        $scope.postresponse = serverResponse.data.firstName + " " + serverResponse.data.lastName;
                    }).error(function(serverResponse, status, headers, config) {
                        alert("Invio Checklist fallito");
                    }
                );
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
