
define(['./VoltmxLogger', './StringEncoder'], function(voltmxLoggerModule, stringEncoder) {
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = new voltmxLoggerModule("signaturecapture/NativeController");
  var NativeController = function(componentInstance) {
    this.componentInstance = componentInstance;
  };
  NativeController.prototype.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
    var errObj = new Error();
    errObj.name = "Exception:SignatureCapture:addSignatureCanvas";
    errObj.message = "You have to implement the method addSignatureCanvas!";
    errObj.number = 101;
    throw errObj;
  };
  NativeController.prototype.onClickClear = function() {
    var errObj = new Error();
    errObj.name = "Exception:SignatureCapture:onClickClear";
    errObj.message = "You have to implement the method onClickClear!";
    errObj.number = 102;
    throw errObj;
  };
  NativeController.prototype.onClickSave = function() {
    var errObj = new Error();
    errObj.name = "Exception:SignatureCapture:onClickSave";
    errObj.message = "You have to implement the method onClickSave!";
    errObj.number = 103;
    throw errObj;
  };
  NativeController.prototype.validateSignature = function() {
    var errObj = new Error();
    errObj.name = "Exception:SignatureCapture:validateSignature";
    errObj.message = "You have to implement the method validateSignature!";
    errObj.number = 103;
    throw errObj;
  };
  NativeController.prototype.onClickRedo = function() {
    var errObj = new Error();
    errObj.name = "Exception:SignatureCapture:onClickRedo";
    errObj.message = "You have to implement the method onClickRedo!";
    errObj.number = 104;
    throw errObj;
  };
  NativeController.prototype.onClickUndo = function() {
    var errObj = new Error();
    errObj.name = "Exception:SignatureCapture:onClickUndo";
    errObj.message = "You have to implement the method onClickUndo!";
    errObj.number = 105;
    throw errObj;
  };
  /**
     * @function encrypt
     * @private
     * @description: encrypts the base 64
     */
  NativeController.prototype.encrypt = function(imgBase64) {
    try {
      voltmxmp.logger.trace("-- Entering encrypt -- ", voltmxmp.logger.FUNCTION_ENTRY);
      var prptobj = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
      };   
      var passphrase = "passphrase";
      var randomInteger = Math.floor(Math.random() * 10);
      var passphraselogo = "md5";
      var passphrasetext = "SignaturePassPhrase";
      var subalgo = "aes";
      var encryptDecryptKey = voltmx.crypto.newKey(passphrase, 128, {
        passphrasetext: [passphrasetext],
        subalgo: subalgo,
        passphrasehashalgo: passphraselogo
      });
      this._key = encryptDecryptKey;
      var encryptedBytes = voltmx.crypto.encrypt("aes", encryptDecryptKey, imgBase64, prptobj);
      var encryptedBase64 = voltmx.convertToBase64(encryptedBytes);
      voltmxmp.logger.trace("-- Exiting encrypt -- ", voltmxmp.logger.FUNCTION_EXIT);
      return encryptedBase64;
    } catch (exception) {
      voltmx.application.dismissLoadingScreen();
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function getDecryptedSignature
     * @private
     * @description: returns the decrypted signature
     */
  NativeController.prototype.getDecryptedSignature = function() {
    try {
      voltmxmp.logger.trace("-- Entering getDecryptedSignature -- ", voltmxmp.logger.FUNCTION_ENTRY);
      var prptobj = {
        padding: "pkcs5",
        mode: "cbc",
        initializationvector: "1234567890123456"
      };
      var storedB64 = voltmx.store.getItem("signature");		
      var bytesToDecrypt = voltmx.convertToRawBytes(storedB64);
      var decryptedBase64 = voltmx.crypto.decrypt("aes", this._key, bytesToDecrypt, prptobj);
      voltmxmp.logger.trace("-- Exiting getDecryptedSignature -- ", voltmxmp.logger.FUNCTION_EXIT);
      return decryptedBase64;
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function makeNFSCall
     * @private
     * @description: makes network call for binary upload
     */

  NativeController.prototype.makeNFSCall = function(base64) {  
    try {
      voltmxmp.logger.trace("-- Entering makeNFSCall -- ", voltmxmp.logger.FUNCTION_ENTRY);
      //Setting the headers for the request
      var headers = {};
      headers["Content-Type"] = "application/json";
      //Creating an image object for upload
      var fileMap = {};
      var rawBytesToUpload;
      var deviceName = voltmx.os.deviceInfo().name.toLowerCase();
      if (deviceName === 'iphone' || deviceName === 'ipad') {
        var doubleEncode = new stringEncoder().encodeString(base64);
        rawBytesToUpload = doubleEncode;
      }
      else{
        rawBytesToUpload = base64;
      }
      //rawBytesToUpload = base64;
      fileMap["rawBytes"] = rawBytesToUpload;
      //Setting the metadata for the image file
      var metadata = {};
      var tsp = new Date().getTime().toString();
      metadata["file_name"] = "signature" + tsp + "." +"png";
      metadata["security_key"] ="HCL@1234";
      metadata["file_namespace"] = "marketplace";
      metadata["file_type"] = "image/png";
      //Configuring the upload parameters for the request
      var options =
          {
            disableIntegrityCheck: true
          };

      var uploadEntityType = "UploadInputTypeRawBytes";
      var uploadParams = {};
      uploadParams["headers"] = headers;
      uploadParams["metadata"] = metadata;
      uploadParams["file"] = fileMap;
      //Creating a success callback for the upload API
      //Calling the upload API
      _fileStoreObj.upload(uploadEntityType,uploadParams, this.objsuccessCallback, this.objfailureCallback,options);
      voltmxmp.logger.trace("-- Exiting makeNFSCall -- ", voltmxmp.logger.FUNCTION_EXIT);
    } 
    catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  NativeController.prototype.objsuccessCallback=function  (response)
  {
    try{
      voltmx.ui.Alert({message:"Upload Successful",alertType:constants.ALERT_TYPE_INFO},{});
    }
    catch(exception){
      voltmx.ui.Alert({message:"Upload Failed !!!",alertType:constants.ALERT_TYPE_ERROR},{});
    }

  };

  //Creating a failure callback for the upload API
  NativeController.prototype.objfailureCallback=function (error)
  {
    voltmx.ui.Alert({message:"Upload Failed !!!",alertType:constants.ALERT_TYPE_ERROR},{});
  };
  /**
     * @function saveToDevice
     * @private
     * @description: saves encrypted base64 to device
     */
  NativeController.prototype.saveToDevice = function(encryptedImage) {
    try {
      voltmxmp.logger.trace("-- Entering saveToDevice -- ", voltmxmp.logger.FUNCTION_ENTRY);
      voltmx.application.showLoadingScreen("loadskin", "Saving", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      voltmx.application.dismissLoadingScreen();
      voltmx.store.setItem("signature",encryptedImage);
      //Converting to rawbytes
      var signImage = voltmx.convertToRawBytes(this.getDecryptedSignature());
      var aSelf = this;
      var options = {
        isAccessModeAlways: true
      };
      //var result = voltmx.application.checkPermission(voltmx.os.RESOURCE_EXTERNAL_STORAGE, options);
      var result;
      var deviceName = voltmx.os.deviceInfo().name.toLowerCase();
      if (deviceName === 'iphone' || deviceName === 'ipad') {
        result = voltmx.application.checkPermission(voltmx.os.RESOURCE_PHOTO_GALLERY, options); 
      }
      else{
        var voltmxmain = java.import("com.konylabs.android.KonyMain");  
        var voltmxContext = voltmxmain.getActivityContext();
        if(voltmxContext.getApplicationInfo().targetSdkVersion <=32){
          result = voltmx.application.checkPermission(voltmx.os.RESOURCE_EXTERNAL_STORAGE, options);
        }
        else{
          this.componentInstance.onSaveImageSuccess(signImage);
        }
      }
      //var result = voltmx.application.checkPermission(voltmx.os.RESOURCE_PHOTO_GALLERY, options);  
      //alert(result);
      if(result.canRequestPermission) {
        if (deviceName === 'iphone' || deviceName === 'ipad') {
          voltmx.application.requestPermission(voltmx.os.RESOURCE_PHOTO_GALLERY, function(res) {
            if (res.status === voltmx.application.PERMISSION_DENIED) {
              alert("Permission Denied. Please grant permission to access Storage from settings.");
            }
            else if (res.status === voltmx.application.PERMISSION_GRANTED) {
              this.componentInstance.onSaveImageSuccess(signImage);
            }
            else {
              alert("Gallery permissions have been restricted.");
            }
          });
        }
        else{
          voltmx.application.requestPermission(voltmx.os.RESOURCE_EXTERNAL_STORAGE, function(res) {
            if (res.status === voltmx.application.PERMISSION_DENIED) {
              alert("Permission Denied. Please grant permission to access Storage from settings.");
            }
            else if (res.status === voltmx.application.PERMISSION_GRANTED) {
              this.componentInstance.onSaveImageSuccess(signImage);
            }
            else {
              alert("Gallery permissions have been restricted.");
            }
          });
        }
      }
      else if (result.status === voltmx.application.PERMISSION_DENIED) {
        alert("Permission Denied. Please grant permission to access Storage from settings.");
      } else if (result.status === voltmx.application.PERMISSION_GRANTED) {
        this.componentInstance.onSaveImageSuccess(signImage);
      }
      else if (result.status === voltmx.application.PERMISSION_RESTRICTED){
        alert("Gallery permissions have been restricted.");
      }

      voltmxmp.logger.trace("-- Exiting saveToDevice -- ", voltmxmp.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmx.application.dismissLoadingScreen();
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };
  /**
     * @function getSignatureFromDevice
     * @exposed
     * @description: returns the signature base64
     */
  NativeController.prototype.getSignatureFromDevice = function() {
    try {
      voltmxmp.logger.trace("-- Entering getSignatureFromDevice -- ", voltmxmp.logger.FUNCTION_ENTRY);
      var sig = this.getDecryptedSignature();
      voltmxmp.logger.trace("-- Exiting getSignatureFromDevice -- ", voltmxmp.logger.FUNCTION_EXIT);
      return sig;
    } catch (exception) {
      voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
      this.componentInstance.onErrorCallback(exception);
    }
  };

  return NativeController;
});