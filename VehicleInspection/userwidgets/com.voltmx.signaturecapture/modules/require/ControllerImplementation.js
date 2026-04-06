define(['./VoltmxLogger'], function(voltmxLoggerModule) {
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = new voltmxLoggerModule("signaturecapture/ControllerImplementation");
  var ControllerImplementation = function(componentInstance, componentName) {
    this.componentInstance = componentInstance;
    this.componentName = "signaturecapture";
    this.getNativeController = function() {
      try {
        voltmxmp.logger.trace("-- Entering getNativeController in ControllerImplementation constructor -- ", voltmxmp.logger.FUNCTION_ENTRY);
        if (this.nativeControllerInstance === undefined) {
          var deviceInfo = voltmx.os.deviceInfo();
          var platformName = null;
          if (deviceInfo.name.toLowerCase() === 'iphone' || deviceInfo.name.toLowerCase() === 'ipad') {
            platformName = 'IOS';
          } else if (deviceInfo.name.toLowerCase() === 'android') {
            platformName = 'Android';
          } else {
            platformName = deviceInfo.name.charAt(0).toUpperCase() + deviceInfo.name.slice(1);
          }
          var nativeControllerPath = 'com/voltmx/' + this.componentName + '/NativeController' + platformName + '.js';
          var nativeController = require(nativeControllerPath);
          this.nativeControllerInstance = new nativeController(this.componentInstance);
        }
        voltmxmp.logger.trace("-- Exiting getNativeController in ControllerImplementation constructor -- ", voltmxmp.logger.FUNCTION_EXIT);
        return this.nativeControllerInstance;
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        this.componentInstance.onErrorCallback(exception);
      }
    };
  };
  /**
     * @function addSignatureCanvas
     * @private
     * @description: adds the canvas object to the view
     */
  ControllerImplementation.prototype.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
    try {
      voltmxmp.logger.trace("-- Entering addSignatureCanvas -- ", voltmxmp.logger.FUNCTION_ENTRY);
      this.getNativeController().addSignatureCanvas(eventobj, penColor, bgColor, saveType);
      voltmxmp.logger.trace("-- Exiting addSignatureCanvas -- ", voltmxmp.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  ControllerImplementation.prototype.validateSignature = function() {
    try {
      voltmxmp.logger.trace("-- Entering validateSignature -- ", voltmxmp.logger.FUNCTION_ENTRY);
      var bool = this.getNativeController().validateSignature();
      this.componentInstance.onCheckValidity(bool);
      voltmxmp.logger.trace("-- Exiting validateSignature -- ", voltmxmp.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function onClickClear
     * @private
     * @description: invokes the clear operation
     */
  ControllerImplementation.prototype.onClickClear = function() {
    try {
      voltmxmp.logger.trace("-- Entering onClickClear -- ", voltmxmp.logger.FUNCTION_ENTRY);
      this.getNativeController().onClickClear();
      voltmxmp.logger.trace("-- Exiting onClickClear -- ", voltmxmp.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function onClickRedo
     * @private
     * @description: invokes the redo operation
     */
  ControllerImplementation.prototype.onClickRedo = function() {
    try {
      voltmxmp.logger.trace("-- Entering onClickRedo -- ", voltmxmp.logger.FUNCTION_ENTRY);
      this.getNativeController().onClickRedo();
      voltmxmp.logger.trace("-- Exiting onClickRedo -- ", voltmxmp.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function onClickUndo
     * @private
     * @description: invokes the redo operation
     */
  ControllerImplementation.prototype.onClickUndo = function() {
    try {
      voltmxmp.logger.trace("-- Entering onClickUndo -- ", voltmxmp.logger.FUNCTION_ENTRY);
      this.getNativeController().onClickUndo();
      voltmxmp.logger.trace("-- Exiting onClickUndo -- ", voltmxmp.logger.FUNCTION_EXIT);

    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function onClickSave
     * @private
     * @description: invokes the save operation
     */
  ControllerImplementation.prototype.onClickSave = function() {
    try {
      voltmxmp.logger.trace("-- Entering onClickSave -- ", voltmxmp.logger.FUNCTION_ENTRY);
      var imgBase64 = this.getNativeController().onClickSave();
      if (this.componentInstance._saveTo === "Device") {
        var encryptedImage = this.getNativeController().encrypt(imgBase64);
        this.getNativeController().saveToDevice(encryptedImage);
      } else if (this.componentInstance._saveTo === "Network File System") {
        this.getNativeController().makeNFSCall(imgBase64); 
      }

      voltmxmp.logger.trace("-- Exiting onClickSave -- ", voltmxmp.logger.FUNCTION_EXIT);

    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function getSignatureFromDevice
     * @exposed
     * @description: returns the signature base64
     */
  ControllerImplementation.prototype.getSignatureFromDevice = function() {
    try {
      voltmxmp.logger.trace("-- Entering getSignatureFromDevice -- ", voltmxmp.logger.FUNCTION_ENTRY);
      return this.getNativeController().getSignatureFromDevice();
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
      voltmxmp.logger.trace("-- Exiting getSignatureFromDevice -- ", voltmxmp.logger.FUNCTION_EXIT);
    }
  };
  return ControllerImplementation;
});