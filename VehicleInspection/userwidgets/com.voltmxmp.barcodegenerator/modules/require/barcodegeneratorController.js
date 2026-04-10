/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 **/
define(function() {
    var voltmxmp = voltmxmp || {};
    var VoltmxLoggerModule = require("com/voltmxmp/barcodegenerator/VoltmxLogger");
    voltmxmp.logger = (new VoltmxLoggerModule("Barcode Generator Component")) || function() {};
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._barcodeProperties = {
                displayValue: true,
                width: "2",
                height: "40",
                textAlign: "center",
                textPosition: "bottom",
                format: "CODE128",
                background: "#ffffff",
                lineColor: "#000000"
            };
            this.enumCodes = {
                CODE128: {
                    regex: /[ -~]+/gm,
                    error: 'wrong passes'
                },
                CODE39: {
                    regex: /^[a-zA-Z0-9-.$/+% ]+$/gm,
                    error: 'wrong passes'
                },
                EAN13: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                EAN8: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                EAN5: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                EAN2: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                UPC: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                ITF14: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                MSI: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                MSI10: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                MSI11: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                MSI1010: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
                MSI1110: {
                    regex: /^[0-9]+$/gm,
                    error: 'wrong passes'
                },
            };
        },
        _dataToEncode: null,
        errorCallback: function(exception) {},
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            defineSetter(this, 'dataToEncode', function (val) {
                voltmxmp.logger.trace('----------------------------- Start Setting dataToEncode', voltmxmp.logger.FUNCTION_ENTRY);
                try {
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._dataToEncode = val;
                    } else {
                        throw {
                            message: 'wrong data passed for dataToEncode',
                            Error: 'Wrong dataToEncode'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting dataToEncode', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'barcodeWidth', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting barcodeWidth', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.width = val;
                    } else {
                        throw {
                            message: 'wrong data passed for barcodeWidth',
                            Error: 'Wrong barcodeWidth'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting barcodeWidth', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'barcodeHeight', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting barcodeHeight', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.height = val;
                    } else {
                        throw {
                            message: 'wrong data passed for barcodeHeight',
                            Error: 'Wrong barcodeHeight'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting barcodeHeight', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'backGroundColor', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting backgroundColor', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.background = val;
                    } else {
                        throw {
                            message: 'wrong data passed for backgroundColor',
                            Error: 'Wrong backgroundColor'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting backgroundColor', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'lineColor', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting lineColor', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.lineColor = val;
                    } else {
                        throw {
                            message: 'wrong data passed for lineColor',
                            Error: 'Wrong lineColor'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting lineColor', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'barcodeFormat', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting barcodeFormat', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.format = val;
                    } else {
                        throw {
                            message: 'wrong data passed for barcodeFormat',
                            Error: 'Wrong barcodeFormat'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting barcodeFormat', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'displayValue', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting displayValue', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'boolean') {
                        this._barcodeProperties.displayValue = val;
                    } else {
                        throw {
                            message: 'wrong data passed for displayValue',
                            Error: 'Wrong displayValue'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting displayValue', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'barcodefontStyle', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting fontStyle', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        this._barcodeProperties.fontOptions = val;
                        if (val === 'none') {
                            this._barcodeProperties.fontOptions = '';
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for fontStyle',
                            Error: 'Wrong fontStyle'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting fontStyle', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'barcodefontFamily', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting fontFamily', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.font = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for fontFamily',
                            Error: 'Wrong fontFamily'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting fontFamily', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'barcodefontSize', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting fontSize', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.fontSize = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for fontSize',
                            Error: 'Wrong fontSize'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting fontSize', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'textAlign', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting textAlign', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.textAlign = val;
                    } else {
                        throw {
                            message: 'wrong data passed for textAlign',
                            Error: 'Wrong textAlign'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting displayValue', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'textPosition', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting textPosition', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
                        this._barcodeProperties.textPosition = val;
                    } else {
                        throw {
                            message: 'wrong data passed for textPosition',
                            Error: 'Wrong textPosition'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting textPosition', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'textMargin', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting textMargin', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.textMargin = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for textMargin',
                            Error: 'Wrong textMargin'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting textMargin', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'marginTop', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting marginTop', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.marginTop = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for marginTop',
                            Error: 'Wrong marginTop'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting marginTop', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'marginBottom', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting marginBottom', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.marginBottom = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for marginBottom',
                            Error: 'Wrong marginBottom'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting marginBottom', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'marginLeft', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting marginLeft', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.marginLeft = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for marginLeft',
                            Error: 'Wrong marginLeft'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting marginLeft', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
            defineSetter(this, 'marginRight', function (val) {
                try {
                    voltmxmp.logger.trace('----------------------------- Start Setting marginRight', voltmxmp.logger.FUNCTION_ENTRY);
                    if (val !== undefined && val !== null && typeof val === 'string') {
                        if (val !== '') {
                            this._barcodeProperties.marginRight = val;
                        }
                    } else {
                        throw {
                            message: 'wrong data passed for marginRight',
                            Error: 'Wrong marginRight'
                        };
                    }
                } catch (e) {
                    voltmxmp.logger.trace('----------------------------- End Setting marginRight', voltmxmp.logger.FUNCTION_EXIT);
                    this.errorCallback(e);
                }
            });
        },
        generate: function() {
            try {
                voltmxmp.logger.trace("----------------------------- Start  generate", voltmxmp.logger.FUNCTION_ENTRY);
                var regex1 = this.enumCodes[this._barcodeProperties.format].regex;
                regex1.lastIndex = 0;
                var result = regex1.test(this._dataToEncode);
                if (result) {
                    this._barcodeGenerator(this._dataToEncode);
                } else {
                    throw {
                        message: 'Data passed for DataToEncode does not match barcode format',
                        Error: 'Invalid Data passed'
                    };
                }
                voltmxmp.logger.trace("----------------------------- End generate", voltmxmp.logger.FUNCTION_EXIT);
            } catch (e) {
                voltmxmp.logger.error(JSON.stringify(e), voltmxmp.logger.EXCEPTION);
                this.errorCallback(e);
            }
        },
        _barcodeGenerator: function(mytext) {
            try {
                voltmxmp.logger.trace("----------------------------- Start  _barcodeGenerator", voltmxmp.logger.FUNCTION_ENTRY);
                if (mytext !== undefined && mytext !== null && mytext !== "" && typeof mytext === 'string') {
                    this.view.brsrGenerator.evaluateJavaScript("createBarcode('" + mytext + "','" + JSON.stringify(this._barcodeProperties) + "');");
                } else {
                    throw {
                        message: 'wrong data passed for mytext',
                        Error: 'Wrong text passed'
                    };
                }
                voltmxmp.logger.trace("----------------------------- End _barcodeGenerator", voltmxmp.logger.FUNCTION_EXIT);
            } catch (e) {
                this.errorCallback(e);
                voltmxmp.logger.error(JSON.stringify(e), voltmxmp.logger.EXCEPTION);
            }
        }
    };
});