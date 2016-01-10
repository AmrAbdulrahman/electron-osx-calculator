angular
    .module('calcApp', []);

angular
    .module('calcApp')
    .run(function($rootScope, $interval) {
        
        function listenToKeypresses() {
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
        }

        // this is a long workaround
        // it's only necessary if we need to run the app as webpage
        // to do so, i worked around loading the JQ
        // if we run as Electron app, CommonJS env, then we load JQ as
        // node module,
        // if we run as webpage, then we load it dynamically as bower
        // component
        // so, in second case, we need to wait for JQ to load after other
        // scripts, couldn't reach a solution to load it "dynamically" at
        // the beginning
        var checkPromise = $interval(function checkJQ() {
            if (window.$) {
                $interval.cancel(checkPromise);
                listenToKeypresses();
            }
        });



    });
