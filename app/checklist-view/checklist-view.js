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
                    	"checklist-id" : "54869",
                    	"company-code": "7856587",
                    	"hospital-code": "080091",
                    	"phases": [{
                    		"phase-title": "sign-in",
                    		"steps": [{
                    			"legend": "1.1) Il paziente ha confermato: Identità",
                    			"selected-options": ["Identità"],
                    			"non-conformities": [
                    	            "Problemi relativi al braccialetto (1.1.1)",
                    	            "Problemi relativi al numero nosologico (1.1.3)"
                    	        ]

                    		},{
                    			"legend": "1.2) Il paziente ha confermato: Sede intervento",
                    			"selected-options": ["Sede intervento"],
                    			"non-conformities": []

                    		},{
                    			"legend": "1.3) Il paziente ha confermato: Procedura",
                    			"selected-options": ["Procedura"],
                    			"non-conformities": []

                    		},{
                    			"legend": "1.4) Il paziente ha confermato: Consensi",
                    			"selected-options": ["Consensi ( anestesiologico/ chirurgico/ emocomponeneti)"],
                    			"non-conformities": []

                    		},{
                    			"legend": "2) Verifica presenza e correttezza della marchatura del sito dell'intervento",
                    			"selected-options": ["non applicabile"],
                    			"non-conformities": []

                    		},{
                    			"legend": "3) Controlli delle apparecchiature di anestesia completati (compreso pulsiossimetro presente)",
                    			"selected-options": [""],
                    			"non-conformities": []

                    		},{
                    			"legend": "4) Verifica corretto funzionamento apparecchiature di sala operatoria",
                    			"selected-options": [""],
                    			"non-conformities": ["non corretto funzionamento"]

                    		},{
                    			"legend": "5) Identificazione dei rischi del paziente: Il paziente riferisce / presenta allergie?",
                    			"selected-options": ["Si"],
                    			"non-conformities": []

                    		},{
                    			"legend": "6) Il paziente presenta difficoltà di gestione delle vie aeree o rischio di aspirazione?",
                    			"selected-options": ["Si, strumentazione/assistenza disponibile"],
                    			"non-conformities": []

                    		},{
                    			"legend": "7) Il paziente presenta rischio di perdite ematiche > 500ml (7ml per Kg nei bambini)?",
                    			"selected-options": ["No"],
                    			"non-conformities": []
                    		}]
                    	}]
                    }
 /* PostData*/
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
