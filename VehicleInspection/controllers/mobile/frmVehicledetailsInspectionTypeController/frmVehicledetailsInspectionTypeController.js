define({ 

  onNavigate: function(){
    this.view.preShow =this.onPreShow.bind(this);
  },
  onPreShow: function(){
    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
//     this.clearData();
    
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

//   setDataToSeg: function(response)
//   {
    
//     this.view.details1.segVehicleDetails.widgetDataMap={
//       "flxDropdown":"flxDropdown",
//       "lblData":"lblData"
//     };
// //      var data = [];
// //   var spec = response.data[0];
    
// //     var spec = [
// //       { lblData: "Vehicle ID : VH-10234" },
// //       { lblData: "Auction Date : 25 Dec 2025" },
// //       { lblData: "Base Price : AED 45,000" },
// //       { lblData: "Current Bid : AED 52,000" },
// //       { lblData: "Vehicle ID : VH-10234" },
// //       { lblData: "Auction Date : 25 Dec 2025" },
// //       { lblData: "Base Price : AED 45,000" },
// //       { lblData: "Current Bid : AED 52,000" }
// //     ];

// //       for (var i = 1; i <= 16; i++) {
// //     var details = this.view["details" + i];
// //     if (details && details.segVehicleDetails) {
// //       details.segVehicleDetails.setData(data);
// //     }
// //   }
    
    
//      var data = [];
//   var spec = response.data[0];

//   function pushData(title, arr) {
//     if (arr && arr.length > 0) {
//       for (var i = 0; i < arr.length; i++) {
//         data.push({
//           lblData: title + " : " + arr[i].value
//         });
//       }
//     }
//   }

//   // Push required fields
//   pushData("Year", spec.year_make);
//   pushData("Technical Feature", spec.technical_features);
//   pushData("Keys", spec.keys);
//   pushData("Fuel Type", spec.fuel_type);
//   pushData("Branch", spec.branch);
//   pushData("Mileage Type", spec.mileage_type);
//   pushData("Transmission", spec.transmission_type);
//   pushData("Color", spec.color);
//   pushData("Tyre Brand", spec.name);

//   // Bind to segments
//   for (var i = 1; i <= 16; i++) {
//     var details = this.view["details" + i];
//     if (details && details.segVehicleDetails) {
//       details.segVehicleDetails.setData(data);
//       this.view.details2.segVehicleDetails
//       this.view.details3.segVehicleDetails
//       this.view.details4.segVehicleDetails
//       this.view.details5.segVehicleDetails
//       this.view.details6.segVehicleDetails
//       this.view.details7.segVehicleDetails
//       this.view.details8.segVehicleDetails
//       this.view.details9.segVehicleDetails
//       this.view.details10.segVehicleDetails
//       this.view.details11.segVehicleDetails
//       this.view.details12.segVehicleDetails
//       this.view.details13.segVehicleDetails
//       this.view.details14.segVehicleDetails
      
//     }
//   }

    
    
    
//   },
  
  
  
  setDataToSeg: function(response) {

  var spec = response.data[0];

  function formatData(title, arr) {
    var result = [];
    if (arr && arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        result.push({
          lblData: title + " : " + arr[i].value
        });
      }
    }
    return result;
  }

  // Assign data to each segment separately

  if (this.view.details1.segVehicleDetails) {
    this.view.details1.segVehicleDetails.setData(
     formatData("Test","Test")
    );
  }

  if (this.view.details2.segVehicleDetails) {
    this.view.details2.segVehicleDetails.setData(
      formatData("Test","Test")
    );
  }

  if (this.view.details3.segVehicleDetails) {
    this.view.details3.segVehicleDetails.setData(
      formatData("Test","Test")
    );
  }

  if (this.view.details4.segVehicleDetails) {
    this.view.details4.segVehicleDetails.setData(
   
      
      formatData("Color", spec.color)
    );
  }

  if (this.view.details5.segVehicleDetails) {
    this.view.details5.segVehicleDetails.setData(
      formatData("Test","Test")
    );
  }

  if (this.view.details6.segVehicleDetails) {
    this.view.details6.segVehicleDetails.setData(
   
       formatData("Color", spec.color)
    );
  }

  if (this.view.details7.segVehicleDetails) {
    this.view.details7.segVehicleDetails.setData(
   
       formatData("Color", spec.color)
    );
  }

  if (this.view.details8.segVehicleDetails) {
    this.view.details8.segVehicleDetails.setData(
      
          formatData("Transmission", spec.transmission_type)
    );
  }

  if (this.view.details9.segVehicleDetails) {
    this.view.details9.segVehicleDetails.setData(
      
        formatData("Mileage Type", spec.mileage_type)
    );
  }

      if (this.view.details10.segVehicleDetails) {
    this.view.details10.segVehicleDetails.setData(
      
       formatData("Branch", spec.branch)
    );
  }

       if (this.view.details11.segVehicleDetails) {
    this.view.details11.segVehicleDetails.setData(
      
        formatData("Fuel Type", spec.fuel_type)
    );
  }
       if (this.view.details12.segVehicleDetails) {
    this.view.details12.segVehicleDetails.setData(
      
      formatData("Keys", spec.keys)
    );
  }
       if (this.view.details13.segVehicleDetails) {
    this.view.details13.segVehicleDetails.setData(
   formatData("Test","Test")
    );
  }
          if (this.view.details14.segVehicleDetails) {
    this.view.details14.segVehicleDetails.setData(
   formatData("Technical Feature", spec.technical_features)
    );
  }
             if (this.view.details15.segVehicleDetails) {
    this.view.details15.segVehicleDetails.setData(
     formatData("Year", spec.year_make)
    );
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
  this.setDataToSeg(response);  
},
  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
 

});