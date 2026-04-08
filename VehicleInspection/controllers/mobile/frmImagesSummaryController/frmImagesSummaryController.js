define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    
    toggleFooterIcons(this.view, "frmImagesSummary");
    
//      this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
      this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segImagesLIst.setData([]);
   
     this.showPendingVehicles();
    
//     this.view.segImagesLIst.onRowClick = () =>
//     {
//       NavigationManager.push("frmImageCatageory");
//     }
    
    this.view.segImagesLIst.onRowClick = () =>
{
  // ✅ Allow click only for Pending
  if (this.isPending) {
    var selectedItem = this.view.segImagesLIst.selectedRowItems[0];

    NavigationManager.push("frmImageCatageory", {
      "record": selectedItem
    });
  }
}
    
    this.view.flxPendingVehicles.onClick = () =>
    {
      this.showPendingVehicles();
    },
      
      this.view.flxCompletedVehicles.onClick = () =>
    {
      this.showCompletedVehicles();
    }
      
       this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
     this.view.flxSearchComponent.flxSearch.onClick = this.onSearchClick.bind(this);
this.view.flxSearchComponent.tbxSearchBy.onTextChange = this.onSearchTextChange.bind(this);
  },
  
  onSearchTextChange: function() {
  var self = this;
  var text = this.view.flxSearchComponent.tbxSearchBy.text || "";

  this.searchText = text;

  // cancel previous timer
  if (this.searchTimer) {
    voltmx.timer.cancel(this.searchTimer);
  }

  this.searchTimer = "searchTimer_" + new Date().getTime();

  voltmx.timer.schedule(this.searchTimer, function() {

    // ✅ if empty → reload full data
    if (!text.trim()) {
      self.setSegmentData(self.fullData);
      return;
    }

    var searchVal = text.toLowerCase();

    var filteredData = self.fullData.filter(function(record) {
      return (
        (record.lot_no && record.lot_no.toLowerCase().includes(searchVal)) ||
        (record.model && record.model.toLowerCase().includes(searchVal)) ||
        (record.chassis_number && record.chassis_number.toLowerCase().includes(searchVal)) ||
        (record.location && record.location.toLowerCase().includes(searchVal))
      );
    });

    self.setSegmentData(filteredData);

  }, 0.3, false);
},
  onSearchClick: function() {
  var self = this;
  var searchVal = (this.searchText || "").toLowerCase();

  if (!searchVal) {
    this.setSegmentData(this.fullData);
    return;
  }

  var filteredData = this.fullData.filter(function(record) {
    return (
      (record.lot_no && record.lot_no.toLowerCase().includes(searchVal)) ||
      (record.model && record.model.toLowerCase().includes(searchVal)) ||
      (record.chassis_number && record.chassis_number.toLowerCase().includes(searchVal)) ||
      (record.location && record.location.toLowerCase().includes(searchVal))
    );
  });

  this.setSegmentData(filteredData);
},
  setSegmentData: function(records) {
  var self = this;
  var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

  var data = [];

  if(records.length > 0){
    self.view.segImagesLIst.setVisibility(true);
  } else {
    self.view.segImagesLIst.setVisibility(false);
  }

  records.forEach(function(record) {

    data.push({
      "lblLotAndModel": (record.lot_no || "") + " " + (record.model || ""),
      "lblVehicleNumber": record.chassis_number || "",
      "lblLocation": record.location || "",
      "lblDate": record.created_on || "",
      "lblViewDetailsInwardEntry": "View Details",

      "flxViewDetailsInwardEntry": {
        "isVisible": self.isPending, // ✅ keep your existing logic
        "onClick": function() {
          self.openDetails(record);
        }
      }
    });

  });

  self.view.segImagesLIst.setData(data);
},
  
   onLoadMoreClick: function()
  {
    var self = this;
    if(self.isPending)
      {
        self.pageSize += 5;
        self.invokeImagespending();
      }
    else
      {
        self.pageSize += 5;
        self.invokePhotoCompleted();
      }
  },
  
  
  showPendingVehicles: function()
  {
    
     this.isPending = true;
    this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segImagesLIst.setData([]);
    this.invokeImagespending();
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
    this.view.segImagesLIst.setData([]);
    this.invokePhotoCompleted();

    this.view.flxPendingVehicles.skin = "sknFlxBasic";
    this.view.lblPendingVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblPendingCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULPending.skin = "sknFlxE4E4E4";
    
    this.view.flxCompletedVehicles.skin = "sknFlxFFE2E5";
    this.view.lblCompletedVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblCompletedCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULCompleted.skin = "sknflxd32437";
  },
  
  invokeImagespending: function() {
  var self = this;
    checkTokenValidatity(function() {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-photo-vehicle";

  var data = {
    "lot_no": "",
  "model": "",
  "chassis_number": "",
  "location": "",
  "is_photo_done": "0",
  "days": "7",
  "page": "1",
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
     
      if (!response.records || response.records.length === 0) {
    response.records = [{
      total_completed: "0",
      total_pending: "0",
      total_vehicles: "0"
    }];
  }

  this.completedVehicles = response.records[0].total_completed;
  this.pendingVehicles = response.records[0].total_pending;
  this.totalVehicles = response.records[0].total_vehicles;

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
  
   invokePhotoCompleted: function() {
  var self = this;
     checkTokenValidatity(function() {
         voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-photo-vehicle";

  var data = {
     "lot_no": "",
  "model": "",
  "chassis_number": "",
  "location": "",
  "is_photo_done": "1",
  "days": "7",
  "page": "1",
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
   self.fullData = this.fullData || [];
    var records = response && response.records ? response.records : [];
    this.fullData = records;
    if(records.length > 0)
      {
       // self.view.lblNorecords.setVisibility(false);
       self.view.segImagesLIst.setVisibility(true);
      }
     else{
       // self.view.lblNorecords.setVisibility(true);
        self.view.segImagesLIst.setVisibility(false);
     }
    var newRecords = records.slice(self.currentOffset);
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    

    self.view.segImagesLIst.widgetDataMap = {
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
                "lblDate": record.created_on
 || "",
                "flxLocation": {
                  // "isVisible": !self.isPending,
                   "reverseLayoutDirection": isArabic
                },
                "flxViewDetailsInwardEntry":
              {
                  "left": isArabic ? "5%" : "",
                   "right": isArabic ? "" : "5%"
                },
                "flxDate": {
                  // "isVisible": !self.isPending,
                   "reverseLayoutDirection": isArabic
                },
                "lblViewDetailsInwardEntry": "View Details",
                 
                "flxViewDetailsInwardEntry": {
                  "isVisible": self.isPending,
                    "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
                    "onClick": function() {
                        self.openDetails(record);
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

    self.view.segImagesLIst.addAll(data);
},
  
   openDetails: function(record)
  {
    var self = this;
  
    NavigationManager.push("frmImageCatageory", {
      "record": record
    })
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
  }

 
  

 });