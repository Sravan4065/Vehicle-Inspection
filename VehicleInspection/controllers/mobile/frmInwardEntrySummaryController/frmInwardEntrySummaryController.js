define({ 

  onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmInwardEntrySummary");
//     this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    
    this.view.segInwardEntryList.onRowClick = () =>
    {
      NavigationManager.push("frmInwardEntryVehicleDetails");
    },
      
      this.view.flxPendingVehicles.onClick = () =>
    {
      this.showPendingVehicles();
    },
      
      this.view.flxCompletedVehicles.onClick = () =>
    {
      this.showCompletedVehicles();
    }
  },
  
   showPendingVehicles: function()
  {
    
    this.invokePendingInwardService();
    this.view.flxPendingVehicles.skin = "sknFlxFFE2E5";
    this.view.lblPendingVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblPendingCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULPending.skin = "sknflxd32437";
    
    this.view.flxCompletedVehicles.skin = "sknFlxBasic";
    this.view.lblCompletedVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblCompletedCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULCompleted.skin = "sknFlxE4E4E4";
  },
  
  showCompletedVehicles: function()
  {
    this.invokeCompletedInwardService();
    this.view.flxPendingVehicles.skin = "sknFlxBasic";
    this.view.lblPendingVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblPendingCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULPending.skin = "sknFlxE4E4E4";
    
    this.view.flxCompletedVehicles.skin = "sknFlxFFE2E5";
    this.view.lblCompletedVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblCompletedCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULCompleted.skin = "sknflxd32437";
  },
  
  invokePendingInwardService: function() {
  
  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-inyard-vehicles";

  var data = {
      "lot_no": "",
      "title": "",
      "chassis_number": "",
      "language": "en",
      "oracle_num": "",
      "in_yard": "0",      // pending = 0 || completed = 1
      "days": "7",         // default value
      "page_number": "1",
      "page_size": "10"
  };

  // Headers
  var headers = {
      "user_token": voltmx.store.getItem("getUserAccesstoken") 
  };

  integrationObj.invokeOperation(
      operationName,
      headers,
      data,
      this.operationSuccessPending.bind(this),
      this.operationFailurePending.bind(this)
  );
},
  
  operationSuccessPending: function(response)
  {
    voltmx.print(response);
  },
  
  operationFailurePending: function(error)
  {
    voltmx.print(error);
  },
  
   invokeCompletedInwardService: function() {
  
  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-inyard-vehicles";

  var data = {
      "lot_no": "",
      "title": "",
      "chassis_number": "",
      "language": "en",
      "oracle_num": "",
      "in_yard": "1",      // pending = 0 || completed = 1
      "days": "7",         // default value
      "page_number": "1",
      "page_size": "10"
  };

  // Headers
  var headers = {
      "user_token": voltmx.store.getItem("getUserAccesstoken") 
  };

  integrationObj.invokeOperation(
      operationName,
      headers,
      data,
      this.operationSuccessCompleted.bind(this),
      this.operationFailureCompleted.bind(this)
  );
},
  
  operationSuccessCompleted: function(response)
  {
    voltmx.print(response);
    this.addToSegment(response);
  },
  
  operationFailureCompleted: function(error)
  {
    voltmx.print(error);
  },
  
//   addToSegment: function(response)
//   {
//     var self = this;
//     var records = response.records;
//     self.view.segInwardEntryList.setData([]);
//     self.view.segInwardEntryList.widgetDataMap = 
//       {
//       "flxLotModel": "flxLotModel",
//       "flxLocation": "flxLocation",
//       "flxDate": "flxDate",
//       "flxViewDetailsInwardEntry": "flxViewDetailsInwardEntry",
//       "lblLotAndModel": "lblLotAndModel",
//       "lblVehicleNumber": "lblVehicleNumber",
//       "lblLocation": "lblLocation",
//       "lblDate": "lblDate",
//       "lblViewDetailsInwardEntry": "lblViewDetailsInwardEntry"
//     }
    
//     var data = [];
    
//     records.forEach((record) => {
//      data.push({
//        "lblLotAndModel": record.lot_no + " "+record.model,
//         "flxViewDetailsInwardEntry": {
//           "onClick": self.openDetails.bind(this,record.object_id)
//         }
//      })
// });
    
//     self.view.segInwardEntryList.setData(data);
//   },
  
  addToSegment: function(response) {
    var self = this;

    var records = response && response.records ? response.records : [];

    self.view.segInwardEntryList.setData([]);

    self.view.segInwardEntryList.widgetDataMap = {
        "flxLotModel": "flxLotModel",
        "flxLocation": "flxLocation",
        "flxDate": "flxDate",
        "flxViewDetailsInwardEntry": "flxViewDetailsInwardEntry",
        "lblLotAndModel": "lblLotAndModel",
        "lblVehicleNumber": "lblVehicleNumber",
        "lblLocation": "lblLocation",
        "lblDate": "lblDate",
        "lblViewDetailsInwardEntry": "lblViewDetailsInwardEntry"
    };

    var data = [];

    if (records.length > 0) {

        records.forEach(function(record) {

            data.push({
                "lblLotAndModel": (record.lot_no || "") + " " + (record.model || ""),
                "lblVehicleNumber": record.vehicle_number || "",
                "lblLocation": record.location || "",
                "lblDate": record.date || "",
                "lblViewDetailsInwardEntry": "View Details",

                "flxViewDetailsInwardEntry": {
                    "onClick": function() {
                        self.openDetails(record.object_id);
                    }
                }
            });

        });

    }

    self.view.segInwardEntryList.setData(data);
},
  
  receiveVehicle: function(objectId) {

    var serviceName = "ms_fleet";   
    var operationName = "fleet-wfstatus";

    var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);


    var data = {
        "object_id": objectId,
        "action_name": "Yard Received"
    };

  
    var headers = {
        "user_token": voltmx.store.getItem("user_token"),
    };

    integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        this.receiveSuccess.bind(this),
        this.receiveFailure.bind(this)
    );
},
  openDetails: function(objectId)
  {
    new voltmx.mvc.Navigation("frmInwardEntryVehicleDetails").navigate(
    {
      "objectId": objectId
    });
  },
  

 });