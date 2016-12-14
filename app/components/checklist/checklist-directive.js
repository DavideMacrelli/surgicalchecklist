'use strict';

angular.module('checklistApp.checklistDirective',[])

.directive('myChecklist', [ function() {

        return {
            //la nuova direttiva puo essere usata solo come attibuto
            restrict: 'A',

            scope: {
                checklist: '=checklistStructure',
                listState: '=checklistState',
                listControls: '=checklistControls',
                title: '@checklistTitle'

            },

            //il file html allegato all'interno dell'elemento con la direttiva
            templateUrl: 'components/checklist/checklist-776.html',

            //TODO: isolare lo scope, in questo momento la direttiva è dipendente dallo scope della 'checklist-view'

        };

    }
]);
