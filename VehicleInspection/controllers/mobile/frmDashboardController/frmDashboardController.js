define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
    
    this.view.flxViewAll.onClick = () =>
    {
      new voltmx.mvc.Navigation("frmActivityist").navigate();
      NavigationManager.push("frmActivityist");
    }
  },
  
  onPreShow: function()
  {
    NavigationManager.init("frmDashboard");
    toggleFooterIcons(this.view, "frmDashboard");
    
     this.invokeImagespending();
  this.invokePendingInwardService();
  this.invokePendingInspectionService();
  this.invokePendingWashingservice();
    this.totalCompletedAll = 0;
this.totalPendingAll = 0;
 
  },
  
  updateFinalCounts: function() {
  this.view.lblAssignedCount.text = this.totalCompletedAll.toString();
  this.view.lblPendingCount.text = this.totalPendingAll.toString();
},

  setDataToSeg: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE"
    var activitiesConfig = [
  {
    title:  voltmx.i18n.getLocalizedString("Inward Entry"),
    count: (this.inwardPending || 0) + " pending",
    desc: voltmx.i18n.getLocalizedString("Vehicle reception and barcode printing"),
    icon: "inwardentrygreen.png",
    skin: "sknFlxDBFCE7Radius5px",
    nav: "frmInwardEntrySummary"
  },
  {
    title: voltmx.i18n.getLocalizedString("Vehicle Inspection"),
    count: (this.inspectionPending || 0) + " pending",
    desc: voltmx.i18n.getLocalizedString("Vehicle inspection process"),
    icon: "viicon.png",
    skin: "sknFlxffd5daRadius5px",
    nav: "frmMyInspectionsSummary"
  },
  {
    title:  voltmx.i18n.getLocalizedString("Images"),
     count: (this.imagesPending || 0) + " pending",
    desc: voltmx.i18n.getLocalizedString("vehicleImageUploads"),
    icon: "imagesicon.png",
    skin: "sknFlxDBFCE7Radius5px",
    nav: "frmImagesSummary"
  },
  {
    title: voltmx.i18n.getLocalizedString("Washing"),
    count: (this.washingPending || 0) + " pending",
    desc: voltmx.i18n.getLocalizedString("vehicleWashingprocess"),
    icon: "carwashicon.png",
    skin: "sknFlxe0e7ffRadius5px",
    nav: "frmWashingSummary"
  }
];
  if (self.view && self.view.segActivities) {

  self.view.segActivities.widgetDataMap = {
    flxInwardIcon: "flxInwardIcon",
    imgInwardIcon: "imgInwardIcon",
    flxInwardEntryRightTop: "flxInwardEntryRightTop",
    lblInwardEntry: "lblInwardEntry",
    flxInwardCount: "flxInwardCount",
    lblInwardCount: "lblInwardCount",
    lblVehicleInspectionAndBarCode: "lblVehicleInspectionAndBarCode",
    flxViewDetailsInwardEntry: "flxViewDetailsInwardEntry",
    lblViewDetailsInwardEntry: "lblViewDetailsInwardEntry",
    imgFArrowIE: "imgFArrowIE",
    flxInwardEntry: "flxInwardEntry",
    flxInwardEntryRight: "flxInwardEntryRight"
};

    var data = [];
    activitiesConfig.forEach(function (item) {
      data.push({
        flxInwardIcon: { 
          skin: item.skin,
          left: isArabic ? "" : "4%",
          right: isArabic ? "4%" : ""
        },
        flxInwardEntryRight: {
          left: isArabic ? "" : "23%",
          right: isArabic ? "23%" : ""
        },
        lblInwardEntry: { 
          text: item.title,
          left: isArabic ? "" : "0%",
          right: isArabic ? "0%" : ""
                        },
        lblInwardCount: { 
          text: item.count,
         
        },
        
        flxInwardCount: {
          left: isArabic ? "0%" : "",
          right: isArabic ? "" : "0%"
        },
        lblVehicleInspectionAndBarCode: { 
          text: item.desc,
          left: isArabic ? "" : "2%",
          right: isArabic ? "2%" : "",
          contentAlignment: isArabic
              ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
              : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        lblViewDetailsInwardEntry: { text: voltmx.i18n.getLocalizedString("View Details") },
        imgInwardIcon: { src: item.icon },
        imgFArrowIE: { src: "frontarrowwhite.png" },
        flxViewDetailsInwardEntry: {
          left: isArabic ? "5%" : "",
          right: isArabic ? "" : "5%",
          onClick: self.navToRelatedActivity.bind(self, item.nav)
        }
      });
    });

    self.view.segActivities.setData(data);
  }
  },
  
  navToRelatedActivity: function(navigatingFormName) 
      { 
//         new voltmx.mvc.Navigation(navigatingFormName).navigate();
        if(voltmx.store.getItem("isLogin"))
         NavigationManager.push(navigatingFormName);
        else
        NavigationManager.push("frmLogin");
        
      },
  adjustRTL: function(){
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic ?constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign =  isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;
    
    if(isArabic)
      {
        self.view.lblWelcomeBack.left = "";
        self.view.lblWelcomeBack.right = "5%";
        
        self.view.lblHeresisOverView.left = "";
        self.view.lblHeresisOverView.right = "5%";
        
        self.view.lblMainCategories.left = "";
        self.view.lblMainCategories.right = "0%";
        
        self.view.flxViewAll.left = "0%";
        self.view.flxViewAll.right = "";
        
        self.view.lblSelectACategory.left = "";
        self.view.lblSelectACategory.right = "5%";
      }
    else
      {
        self.view.lblWelcomeBack.left = "5%";
        self.view.lblWelcomeBack.right = "";
        
        self.view.lblHeresisOverView.left = "5%";
        self.view.lblHeresisOverView.right = "";
        
        self.view.lblMainCategories.left = "0%";
        self.view.lblMainCategories.right = "";
        
        self.view.flxViewAll.left = "";
        self.view.flxViewAll.right = "0%";
        
        self.view.lblSelectACategory.left = "5%";
        self.view.lblSelectACategory.right = "";
      }


    var labelList =[

      "lblWelcomeBack",

      "lblHeresisOverView",

      "lblAssigned",

      "lblAssignedCount",

      "lblPending",

      "lblPendingCount",

      "lblViewAll",

];

    var calanderList =["",];

    for(var i=0;i<calanderList.length;i++){

      if(this.view[calanderList[i]]){

        this.view[calanderList[i]].contentAlignmemnt = labelAlignment;

      }

    }

    var flexList =[

      "flxAssignedPending",

      "flxAssigned",

      "flxAssignedIcon",

      "flxAssignedCount",

      "flxPending",

      "flxPendingIcon",

      "flxPendingCount",

      "flxMainCategories",

      "flxMainActivityLeft",

      "flxViewAll"

      ];

    for(var j=0;j<flexList.length;j++){

      if(this.view[flexList[j]]){

        this.view[flexList[j]].reverseLayoutDirection = direction;

      }

    }

    this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");

    if(voltmx.store.getItem("isLogin"))
      {
   this.view.lblWelcomeBack.text = voltmx.i18n.getLocalizedString("Welcome back") + " " + voltmx.store.getItem("username");
      }
    else
      {
    this.view.lblWelcomeBack.text = voltmx.i18n.getLocalizedString("Welcome back");
      }

      this.view.lblHeresisOverView = voltmx.i18n.getLocalizedString("Here’s your overview for today");

      this.view.lblAssigned.text =voltmx.i18n.getLocalizedString("Assigned");

      this.view.lblPending.text =voltmx.i18n.getLocalizedString("Pending");

      this.view.lblViewAll.text =voltmx.i18n.getLocalizedString("View All");

      this.view.lblSelectACategory.text =voltmx.i18n.getLocalizedString("Select a category to begin your workflow");

      this.view.flxfooter.lblHome.text =voltmx.i18n.getLocalizedString("Dashboard");

      this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");

      this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");

      this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");
     
      this.view.lblHeresisOverView.text = voltmx.i18n.getLocalizedString("Heres your overview for today");
    
      this.view.lblMainCategories.text = voltmx.i18n.getLocalizedString("Main Categories");
  },
  ///////////////////////////////////
 ////// All page sevice calls
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
      self.operationSuccessPendingimages.bind(self),
      self.operationFailurePendingimages.bind(self)
  );
    });
},
  
  operationSuccessPendingimages: function(response)
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
    
    this.totalCompletedAll += parseInt(this.totalVehicles || 0);
