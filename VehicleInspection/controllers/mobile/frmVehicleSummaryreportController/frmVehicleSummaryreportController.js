define({ 

  onNavigate: function(context){
    this.view.preShow =this.onPreShow.bind(this);
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.btnSaveResponseOnClickAction.bind(this);
     this.lovId = context.lovId;
    this.objectId = context.object_id;
  },



  onPreShow: function(){
    toggleFooterIcons(this.view, "frmVehicleSummaryreport");
    //     this.clearData();
//     this.setDataToSeg();  
    this.view.details1.txbData.text = "";
    this.view.details2.txbData.text = "";
    this.view.details3.txbData.text = "";
    this.getInspectionMiscellaneousList();

  
  },

  btnSaveResponseOnClickAction: function () {

    var self = this;

    voltmx.application.showLoadingScreen(
      null,
      "Saving...",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
      false,
      true,
      { progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL }
    );

    
    var baseURL = voltmx.store.getItem("BASE_URL");

    if (baseURL && !baseURL.endsWith("/")) {

      baseURL += "/";

    }

    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");

    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var endUrl = "services/ms_inspection/api/v1/upsert-inspection-miscellaneous";

    var url = baseURL + endUrl;
    var token = voltmx.store.getItem("getUserAccesstoken");
    voltmx.print("Token: " + token);

    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);

    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Basic "+encodeVal);
    request.setRequestHeader("user_token", token);

    var data = {
  object_id: self.objectId,
  mechanical : (self.view.details1.txbData.text || "").trim(),
  exterior : (self.view.details2.txbData.text || "").trim(),
  interior : (self.view.details3.txbData.text || "").trim(),
  
};

    voltmx.print("Payload: " + JSON.stringify(data));

    request.onReadyStateChange = function () {

      if (request.readyState === 4) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Response Status: " + request.status);
        voltmx.print("Response: " + request.responseText);

        if (request.status === 200) {

          var responseJSON = JSON.parse(request.responseText);

          if (responseJSON.success) {
            alert(responseJSON.message);
          } else {
            alert("Failed to save response");
          }
        } 

        else {
          alert("Server error occurred");
        }
      }
    };

    request.send(JSON.stringify(data));
  },

  getInspectionMiscellaneousList: function(){
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_inspection";
      var integrationObj = voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
      var operationName = "get-inspection-miscellaneous-list";

      var data = {
        "object_id": self.objectId
      }
      // Headers
      var headers = {
        "user_token": voltmx.store.getItem("getUserAccesstoken") 
      };

      integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        self.operationSuccessPending.bind(self),
        self.operationFailurePending.bind(self)
      );
    });
  },





  operationSuccessPending: function(response)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
    this.addToLabel(response);
  },





  operationFailurePending: function(error)
  {
    voltmx.print(voltmx.store.getItem("getUserAccesstoken"));
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },




  addToLabel: function(response){

    if(!response || !response.records || response.records.length === 0){
      voltmx.print("Invalid response");
      return;
    }
    
    
    var res = response.records[0];

    this.view.details1.txbData.text = res.mechanical;
    this.view.details2.txbData.text = res.exterior;
    this.view.details3.txbData.text = res.interior;
  },
  // -----------------------------------------------------------------------



 
});