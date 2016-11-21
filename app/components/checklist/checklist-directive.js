'use strict';

angular.module('checklistApp.checklistDirective',[])

.directive('myChecklist', [ function() {

        return {
            //la nuova direttiva puo essere usata solo come attibuto
            restrict: 'A',

            //il file html allegato all'interno dell'elemento con la direttiva
            templateUrl: 'checklist-view/checklist-776.html',

        };

    }
]);
