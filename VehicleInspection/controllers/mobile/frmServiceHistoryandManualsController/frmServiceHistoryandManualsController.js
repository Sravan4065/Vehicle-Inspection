define({ 

  onNavigate: function(context){
    this.view.preShow =this.onPreShow.bind(this);
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.btnSaveResponseOnClickAction.bind(this);
     this.lovId = context.lovId;
    this.objectId = context.object_id;
  },



  onPreShow: function(){
    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
    //     this.clearData();
    this.masterfleetspecvalues();
    this.getInspectionMiscellaneousList();
//     this.setDataToSeg();  

    for (let i = 1; i <= 2; i++) {
      this.view["details" + i].flxArrow.onClick =
        this.toggleDetails.bind(this);
    }
    for (let i = 1; i <= 2; i++) {
      this.view["details" + i].segVehicleDetails.onRowClick =
        this.onRowClickAction.bind(this);
    }
    this.view.details1.txbData.setEnabled(false);
    this.view.details2.txbData.setEnabled(false);
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
  service_history : (self.view.details1.txbData.text || "").trim(),
  user_manual : (self.view.details2.txbData.text || "").trim(),
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

    this.view.details1.txbData.text = res.service_history;
    this.view.details2.txbData.text = res.user_manual;

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
        "spec_list": "branch;tool_kit;service_history;city;damaged_areas;user_manual",
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

    this.setSegmentData(this.view.details1.segVehicleDetails, res.service_history);
    this.setSegmentData(this.view.details2.segVehicleDetails, res.user_manual);


  },





  operationFailureFleet: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  setSegmentData: function(segment, data){

    var segData = [];

    data.forEach(function(item){
      segData.push({
        lblData: item.value
      });
    });

    segment.setData(segData);

  }
 
});