define({ 

 onNavigate: function(context)
  {
     this.context = context;
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    this.view.flxStarted.setVisibility(false);
    this.view.flxEnded.setVisibility(false);
    this.view.btnCompleteAndSubmit.setVisibility(true);
    this.view.btnStart.onClick = this.onStartClick.bind(this);
    this.view.btnComplete.onClick =this.onComplete.bind(this);
    
  },
  
  onStartWashing: function()
  {
    if(this.view.btnStart.text === "Start")
    {
    this.view.btnStart.text = "Complete";
    this.view.imgIcon.src = "playicon.png";
    this.view.flxStarted.setVisibility(true);
    }
    else
      {
        this.view.btnStart.setVisibility(false);
//     this.view.imgIcon.src = "playicon.png";
    this.view.flxEnded.setVisibility(true);
    this.view.btnCompleteAndSubmit.setVisibility(true);
      }
  },
  
  
  
   onStartClick: function() {

        var self = this;

     self.view.flxStarted.setVisibility(true);
     self.view.btnComplete.setVisibility(true);
     self.view.flxEnded.setVisibility(false);
     self.view.btnStart.setVisibility(false);
        // 1️⃣ Set label value
      self.view.lblStartWashing.text = "Under Washing";

        // 2️⃣ Get object_id (from label / previous screen / variable)
        // Change this according to where your object_id is stored
       var objectId = self.context.objectId;
  

        if (!objectId) {
            alert("Object ID is missing");
            return;
        }

        // 3️⃣ Show loader
        voltmx.application.showLoadingScreen(
            null,
            "Updating status...",
            constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
            true,
            true,
            null
        );

        // 4️⃣ Call backend service
      self.timeSetting();
        self.vehicleDetails(objectId, self.view.lblStartWashing.text);
    
    },



    // ============================================
    // SERVICE CALL FUNCTION
    // ============================================
    vehicleDetails: function(objectId, actionName) {
     
        var self = this;

        var serviceName = "ms_fleet";
        var operationName = "fleet-wfstatus";

        var integrationObj = voltmx.sdk.getCurrentInstance()
                                      .getIntegrationService(serviceName);

        var data = {
            "object_id": objectId,
            "action_name":  "Under Washing"   // sending "Under Washing"
        };

        var headers = {
            "user_token": voltmx.store.getItem("getUserAccesstoken")
        };

        integrationObj.invokeOperation(
            operationName,
            headers,
            data,
            function(response) {
                self.vehicleDetailsSuccess(response);
            },
            function(error) {
                self.vehicleDetailsFailure(error);
            }
        );
    },



    // ============================================
    // SUCCESS CALLBACK
    // ============================================
    vehicleDetailsSuccess: function(response) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Vehicle Status Updated: " + JSON.stringify(response));

        if (response && response.opstatus === 0) {

            alert("Vehicle moved to Under Washing successfully");

        } else {

            alert("Service failed. Please try again.");
        }
    },



    // ============================================
    // FAILURE CALLBACK
    // ============================================
    vehicleDetailsFailure: function(error) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Vehicle Status Error: " + JSON.stringify(error));

        alert("Failed to update vehicle status");
    },

  
  onComplete: function(){
       var self = this;

     self.view.flxStarted.setVisibility(false);
     self.view.flxEnded.setVisibility(true);
   
        // 1️⃣ Set label value
      self.view.lblStartWashing.text = "Washing Completed";

        // 2️⃣ Get object_id (from label / previous screen / variable)
        // Change this according to where your object_id is stored
       var objectId = self.context.objectId;
  

        if (!objectId) {
            alert("Object ID is missing");
            return;
        }

        // 3️⃣ Show loader
        voltmx.application.showLoadingScreen(
            null,
            "Updating status...",
            constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
            true,
            true,
            null
        );

        // 4️⃣ Call backend service
      self.timeSetting();
        self.vehicleDetails1(objectId, self.view.lblStartWashing.text);
  },
  
  
  
   vehicleDetails1: function(objectId, actionName) {

        var self = this;

        var serviceName = "ms_fleet";
        var operationName = "fleet-wfstatus";

        var integrationObj = voltmx.sdk.getCurrentInstance()
                                      .getIntegrationService(serviceName);

        var data = {
            "object_id": objectId,
            "action_name":  "Washing Completed"   // sending "Under Washing"
        };

        var headers = {
            "user_token": voltmx.store.getItem("getUserAccesstoken")
        };

        integrationObj.invokeOperation(
            operationName,
            headers,
            data,
            function(response) {
                self.vehicleDetailsSuccess1(response);
            },
            function(error) {
                self.vehicleDetailsFailure1(error);
            }
        );
    },



    // ============================================
    // SUCCESS CALLBACK
    // ============================================
    vehicleDetailsSuccess1: function(response) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Vehicle Status Updated: " + JSON.stringify(response));

        if (response && response.opstatus === 0) {

            alert("Vehicle moved to Under Washing successfully");

        } else {

            alert("Service failed. Please try again.");
        }
    },



    // ============================================
    // FAILURE CALLBACK
    // ============================================
    vehicleDetailsFailure1: function(error) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Vehicle Status Error: " + JSON.stringify(error));

        alert("Failed to update vehicle status");
    },

  timeSetting: function(){
    var now = new Date();

var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();

var ampm = hours >= 12 ? "PM" : "AM";

hours = hours % 12;
hours = hours ? hours : 12;

// Add leading zero if needed
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

var finalTime = hours + ":" + minutes + ":" + seconds + " " + ampm;


this.view.lblStartedTime.text = finalTime;
    this.view.lblEndedTime.text = finalTime;
voltmx.print(finalTime);
  }
  

 });