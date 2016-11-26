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
    /**
     * Stato della checklist attiva
     * @type {Object}
     */
    var currentListState = {
        barcode: '',
        details: {},
        phase: 0,
        step: 0
    };

    /**
     * setter per 'currentListState'
     * @param {Object} session la sessione da impostare
     */
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

    /**
     * Archivia la sessione attiva
     *
     */
    var storeSession = function() {
        //Prototipo
        lastSession.barcode = currentListState.barcode;
        lastSession.details = currentListState.details;
        lastSession.phase = currentListState.phase;
        lastSession.step = currentListState.step;
        $log.log("session stored" + lastSession.barcode + " -- Al passo: " + lastSession.step);
    };

    /**
     * inizia una nuova checklist, archiviandola in un file json
     *
     * @param  {String} barcode barcode paziente sottoposto all'operazione
     * @param  {Object} details dettagli dell'operazione
     */
    var newSession = function(barcode, details) {
        //TODO: crea un file json nuovo
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
        /**
         * Ritorna lo stato della sessione attiva
         * @return {Object}
         */
        getCurrentSession: function() {
            return currentListState;
        },

        /**
         * Avvia la compilazione di una checklist, se questa checklist è già stata compilata in precedenza
         * ottiene lo stato archiviato in un file json e lo carica come stato attivo
         * altrimenti inizia una nuova checklist archiviando un file nuovo
         *
         * @param  {String} barcode barcode del paziente sottoposto all'operazione
         * @param  {Object} details dettagli dell'operazione
         */
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

        /**
         * Avanza al prossimo step della checklist
         */
        nextStep: function() {
            currentListState.step++;
            $log.log("step nel service: " + currentListState.step);
        },

        /**
         * esce dalla checklist corrente: archivia quella corrente prima di resettarla
         */
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
