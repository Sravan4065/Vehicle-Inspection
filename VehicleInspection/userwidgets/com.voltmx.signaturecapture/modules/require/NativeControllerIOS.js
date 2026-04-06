define(['./Inherits', './NativeController', './VoltmxLogger'], function(Inherits, NativeController, voltmxLoggerModule) {
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = new voltmxLoggerModule("signaturecapture/NativeControllerIOS");
  var signatureObj;
  var NativeControllerIOS = function(componentInstance) {
    voltmxmp.logger.trace("-- Start constructor NativeControllerIOS --", voltmxmp.logger.FUNCTION_ENTRY);
    self = this;
    this.componentInstance = componentInstance;
    this.signatureClass = objc.import('SimpleSignatureView');
    this.signatureObj = this.signatureClass.alloc().create(this.componentInstance.view.natConSignaturePad.getContainerView());
    this._saveType = "";
    NativeController(componentInstance);
    voltmxmp.logger.trace("-- Exit constructor NativeControllerIOS -- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  Inherits(NativeControllerIOS, NativeController);
  NativeControllerIOS.prototype.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
    voltmxmp.logger.trace("-- Entering addSignatureCanvas in NativeControllerIOS -- ", voltmxmp.logger.FUNCTION_ENTRY);
    this._saveType = saveType;	
    if (penColor && bgColor) {
      this.signatureObj.lineColor = penColor;
      this.signatureObj.bgColor = bgColor;
    } 
    voltmxmp.logger.trace("-- Exiting addSignatureCanvas in NativeControllerIOS-- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  NativeControllerIOS.prototype.onClickClear = function() {
    voltmxmp.logger.trace("-- Entering onClickClear in NativeControllerIOS -- ", voltmxmp.logger.FUNCTION_ENTRY);
    this.signatureObj.erase();
    voltmxmp.logger.trace("-- Exiting onClickClear in NativeControllerIOS-- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  NativeControllerIOS.prototype.onClickRedo = function() {
    voltmxmp.logger.trace("-- Entering onClickRedo in NativeControllerIOS -- ", voltmxmp.logger.FUNCTION_ENTRY);
    this.signatureObj.redoSign();
    voltmxmp.logger.trace("-- Exiting onClickRedo in NativeControllerIOS-- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  NativeControllerIOS.prototype.onClickUndo = function() {
    voltmxmp.logger.trace("-- Entering onClickUndo in NativeControllerIOS -- ", voltmxmp.logger.FUNCTION_ENTRY);
    this.signatureObj.undoSign();
    voltmxmp.logger.trace("-- Exiting onClickUndo in NativeControllerIOS-- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  NativeControllerIOS.prototype.onClickSave = function() {
    voltmxmp.logger.trace("-- Entering onClickSave in NativeControllerIOS -- ", voltmxmp.logger.FUNCTION_ENTRY);
    var imageBitmap = this.signatureObj.captureSignature();
    return imageBitmap;
  };
  NativeControllerIOS.prototype.validateSignature = function() {
    voltmxmp.logger.trace("-- Entering validateSignature in NativeControllerAndroid -- ", voltmxmp.logger.FUNCTION_ENTRY);
    return this.signatureObj.signatureExists();
  };
  return NativeControllerIOS;
});