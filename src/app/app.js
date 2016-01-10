angular
    .module('calcApp', []);

angular
    .module('calcApp')
    .run(function($rootScope) {
        
        $(document)
            .keypress(function(event) {
                $rootScope.$broadcast('keypress', {event: event});
            });

        // backspace trapping
        $('html').keyup(function(event){
            if(event.keyCode == 8) {
                $rootScope.$broadcast('keypress', {event: event});
            }
        }); 
    });
