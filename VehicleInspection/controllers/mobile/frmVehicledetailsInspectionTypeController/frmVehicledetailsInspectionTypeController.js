define({ 

  onNavigate: function(){
    this.view.preShow =this.onPreShow.bind(this);
  },
  onPreShow: function(){
    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
//     this.clearData();
    this.setDataToSeg();  
    for (let i = 1; i <= 16; i++) {
  this.view["details" + i].flxArrow.onClick =
    this.toggleDetails.bind(this);
}
  for (let i = 1; i <= 16; i++) {
  this.view["details" + i].segVehicleDetails.onRowClick =
    this.onRowClickAction.bind(this);
}
    this.invokePendingInspectionService();
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
  
  
     invokePendingInspectionService: function() {
  var self = this;
      checkTokenValidatity(function() {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  var serviceName = "fry_int_fleet";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "master-fleet-spec-values";

  var data ={
  "spec_list": "name;size;year_make;roles;customer_rating;horsepower;branch;location;emirates;body_condition;mechanical_condition;body_type;doors;no_of_cylinders;color;transmission_type;warranty;fuel_type;extra;technical_features;investment_center;mileage_type;media;type_of_wheels;seats;general_items;vehicle_source;documents;ownership;administrative_fees;keys;0;Media;Type of wheels;Seats;General items;Vehicle Source;Administrative fees",

  "widget_name": "fleet_specs_details;fleet_insp_details;users;add_request",

  "asset_definitions": "false",
  "auction_types": "false"
};


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
},
  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
 

});