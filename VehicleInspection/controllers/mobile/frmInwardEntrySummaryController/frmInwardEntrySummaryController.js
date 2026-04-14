define({ 

  onNavigate: function()
  {
//     this.isSearchActive = false;
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
    this.lot = "";
    this.title = "";
    this.view.flxSearchComponent.tbxSearchBy.text = "";
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segInwardEntryList.setData([]);
    this.showPendingVehicles();
    
//     this.view.segInwardEntryList.onRowClick = () =>
//     {
//       NavigationManager.push("frmInwardEntryVehicleDetails");
//     },
      
      this.view.flxPendingVehicles.onClick = () =>
    {
      this.showPendingVehicles();
    },
      
      this.view.flxCompletedVehicles.onClick = () =>
    {
      this.showCompletedVehicles();
    }
      
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    this.view.flxSearchComponent.flxSearch.onClick = this.invokeServiceWithSearch.bind(this);
    this.view.flxSearchComponent.tbxSearchBy.onTextChange = this.onTextChange.bind(this);
  },
  

  
    onLoadMoreClick: function()
  {
    var self = this;
   

    if(self.isPending)
      {
        self.pageSize += 10;
        self.invokePendingInwardService();
      }
    else
      {
        self.pageSize += 10;
        self.invokeCompletedInwardService();
      }
  },
  
   showPendingVehicles: function()
  {
    this.isPending = true;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.lot = "";
    this.title = "";
    this.view.flxSearchComponent.tbxSearchBy.text = "";
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
    this.pageSize = 10;
    this.currentOffset = 0;
    this.lot = "";
    this.title = "";
    this.view.flxSearchComponent.tbxSearchBy.text = "";
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
  
 invokeServiceWithSearch: function()
  {
    var self = this;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segInwardEntryList.setData([]);
    this.view.btnLoadMore.setVisibility(false);
   var searchText = (self.view.flxSearchComponent.tbxSearchBy && self.view.flxSearchComponent.tbxSearchBy.text ? self.view.flxSearchComponent.tbxSearchBy.text : "").trim();


//     if (!searchText) return;

    // Decide which field to use
    if (!isNaN(searchText)) {
        self.lot = searchText;
        self.title = "";  // clear the other
    } else {
        self.title = searchText;
        self.lot = "";    // clear the other
    }

//     self.getUnderReviewCars();
    if(self.isPending)
      {
        self.invokePendingInwardService();
      }
    else
      {
        self.invokeCompletedInwardService();
      }
  },
  
  onTextChange: function()
  {
    var self = this;
    
    var textBoxText = self.view.flxSearchComponent.tbxSearchBy.text;
    if(textBoxText === "")
      {
        if(self.isPending)
      {
        self.showPendingVehicles();
      }
    else
      {
        self.showCompletedVehicles();
      }
      }
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
      "lot_no": self.lot || "",
      "title": self.title || "",
      "chassis_number": "",
      "language": "en",
      "oracle_num": "",
      "in_yard": "0",      // pending = 0 || completed = 1
      "days": "150",         // default value
      "page_number": "1",
      "page_size": self.pageSize || 10
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
        "lot_no": self.lot || "",
      "title": self.title || "",
      "chassis_number": "",
      "language": "en",
      "oracle_num": "",
      "in_yard": "1",      // pending = 0 || completed = 1
      "days": "150",         // default value
      "page_number": "1",
      "page_size": self.pageSize || 10
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
  
  operationFailureCompleted: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  
  addToSegment: function(response) {
    var self = this;
//    self.fullData = this.fullData || [];
    var records = response && response.records ? response.records : [];
//     this.fullData = records; // store full list
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
        "lblViewDetailsInwardEntry": "lblViewDetailsInwardEntry",
      "imgCalendarIcon":"imgCalendarIcon"
    };

    var data = [];

    if (newRecords.length > 0) {
//         self.view.lblNorecords.setVisibility(false);
//         self.view.segInwardEntryList.setVisibility(true);
        newRecords.forEach(function(record) {

            data.push({
               "flxLotModel": 
              {
                "reverseLayoutDirection": isArabic
              },
                "flxVehicleIcon": 
              {
                "left": isArabic ? "" : "5%",
                "right": isArabic ? "5%": ""
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
                "lblLocation": record.location || "N/A",
//               "lblDate": {
//   "text": self.getCurrentDate() || "",
// //   "isVisible": !self.isPending   // ✅ hide for pending
// },
             "lblDate": self.convertUTCToLocal(record.yard_received_date),
//                 "flxLocation": {
//                    "isVisible": !self.isPending,
//                    "reverseLayoutDirection": isArabic
//                 },
              "imgCalendarIcon": {
  "isVisible": !self.isPending,
                src: "calendar.png"
                
},
                "flxViewDetailsInwardEntry":
              {
                  "left": isArabic ? "5%" : "",
                   "right": isArabic ? "" : "5%"
                },
                "flxDate": {
  "isVisible": !self.isPending,   // ✅ key line
  "reverseLayoutDirection": isArabic
},
                "lblViewDetailsInwardEntry": voltmx.i18n.getLocalizedString("View Details"),
                 
                "flxViewDetailsInwardEntry": {
                    "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
                    "onClick": function() {
                        self.openDetails(record.object_id,record,record.lot_no);
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
//     self.setSegmentData(records);
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
  openDetails: function(objectId,record,lotno)
  {
    var self = this;
    NavigationManager.push("frmInwardEntryVehicleDetails", {
      "objectId": objectId,
      "isPending": self.isPending,
       "record": record,
       "lotno":lotno
    })
//     new voltmx.mvc.Navigation("frmInwardEntryVehicleDetails").navigate(
//     {
//       "objectId": objectId,
//       "isPending": self.isPending
//     });
  },
  
  adjustRTL: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    this.view.flxULSummary.reverseLayoutDirection = isArabic;
    this.view.flxHeading.reverseLayoutDirection = isArabic;
    this.view.flxSearchComponent.tbxSearchBy.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
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
        
        self.view.flxSearchComponent.tbxSearchBy.left = "";
        self.view.flxSearchComponent.tbxSearchBy.right = "4%";
        
        self.view.flxSearchComponent.flxSearch.left = "4%";
        self.view.flxSearchComponent.flxSearch.right = "";
         this.view.flxSearchComponent.flxSearch.left = "4%";
        this.view.flxSearchComponent.flxSearch.right = "";
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
        
        self.view.flxSearchComponent.tbxSearchBy.left = "4%";
        self.view.flxSearchComponent.tbxSearchBy.right = "";
        
        self.view.flxSearchComponent.flxSearch.left = "";
        self.view.flxSearchComponent.flxSearch.right = "4%";
          this.view.flxSearchComponent.flxSearch.right = "4%";
        this.view.flxSearchComponent.flxSearch.left = "";
      //  this.view.flxHeading.imgBack.transform = voltmx.ui.makeAffineTransform();
      
   }
    this.view.flxHeading.lblImages.text = voltmx.i18n.getLocalizedString("Inward Entry");
    this.view.flxSummary.lblActivityName.text = voltmx.i18n.getLocalizedString("Summary of Vehicle Inward");
    this.view.flxSummary.lblTotalVehicles.text = voltmx.i18n.getLocalizedString("Total Vehicles");
    this.view.flxSummary.lblCompletedVehicles.text = voltmx.i18n.getLocalizedString("Completed Vehicles");
    this.view.flxSummary.lblPendingVehicles.text = voltmx.i18n.getLocalizedString("Pending Vehicles");
    this.view.lblSummaryOfVehicleInspection.text = voltmx.i18n.getLocalizedString("Summary of Vehicle Inward");
    this.view.lblPendingVehicles.text = voltmx.i18n.getLocalizedString("Pending Vehicles");
    this.view.lblCompletedVehicles.text = voltmx.i18n.getLocalizedString("Completed Vehicles");
    //this.view.flxSearchComponent.tbxSearchBy.text = voltmx.i18n.getLocalizedString("Search by ID");
    this.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load More");
     this.view.flxfooter.lblHome.text =voltmx.i18n.getLocalizedString("Dashboard");

      this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");

      this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");

      this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");
  },
  
convertUTCToLocal: function(utcDateStr) {
    if (!utcDateStr) return "";

    // Fix format (important for parsing)
    var formatted = utcDateStr.replace(" ", "T");

    // Create date object (treated as UTC)
    var date = new Date(formatted + "Z");

    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();

    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');

    return day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
}

 });