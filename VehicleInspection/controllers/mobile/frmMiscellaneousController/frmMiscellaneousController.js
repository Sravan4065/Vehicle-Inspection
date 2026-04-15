define({ 

  onNavigate: function(context){
    this.objectId = context.object_id;
    this.lovId = context.lovId;
    this.services_id = context.services_id;
    this.object_service_id = context.object_service_id;
    voltmx.store.removeItem("signature");
    this.view.preShow =this.onPreShow.bind(this);
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.onSubmitClick.bind(this);
    this.existingId = null;
    this.fullExistingData = null;
    this.adjustRTL();

  },



//   adjustRTL: function () {

//     var self = this;
//     var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

//     // Move label
//     this.view.lblSignature.left = isArabic ? "" : "5%";
//     this.view.lblSignature.right = isArabic ? "5%" : "";
    
//     this.view.lblImpNotice.left = isArabic ? "" : "3%";
//     this.view.lblImpNotice.right = isArabic ? "3%" : "";
    
//     this.view.lblImpNoticePara.left = isArabic ? "" : "3%";
//     this.view.lblImpNoticePara.right = isArabic ? "3%" : "";
    
//     this.view.details3.txbData.left = isArabic ? "" : "5%";
//     this.view.details3.txbData.right = isArabic ? "5%" :"";
    
//     this.view.details4.txbData.left = isArabic ? "" :"5%";
//     this.view.details4.txbData.right = isArabic ? "5%" :"";
    
//     this.view.details5.txbData.left = isArabic ? "":"5%";
//     this.view.details5.txbData.right = isArabic ? "5%":"";

//     // Align text
//     this.view.lblSignature.contentAlignment = isArabic
//       ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
//      this.view.lblImpNotice.contentAlignment = isArabic
//       ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
//      this.view.lblImpNoticePara.contentAlignment = isArabic
//       ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     : constants.CONTENT_ALIGN_MIDDLE_LEFT;

//     this.view.details3.txbData.contentAlignment = isArabic 
//     ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     : constants.CONTENT_ALIGN_MIDDLE_LEFT
    
//      this.view.details4.txbData.contentAlignment = isArabic 
//     ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     : constants.CONTENT_ALIGN_MIDDLE_LEFT
    
//      this.view.details5.txbData.contentAlignment = isArabic 
//     ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
//     : constants.CONTENT_ALIGN_MIDDLE_LEFT
    
    
//     var setPosition = function(widget, left, right) {
//       if (!widget) return;
//       widget.left = left || "";
//       widget.right = right || "";
//     };

//     // 🔘 Button
//     setPosition(
//       self.view.flxHeadingWithButton.btnSaveResponse,
//       isArabic ? "5%" : "",
//       isArabic ? "" : "5%"
//     );
    
//     setPosition(
//       self.view.flxHeadingWithButton.flxHeading,
//       isArabic ? "5%" : "",
//       isArabic ? "" : "5%"
//     );
//       self.view.flxHeadingWithButton.flxHeading.reverseLayoutDirection = isArabic;

//     setPosition(
//       self.view.flxArrow,
//       isArabic ? "5%" : "",
//       isArabic ? "" : "5%"
//     );
    
//      setPosition(
//       self.view.flxImportantNotice,
//       isArabic ? "" : "0dp",
//       isArabic ? "0dp" : ""
//     );

    
//     // 🔥 Details config (only define once)
//     var detailsList = ["details1", "details2","details3","details4","details5","details6","details7","details17"];

//     detailsList.forEach(function(id) {

//       var item = self.view[id];
//       if (!item) return;

//       // txbData
//       setPosition(
//         item.txbData,
//         isArabic ? "" : "0dp",
//         isArabic ? "0dp" : ""
//       );

//       // label (flxName)
//       setPosition(
//         item.flxName,
//         isArabic ? "" : "32dp",
//         isArabic ? "32dp" : ""
//       );

//       // arrow
//       if (item.flxArrow) {
//         setPosition(
//           item.flxArrow,
//           isArabic ? "8dp" : "",
//           isArabic ? "" : "8dp"
//         );
//       }
//     });
//     self.view.flxHeadingWithButton.lblImages.text =  voltmx.i18n.getLocalizedString("Miscellaneous");
//     self.view.flxHeadingWithButton.btnSaveResponse.text = voltmx.i18n.getLocalizedString("save response");
//     self.view.details1.lblNamedata.text =  voltmx.i18n.getLocalizedString("Tool Kit");
//     self.view.details2.lblNamedata.text = voltmx.i18n.getLocalizedString("Damaged Areas");
//     self.view.details3.lblNamedata.text =  voltmx.i18n.getLocalizedString("Estimated Repair Cost");
//     self.view.details4.lblNamedata.text = voltmx.i18n.getLocalizedString("Service Provider");
//     self.view.details5.lblNamedata.text =  voltmx.i18n.getLocalizedString("Technician ID");
//     self.view.details6.lblNamedata.text = voltmx.i18n.getLocalizedString("Branch");
//     self.view.details7.lblNamedata.text =  voltmx.i18n.getLocalizedString("City");
//     self.view.lblSignature.text = voltmx.i18n.getLocalizedString("Signature");
//     self.view.lblImpNotice.text = voltmx.i18n.getLocalizedString("important notice");
//     self.view.lblImpNoticePara.text = voltmx.i18n.getLocalizedString("Emirates Transport is not responsible for hidden defects of the vehicle");
//     self.view.flxCompleteButton.btnCompleteInspection.text = voltmx.i18n.getLocalizedString("Complete Inspection");
//     self.view.forceLayout();
//   },

  
  
  adjustRTL: function () {

  var self = this;
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  var setPosition = function(widget, left, right) {
    if (!widget) return;
    widget.left = left || "";
    widget.right = right || "";
  };

  var setAlignment = function(widget) {
    if (!widget) return;
    widget.contentAlignment = isArabic
      ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
      : constants.CONTENT_ALIGN_MIDDLE_LEFT;
  };

  // 🔹 Labels
  [this.view.lblSignature, this.view.lblImpNotice, this.view.lblImpNoticePara, this.view.flxHeadingWithButton.lblImages]
    .forEach(setAlignment);

  setPosition(this.view.lblSignature, isArabic ? "" : "5%", isArabic ? "5%" : "");
  setPosition(this.view.lblImpNotice, isArabic ? "" : "3%", isArabic ? "3%" : "");
  setPosition(this.view.lblImpNoticePara, isArabic ? "" : "3%", isArabic ? "3%" : "");

  // 🔹 Header & Button
  setPosition(this.view.flxHeadingWithButton.btnSaveResponse,
    isArabic ? "5%" : "",
    isArabic ? "" : "5%"
  );

  setPosition(this.view.flxHeadingWithButton.flxHeading,
    isArabic ? "5%" : "",
    isArabic ? "" : "5%"
  );

  this.view.flxHeadingWithButton.flxHeading.reverseLayoutDirection = isArabic;

  setPosition(this.view.flxArrow,
    isArabic ? "5%" : "",
    isArabic ? "" : "5%"
  );

  setPosition(this.view.flxImportantNotice,
    isArabic ? "" : "0dp",
    isArabic ? "0dp" : ""
  );
    
//  setPosition(this.view.flxHeadingWithButton.flxBack,
//     isArabic ? "5%" : "",
//     isArabic ? "" : "5%"
//   );
    
  // 🔥 Details (single loop — no duplication)
  var detailsList = ["details1","details2","details3","details4","details5","details6","details7","details17"];

  detailsList.forEach(function(id) {

    var item = self.view[id];
    if (!item) return;

    setPosition(item.txbData,
      isArabic ? "" : "4%",
      isArabic ? "4%" : ""
    );

    setPosition(item.flxName,
      isArabic ? "" : "32dp",
      isArabic ? "32dp" : ""
    );
    

    if (item.flxArrow) {
      setPosition(item.flxArrow,
        isArabic ? "8dp" : "",
        isArabic ? "" : "8dp"
      );
    }

    setAlignment(item.txbData);
    setAlignment(item.lblNamedata);
  });

    if(isArabic)
      {
        self.view.flxHeadingWithButton.flxBack.left = "";
        self.view.flxHeadingWithButton.flxBack.right = "5%";
      }
    else
      {
        self.view.flxHeadingWithButton.flxBack.right = "";
        self.view.flxHeadingWithButton.flxBack.left = "5%";
      }
  // 🌐 Localization
  this.view.flxHeadingWithButton.lblImages.text = voltmx.i18n.getLocalizedString("Miscellaneous");
  this.view.flxHeadingWithButton.btnSaveResponse.text = voltmx.i18n.getLocalizedString("save response");

  this.view.details1.lblNamedata.text = voltmx.i18n.getLocalizedString("Tool Kit");
  this.view.details2.lblNamedata.text = voltmx.i18n.getLocalizedString("Damaged Areas");
  this.view.details3.lblNamedata.text = voltmx.i18n.getLocalizedString("Estimated Repair Cost");
  this.view.details4.lblNamedata.text = voltmx.i18n.getLocalizedString("Service Provider");
  this.view.details5.lblNamedata.text = voltmx.i18n.getLocalizedString("Technician ID");
  this.view.details6.lblNamedata.text = voltmx.i18n.getLocalizedString("Branch");
  this.view.details7.lblNamedata.text = voltmx.i18n.getLocalizedString("City");

  this.view.lblSignature.text = voltmx.i18n.getLocalizedString("Signature");
  this.view.lblImpNotice.text = voltmx.i18n.getLocalizedString("important notice");
  this.view.lblImpNoticePara.text = voltmx.i18n.getLocalizedString("Emirates Transport is not responsible for hidden defects of the vehicle");
  this.view.details17.lblNamedata.text = voltmx.i18n.getLocalizedString("Service Book");

  this.view.flxCompleteButton.btnCompleteInspection.text =
    voltmx.i18n.getLocalizedString("Complete Inspection");

  this.view.forceLayout();
},
  
  
  

  onPreShow: function(){
    var self = this;
    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
    //     this.clearData();
    this.masterfleetspecvalues();
    this.view.flxBrowser.setVisibility(false);
    this.view.details1.txbData.text = "";
    this.view.details2.txbData.text = "";
    this.view.details3.txbData.text = "";
    this.view.details4.txbData.text = "";
    this.view.details5.txbData.text = "";
    this.view.details6.txbData.text = "";
    this.view.details7.txbData.text = "";
    this.view.details17.txbData.text = "";
     
    this.view.flxCompleteButton.btnCompleteInspection.skin = "sknBtnebebeb18px";
    this.view.flxCompleteButton.btnCompleteInspection.setEnabled(false);
    this.view.details3.txbData.textInputMode = constants.TEXTBOX_INPUT_MODE_NUMERIC;

//     this.view.details3.txbData.onTextChange = function() {
//       var text = this.view.details3.txbData.text || "";
//       this.view.details3.txbData.text = text.replace(/[^0-9]/g, "");
//     }.bind(this);
    this.view.details3.txbData.onTextChange = function() {
  var text = this.view.details3.txbData.text || "";

  text = text.replace(/[^0-9]/g, "");

  if (text.length > 0 && text.charAt(0) === "0") {
    text = text.replace(/^0+/, ""); 
  }

  this.view.details3.txbData.text = text;

}.bind(this);
    this.view.details1.txbData.setEnabled(false);
    this.view.details2.txbData.setEnabled(false);
    this.view.details6.txbData.setEnabled(false);
    this.view.details7.txbData.setEnabled(false);
    this.view.details17.txbData.setEnabled(false);

    this.view.flxPromptGenerate.setVisibility(false);

    this.view.btnCancel.onClick = () =>
    {
      self.view.flxPromptGenerate.setVisibility(false);
    }

    this.view.flxClose.onClick = () =>
    {
      self.view.flxPromptGenerate.setVisibility(false);
    }

    this.view.flxInspectionDonePopup.setVisibility(false);
    this.view.flxCloseSuccess.onClick = () =>
    {
      self.view.flxInspectionDonePopup.setVisibility(false);
    }
    this.view.btnGoBackToPending.onClick = () =>
    {
      NavigationManager.push("frmMyInspectionsSummary");
    }

    this.view.btnGenerateReport.onClick = this.generateReport.bind(this);
    this.getInspectionMiscellaneousList();
    //     this.setDataToSeg();  

    for (let i = 1; i <= 17; i++) {
      this.view["details" + i].flxArrow.onClick =
        this.toggleDetails.bind(this);
    }
    for (let i = 1; i <= 17; i++) {
      this.view["details" + i].segVehicleDetails.onRowClick =
        this.onRowClickAction.bind(this);
    } 

    //     this.view.flxCompleteButton.btnCompleteInspection.onClick = this.generateReport.bind(this);
    this.view.flxCompleteButton.btnCompleteInspection.onClick = () =>{
      self.view.flxPromptGenerate.setVisibility(true);
    }
    this.view.flxSignature.setVisibility(false);
    this.view.flxArrow.onClick = () =>
    {
      self.view.flxSignature.setVisibility(true);
    }
    this.view.btnGoBack.onClick = () =>{
      self.view.flxBrowser.setVisibility(false);
    }

    this.view.btnComplete.onClick = this.completeInspection.bind(this);

    //                  //#ifdef android
    //   self.view.flxDownload.onClick =  self.onDownloadButtonClick.bind(self);
    //     //#endif
    //     //#ifdef iphone
    //   self.view.flxDownload.onClick = self.testPDFNFIDownload.bind(self);
    //     //#endif
  },





  toggleDetails: function (context) {
    var detailsId = context.parent.parent.id;
    var details = this.view[detailsId];
    var transform = voltmx.ui.makeAffineTransform();
    if (details.flxSegment.isVisible) {
      details.flxSegment.isVisible = false;
      transform.rotate(0);
      details.imgarrow.transform = transform;
    } else {
      details.flxSegment.isVisible = true;
      transform.rotate(180);
      details.imgarrow.transform = transform;
    }
  },



  //   btnSaveResponseOnClickAction: function(){

  //       var self = this;
  //     checkTokenValidatity(function() {
  //       voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  //       var serviceName = "ms_inspection";
  //       var integrationObj = voltmx.sdk.getCurrentInstance()
  //       .getIntegrationService(serviceName);
  //       var operationName = "upsert-inspection-miscellaneous";

  //       var data = {
  //     "object_id": "00-408A-983B-2678369F3102_73642",
  // //     "service_history": "Available",
  // //     "user_manual": "Available",
  //     "tool_kit": self.view.details1.txbData.text,
  //     "damaged_areas": self.view.details2.txbData.text,
  //     "estimated_repair_cost": self.view.details3.txbData.text,
  //     "service_provider": self.view.details4.txbData.text,
  //     "technician_id":self.view.details5.txbData.text,
  //     "branch": self.view.details6.txbData.text,
  //     "city": self.view.details7.txbData.text,
  //     "signature_image_id": self.view.details8.txbData.text,
  // //     "services_id": 54
  //   }
  //       // Headers
  //       var headers = {
  //         "user_token"  : voltmx.store.getItem("getUserAccesstoken")
  // //         "Content-Type": "application/json",
  // //         "jwt_token"   : ""
  //       };

  //       integrationObj.invokeOperation(
  //         operationName,
  //         headers,
  //         data,
  //         self.operationSuccessSaveResponse.bind(self),
  //         self.operationFailureSaveResponse.bind(self)
  //       );
  //     });

  //   },




  //    operationSuccessSaveResponse: function(response)
  //   {
  //     voltmx.application.dismissLoadingScreen();
  //     voltmx.print(response);
  //     alert(response.success);

  //   },




  //   operationFailureSaveResponse: function(error)
  //   {
  //     voltmx.application.dismissLoadingScreen();
  //     voltmx.print(error);
  //   },

  //   btnSaveResponseOnClickAction: function () {

  //   var self = this;

  //   voltmx.application.showLoadingScreen(
  //     null,
  //     "Saving...",
  //     constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
  //     false,
  //     true,
  //     {
  //       progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL
  //     }
  //   );

  // //   var baseURL = voltmx.store.getItem("BASE_URL");

  // //   if (baseURL) {
  // //     if (!baseURL.endsWith("/")) {
  // //       baseURL += "/";
  // //     }
  // //   }

  // //   var url = baseURL + "services/ms_inspection/upsert-inspection-miscellaneous";
  //   var url = "https://dev2-hcltx.et.ae/services/ms_inspection/api/v1/upsert-inspection-miscellaneous";
  //     var token = voltmx.store.getItem("getUserAccesstoken");
  //   voltmx.print( " token   "+token);
  //   var request = new voltmx.net.HttpRequest();
  //   request.open("POST", url);

  //   request.setRequestHeader("Content-Type", "application/json");
  // //   request.setRequestHeader("Accept", "application/json");
  //   request.setRequestHeader("Authorization", "Basic MzBjYzcxOWMzNGJlYjU0YWZjOWRkMTc0YTUzMDQwNjc6YmZhMDRlM2JmY2U4ZGU3N2Y2NTQ2N2YyZTM1MjI0NQ==");
  //   request.setRequestHeader("user_token", voltmx.store.getItem("getUserAccesstoken"));

  // //   var data = {
  // //     "object_id": "00-408A-983B-2678369F3102_73642",
  // //     "tool_kit": self.view.details1.txbData.text,
  // //     "damaged_areas": self.view.details2.txbData.text,
  // //     "estimated_repair_cost": self.view.details3.txbData.text,
  // //     "service_provider": self.view.details4.txbData.text,
  // //     "technician_id": self.view.details5.txbData.text,
  // //     "branch": self.view.details6.txbData.text,
  // //     "city": self.view.details7.txbData.text,
  // //     "signature_image_id": self.view.details8.txbData.text
  // //   };

  //     var data = {
  //   "object_id": "00-408A-983B-2678369F3102_73642",
  //   "tool_kit": self.view.details1.txbData.text || "",
  //   "damaged_areas": self.view.details2.txbData.text || "",
  //   "estimated_repair_cost": Number(self.view.details3.txbData.text) || 0,
  //   "service_provider": self.view.details4.txbData.text || "",
  //   "technician_id": self.view.details5.txbData.text || "",
  //   "branch": self.view.details6.txbData.text || "",
  //   "city": self.view.details7.txbData.text || "",
  //   "signature_image_id": Number(self.view.details8.txbData.text) || 0
  // };
  //   request.onReadyStateChange = function () {

  //     if (request.readyState === 4) {

  //       voltmx.application.dismissLoadingScreen();

  //       if (request.status === 200) {

  //         var responseString = request.responseText;
  //         var responseJSON = JSON.parse(responseString);

  //         voltmx.print("Save Response: " + JSON.stringify(responseJSON));

  //         if (responseJSON.opstatus === 0) {

  //           alert("Response saved successfully");

  //         } else {

  //           alert("Failed to save response");

  //         }

  //       } else {

  //         voltmx.print("HTTP Error: " + request.status);
  //         alert("Server error occurred");

  //       }
  //     }
  //   };

  //   request.send(JSON.stringify(data));

  // },


  btnSaveResponseOnClickAction: function () {

    var self = this;

    var allFilled = true;

    for (var i = 1; i <= 7; i++) {
      var value = self.view["details" +i].txbData.text;

      if (!value || value.trim() === "") {
        allFilled = false;
        break;
      }
    }
    
   var val = self.view.details17.txbData.text;
    if (!val || val.trim() === "") {
        allFilled = false;
      }
    

    if (allFilled) {
      
     if (
  self.view.details3.txbData.text &&
  Number(self.view.details3.txbData.text) > 0
) {

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
      //     var url = "https://dev2-hcltx.et.ae/services/ms_inspection/api/v1/upsert-inspection-miscellaneous";

      var token = voltmx.store.getItem("getUserAccesstoken");
      voltmx.print("Token: " + token);

      var request = new voltmx.net.HttpRequest();
      request.open("POST", url);

      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Accept", "application/json");
      request.setRequestHeader("Authorization", "Basic "+encodeVal);
      request.setRequestHeader("user_token", token);


      var data = self.fullExistingData ? 
          JSON.parse(JSON.stringify(self.fullExistingData)) :   // deep copy
      {};
      data.tool_kit = (self.view.details1.txbData.text || "").trim();
      data.damaged_areas = (self.view.details2.txbData.text || "").trim();
      data.estimated_repair_cost = parseFloat(self.view.details3.txbData.text) || 0;
      data.service_provider = (self.view.details4.txbData.text || "").trim();
      data.technician_id = (self.view.details5.txbData.text || "").trim();
      data.branch = (self.view.details6.txbData.text || "").trim();
      data.city = (self.view.details7.txbData.text || "").trim();
      data.service_book = (self.view.details17.txbData.text || "").trim();
      // data.signature_image_id = Number(self.obj.image_id) || self.fullExistingData.signature_image_id;
      var imageId = self.obj && self.obj.image_id && Number(self.obj.image_id);

      if (!isNaN(imageId)) {
        data.signature_image_id = imageId;
      } else {
        data.signature_image_id = self.fullExistingData.signature_image_id ? Number(self.fullExistingData.signature_image_id) : 0;
      }

      data.object_id = self.objectId;
      data.services_id = Number(self.services_id);

      if(self.existingId)
      {
        data.id = self.existingId
      }

      delete data.file_url;
      delete data.file_name;
      voltmx.print("Payload: " + JSON.stringify(data));

      request.onReadyStateChange = function () {

        if (request.readyState === 4) {

          voltmx.application.dismissLoadingScreen();

          voltmx.print("Response Status: " + request.status);
          voltmx.print("Response: " + request.responseText);
          var responseJSON = JSON.parse(request.responseText);
          if (request.status === 200) {

            if (responseJSON.success) {
              alert("Saved successfully");
              self.view.flxCompleteButton.btnCompleteInspection.skin = "sknBtn61b35cBorder61b35cRadius8px";
              self.view.flxCompleteButton.btnCompleteInspection.setEnabled(true);
              voltmx.store.removeItem("signature");
            } else {
              alert("Failed to save response");
            }
          } 

          else {
            if(responseJSON.error && responseJSON.error.message)
                {
                  alert(responseJSON.error.message);
                }
//             alert("Server error occurred");
          }
        }
      };

      request.send(JSON.stringify(data));
}
else{
  alert(voltmx.i18n.getLocalizedString('Estimated Repair cost should be positive'));
}
    } else {
      alert(voltmx.i18n.getLocalizedString('Please fill all fields'));
    }


  },




  setDataToSeg: function()
  {
    var data = [
      { lblData: "Vehicle ID : VH-10234" },
      { lblData: "Auction Date : 25 Dec 2025" },
      { lblData: "Base Price : AED 45,000" },
      { lblData: "Current Bid : AED 52,000" },
      { lblData: "Vehicle ID : VH-10234" },
      { lblData: "Auction Date : 25 Dec 2025" },
      { lblData: "Base Price : AED 45,000" },
      { lblData: "Current Bid : AED 52,000" }
    ];

    for (var i = 1; i <= 16; i++) {
      var details = this.view["details" + i];
      if (details && details.segVehicleDetails) {
        details.segVehicleDetails.setData(data);
      }
    }
  },





  onRowClickAction: function (seg, sectionIndex, rowIndex) {
    var rowData = seg.selectedRowItems[0];
    var lblValue = rowData.lblData;
    var details = seg.parent.parent;
    details.txbData.text = lblValue;
    details.flxSegment.setVisibility(false);
    var transform = voltmx.ui.makeAffineTransform();
    transform.rotate(0); 
    details.imgarrow.transform = transform;
  },





  getInspectionMiscellaneousList: function(){
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_inspection";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "get-inspection-miscellaneous-list";

      //   var data = {
      //       "lot_no": "",
      //       "title": "",
      //       "chassis_number": "",
      //       "language": "en",
      //       "oracle_num": "",
      //       "in_yard": "0",      // pending = 0 || completed = 1
      //       "days": "7",         // default value
      //       "page_number": "1",
      //       "page_size": self.pageSize || 5
      //   };

      var data = {
        "object_id": self.objectId,
        "insp_pac_lov_id": self.lovId
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
    var self = this;
    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
    if (response && 
        response.records && 
        response.records.length > 0) 
    {
      const firstRecord = response.records[0];
       if(firstRecord.signature_image_id)
         {
           self.view.flxCompleteButton.btnCompleteInspection.skin = "sknBtn61b35cBorder61b35cRadius8px";
              self.view.flxCompleteButton.btnCompleteInspection.setEnabled(true);
         }
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

    this.view.details1.txbData.text = res.tool_kit;
    this.view.details2.txbData.text = res.damaged_areas;
    this.view.details3.txbData.text = res.estimated_repair_cost;
    this.view.details6.txbData.text = res.branch;
    this.view.details7.txbData.text = res.city;
    this.view.details4.txbData.text = res.service_provider;
    this.view.details5.txbData.text = res.technician_id;
    this.view.details17.txbData.text = res.service_book;
  },
  // -----------------------------------------------------------------------


  masterfleetspecvalues: function(){
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_fleet";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "master-fleet-spec-values";

      var data = {
        //         "object_id": "4D908BC2-AD33-4784-8420-3BB403CB6BF4"
        "spec_list": "branch;tool_kit;service_history;city;damaged_areas;service_book",
        "widget_name": "fleet_specs_details;fleet_insp_details",
        "asset_definitions": "false",
        "auction_types": "false",
        "payment_methods": "false"
      }

      // Headers
      var headers = {
        "user_token": voltmx.store.getItem("getUserAccesstoken") 
      };

      integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        self.operationSuccessFleet.bind(self),
        self.operationFailureFleet.bind(self)
      );
    });
  },





  operationSuccessFleet: function(response){

    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);

    if(!response || !response.data || response.data.length === 0){
      voltmx.print("Invalid response");
      return;
    }

    var res = response.data[0];

    this.setSegmentData(this.view.details1.segVehicleDetails, res.tool_kit);
    this.setSegmentData(this.view.details6.segVehicleDetails, res.branch);
    this.setSegmentData(this.view.details2.segVehicleDetails, res.damaged_areas);
    this.setSegmentData(this.view.details7.segVehicleDetails, res.city);
    this.setSegmentData(this.view.details17.segVehicleDetails, res.service_book)


  },





  operationFailureFleet: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },












  // -------------------------------------------------------------------------  
  //   addToSegment: function(response){

  //     if(!response || !response.data || response.data.length === 0){
  //         voltmx.print("Invalid response");
  //         return;
  //     }

  //     var self = this;

  //     // mapping response key → segment widget
  //     var segmentMap = {
  //         "tool_kit": self.view.details1.segVehicleDetails,
  //         "damaged_areas": self.view.details2.segVehicleDetails,
  //         "estimated_repair_cost": self.view.details3.segVehicleDetails,
  //         "service_provider": self.view.details4.segVehicleDetails,
  //         "technician_id": self.view.details5.segVehicleDetails,
  //         "branch": self.view.details6.segVehicleDetails,
  //         "city" : self.view.details7.segVehicleDetails,
  //         "Signature" : self.view.details8.segVehicleDetails
  //     };

  //     response.data.forEach(function(rec){

  //         for(var key in rec){

  //             var values = rec[key];
  //             var segWidget = segmentMap[key];

  //             if(segWidget && values){

  //                 var segData = values.map(function(item){
  //                     return { lblData: item };
  //                 });

  //                 segWidget.setData(segData);
  //             }
  //         }

  //     });

  // }
  setSegmentData: function(segment, data){

    var segData = [];

    data.forEach(function(item){
      segData.push({
        lblData: item.value
      });
    });

    segment.setData(segData);

  },

  completeInspection: function()
  {
    var self = this;

    //     self.view.flxVehicleReceived.setVisibility(true);

    var serviceName = "ms_services";

    var integrationObj = voltmx.sdk.getCurrentInstance()

    .getIntegrationService(serviceName);

    var operationName = "wf-status";

    var data = {
      "service_request_id": self.object_service_id,
      "object_id": self.objectId,
      "action_name": "Done",
      "comments": "Completed the inspection"

    };

    // Headers

    var headers = {

      "user_token": voltmx.store.getItem("getUserAccesstoken") 

    };
    //  integrationObj.invokeOperation
    integrationObj.invokeOperation(

      operationName,

      headers,

      data,

      operationSuccessCompleted,   // ✅ pass reference

      operationFailureCompleted

    );


    function operationSuccessCompleted(response)

    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(response);

      if(response && response.rawResponse && response.rawResponse.data && response.rawResponse.data.id)
      {
        //            self.view.flxBrowser.setVisibility(false);
        self.view.flxInspectionDonePopup.setVisibility(true);

      }


    }

    function operationFailureCompleted(error)

    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);

    }
  },

  generateReport: function()
  {
    var self = this;

    //     self.view.flxVehicleReceived.setVisibility(true);
    self.view.flxPromptGenerate.setVisibility(false);
    voltmx.application.showLoadingScreen(null, "Generating Report..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    var serviceName = "fry_collection";

    var integrationObj = voltmx.sdk.getCurrentInstance()

    .getIntegrationService(serviceName);

    var operationName = "GenerateTechnicalReport";

    var data = {

      "moduleName": "GenerateTechnicalReport",
      "user_token": voltmx.store.getItem("getUserAccesstoken"),
      "moduleType": "Fleet",
      "user_id": voltmx.store.getItem("userId"),
      "object_id": self.objectId

    };

    // Headers

    var headers = {

      //       "user_token": voltmx.store.getItem("getUserAccesstoken") 

    };
    //  integrationObj.invokeOperation
    integrationObj.invokeOperation(

      operationName,

      headers,

      data,

      operationSuccessCompleted,  

      operationFailureCompleted

    );


    function operationSuccessCompleted(response)

    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(response);

      if(response && response.message === "Success")
      {
        if(response.file_url)
        {

          //#ifdef android
          self.onDownloadButtonClick(response.file_url);
          //#endif
          //#ifdef iphone
          self.testPDFNFIDownload(response.file_url);
          //#endif            
          self.completeInspection();
        }
      }
      else if(response.dam_response)
      {
        var damResponseStr = response.dam_response || response.dam_response_s;

        if (damResponseStr && damResponseStr.indexOf("409") !== -1) {
          alert("File already exists")
        }
      }
      else if (response.file_url && response.file_name && response.file_id) {
        
        // Store file details (you can store in variable / state / local storage)
        var fileDetails = {
            image_url: response.file_url,
            file_name: response.file_name,
            image_id: response.file_id,
            object_id: self.objectId
        };
        
         var alertConfig = {
            message: "Do you want to delete old report?",
            alertType: constants.ALERT_TYPE_CONFIRMATION,
            alertTitle: "Confirmation",
            yesLabel: "Yes",
            noLabel: "No",
            alertHandler: function(response) {

                if (response) {
                    ImageUploadAndDeletion.deleteFile(fileDetails, function(res, err) {

                        if (!err && res && res.opstatus === 0) {

                           
//                          alert("Old Report Deleted Successfully");   
                   
                            var alertConfig = {
            message: "Do you want to download report?",
            alertType: constants.ALERT_TYPE_CONFIRMATION,
            alertTitle: "Confirmation",
            yesLabel: "Yes",
            noLabel: "No",
            alertHandler: function(response) {

                if (response) {

                   self.view.flxPromptGenerate.setVisibility(true); 
                   

                } else {
                    
                }
            }
        };

        voltmx.ui.Alert(alertConfig, {});
                          

                        } else {
                        }
                    });

                } else {
                    
                }
            }
        };

        voltmx.ui.Alert(alertConfig, {});
       }
      else
      {
        self.showToast(response.message);
      }



    }

    function operationFailureCompleted(error)

    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);

    }
  },

  onDownloadButtonClick: function (fileUrl) {
    var self = this;



    try {


      //           var fileUrl = self.fileUrl;
      //           var fileName = thirdPartyFile.file_name;
      var fileName = "Inspection Report_" + Date.now();

      try {
        // Proceed to download using Java interop
        var DownloadClass = java.import("com.example.pdffiledownload.FileDownloadHandler");
        var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();

        DownloadClass.downloadFile(ActivityContext, fileUrl, fileName);
        // Optionally show confirmation to user
        // voltmx.ui.Alert("Download started for: " + fileName);
      } catch (downloadError) {
        self.showToast("Download failed: " + downloadError.message);
      }
    } 
    catch (e) {
      self.showToast("Unexpected error while checking files: " + e.message);
    }

  },

  showToast: function(message) {
    var platform = voltmx.os.deviceInfo().name.toLowerCase();

    if (platform === "android") {
      var toast = new voltmx.ui.Toast({
        text: message,
        duration: constants.TOAST_LENGTH_SHORT,
        alignConfig: {
          widget: voltmx.application.getCurrentForm(),
          position: constants.TOAST_POS_BOTTOM // or TOAST_POS_TOP / CENTER
        }
      });
      toast.show();
    } else if (platform === "iphone" || platform === "ipad") {
      alert(message);
    } else {
      // Fallback for other platforms (optional)
      voltmx.print("Toast not supported on this platform: " + platform);
    }
  },


  testPDFNFIDownload: function(fileUrl)
  {


    try {
      // Find the first file with type "3rd-Party"

      //            var fileUrl = self.fileUrl;
      //           var fileName = thirdPartyFile.file_name;
      var  fileName = "Inspection Report_" + Date.now();

      // Proceed to download
      var FileDownloadHandlerNFI = objc.import("PDFDownloadNFI");
      var DownloadPDFViewController = objc.import("DownloadPDFViewController");
      if (!DownloadPDFViewController) {
        voltmx.print("Error: Failed to import PDFDownloadNFI");
      }
      else{
        var downloadObject = DownloadPDFViewController.alloc().jsinit();
        downloadObject.downloadAndPreviewPDFFileName(fileUrl,fileName);
      }


    } catch (e) {
      alert("Download error: " + e.message);
    }



  },

  //   onSubmitClick: function(){
  //     var self = this;
  //   var signature = voltmx.store.getItem("signature");
  // if(signature){
  // //   alert(signature);
  //           var filefullname = "signature" + new Date().getTime() + ".png";

  //   this.fileDetails = [{
  //     "is_thumbnail": "false",
  //     "inspection_category": "inspection",
  //     "inspection_subcategory": "inspectionsignature",
  //     "filename": filefullname,
  //     "base64": signature
  //   }];

  //   self.uploadImages();
  // }
  //     else
  //       {
  //         alert("Signature is mandatory");
  //       }


  // },

  onSubmitClick: function() {
    var self = this;

     var allFilled = true;

    for (var i = 1; i <= 7; i++) {
      var value = self.view["details" +i].txbData.text;

      if (!value || value.trim() === "") {
        allFilled = false;
        break;
      }
    }

    if (allFilled) {
    var signature = voltmx.store.getItem("signature"); // new drawn
    var existingSignatureId = self.fullExistingData && self.fullExistingData.signature_image_id;

    if (signature) {

      var filefullname = "signature" + new Date().getTime() + ".png";

      this.fileDetails = [{
        "is_thumbnail": "false",
        "inspection_category": "inspection",
        "inspection_subcategory": "inspectionsignature",
        "filename": filefullname,
        "base64": signature
      }];

      self.uploadImages();
      return;
    }

    if (existingSignatureId) {
      self.btnSaveResponseOnClickAction();
      return;
    }

    alert("Signature is mandatory");
    }
    else {
      alert('Please fill all fields');
    }
  },
  uploadImages: function() {
    var self = this;

    ImageUploadAndDeletion.uploadImage(
      self.objectId,
      self.fileDetails,
      function(response, error){

        if(error){
          alert("Image upload failed");
          return;
        }

        if(response && response.message === "Success"){
//           alert("Upload Successful");

          var parsed = JSON.parse(response.response || "[]");
          if(parsed && parsed.length > 0){

            var item = parsed[0];

            var payload = JSON.parse(item.object_image_payload || "{}");
            var imageLog = JSON.parse(item.object_image_loged_result || "{}");

            self.obj = {
              file_name: payload.file_name,
              file_url: payload.file_url,
              object_id: payload.object_id,
              image_id: imageLog.id
            };

          }




          self.btnSaveResponseOnClickAction();
        }
      }
    );
  },

});