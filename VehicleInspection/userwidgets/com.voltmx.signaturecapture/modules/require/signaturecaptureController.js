define(['./ControllerImplementation.js','./VoltmxLogger'], function(ControllerImplementation,voltmxLoggerModule) {
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = new voltmxLoggerModule("signaturecapture/signatureCaptureController");
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //var analytics=require("com/voltmx/"+"signaturecapture"+"/analytics");
      //analytics.notifyAnalytics();
      voltmxmp.logger.trace("-- Entering constructor signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
      this.canvas_width = "94%";
      this.canvas_height = "75%";
      this._image = "";
      this._saveAs = "";
      this._saveTo = "";
      this._saveSignature = "";
      this._penColor = "";
      this._backgroundHex = "";
      this.handler = new ControllerImplementation(this, baseConfig.id);
      this.view.btnSave.onClick = this.onClickSave;
      this.view.lblCancel.onTouchStart = this.onClickClear;
      voltmxmp.logger.trace("-- Exiting constructor signatureCaptureController --", voltmxmp.logger.FUNCTION_EXIT);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "penColor", function(val) {
        voltmxmp.logger.trace("-- Entering setter penColor in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          var regex = /(?:[0-9a-fA-F]{3}){1,2}$/gm;
          if (regex.test(val)) {
            this._penColor = val;
          } else {
            this.onErrorCallback("please povide valid hex color code. Do not prefix #");
          }
        }
        voltmxmp.logger.trace("-- Exiting setter penColor in signatureCaptureController --", voltmxmp.logger.FUNCTION_EXIT);
      });
      
      
      defineSetter(this, "objectId", function(val) {
  this._objectId = val;
});

defineGetter(this, "objectId", function() {
  return this._objectId;
});

      defineGetter(this, "penColor", function() {
        voltmxmp.logger.trace("-- Entering getter penColor in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        return this._penColor;
      });

      defineSetter(this, "canvasBackground", function(val) {

        voltmxmp.logger.trace("-- Entering setter canvasBackground in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          var regex = /(?:[0-9a-fA-F]{3}){1,2}$/gm;
          if (regex.test(val)) {
            this._backgroundHex = val;
          } else {
            this.onErrorCallback("please povide valid hex color code. Do not prefix #");
          }
        }
        voltmxmp.logger.trace("-- Exiting setter canvasBackground in signatureCaptureController --", voltmxmp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "canvasBackground", function() {
        voltmxmp.logger.trace("-- Entering getter canvasBackground in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        return this._backgroundHex;
      });

      defineSetter(this, "saveAs", function(val) {
        voltmxmp.logger.trace("-- Entering setter saveAs in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          this._saveAs = val;
        }
        voltmxmp.logger.trace("-- Exiting setter saveAs in signatureCaptureController --", voltmxmp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "saveAs", function() {
        voltmxmp.logger.trace("-- Entering getter saveAs in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        return this._saveAs;
      });
      defineSetter(this, "saveTo", function(val) {
        voltmxmp.logger.trace("-- Entering setter saveTo in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          this._saveTo = val;
        }
        voltmxmp.logger.trace("-- Exiting setter saveTo in signatureCaptureController --", voltmxmp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "saveTo", function() {
        voltmxmp.logger.trace("-- Entering getter saveTo in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        return this._saveTo;
      });
      //saveSignature
      defineSetter(this, "saveSignature", function(val) {
        voltmxmp.logger.trace("-- Entering setter saveSignature in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          this._saveSignature = val;
        }
        voltmxmp.logger.trace("-- Exiting setter saveSignature in signatureCaptureController --", voltmxmp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "saveSignature", function() {
        voltmxmp.logger.trace("-- Entering getter saveSignature in signatureCaptureController --", voltmxmp.logger.FUNCTION_ENTRY);
        return this._saveSignature;
      });
    },
    /**
         * @function validateMaxHeightAndWidth
         * @private
         * @description used to validate the passthrough property of height and width to be of maximum value
         */
    validateMaxHeightAndWidth: function(){
      if(this.view.flxCanvas.width.endsWith("%")){
        if(parseInt(this.view.flxCanvas.width.slice(0,this.view.flxCanvas.width.length))>94){
          this.view.flxCanvas.width = "94%";
        }
      }
      else if(this.view.flxCanvas.width.endsWith("dp")||this.view.flxCanvas.width.endsWith("Dp")){
        if(parseInt(this.view.flxCanvas.width.slice(0,this.view.flxCanvas.width.length-1))>338){
          this.view.flxCanvas.width = "338dp";
        }
      }
      if(this.view.flxCanvas.height.endsWith("%")){
        if(parseInt(this.view.flxCanvas.height.slice(0,this.view.flxCanvas.height.length))>75){
          this.view.flxCanvas.height = "75%";
        }
      }
      else if(this.view.flxCanvas.height.endsWith("dp")||this.view.flxCanvas.height.endsWith("Dp")){
        if(parseInt(this.view.flxCanvas.height.slice(0,this.view.flxCanvas.height.length-1))>320){
          this.view.flxCanvas.height = "320dp";
        }
      }
    },
    /**
         * @function addSignatureCanvas
         * @private
         * @description adds the signature canvas into the native contatiner at post show
         */
    addSignatureCanvas: function(eventobject) {
      voltmxmp.logger.trace("-- Entering addSignatureCanvas --", voltmxmp.logger.FUNCTION_ENTRY);
      this.validateMaxHeightAndWidth();
      this.handler.addSignatureCanvas(eventobject, this._penColor, this._backgroundHex, this._saveAs);
      voltmxmp.logger.trace("-- Exiting addSignatureCanvas --", voltmxmp.logger.FUNCTION_EXIT);
    },
    /**
         * @function onClickClear
         * @private
         * @description clear behaviour
         */
    onClickClear: function() {
      voltmxmp.logger.trace("-- Entering onClickClear --", voltmxmp.logger.FUNCTION_ENTRY);
      this.handler.onClickClear();
      voltmxmp.logger.trace("-- Exiting onClickClear --", voltmxmp.logger.FUNCTION_EXIT);
    },
    /**
         * @function getSignatureFromDevice
         * @private
         * @description returns the decrypted signature base64
         */
    getSignatureFromDevice:function(){
      voltmxmp.logger.trace("-- Entering getSignatureFromDevice --", voltmxmp.logger.FUNCTION_ENTRY);
      voltmxmp.logger.trace("-- Exiting getSignatureFromDevice --", voltmxmp.logger.FUNCTION_EXIT);
      return this.handler.getSignatureFromDevice();
    },
    /**
         * @function onClickSave
         * @private
         */
    onClickSave: function() {
      voltmxmp.logger.trace("-- Entering onClickSave --", voltmxmp.logger.FUNCTION_ENTRY);
      voltmx.runOnMainThread(function() {
        if(this._saveSignature){
          this.handler.onClickSave();
        }
        else{
          this.handler.validateSignature();
        }
      }.bind(this), []);
      voltmxmp.logger.trace("-- Exiting onClickSave --", voltmxmp.logger.FUNCTION_EXIT);
    },
    /**
         * @function onSaveImageSuccess
         * @exposed
         * @description event for image save success
         */

    onSaveImageSuccess: function(response){
      var config ={
        albumName: "MyAlbum",
        extensionType: voltmx.image.ENCODE_PNG,
      };  

      var imgName = response;
      var img = voltmx.image.createImage(imgName);
      img.writeToMediaGallery(config);
//       var signatureBase64 = this.getSignatureFromDevice();
      var signatureBase64 = voltmx.convertToBase64(response);
//        alert("Signature Base64:\n" + signatureBase64);
      voltmx.store.setItem("signature", signatureBase64);
//       this.view.setVisibility(false);
      var currentForm = voltmx.application.getCurrentForm();
      if (currentForm && currentForm.flxSignature) {
        currentForm.flxSignature.setVisibility(false);
      }
      
//       voltmx.ui.Alert({message:"Successfully saved to device gallery!!!",alertType:constants.ALERT_TYPE_INFO},{});
    }, 
    

    /**
         * @function onSaveImageFailure
         * @exposed
         * @description event for image save failure
         */
    onSaveImageFailure: function(response){
      voltmx.ui.Alert({message:"Please allow access to photos from settings",alertType:constants.ALERT_TYPE_ERROR},{});
    },
    /**
         * @function onErrorCallback
         * @exposed
         * @description event for component exception
         */
    onErrorCallback: function(response){

    },
    /**
         * @function onCheckValidity
         * @exposed
         * @description event for checking if signature present or not
         */
    onCheckValidity: function(bool){

    },
    /**
         * @function onClickRedo
         * @exposed
         * @description event for Redo the signature
         */
    onClickRedo: function(){
      voltmxmp.logger.trace("-- Entering onClickRedo --", voltmxmp.logger.FUNCTION_ENTRY);
      voltmx.runOnMainThread(function () {
        this.handler.onClickRedo();
      }.bind(this), []);
      voltmxmp.logger.trace("-- Exiting onClickRedo --", voltmxmp.logger.FUNCTION_EXIT);
    },
    /**
         * @function onClickUndo
         * @exposed
         * @description event for Undo the signature
         */
    onClickUndo: function(){
      voltmxmp.logger.trace("-- Entering onClickUndo --", voltmxmp.logger.FUNCTION_ENTRY);
      voltmx.runOnMainThread(function () {
        this.handler.onClickUndo();
      }.bind(this), []);
      voltmxmp.logger.trace("-- Exiting onClickUndo --", voltmxmp.logger.FUNCTION_EXIT);
    }
  };
});