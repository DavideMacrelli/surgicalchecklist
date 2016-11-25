'use strict';

angular.module('checklistApp.listStateService',[])

/**
 *
 * il servizio 'listState' mantiene lo stato della compilazione della checklist
 * lo stato della checklist attiva corrente è salvata in 'currentSession' che puo essere letto tramite 'getCurrentSession'
 *
 * per iniziare la compilazione di una checklist usa 'startList'
 *
 * permette inoltre di archiviare lo stato in un file json (Prototipo: oggetto 'lastSession') con 'storeSession'
 *
 */
.factory('listState', ['$log', '$location', function($log, $location) {
    var currentListState = {
        barcode: '',
        details: {},
        phase: 0,
        step: 0
    };

    var setCurrentSession = function(session) {
        $log.log("session loaded");
        currentListState.barcode = session.barcode;
        currentListState.details = session.details;
        currentListState.phase = session.phase;
        currentListState.step = session.step;
    };

    //Prototipo: dove salvo la sessione precedente
    var lastSession = {
        barcode: '',
        details: {},
        phase: 0,
        step: 0
    };

    var storeSession = function(session) {
        //Prototipo
        lastSession.barcode = session.barcode;
        lastSession.details = session.details;
        lastSession.phase = session.phase;
        lastSession.step = session.step;
        $log.log("session stored" + lastSession.barcode);
    };

    var newSession = function(barcode, details) {
        //TODO: crea uno file json nuovo
        //Prototipo
        currentListState = {
            barcode: barcode,
            details: details,
            phase: 0,
            step: 0
        };
        $log.log("started new session: " + currentListState.barcode);
    };

    return {
        getCurrentSession: function() {
            return currentListState;
        },

        startList: function(barcode, details) {
            //TODO: Salvare le sessioni in file json, fare una get per recuperarli

            //Prototipo: controllo la last session
            if(barcode == lastSession.barcode){
                //esiste già una sessione di questa operazione
                $log.log("esiste già una sessione");
                setCurrentSession(lastSession);
                $location.path('/checklist-view');
            } else {
                //non esiste una sessione per la operazione
                $log.log("non esiste una sessione");
                newSession(barcode, details);
                $location.path('/checklist-view');
            }
        },

        nextStep: function() {
            currentListState.step++;
            $log.log("step nel service: " + currentListState.step);
        },

        exitSession: function() {
            $log.log("exiting session");
            storeSession(currentListState);
            currentListState.barcode = '';
            currentListState.details = {};
            currentListState.phase = 0;
            currentListState.step = 0;
        }
    };

}]);
