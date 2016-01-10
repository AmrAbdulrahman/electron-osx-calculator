angular
    .module('calcApp')
    .directive('calculator', function($rootScope) {
        return {
            templateUrl: 'app/directives/calculator/calculator.html',
            link: function(scope) {
                var logger = {
                    log: function(msg) {
                        scope.logMsg = msg;
                    },
                    clear: function() {
                        this.log('');
                    }
                };

                scope.result = 0;
                scope.operand1 = null;

                scope.buttonDef = {
                    'clear': {
                        text: 'C',
                        isOperation: true,
                        action: function() {
                            logger.clear();

                            if (scope.result === 0) {
                                return logger.log('Don\'t you see? already cleared.')
                            }

                            scope.operand1 = null;
                            scope.result = 0;
                        }
                    },
                    'sign': {
                        text: '+/-',
                        isOperation: true,
                        action: function() {
                            logger.clear();
                            scope.result *= -1;
                        }
                    },
                    'percentage': {
                        text: '%',
                        isOperation: true,
                        action: function() {
                            logger.clear();
                            scope.result /= 100; 
                        }
                    },
                    'divide': {
                        text: '/',
                        isOperation: true,
                        action: function() {
                            logger.clear();
                            startTwoOperandsMode(this.text)
                        }
                    },
                    'multiply': {
                        text: '*',
                        isOperation: true,
                        action: function() {
                            logger.clear();
                            startTwoOperandsMode(this.text)
                        }
                    },
                    'subtract': {
                        text: '-',
                        isOperation: true,
                        action: function() {
                            logger.clear();
                            startTwoOperandsMode(this.text)
                        }
                    },
                    'add': {
                        text: '+',
                        isOperation: true,
                        action: function() {
                            logger.clear();
                            startTwoOperandsMode(this.text)
                        }
                    },
                    'period': {
                        text: '.',
                        isOperation: true,
                        action: function() {
                            logger.clear();

                            if (scope.result.toString().indexOf('.') > 0) {
                                return logger.log('Already having a period.');
                            }

                            scope.result = scope.result.toString() + '.'; 
                        }
                    },
                    'equal': {
                        text: '=',
                        isOperation: true,
                        action: function() {
                            logger.clear();

                            if(scope.operand1 == null) {
                                return logger.log('Nothing to calculate here');
                            }

                            scope.result = calculate(scope.operand1, scope.result, scope.operation);
                            scope.operand1 = null;
                            scope.operation = null;
                        }
                    },
                    'back': {
                        drawable: false,
                        action: function() {
                            logger.clear();

                            // just started two operands mode
                            if (isNaN(scope.result)) {
                                // quit it
                                return endTwoOperandsMode();
                            }

                            var resultStr = (scope.result + '');
                            scope.result = resultStr.substr(0, resultStr.length - 1);

                            if (scope.result.length === 0 && scope.operation) {
                                scope.result = NaN;
                            } else if (scope.result.length === 0) {
                                scope.result = 0;
                            }
                        }
                    }
                };

                // generate numeric buttons
                for (var i=0; i<=9; i++) {
                    var key = i.toString();

                    scope.buttonDef[key] = {
                        text: key,
                        action: function() {
                            logger.clear();

                            // just started two operands mode
                            if (isNaN(scope.result)) {
                                scope.result = 0;
                            }

                            scope.result = scope.result.toString() + this.text;
                        }
                    };

                    // display "0" button as large one
                    if (i === 0) {
                        scope.buttonDef[key].span = 2;
                    }
                }

                function calculate(operand1, operand2, operation) {
                    operand1 = parseFloat(operand1);
                    operand2 = parseFloat(operand2);

                    switch (operation) {
                        case '/':
                            return operand1 / operand2;
                        case '*':
                            return operand1 * operand2;
                        case '+':
                            return operand1 + operand2;
                        case '-':
                            return operand1 - operand2;
                    };
                }

                function startTwoOperandsMode(operation) {
                    if (scope.operand1 != null && scope.operation == operation) {
                        return logger.log('You just pressed "' + operation + '"');
                    }

                    // switch to two operands mode
                    if (scope.operand1 == null) {
                        scope.operand1 = scope.result;
                        scope.result = NaN;
                    }

                    scope.operation = operation;
                }

                function endTwoOperandsMode() {
                    scope.result = scope.operand1;
                    scope.operand1 = null;
                    scope.operation = null;
                }

                // button orders
                scope.buttons = [
                    'clear', 'sign',  'percentage', 'divide',
                    '7',     '8',     '9',          'multiply',
                    '4',     '5',     '6',          'subtract',
                    '1',     '2',     '3',          'add',
                    '0',     'period','equal'
                ];


                // keyboard support
                $rootScope.$on('keypress', function(event, data) {
                    var keyCode = data.event.keyCode;

                    // we need to force update because event originally came from QJ
                    scope.$apply(function() {
                        keyboardHit(keyCode);
                    });
                });

                var keyCodeButtonMap = {
                    99: 'clear',
                    47: 'divide',
                    42: 'multiply',
                    95: 'subtract',
                    43: 'add',
                    46: 'period',
                    61: 'equal', 13: 'equal',
                    8: 'back'
                };

                function keyboardHit(keyCode) {
                    // digit
                    if (keyCode >= 48 && keyCode <= 57) {
                        var key = (keyCode - 48) + '';

                        scope.buttonDef[key].action();
                    } else {
                        var key = keyCodeButtonMap[keyCode];

                        if (key) {
                            scope.buttonDef[key].action();
                        }
                    }
                }
            }
        };
    });