this.totalPendingAll += parseInt(this.pendingVehicles || 0);
    this.imagesPending = parseInt(this.pendingVehicles || 0);

this.updateFinalCounts();
    this.setDataToSeg();

  },
  
  operationFailurePendingimages: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  ////////////////////inward 
  
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
      self.operationSuccessPendinginward.bind(self),
      self.operationFailurePendinginward.bind(self)
  );
    });
},
  
  operationSuccessPendinginward: function(response)
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
  
  this.totalCompletedAll += parseInt(this.totalVehicles || 0);
this.totalPendingAll += parseInt(this.pendingVehicles || 0);
this.updateFinalCounts();
  this.inwardPending = parseInt(this.pendingVehicles || 0);
  this.setDataToSeg();


},
  
  operationFailurePendinginward: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
 /////////////myinspections
  
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
      self.operationSuccessPendingmyinspection.bind(self),
      self.operationFailurePendingmyinspection.bind(self)
  );
      });
},
  
  operationSuccessPendingmyinspection: function(response)
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
 this.totalCompletedAll += parseInt(this.totalVehicles || 0);
this.totalPendingAll += parseInt(this.pendingVehicles || 0);
this.updateFinalCounts();
  this.inspectionPending = parseInt(this.pendingVehicles || 0);
  this.setDataToSeg();


},
  operationFailurePendingmyinspection: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
  
  
  
  
   invokePendingWashingservice: function() {
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
      self.operationSuccessPendingwashing.bind(self),
      self.operationFailurePendingwashing.bind(self)
  );
    });
},
  
  operationSuccessPendingwashing: function(response)
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
    
    this.totalCompletedAll += parseInt(this.totalVehicles || 0);
this.totalPendingAll += parseInt(this.pendingVehicles || 0);
this.updateFinalCounts();
    this.washingPending = parseInt(this.pendingVehicles || 0);
    
    this.setDataToSeg();

 
  
  },
  
  operationFailurePendingwashing: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
 
  
  
  
  
  /////////////////////////////////////////////////////////
 
 });