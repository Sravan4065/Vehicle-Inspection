define({ 

   onNavigate: function()
  {
    this.adjustRtl();
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmCompletedInspections");
    this.currentOffset = 0;
    this.currentPage = 1;
this.pageSize = this.pageSize || 10;
this.view.segCompletedInspections.removeAll();
    toggleFooterIcons(this.view, "frmCompletedInspections");
    this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    this.invokePendingInspectionService();
      this.view.btnLoadMore.setEnabled(true);
    this.view.btnLoadMore.setVisibility(true);
  },
  
  onLoadMoreClick: function()
{
  var self = this;

  // Prevent multiple clicks
  self.view.btnLoadMore.setEnabled(false);

  // Call same service again
  self.invokePendingInspectionService();
},
  
    invokePendingInspectionService: function() {
  var self = this;
      checkTokenValidatity(function() {
    voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
  var serviceName = "fry_int_inspection";
  var integrationObj = voltmx.sdk.getCurrentInstance()
                                  .getIntegrationService(serviceName);
  var operationName = "get-inspection-vehicles";
self.currentPage = self.currentPage || 1;
  var data = {
      "lot_no": "",
  "title": "",
  "type": "",
  "status": "Completed", // Pending || Completed
  "page": self.currentPage.toString(),
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
  this.currentPage++;

  

 
  this.addToSegment(response);
  this.view.btnLoadMore.setEnabled(true);
},
  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
      this.view.btnLoadMore.setEnabled(true);
  },
  
  
   addToSegment: function(response) {
    var self = this;

    var records = response && response.records ? response.records : [];
     
      if(records.length > 0)
      {
       // self.view.lblNorecords.setVisibility(false);
        self.view.segCompletedInspections.setVisibility(true);
      }
     else{
       // self.view.lblNorecords.setVisibility(true);
        self.view.segCompletedInspections.setVisibility(false);
     }
    var newRecords = records.slice(self.currentOffset);
     
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    

   self.view.segCompletedInspections.widgetDataMap = {
      "flxCompletedInspections":"flxCompletedInspections",
      "flxLotModel": "flxLotModel",
      "flxVehicleIcon":"flxVehicleIcon",
      "imgVehicleIcon": "imgVehicleIcon",
      "flxModelAndNumber":"flxModelAndNumber",
      "lblLotAndModel":"lblLotAndModel",
     "lblVehicleNumber":"lblVehicleNumber",
     "flxLocation":"flxLocation",
     "lblLocation":"lblLocation",
     "flxDate":"flxDate",
     "lblDate":"lblDate",
     "lblDateAndTimeValue":"lblDateAndTimeValue",
     "flxViewDetailsInwardEntry":"flxViewDetailsInwardEntry",
     "lblViewDetailsInwardEntry":"lblViewDetailsInwardEntry",
     "imgFArrowIE":"imgFArrowIE"
     
     
     
     
     
    };

    var data = [];

   if (newRecords.length > 0) {
//         self.view.lblNorecords.setVisibility(false);
//         self.view.segMyinspections.setVisibility(true);
        newRecords.forEach(function(record) {

            data.push({
                "imgFArrowIE": 
              {
                "left": isArabic ? "" : "5%",
                "right": isArabic ? "4%": ""
              },
              "imgVehicleIcon":{
              "src":"caricon.png"
            },
              "flxModelAndNumber":{
                "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
              },
                "lblLotAndModel":{
                  "text": (record.ID
 || "") + " " + (record.description
 || ""),
                    "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
                }, 
               "lblVehicleNumber":{
                  "text": record.chassis_number
 || "",
                    "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
                }, 
               
             
                 "flxDate":{
                "left": isArabic ? "" : "2%",
                "right": isArabic ? "2%": ""
              },
                "lblDate": {
                  "text": voltmx.i18n.getLocalizedString("Date")
                  
                }, 
               "lblDateAndTimeValue":{
                  "text": record.requested_time

 || "",
                    
                }, 
           
              
             
                 
                "flxViewDetailsInwardEntry": {
                    "left": isArabic ? "5%" : "",
                    "right": isArabic ? "" : "5%",
                    "onClick": function() {
                        self.openDetails(record.object_id,record);
                    }
                },
              "lblViewDetailsInwardEntry":{
                  "text": voltmx.i18n.getLocalizedString("View")
                                 },
              "imgFArrowIE":{
              "left": isArabic ? "5%" : "12%",
                    "right": isArabic ? "8%" : "5%",
              "src":"viewwhite.png"
            }
            });

        });

    }
    else
      {
//         self.view.lblNorecords.setVisibility(true);
//         self.view.segMyinspections.setVisibility(false);
      }
     
       if (newRecords.length < self.pageSize) {
    self.view.btnLoadMore.setVisibility(false);
} else {
    self.view.btnLoadMore.setVisibility(true);
}
     self.currentOffset += newRecords.length;

    self.view.segCompletedInspections.addAll(data);
},
  openDetails: function(objectId,record)
  {
    var self = this;
//     new voltmx.mvc.Navigation("frmVehicleInspectionReport").navigate(
//     {
//       "objectId": objectId,
//        "vehicleDetails": record,
//       "isPending": self.isPending
//     });
    
    NavigationManager.push("frmVehicleInspectionReport",  {
      "objectId": objectId,
       "vehicleDetails": record,
      "isPending": self.isPending
    });
  },
  adjustRtl: function(){
     this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");

      this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");

      this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");
    this.view.flxfooter.lblHome.text =voltmx.i18n.getLocalizedString("Dashboard");
    
     this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
    this.view.flxHeading.lblImages.text =voltmx.i18n.getLocalizedString("Completed Inspections");
    this.view.lblLotAndModel.text =voltmx.i18n.getLocalizedString("Completed Inspections");
    this.view.lblVehicleNumber.text =voltmx.i18n.getLocalizedString("View and Print inspection reports");
 
  },

 });