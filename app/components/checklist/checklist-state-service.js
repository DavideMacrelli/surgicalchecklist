'use strict';

angular.module('checklistApp.listStateService',[])

/**
 *
 * il servizio 'listState' mantiene lo stato della compilazione della checklist
 * lo stato della checklist attiva corrente è salvata in 'currentListState' che puo essere letto tramite 'getState'
 *
 * per iniziare la compilazione di una checklist usa 'startList'
 *
 */
.factory('listState', ['$log', '$location', function($log, $location) {
    /**
     * I dati riguardanti la checklist attiva
     * dettagli anagrafici, Presidio ospedaliero,
     * sala operatoria, fase corrente, step corrente
     * @type {Object}
     */
    var currentListState = {
        patientDetails: {},
        hospital: "",
        opRoom: "",
        currentPhase: {},   //la fase a cui è arrivata la compilazione
        activePhase: {},    //la fase visualizzata
    };

    function phase(phaseNumber, numberOfSteps, currentStep) {
        this.phaseNumber = phaseNumber;
        this.numberOfSteps = numberOfSteps;
        this.currentStep = currentStep;
    }

    var listPhases = [];
    var checklistStructure = {};

    return {
        /**
         * Ritorna lo stato della sessione attiva
         * @return {Object}
         */
        getState: function() {
            return currentListState;
        },

        getChecklistStructure: function() {
            $log.log(checklistStructure);
            return checklistStructure;
        },

        /**
         * Avvia la compilazione di una checklist,
         *
         * @param  {Object} parametri iniziali
         */
        startList: function(checklistData) {
            checklistStructure = checklistData;
            $log.log(checklistStructure);
            //costruisco l'array che modella le fasi della checklist
            for (var i = 0; i < checklistStructure.checklist.length; i++) {
                listPhases[i] = new phase(i, checklistStructure.checklist[i].steps.length, 0);
                $log.log("creata nuova fase");
                $log.log(listPhases[i]);
            }
            currentListState.currentPhase = listPhases[0];
            currentListState.activePhase = listPhases[0];
            $log.log("le fasi sono:");
            $log.log(listPhases);
            $location.path('/checklist-view');

        },

        /**
         * Avanza al prossimo step della checklist
         */
        nextStep: function() {
            currentListState.currentPhase.currentStep++;
        },
        /**
         * Ritorna allo step precedente
         */
        prevStep: function () {
            if(currentListState.currentPhase.currentStep !== 0){
                currentListState.currentPhase.currentStep--;
            }
        },

        /**
         * avanza alla fase sucessiva
         */
        nextPhase: function () {
            currentListState.currentPhase = listPhases[currentListState.currentPhase.phaseNumber + 1];
            currentListState.activePhase = currentListState.currentPhase;
        },

        /**
         * Ritorna lo stato della checklist a quello iniziale
         */
        resetState: function () {
            currentListState = {
                patientDetails: {},
                hospital: "",
                opRoom: "",
                currentPhase: {},   //la fase a cui è arrivata la compilazione
                activePhase: {},    //la fase visualizzata
            };
        },

        /**
         * TODO documentazione
         * @param {[type]} info
         */
        setChecklistInfo: function (info) {
            if ("patientDetails" in info) {
                currentListState.patientDetails = info.patientDetails;
            }
            if ("hospital" in info) {
                currentListState.hospital = info.hospital;
            }
            if ("opRoom" in info) {
                currentListState.opRoom = info.opRoom;
            }
        }
    };

}]);
