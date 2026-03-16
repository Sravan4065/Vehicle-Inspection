define({ 

  onNavigate: function(){
    this.view.preShow =this.onPreShow.bind(this);
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.btnSaveResponseOnClickAction.bind(this);
  },
  // this.view.flxHeadingWithButton.btnSaveResponse



  onPreShow: function(){
    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
    //     this.clearData();
    this.masterfleetspecvalues();
    this.getInspectionMiscellaneousList();
    this.setDataToSeg();  

    for (let i = 1; i <= 16; i++) {
      this.view["details" + i].flxArrow.onClick =
        this.toggleDetails.bind(this);
    }
    for (let i = 1; i <= 16; i++) {
      this.view["details" + i].segVehicleDetails.onRowClick =
        this.onRowClickAction.bind(this);
    } 
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

    voltmx.application.showLoadingScreen(
      null,
      "Saving...",
      constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
      false,
      true,
      { progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL }
    );

    var url = "https://dev2-hcltx.et.ae/services/ms_inspection/api/v1/upsert-inspection-miscellaneous";

    var token = voltmx.store.getItem("getUserAccesstoken");
    voltmx.print("Token: " + token);

    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);

    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic MzBjYzcxOWMzNGJlYjU0YWZjOWRkMTc0YTUzMDQwNjc6YmZhMDRlM2JmY2U4ZGU3N2Y2NTQ2N2YyZTM1MjI0NQ==");
    request.setRequestHeader("user_token", token);

//     var data = {
//       object_id: "00-408A-983B-2678369F3102_73642",
//       tool_kit: self.view.details1.txbData.text || "",
//       damaged_areas: self.view.details2.txbData.text || "",
//       estimated_repair_cost: parseFloat(self.view.details3.txbData.text) || 0,
//       service_provider: self.view.details4.txbData.text || "",
//       technician_id: self.view.details5.txbData.text || "",
//       branch: self.view.details6.txbData.text || "",
//       city: self.view.details7.txbData.text || "",
//       signature_image_id: parseInt(self.view.details8.txbData.text) || 0
//     };
    var data = {
  object_id: "00-408A-983B-2678369F3102_73642",
  tool_kit: (self.view.details1.txbData.text || "").trim(),
  damaged_areas: (self.view.details2.txbData.text || "").trim(),
  estimated_repair_cost: parseFloat(self.view.details3.txbData.text) || 0,
  service_provider: (self.view.details4.txbData.text || "").trim(),
  technician_id: (self.view.details5.txbData.text || "").trim(),
  branch: (self.view.details6.txbData.text || "").trim(),
  city: (self.view.details7.txbData.text || "").trim(),
  signature_image_id: parseInt(self.view.details8.txbData.text) || 0
};

    voltmx.print("Payload: " + JSON.stringify(data));

    request.onReadyStateChange = function () {

      if (request.readyState === 4) {

        voltmx.application.dismissLoadingScreen();

        voltmx.print("Response Status: " + request.status);
        voltmx.print("Response: " + request.responseText);

        if (request.status === 200) {

          var responseJSON = JSON.parse(request.responseText);

          //         if (responseJSON.opstatus === 0) {
          //           alert("Response saved successfully");
          //         } else {
          //           alert("Failed to save response");
          //         }

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
        "object_id": "4D908BC2-AD33-4784-8420-3BB403CB6BF4"
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

    this.view.details1.txbData.text = res.tool_kit;
    this.view.details2.txbData.text = res.damaged_areas;
    this.view.details3.txbData.text = res.estimated_repair_cost;
    this.view.details6.txbData.text = res.branch;
    this.view.details7.txbData.text = res.city;
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
        "spec_list": "branch;tool_kit;service_history;city;damaged_areas",
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

  }
  // addToSegment: function(response){

  //     if(!response || !response.records || response.records.length === 0){
  //         voltmx.print("Invalid response");
  //         return;
  //     }

  //     var self = this;

  //     var segmentMap = {
  //         "tool_kit": self.view.details1.segVehicleDetails,
  //         "damaged_areas": self.view.details2.segVehicleDetails,
  //         "estimated_repair_cost": self.view.details3.segVehicleDetails,
  //         "branch": self.view.details6.segVehicleDetails,
  //         "city": self.view.details7.segVehicleDetails,
  //         "user_manual": self.view.details8.segVehicleDetails
  //     };

  //     response.records.forEach(function(rec){

  //         for(var key in rec){

  //             var value = rec[key];
  //             var segWidget = segmentMap[key];

  //             if(segWidget && value){

  //                 var segData = [{
  //                     lblData: value
  //                 }];

  //                 segWidget.setData(segData);
  //             }
  //         }

  //     });

  // }
});