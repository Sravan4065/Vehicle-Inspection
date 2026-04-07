define({ 

  onNavigate: function(context){
    this.view.preShow =this.onPreShow.bind(this);
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.btnSaveResponseOnClickAction.bind(this);
     this.lovId = context.lovId;
    this.objectId = context.object_id;
    this.services_id = context.services_id;
    this.existingId = null;
    this.fullExistingData = null;
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
var data = self.fullExistingData ? 
               JSON.parse(JSON.stringify(self.fullExistingData)) :   // deep copy
               {};
//     var data = {
//   object_id: self.objectId,
//   services_id: Number(self.services_id),
//   mechanical : (self.view.details1.txbData.text || "").trim(),
//   exterior : (self.view.details2.txbData.text || "").trim(),
//   interior : (self.view.details3.txbData.text || "").trim(),
  
// };
    data.object_id = self.objectId;
    data.services_id = Number(self.services_id || 0);
    
    data.mechanical = (self.view.details1.txbData.text || "").trim();
    data.exterior   = (self.view.details2.txbData.text || "").trim();
    data.interior   = (self.view.details3.txbData.text || "").trim();
    if(self.existingId)
      {
        data.id = self.existingId
      }

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

//   getInspectionMiscellaneousList: function(){
//     var self = this;
//     checkTokenValidatity(function() {
//       voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
//       var serviceName = "fry_int_inspection";
//       var integrationObj = voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
//       var operationName = "get-inspection-miscellaneous-list";

//       var data = {
//         "object_id": self.objectId
//       }
//       // Headers
//       var headers = {
//         "user_token": voltmx.store.getItem("getUserAccesstoken") 
//       };

//       integrationObj.invokeOperation(
//         operationName,
//         headers,
//         data,
//         self.operationSuccessPending.bind(self),
//         self.operationFailurePending.bind(self)
//       );
//     });
//   },





//   operationSuccessPending: function(response)
//   {
//     voltmx.application.dismissLoadingScreen();
//     voltmx.print(response);
//     this.addToLabel(response);
//   },





//   operationFailurePending: function(error)
//   {
//     voltmx.print(voltmx.store.getItem("getUserAccesstoken"));
//     voltmx.application.dismissLoadingScreen();
//     voltmx.print(error);
//   },

getInspectionMiscellaneousList: function(){
    var self = this;
    voltmx.application.showLoadingScreen(null,"LoadingScreen",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);
     self.existingId = null;
     self.fullExistingData = null;
    var serviceName = "fry_int_inspection";
    var integrationObj =  voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "get-inspection-miscellaneous-list";
    var headers = 
        {
          "user_token": voltmx.store.getItem("getUserAccesstoken")
        }

    var data = 
        {
          
          "object_id": self.objectId,
           "insp_pac_lov_id": self.lovId
        }
    integrationObj.invokeOperation(operationName, headers, data, successCallback, failureCallback)

    function successCallback(response)
    {
      
        
      voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
   if (response && 
    response.records && 
    response.records.length > 0) 
{
    const firstRecord = response.records[0];
    
    // Check if 'id' exists and is not empty
    if (firstRecord.id && 
        String(firstRecord.id).trim() !== "") 
    {
        self.existingId = Number(firstRecord.id);  
        self.fullExistingData = firstRecord;
    } 
    else 
    {
        self.existingId = null;   
    }
} 
else 
{
    self.existingId = null;   
}
    self.addToLabel(response);
    }

    function failureCallback(error)
    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);
    }
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