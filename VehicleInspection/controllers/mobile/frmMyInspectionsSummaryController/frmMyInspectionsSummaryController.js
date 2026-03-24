define({ 

  onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmMyInspectionsSummary");
    
//      this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    
     this.pageSize = 5;
    this.currentOffset = 0;
    this.view.segMyinspections.setData([]);
    this.showPendingVehicles();
    
//     this.view.segMyinspections.onRowClick = this.onRowClickAction.bind(this);
    
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
  
  onRowClickAction: function()
  {
    NavigationManager.push("frmMyinspectionVehicleDetails");
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
    this.view.segMyinspections.setData([]);
   this.invokePendingInspectionService();
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
    this.view.segMyinspections.setData([]);
//     this.invokeCompletedInwardService();
    
    this.view.flxPendingVehicles.skin = "sknFlxBasic";
    this.view.lblPendingVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblPendingCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULPending.skin = "sknFlxE4E4E4";
    
    this.view.flxCompletedVehicles.skin = "sknFlxFFE2E5";
    this.view.lblCompletedVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblCompletedCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULCompleted.skin = "sknflxd32437";
  },
  
  
    invokePendingInspectionService: function() {
  var self = this;
      checkTokenValidatity(function() {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-inspection-vehicles";

  var data = {
      "lot_no": "",
  "title": "",
  "type": "",
  "status": "Pending", // Pending || Completed
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

  // ✅ Fallback if no records
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
  
  
   addToSegment: function(response) {
    var self = this;

    var records = response && response.records ? response.records : [];
     
      if(records.length > 0)
      {
        self.view.lblNorecords.setVisibility(false);
        self.view.segMyinspections.setVisibility(true);
      }
     else{
        self.view.lblNorecords.setVisibility(true);
        self.view.segMyinspections.setVisibility(false);
     }
    var newRecords = records.slice(self.currentOffset);
     
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    

    self.view.segMyinspections.widgetDataMap = {
      "flxMyInspectionItem":"flxMyInspectionItem",
      "flxLotAndServiceType": "flxLotAndServiceType",
      "lblNameAndLot":"lblNameAndLot",
      "lblServiceType": "lblServiceType",
      "flxView":"flxView",
      "imgViewIcon":"imgViewIcon"
    };

    var data = [];

   if (newRecords.length > 0) {
//         self.view.lblNorecords.setVisibility(false);
//         self.view.segMyinspections.setVisibility(true);
        records.forEach(function(record) {

            data.push({
                "flxMyInspectionItem": 
              {
                "left": isArabic ? "" : "5%",
                "right": isArabic ? "4%": ""
              },
              "flxLotAndServiceType":{
                "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
              },
                "lblNameAndLot":{
                  "text": (record.ID || "") + " " + (record.description
 || ""),
                    "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
                }, 
               "lblServiceType":{
                  "text": record.service_type
 || "",
                    "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
                }, 
               
             
              
             
                 
                "flxView": {
                    "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
                    "onClick": function() {
                        self.openDetails(record.object_id,record);
                    }
                },
              "imgViewIcon":{
              "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
              "src":"view.png"
            }
            });

        });

    }
    else
      {
//         self.view.lblNorecords.setVisibility(true);
//         self.view.segMyinspections.setVisibility(false);
      }
     
       if (records.length < self.pageSize) {
    self.view.btnLoadMore.setVisibility(false);
} else {
    self.view.btnLoadMore.setVisibility(true);
}
     self.currentOffset += newRecords.length;

    self.view.segMyinspections.addAll(data);
},
  openDetails: function(objectId,record)
  {
    var self = this;
    new voltmx.mvc.Navigation("frmMyinspectionVehicleDetails").navigate(
    {
      "objectId": objectId,
       "vehicleDetails": record,
      "isPending": self.isPending
    });
  },
  
  
  
  

 });