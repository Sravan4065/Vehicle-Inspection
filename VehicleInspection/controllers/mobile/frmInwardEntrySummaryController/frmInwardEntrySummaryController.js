define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmInwardEntrySummary");
//     this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segInwardEntryList.setData([]);
    this.showPendingVehicles();
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
      
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
  },
  
    onLoadMoreClick: function()
  {
    var self = this;
    if(self.isPending)
      {
        self.pageSize += 5;
        self.invokePendingInwardService();
      }
    else
      {
        self.pageSize += 5;
        self.invokeCompletedInwardService();
      }
  },
  
   showPendingVehicles: function()
  {
    this.isPending = true;
    this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segInwardEntryList.setData([]);
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
    this.isPending = false;
    this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segInwardEntryList.setData([]);
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
  var self = this;
    checkTokenValidatity(function() {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
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
      "days": "150",         // default value
      "page_number": "1",
      "page_size": self.pageSize || 5
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

  var record = (response.records && response.records.length > 0)
    ? response.records[0]
    : {
        total_completed: "0",
        total_pending: "0",
        total_vehicles: "0"
      };

  this.completedVehicles = record.total_completed;
  this.pendingVehicles = record.total_pending;
  this.totalVehicles = record.total_vehicles;

  this.view.flxSummary.lblTotalCount.text = this.totalVehicles;
  this.view.flxSummary.lblCompletedCount.text = this.completedVehicles;
  this.view.flxSummary.lblPendingCount.text = this.pendingVehicles;

  this.view.lblPendingCount.text = this.pendingVehicles;
  this.view.lblCompletedCount.text = this.completedVehicles;

  this.addToSegment(response);
},
  
  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
  
   invokeCompletedInwardService: function() {
  var self = this;
     checkTokenValidatity(function() {
         voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

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
      "days": "150",         // default value
      "page_number": "1",
      "page_size": self.pageSize || 5
  };

  // Headers
  var headers = {
      "user_token": voltmx.store.getItem("getUserAccesstoken") 
  };

  integrationObj.invokeOperation(
      operationName,
      headers,
      data,
      self.operationSuccessCompleted.bind(self),
      self.operationFailureCompleted.bind(self)
  );
     });
},
  
  operationSuccessCompleted: function(response)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
    this.addToSegment(response);
  },
  
  operationFailureCompleted: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  
  addToSegment: function(response) {
    var self = this;

    var records = response && response.records ? response.records : [];
    if(records.length > 0)
      {
        self.view.lblNorecords.setVisibility(false);
        self.view.segInwardEntryList.setVisibility(true);
      }
     else{
        self.view.lblNorecords.setVisibility(true);
        self.view.segInwardEntryList.setVisibility(false);
     }
    var newRecords = records.slice(self.currentOffset);
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    

    self.view.segInwardEntryList.widgetDataMap = {
        "flxLotModel": "flxLotModel",
        "flxVehicleIcon":"flxVehicleIcon",
        "flxModelAndNumber": "flxModelAndNumber",
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

    if (newRecords.length > 0) {
//         self.view.lblNorecords.setVisibility(false);
//         self.view.segInwardEntryList.setVisibility(true);
        newRecords.forEach(function(record) {

            data.push({
                "flxVehicleIcon": 
              {
                "left": isArabic ? "" : "5%",
                "right": isArabic ? "4%": ""
              },
              "flxModelAndNumber":{
                "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
              },
                "lblLotAndModel":{
                  "text": (record.lot_no || "") + " " + (record.model || ""),
                    "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
                }, 
               "lblVehicleNumber":{
                  "text": record.chassis_number || "",
                    "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
                }, 
                "lblVehicleNumber": record.chassis_number || "",
                "lblLocation": record.location || "",
                "lblDate": record.yard_received_date || "",
                "flxLocation": {
                   "isVisible": !self.isPending,
                   "reverseLayoutDirection": isArabic
                },
                "flxViewDetailsInwardEntry":
              {
                  "left": isArabic ? "5%" : "",
                   "right": isArabic ? "" : "5%"
                },
                "flxDate": {
                   "isVisible": !self.isPending,
                   "reverseLayoutDirection": isArabic
                },
                "lblViewDetailsInwardEntry": "View Details",
                 
                "flxViewDetailsInwardEntry": {
                    "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
                    "onClick": function() {
                        self.openDetails(record.object_id);
                    }
                }
            });

        });

    }
    else
      {
//         self.view.lblNorecords.setVisibility(true);
//         self.view.segInwardEntryList.setVisibility(false);
      }
    
      if (records.length < self.pageSize) {
    self.view.btnLoadMore.setVisibility(false);
} else {
    self.view.btnLoadMore.setVisibility(true);
}
     self.currentOffset += newRecords.length;

    self.view.segInwardEntryList.addAll(data);
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
        "user_token": voltmx.store.getItem("getUserAccesstoken"),
    };

    integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        receiveSuccess,
        receiveFailure
    );
    
      function receiveSuccess(response)

  {

    voltmx.print(response);
 

  }

  function receiveFailure(error)

  {

    voltmx.print(error);

  }
 
},
  openDetails: function(objectId)
  {
    var self = this;
    new voltmx.mvc.Navigation("frmInwardEntryVehicleDetails").navigate(
    {
      "objectId": objectId,
      "isPending": self.isPending
    });
  },
  
  adjustRTL: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    self.view.flxULSummary.reverseLayoutDirection = isArabic;
    if(isArabic)
      {
        self.view.flxSummary.lblActivityName.left = "";
        self.view.flxSummary.lblActivityName.right = "5%";
        
        self.view.flxSummary.lblTotalVehicles.left = "";
        self.view.flxSummary.lblTotalVehicles.right = "0dp";
        
        self.view.flxSummary.lblCompletedVehicles.left = "";
        self.view.flxSummary.lblCompletedVehicles.right = "0dp";
        
        self.view.flxSummary.lblPendingVehicles.left = "";
        self.view.flxSummary.lblPendingVehicles.right = "0dp";
        
        self.view.flxSummary.lblTotalCount.left = "0dp";
        self.view.flxSummary.lblTotalCount.right = "";
        
        self.view.flxSummary.lblCompletedCount.left = "0dp";
        self.view.flxSummary.lblCompletedCount.right = "";
        
        self.view.flxSummary.lblPendingCount.left = "0dp";
        self.view.flxSummary.lblPendingCount.right = "";
        
        self.view.lblSummaryOfVehicleInspection.left = "";
        self.view.lblSummaryOfVehicleInspection.right = "0dp";
      }
    else
      {
        self.view.flxSummary.lblActivityName.left = "5%";
        self.view.flxSummary.lblActivityName.right = "";
        
        self.view.flxSummary.lblTotalVehicles.left = "0dp";
        self.view.flxSummary.lblTotalVehicles.right = "";
        
         self.view.flxSummary.lblCompletedVehicles.left = "0dp";
        self.view.flxSummary.lblCompletedVehicles.right = "";
        
        self.view.flxSummary.lblPendingVehicles.left = "0dp";
        self.view.flxSummary.lblPendingVehicles.right = "";
        
        self.view.flxSummary.lblTotalCount.left = "";
        self.view.flxSummary.lblTotalCount.right = "0dp";
        
        self.view.flxSummary.lblCompletedCount.left = "";
        self.view.flxSummary.lblCompletedCount.right = "0dp";
        
        self.view.flxSummary.lblPendingCount.left = "";
        self.view.flxSummary.lblPendingCount.right = "0dp";
        
        self.view.lblSummaryOfVehicleInspection.left = "0dp";
        self.view.lblSummaryOfVehicleInspection.right = "";
      }
    
    this.view.flxSummary.lblActivityName.text = voltmx.i18n.getLocalizedString("Inward Entries");
    this.view.flxSummary.lblTotalVehicles.text = voltmx.i18n.getLocalizedString("Total Vehicles");
    this.view.flxSummary.lblCompletedVehicles.text = voltmx.i18n.getLocalizedString("Completed Vehicles");
    this.view.flxSummary.lblPendingVehicles.text = voltmx.i18n.getLocalizedString("Pending Vehicles");
    this.view.lblSummaryOfVehicleInspection.text = voltmx.i18n.getLocalizedString("Summary of Vehicle Inspections");
    this.view.lblPendingVehicles.text = voltmx.i18n.getLocalizedString("Pending Vehicles");
    this.view.lblCompletedVehicles.text = voltmx.i18n.getLocalizedString("Completed Vehicles");
    
  }
  

 });