define(['./Inherits', './NativeController', './VoltmxLogger'], function(Inherits, NativeController, voltmxLoggerModule) {
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = new voltmxLoggerModule("signaturecapture/NativeControllerAndroid");
  var NativeControllerAndroid = function(componentInstance) {
    voltmxmp.logger.trace("-- Start constructor NativeControllerAndroid --", voltmxmp.logger.FUNCTION_ENTRY);
    self = this;
    var signature = java.import("konymp.com.signatureview.SignatureView");
    var voltmxmain = java.import("com.konylabs.android.KonyMain");  
    var voltmxContext = voltmxmain.getActivityContext();        
    this.sigObj = new signature(voltmxContext);
    this._saveType = "";
    this.componentInstance = componentInstance;
    NativeController(componentInstance);
    voltmxmp.logger.trace("-- Exit constructor NativeControllerAndroid -- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  Inherits(NativeControllerAndroid, NativeController);
  NativeControllerAndroid.prototype.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
    voltmxmp.logger.trace("-- Entering addSignatureCanvas in NativeControllerAndroid -- ", voltmxmp.logger.FUNCTION_ENTRY);
    this._saveType = saveType;
    if (penColor) {
      this.sigObj.setPenColor("#" + penColor);
    }
    if (bgColor) {
      this.sigObj.setCanvasColor("#" + bgColor);
    }
    if(self.sigObj.getParent()!==null){
      (self.sigObj.getParent()).removeView(self.sigObj);
    }
    eventobj.addView(self.sigObj);
    voltmxmp.logger.trace("-- Exiting addSignatureCanvas in NativeControllerAndroid-- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  NativeControllerAndroid.prototype.onClickClear = function() {
    voltmxmp.logger.trace("-- Entering onClickClear in NativeControllerAndroid -- ", voltmxmp.logger.FUNCTION_ENTRY);
    this.sigObj.clearSignature();
    voltmxmp.logger.trace("-- Exiting onClickClear in NativeControllerAndroid-- ", voltmxmp.logger.FUNCTION_EXIT);
  };
  NativeControllerAndroid.prototype.onClickSave = function() {
    voltmxmp.logger.trace("-- Entering onClickSave in NativeControllerAndroid -- ", voltmxmp.logger.FUNCTION_ENTRY);
    var imgBase64 = this.sigObj.getSignature(this.componentInstance._saveAs);
    voltmxmp.logger.trace("-- Exiting onClickSave in NativeControllerAndroid-- ", voltmxmp.logger.FUNCTION_EXIT);
    return imgBase64;
  };
  NativeControllerAndroid.prototype.validateSignature = function(){
    voltmxmp.logger.trace("-- Entering validateSignature in NativeControllerAndroid -- ", voltmxmp.logger.FUNCTION_ENTRY);
    voltmxmp.logger.trace("-- Exiting validateSignature in NativeControllerAndroid-- ", voltmxmp.logger.FUNCTION_EXIT);
    return self.sigObj.doesSignatureExist();
  };
  return NativeControllerAndroid;
});