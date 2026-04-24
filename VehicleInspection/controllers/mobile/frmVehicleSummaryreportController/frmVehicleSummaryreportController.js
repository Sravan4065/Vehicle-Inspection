define({ 

  onNavigate: function(context){
    this.view.preShow =this.onPreShow.bind(this);
    this.adjustRTL();
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.btnSaveResponseOnClickAction.bind(this);
     this.lovId = context.lovId;
    this.objectId = context.object_id;
    this.services_id = context.services_id;
    this.existingId = null;
    this.fullExistingData = null;
  },



  onPreShow: function(){
    var self = this;
    toggleFooterIcons(this.view, "frmVehicleSummaryreport");
    //     this.clearData();
//     this.setDataToSeg();  
    this.view.details1.txtAreaDetails.text = "";
    this.view.details2.txtAreaDetails.text = "";
    this.view.details3.txtAreaDetails.text = "";
    this.getInspectionMiscellaneousList();

    
    this.view.details1.txtAreaDetails.onTextChange = function () {
  
  var text = this.view.details1.txtAreaDetails.text;

  // Allow only valid characters and max 500 length
  var validText = text.replace(/[^a-zA-Z0-9\s.,\-()\/]/g, "");

  if (validText.length > 500) {
    validText = validText.substring(0, 500);
  }

  // Set cleaned text back
  this.view.details1.txtAreaDetails.text = validText;

}.bind(this);
    
    this.view.details2.txtAreaDetails.onTextChange = function () {
  
  var text = this.view.details2.txtAreaDetails.text;

  // Allow only valid characters and max 500 length
  var validText = text.replace(/[^a-zA-Z0-9\s.,\-()\/]/g, "");

  if (validText.length > 500) {
    validText = validText.substring(0, 500);
  }

  // Set cleaned text back
  this.view.details2.txtAreaDetails.text = validText;

}.bind(this);
    
    this.view.details3.txtAreaDetails.onTextChange = function () {
  
  var text = this.view.details3.txtAreaDetails.text;

  // Allow only valid characters and max 500 length
  var validText = text.replace(/[^a-zA-Z0-9\s.,\-()\/]/g, "");

  if (validText.length > 500) {
    validText = validText.substring(0, 500);
  }

  // Set cleaned text back
  this.view.details3.txtAreaDetails.text = validText;

}.bind(this);
    
    this.view.saveresponse.setVisibility(false);
    this.view.saveresponse.btnClose.onClick = () => {
      self.view.saveresponse.setVisibility(false);
    }
  
  },

  btnSaveResponseOnClickAction: function () {

    var self = this;

//     if(self.view.details1.txtAreaDetails.text.trim() !== "" && self.view.details2.txtAreaDetails.text !== "" && self.view.details3.txtAreaDetails.text !== "")
   if (
  (self.view.details1.txtAreaDetails.text || "").trim() !== "" &&
  (self.view.details2.txtAreaDetails.text || "").trim() !== "" &&
  (self.view.details3.txtAreaDetails.text || "").trim() !== ""
)
    {
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
//   mechanical : (self.view.details1.txtAreaDetails.text || "").trim(),
//   exterior : (self.view.details2.txtAreaDetails.text || "").trim(),
//   interior : (self.view.details3.txtAreaDetails.text || "").trim(),
  
// };
    data.object_id = self.objectId;
    data.services_id = Number(self.services_id || 0);
    
    data.mechanical = (self.view.details1.txtAreaDetails.text || "").trim();
    data.exterior   = (self.view.details2.txtAreaDetails.text || "").trim();
    data.interior   = (self.view.details3.txtAreaDetails.text || "").trim();
    if(self.existingId)
      {
        data.id = self.existingId
      }

     if(data.signature_image_id)
      {
        data.signature_image_id = Number(data.signature_image_id);
      }
    
    delete data.file_url;
    delete data.file_name;
    voltmx.print("Payload: " + JSON.stringify(data));

    request.onReadyStateChange = function () {

      if (request.readyState === 4) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Response Status: " + request.status);
        voltmx.print("Response: " + request.responseText);

        if (request.status === 200) {

          var responseJSON = JSON.parse(request.responseText);

          if (responseJSON.success) {
//             alert(responseJSON.message);
            self.view.saveresponse.setVisibility(true);
            self.view.saveresponse.lblUPdatedsucessfully.text = voltmx.i18n.getLocalizedString("Inspection details saved successfully");
            self.view.saveresponse.btnClose.text = voltmx.i18n.getLocalizedString("Close");
//             alert(voltmx.i18n.getLocalizedString("Inspection details saved successfully"));
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
      }
    else
      {
         alert("Please fill all fields");
      }
   
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

    this.view.details1.txtAreaDetails.text = res.mechanical;
    this.view.details2.txtAreaDetails.text = res.exterior;
    this.view.details3.txtAreaDetails.text = res.interior;
  },

   adjustRTL: function()
  {
    var self = this;
     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
     this.view.flxHeadingWithButton.flxHeading.reverseLayoutDirection = isArabic;
    
    if(isArabic)
      {
         this.view.flxHeadingWithButton.btnSaveResponse.right = "";
      this.view.flxHeadingWithButton.btnSaveResponse.left = "5%";

      this.view.flxHeadingWithButton.flxBack.left = "";
      this.view.flxHeadingWithButton.flxBack.right = "5%";

      this.view.flxHeadingWithButton.lblImages.left = "";
      this.view.flxHeadingWithButton.lblImages.right = "3%";
        
        self.view.details1.flxArrow.right = "8dp";
        self.view.details1.flxArrow.left = "";
        
         self.view.details2.flxArrow.right = "8dp";
        self.view.details2.flxArrow.left = "";
        
         self.view.details3.flxArrow.right = "8dp";
        self.view.details3.flxArrow.left = "";
        
        self.view.details1.flxName.right = "32dp";
         self.view.details1.flxName.left = "";
        
         self.view.details2.flxName.right = "32dp";
         self.view.details2.flxName.left = "";
        
        self.view.details3.flxName.right = "32dp";
         self.view.details3.flxName.left = "";
        
        var flipTransform = voltmx.ui.makeAffineTransform();
      flipTransform.scale(-1, 1); // horizontal flip
      self.view.flxHeadingWithButton.imgBack.transform = flipTransform;
      }
    else
      {
        
        this.view.flxHeadingWithButton.btnSaveResponse.right = "5%";
      this.view.flxHeadingWithButton.btnSaveResponse.left = "";

      this.view.flxHeadingWithButton.flxBack.left = "5%";
      this.view.flxHeadingWithButton.flxBack.right = "";

      this.view.flxHeadingWithButton.lblImages.left = "3%";
      this.view.flxHeadingWithButton.lblImages.right = "";
        
         self.view.details1.flxArrow.right = "";
        self.view.details1.flxArrow.left = "8dp";
        
         self.view.details2.flxArrow.right = "";
        self.view.details2.flxArrow.left = "8dp";
        
         self.view.details3.flxArrow.right = "";
        self.view.details3.flxArrow.left = "8dp";
        
         self.view.details1.flxName.right = "";
         self.view.details1.flxName.left = "32dp";
        
        self.view.details2.flxName.right = "";
         self.view.details2.flxName.left = "32dp";
        
        self.view.details3.flxName.right = "";
         self.view.details3.flxName.left = "32dp";
        
        self.view.flxHeadingWithButton.imgBack.transform = voltmx.ui.makeAffineTransform();
      }
    
    this.view.details1.lblNamedata.text = voltmx.i18n.getLocalizedString("Mechanical");
    this.view.details2.lblNamedata.text = voltmx.i18n.getLocalizedString("Exterior");
     this.view.details3.lblNamedata.text = voltmx.i18n.getLocalizedString("Interior");
    this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
     this.view.flxHeadingWithButton.btnSaveResponse.text = voltmx.i18n.getLocalizedString("save response");
    this.view.flxHeadingWithButton.lblImages.text = voltmx.i18n.getLocalizedString("Vehicle Summary Report");
  }
 


 
});