define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
  
  },
  
  onPreShow: function()
  {
   
    toggleFooterIcons(this.view, "frmWashingSummary");
     this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segInwardEntryList.setData([]);
     this.showPendingVehicles();
//      this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    
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
    self.view.segInwardEntryList.setVisibility(true);
  } else {
    self.view.segInwardEntryList.setVisibility(false);
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

  self.view.segInwardEntryList.setData(data);
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
  var operationName = "get-washing-vehicles";

  var data = {
     "lot_no": "",
  "model": "",
  "chassis_number": "",
  "location": "",
  "is_washed": "0",  // pending = 0 || completed = 1
  "days": "150",           // default value
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
  
   invokeCompletedInwardService: function() {
  var self = this;
     checkTokenValidatity(function() {
         voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-washing-vehicles";

  var data = {
     "lot_no": "",
  "model": "",
  "chassis_number": "",
  "location": "",
  "is_washed": "1",  // pending = 0 || completed = 1
  "days": "150",           // default value
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
   self.fullData = this.fullData || [];
    var records = response && response.records ? response.records : [];
     this.fullData = records;
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
                "lblDate": record.created_on

 || "",
                "flxLocation": {
                   "isVisible": true,
                   "reverseLayoutDirection": isArabic
                },
                "flxViewDetailsInwardEntry":
              {
                  
                  "left": isArabic ? "5%" : "",
                   "right": isArabic ? "" : "5%"
                },
                "flxDate": {
                   "isVisible": true,
                   "reverseLayoutDirection": isArabic
                },
                "lblViewDetailsInwardEntry": "View Details",
                 
                "flxViewDetailsInwardEntry": {
                   "isVisible": self.isPending,
                    "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
                    "onClick": function() {
                        self.openDetails(record.object_id,record);
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
  
  
  
  
  
  openDetails: function(objectId,record)
  {
    new voltmx.mvc.Navigation("frmWashing").navigate(
    {
      "objectId": objectId,
      "record": record
      
    });
  },
  
  adjustRTL: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    this.view.flxHeading.reverseLayoutDirection = isArabic;
    this.view.flxULSummary.reverseLayoutDirection = isArabic;
    
    this.view.flxSearchComponent.tbxSearchBy.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    if(isArabic)
      {
        
        this.view.flxHeading.flxBack.right = "5%";
        this.view.flxHeading.flxBack.left = "";
        
         this.view.flxHeading.lblImages.right = "3%";
        this.view.flxHeading.lblImages.left = "";
        
        this.view.flxSummary.lblActivityName.right = "5%";
        this.view.flxSummary.lblActivityName.left = "";
        
        this.view.flxSummary.lblTotalVehicles.right = "0dp";
        this.view.flxSummary.lblTotalVehicles.left = "";
        
        this.view.flxSummary.lblTotalCount.left = "0dp";
        this.view.flxSummary.lblTotalCount.right = "";
        
        this.view.flxSummary.lblCompletedVehicles.right = "0dp";
        this.view.flxSummary.lblCompletedVehicles.left = "";
        
        this.view.flxSummary.lblCompletedCount.left = "0dp";
        this.view.flxSummary.lblCompletedCount.right = "";
        
        this.view.flxSummary.lblPendingVehicles.right = "0dp";
        this.view.flxSummary.lblPendingVehicles.left = "";
        
         this.view.flxSummary.lblPendingCount.left = "0dp";
        this.view.flxSummary.lblPendingCount.right = "";
        
        this.view.lblSummaryOfVehicleInspection.right = "0dp";
        this.view.lblSummaryOfVehicleInspection.left = "";
        
        this.view.flxULDark.right = "0dp";
        this.view.flxULDark.left = "";
        
        this.view.flxULLight.right = "2%";
        this.view.flxULLight.left = "";
        
        this.view.flxPendingVehicles.right = "0dp";
        this.view.flxPendingVehicles.left = "";
        
        this.view.flxCompletedVehicles.right = "50%";
        this.view.flxCompletedVehicles.left = "";
        
        this.view.flxULPending.right = "0dp";
        this.view.flxULPending.left = "";
        
        this.view.flxULCompleted.right = "50%";
        this.view.flxULCompleted.left = "";
        
        this.view.flxSearchComponent.tbxSearchBy.right = "4%";
        this.view.flxSearchComponent.tbxSearchBy.left = "";
        
        this.view.flxSearchComponent.flxSearch.left = "4%";
        this.view.flxSearchComponent.flxSearch.right = "";
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.flxHeading.imgBack.transform = flipTransform;
      }
    else
      {
        this.view.flxHeading.flxBack.left = "5%";
        this.view.flxHeading.flxBack.right = "";
        
        this.view.flxHeading.lblImages.left = "3%";
        this.view.flxHeading.lblImages.right = "";
        
        this.view.flxSummary.lblActivityName.left = "5%";
        this.view.flxSummary.lblActivityName.right = "";
        
        this.view.flxSummary.lblTotalVehicles.left = "0dp";
        this.view.flxSummary.lblTotalVehicles.right = "";
        
        this.view.flxSummary.lblTotalCount.right = "0dp";
        this.view.flxSummary.lblTotalCount.left = "";
        
        this.view.flxSummary.lblCompletedVehicles.left = "0dp";
        this.view.flxSummary.lblCompletedVehicles.right = "";
        
        this.view.flxSummary.lblCompletedCount.right = "0dp";
        this.view.flxSummary.lblCompletedCount.left = "";
        
        this.view.flxSummary.lblPendingVehicles.left = "0dp";
        this.view.flxSummary.lblPendingVehicles.right = "";
        
        this.view.flxSummary.lblPendingCount.right = "0dp";
        this.view.flxSummary.lblPendingCount.left = "";
        
        this.view.lblSummaryOfVehicleInspection.left = "0dp";
        this.view.lblSummaryOfVehicleInspection.right = "";
        
        this.view.flxULDark.left = "0dp";
        this.view.flxULDark.right = "";
        
        this.view.flxULLight.left = "2%";
        this.view.flxULLight.right = "";
        
        this.view.flxPendingVehicles.left = "0dp";
        this.view.flxPendingVehicles.right = "";
        
        this.view.flxCompletedVehicles.left = "50%";
        this.view.flxCompletedVehicles.right = "";
        
        this.view.flxULPending.left = "0dp";
        this.view.flxULPending.right = "";
        
        this.view.flxULCompleted.left = "50%";
        this.view.flxULCompleted.right = "";
        
        this.view.flxSearchComponent.tbxSearchBy.left = "4%";
        this.view.flxSearchComponent.tbxSearchBy.right = "";
        
        this.view.flxSearchComponent.flxSearch.right = "4%";
        this.view.flxSearchComponent.flxSearch.left = "";
        this.view.flxHeading.imgBack.transform = voltmx.ui.makeAffineTransform();
      }
  },
  
 });