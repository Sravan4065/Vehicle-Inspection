define(function() {

  return {    

    // Android
    _androidScanner: null,

    //iOS 
    _iosScanner: null,


    //Generic    
    _codeFormats: [ "CODE_128" ,"CODE_39","EAN_13", "EAN_8"],
    _resultCallback: null,
    _initComplete: null,

    _pView: null,
    _isRectAdded: false,
    _camPermissions: false,


    _isiOS: (voltmx.os.deviceInfo().name.toLowerCase() === "iphone" || voltmx.os.deviceInfo().name.toLowerCase() === "ipad"),
    _isAndroid: (voltmx.os.deviceInfo().name.toLowerCase() === "android" || voltmx.os.deviceInfo().name.toLowerCase() === "androidtablet"),    

    constructor: function(baseConfig, layoutConfig, pspConfig) {

      if(this._isAndroid) {
        this.view.bgNativeContainer.onCreated = this.onCreated;
        
      }
      else if(this._isiOS) {
        this.view.bgNativeContainer.onViewDidAppear = this.viewDidAppear;
      }
      this.view.bgNativeContainer.onOrientationChange = this.orientationChange;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, 'codeFormats', function (value) {
        this._codeFormats = value;        
      });
      defineSetter(this, "enableContinuousScan", function(val) {
        try {
          this._enableContinuousScan = val;
        } catch (e) {
          alert(JSON.stringify(e));
        }
      });
      defineGetter(this, "enableContinuousScan", function() {
        try {
          return this._enableContinuousScan;
        } catch (e) {
          alert(JSON.stringify(e));
        }
      });
    },


    checkPermisions: function() {
      this._camPermissions = false;
      var aSelf = this;
      var options = {
        isAccessModeAlways: true
      };
      var result = voltmx.application.checkPermission(voltmx.os.RESOURCE_CAMERA, options);

      if(result.canRequestPermission) {
        voltmx.application.requestPermission(voltmx.os.RESOURCE_CAMERA, function(res) {                
          if (res.status === voltmx.application.PERMISSION_DENIED) {
            alert("Please allow the Camera permissions in Settings App.");
          }
          else if (res.status === voltmx.application.PERMISSION_GRANTED) {
            aSelf.initializeScan();
          }
          else {
            alert("Camera permissions have been restricted.");
          }
        });
      }
      else if (result.status === voltmx.application.PERMISSION_DENIED) {      
        alert("Please allow the Camera permissions in Settings App.");
      } else if (result.status === voltmx.application.PERMISSION_GRANTED) {
        this.initializeScan();
      }
      else if (result.status === voltmx.application.PERMISSION_RESTRICTED){
        alert("Camera permissions have been restricted.");
      } 
    },

    // Android
    onCreated: function(parentView) {
      this._pView = parentView;
      //this.checkPermisions();
    },           

    //iOS        
    viewDidAppear: function(parentView) {
      this._pView = parentView;
     // this.checkPermisions();
    },

    //onOrientationChange
    orientationChange: function(parentView){
      this._pView = parentView;
      //this.checkPermisions();
    },
onScanClick: function() {

    var self = this;

    // Show camera container
    this.view.bgNativeContainer.setVisibility(true);

    // Ask permission + start scanner
    this.checkPermisions();

},
    
    androidInit: function() {

    this._enableContinuousScan = false;

    var MLKitBarcodeScanner = java.import("com.technohub.mlkitbarcode.MLKitBarcodeScanner");    
    var VoltMain  = java.import('com.konylabs.android.KonyMain');
    var context = VoltMain.getActivityContext();

    
    this._resultCallback = this.callback.bind(this);

    
    this._androidScanner = new MLKitBarcodeScanner(
        context,
        this._pView,
        this._codeFormats,
        this._resultCallback
    );

    this._androidScanner.enableContinuosScan(true);
},


    
    iOSInit: function() {

    var MLKitBarcodeScanner = objc.import("MLKitBarcodeScanner");          

   
    this._resultCallback = this.callback.bind(this);

    var format = "";
    for (var i = 0; i < this._codeFormats.length; i++) { 
        if(i === this._codeFormats.length - 1) {
            format = format + this._codeFormats[i];
        } else {
            format = format + this._codeFormats[i] + "|";
        }
    }

    this._iosScanner = MLKitBarcodeScanner.alloc()
        .initWithViewFormats(this._pView, format);      

    
    this._iosScanner.addResultCallback(this._resultCallback);

    
    this._iosScanner.enableContinuosScan(false);
},

    initializeScan: function() {       
      this._camPermissions = true;
      var self = this;
      voltmx.runOnMainThread(function() {
        if (self._isAndroid) {
          self.androidInit();
        }
        else if(self._isiOS) {
          self.iOSInit();
        }      

        if(self._initComplete !== null) {
          self._initComplete();
        }        

      }, []);
    },

    startSession: function() {
      var self = this;
      voltmx.runOnMainThread(function() {
        if (self._isAndroid) {
          if(self._androidScanner !== null) {
            self._androidScanner.startSession();
          }
        }
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.startSession();
          }
        }
      }, []);  
    },

    addResultCallback: function(resultCallback) {
      this._resultCallback = resultCallback;      
    },

    addInitCompleteCallback: function(initCallback) {
      this._initComplete = initCallback;
    },

    restartSession: function() {            
      var self = this;
      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {
          if(self._androidScanner !== null) {
            self._androidScanner.restartSession(); 
          }          
        }
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.restartSession();            
          }
        }
      }, []);  
    },

    stopSession: function() {                     
      var self = this;
      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {
          if (self._androidScanner !== null) {
            self._androidScanner.stopSession();
          }
        }
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.stopSession();
          }
        }
      }, []);            
    },

    enableFlash: function(enable) {
      var self = this;
      if (this._isAndroid) {
        if(this._androidScanner !== null) {
          this._androidScanner.enableFlash(enable);
        }
      }	
      else if(this._isiOS) {
        if(this._iosScanner !== null) {
          this._iosScanner.enableFlash(enable);
        }
      }
    },

    setupRectOfInterest: function() {
      var self = this;

      if(self._isRectAdded === true) {
        return;
      }

      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {
          if(self._androidScanner !== null) {
            self._androidScanner.setupRectOfInterest();
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.setupRectOfInterest();
          }
        }        
      }, []);          
      self._isRectAdded = true;
    },

    setupCustomRectOfInterest: function(frame, image) {
      var self = this;

      if(self._isRectAdded === true) {
        return;
      }

      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {
          if(self._androidScanner !== null) {
            self._androidScanner.setupCustomRectOfInterest(frame, image);
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.setupCustomRectOfInterestImage(frame, image);
          }
        }        
      }, []);          
      self._isRectAdded = true;
    },

    setupSquareOfInterest: function() {
      var self = this;

      if(self._isRectAdded === true) {
        return;
      }

      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {
          if(self._androidScanner !== null) {
            self._androidScanner.setupSquareOfInterest();
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.setupSquareOfInterest();
          }
        }        
      }, []);          
      self._isRectAdded = true;
    },   

    zoomIn: function() {
      var self = this;
      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {       
          if(self._androidScanner !== null) {
            self._androidScanner.zoomIn();
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.zoomIn();
          }
        }        
      }, []);       
    },

    zoomOut: function() {
      var self = this;
      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {  
          if(self._androidScanner !== null) {
            self._androidScanner.zoomOut();
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.zoomOut();
          }
        }        
      }, []);  
    },

    removeRectofInterest: function() {
      var self = this;

      voltmx.runOnMainThread(function(){

        if (self._isAndroid) {
          if(self._androidScanner !== null) {
            self._androidScanner.removeRectOfInterest();
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.removeRectofInterest();
          }
        }
      }, []);  
      self._isRectAdded = false;
    },

    isFlashSupports: function() {
      var self = this;
      if (self._isAndroid) {
        if(self._androidScanner !== null) {
          return self._androidScanner.isFlashSupports();
        }
      }
      else if(this._isiOS) {
        if(this._iosScanner !== null) {
          return this._iosScanner.isFlashSupports();
        }
      }
      return false;
    },

    isCameraPermissionAllowed: function() {
      return this._camPermissions;
    },

    higlightCodes: function(codes) {
      var self = this;
      voltmx.runOnMainThread(function(){
        if (self._isAndroid) {       
          if(self._androidScanner !== null) {
            //             self._androidScanner.zoomIn();
          }
        }	
        else if(self._isiOS) {
          if(self._iosScanner !== null) {
            self._iosScanner.higlightCodes(codes);
          }
        }        
      }, []);   
    },

    
callback: function(data) {
    try {
        if (!data) {
            alert("No data received");
            return;
        }

        var resultObj;

        if (typeof data === "string") {
            resultObj = {
                barcode_data: data
            };
        } else {
            resultObj = data;
        }

        alert(JSON.stringify(resultObj));
       var value = resultObj.displayValue || "";

// this.view.Label0f31f4b37bd1f48.text = value;
      
      NavigationManager.push("frmInwardEntryVehicleDetails",{
      "objectId": value,
      "isPending": false
    })
    
this.view.bgNativeContainer.setVisibility(false);
       
        if (this._androidScanner) {
            this._androidScanner.stopSession();
        }

       
        


    } catch (e) {
        alert("Scan error: " + e.message);
    }
}
  };
});