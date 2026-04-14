define({ 

  onNavigate: function(context)
  {
    this.context = context;
    this.view.saveresponse.btnClose.skin = "sknBtnd3243018px";
    this.view.preShow = this.onPreShow.bind(this);
     this.view.saveresponse.setVisibility(false);
     this.view.btnCompleteAndSubmit.onClick = this.showpopup.bind(this);
    var record = this.context && this.context.record ? this.context.record : {};

var model = record.model || "NA";
var lotNo = record.lot_no || "NA";


    this.view.lblSelectedvaluedata.text =model;
    this.view.lblStatusNumber.text =lotNo;

  },

  onPreShow: function()
  {
    this.view.lblStartWashing.text ="Start Washing";
    this.view.flxStarted.setVisibility(false);
    this.view.btnComplete.setVisibility(false);
    this.view.flxEnded.setVisibility(false);
    
     this.view.btnStart.setVisibility(true);
    this.view.btnCompleteAndSubmit.setVisibility(false);
    this.view.btnStart.onClick = this.onStartClick.bind(this);
    this.view.btnComplete.onClick =this.onComplete.bind(this);
   
    this.view.saveresponse.btnClose.onClick = this.navtowash.bind(this);
    

  },
  
  navtowash: function(){
    var nav = new voltmx.mvc.Navigation("frmWashingSummary");
    nav.navigate();
  },
  showpopup: function(){
    this.view.saveresponse.setVisibility(true);
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
     // this.view.btnCompleteAndSubmit.setVisibility(true);
    }
  },



  onStartClick: function() {

    var self = this;



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
    self.timeSetting("start");
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
    var self = this;
    voltmx.application.dismissLoadingScreen();

    voltmx.print("Vehicle Status Updated: " + JSON.stringify(response));

    if (response && response.opstatus === 0) {

      self.view.flxStarted.setVisibility(true);
      self.view.btnComplete.setVisibility(true);
      self.view.flxEnded.setVisibility(false);
      self.view.btnStart.setVisibility(false);
      // 1️⃣ Set label value
      self.view.lblStartWashing.text = "Under Washing";
//       alert("Vehicle moved to Under Washing successfully");

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
    self.timeSetting("end");
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
    var self = this;
    voltmx.application.dismissLoadingScreen();

    voltmx.print("Vehicle Status Updated: " + JSON.stringify(response));

    if (response && response.opstatus === 0) {

      self.view.flxStarted.setVisibility(true);
      self.view.flxEnded.setVisibility(true);

      // 1️⃣ Set label value
      self.view.lblStartWashing.text = "Washing Completed";
     self.view.btnCompleteAndSubmit.setVisibility(true);
//       alert("Vehicle moved to Under Washing successfully");

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

 timeSetting: function(type){
  var now = new Date();

  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var finalTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

  if(type === "start"){
    this.view.lblStartedTime.text = finalTime;
  } else if(type === "end"){
    this.view.lblEndedTime.text = finalTime;
  }

  voltmx.print(finalTime);
}
});