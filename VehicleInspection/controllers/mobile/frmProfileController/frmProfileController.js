define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxLanguageToggle.onClick = this.changeApplicationCurrentLocale.bind(this);
    this.view.flxLogout.onClick = this.logoutSession.bind(this);
    this.view.flxBarCodeScanner.onClick = () =>
    {
      NavigationManager.push("frmBarCodeScan");
    }
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmProfile");
    this.invokeImagespending();
this.invokePendingInwardService();
this.invokePendingInspectionService();
this.invokePendingWashingservice();
    this.totalCompletedAll = 0;
this.totalPendingAll = 0;

this.imagesPending = 0;
this.inwardPending = 0;
this.inspectionPending = 0;
this.washingPending = 0;
  },
 updateFinalCounts: function() {
  this.view.lblCompletedCount.text = this.inwardPending.toString();

  this.view.lblInspectionCount.text = (this.inspectionPending || 0).toString();
  this.view.lblWashingCount.text = (this.washingPending || 0).toString();
  this.view.lblImagesCount.text = (this.imagesPending || 0).toString();
},
  logoutSession: function() {
  // Show loading while logout is in progress
  voltmx.application.showLoadingScreen(null, "Logging out..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
    shouldShowLabelInBottom: "true",
    separatorHeight: 45,
    progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
    progressIndicatorColor: "Gray"
  });

  var serviceName = "AzureB2C"; 
  var client = voltmx.sdk.getCurrentInstance();
  var identitySvc = client.getIdentityService(serviceName);

  var options = {
    slo: true,
    browserWidget: this.view.browserLogoutWidget
  };

  identitySvc.logout(
    function(response) {
      voltmx.print("Logout success: " + JSON.stringify(response));
      voltmx.net.clearCookies();

      voltmx.store.setItem("isLogin", false);
      voltmx.store.removeItem("refreshtoken");
      voltmx.store.removeItem("expon");
      voltmx.store.removeItem("userAccessTokenExp");
      voltmx.store.setItem("isUserCreated", false);
      voltmx.store.removeItem("accesstoken");
      voltmx.store.removeItem("userObject");
      voltmx.store.removeItem("getUserAccesstoken");
      voltmx.store.removeItem("userId");
      voltmx.store.removeItem("userEmail");

      voltmx.application.dismissLoadingScreen();  

      var x = new voltmx.mvc.Navigation("frmDashboard");
      x.navigate();
    },
    function(error) {
      if (error && error.message && error.message.indexOf("sessions is not active") !== -1) {
        voltmx.print("Session expired. Clearing stored tokens...");
        voltmx.net.clearCookies();
        voltmx.store.setItem("isLogin", false);
        voltmx.store.removeItem("refreshtoken");
        voltmx.store.removeItem("expon");
        voltmx.store.removeItem("userAccessTokenExp");
        voltmx.store.setItem("isUserCreated", false);
        voltmx.store.removeItem("accesstoken");
        voltmx.store.removeItem("userObject");
        voltmx.store.removeItem("getUserAccesstoken");
        voltmx.store.removeItem("userId");
        voltmx.store.removeItem("userEmail");
         var x = new voltmx.mvc.Navigation("frmDashboard");
      x.navigate();
      } else {
        voltmx.print("Logout failure: " + JSON.stringify(error));
      }

      voltmx.application.dismissLoadingScreen(); 
    },
    options
  );
},
  
  changeApplicationCurrentLocale: function() 
      { 
        var currentLocale = voltmx.i18n.getCurrentLocale();
      //var selectedLang= this.view.btnChangeLang.text;
//         alert("currentLocale :"+currentLocale);
      var currentLocalToSet;
      if(currentLocale === 'en_IN'){
       // this.view.btnChangeLang.text ="Eng";
        voltmx.store.setItem("currentLocale","ar");
        
        currentLocalToSet = 'ar_AE';
//         alert("currentLocalToSet :"+currentLocalToSet);
      }
      else{
        // this.view.btnChangeLang.text ="عربي";
        voltmx.store.setItem("currentLocale","en");
        currentLocalToSet = 'en_IN';
        
        // alert("currentLocalToSet :"+currentLocalToSet);
      }
      voltmx.i18n.setCurrentLocaleAsync(currentLocalToSet, currentLocaleChangeSuccess, currentLocaleChangeFailure);
      function currentLocaleChangeSuccess () {
        var ntf = new voltmx.mvc.Navigation("frmLangChange");
        ntf.navigate();
      }
      function currentLocaleChangeFailure () {
//         alert("Error while changing the current application locale");
      }
    },
  
    

  adjustRTL: function(){
    var self = this;
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic ?constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    
    var textAlign =  isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;
    
    if(isArabic)
      {
        self.view.flxEmailIcon.left = null;
        self.view.flxEmailIcon.right = "0dp";
        
         self.view.flxEmailAndValue.left = null;
        self.view.flxEmailAndValue.right = "25%";
        
        self.view.flxRoleIcon.left = null;
        self.view.flxRoleIcon.right = "0dp";
        
        self.view.flxRoleAndValue.left = null;
        self.view.flxRoleAndValue.right = "25%";
        
        self.view.flxProfile.left = null;
        self.view.flxProfile.right = "0dp";
        
        self.view.flxUnameRole.left = null;
        self.view.flxUnameRole.right = "25%";
        
         self.view.flxRole.left = null;
        self.view.flxRole.right = "0dp";
        
        self.view.lblPerformanceOverview.right = "5%";
        self.view.lblPerformanceOverview.left = "";
        
        self.view.lblSettings.right = "5%";
        self.view.lblSettings.left = "";
        
        self.view.lblEmail.left = "";
        self.view.lblEmail.right = "2dp";
        
        self.view.lblRoleID.left = "";
        self.view.lblRoleID.right = "2dp";
        
      }
    else
      {
        self.view.flxEmailIcon.left = "0dp";
        self.view.flxEmailIcon.right = null;
        
        self.view.flxEmailAndValue.left = "25%";
        self.view.flxEmailAndValue.right = null;
        
        self.view.flxRoleIcon.left = "0dp";
        self.view.flxRoleIcon.right = null;
        
        self.view.flxRoleAndValue.left = "25%";
        self.view.flxRoleAndValue.right = null;
        
        self.view.flxProfile.left = "0dp";
        self.view.flxProfile.right = null;
        
        self.view.flxUnameRole.left = "25%";
        self.view.flxUnameRole.right = null;
        
        self.view.flxRole.left = "0dp";
        self.view.flxRole.right = null;
        
        self.view.lblPerformanceOverview.right = "";
        self.view.lblPerformanceOverview.left = "5%";
        
         self.view.lblSettings.right = "";
        self.view.lblSettings.left = "5%";
        
         self.view.lblEmail.left = "2dp";
        self.view.lblEmail.right = "";
        
        self.view.lblRoleID.left = "2dp";
        self.view.lblRoleID.right = "";
      }


    var labelList =[

    

      "lblRole",

      "lblPerformanceOverview",

      "lblTotalCompleted",

      "lblCompletedCount",

      "lblInspections",

      "lblInspectionCount",

      "lblWashing",

      "lblWashingCount",

      "lblImagesCount",

      "lblSettings",

      "lblAppSettings",

      "lblNotifications",

      "lblPrivacyAndSecurity",

      "lblHelpSupport",

      "lblLogout",
      

      


];

  

    for(var i=0;i<labelList.length;i++){

      if(this.view[labelList[i]]){

        this.view[labelList[i]].contentAlignmemnt = labelAlignment;

      }

    }

    var flexList =[

     "flxHelpSupport",

      "flxPrivacySecurity",

      "flxNotifications",

      "flxAppSettings",

      "flxLanguageToggle",
      
      "flxHeading",
      
      "flxBarCodeScanner"

      ];

    for(var j=0;j<flexList.length;j++){

      if(this.view[flexList[j]]){

        this.view[flexList[j]].reverseLayoutDirection = direction;

      }

    }

    this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");

    this.view.lblEmail.text = voltmx.i18n.getLocalizedString("Email");

      this.view.lblRoleID.text = voltmx.i18n.getLocalizedString("Role");

      this.view.lblPerformanceOverview.text =voltmx.i18n.getLocalizedString("Performance Overview");

      this.view.lblTotalCompleted.text =voltmx.i18n.getLocalizedString("Inward");

      this.view.lblInspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.lblWashing.text =voltmx.i18n.getLocalizedString("Washing");
    
      this.view.lblImages.text =voltmx.i18n.getLocalizedString("Images");

//       this.view.flxHeading.lblImages.text =voltmx.i18n.getLocalizedString("Profile");

    this.view.lblAppSettings.text = voltmx.i18n.getLocalizedString("App Settings");

    this.view.lblNotifications.text = voltmx.i18n.getLocalizedString("Notifications");

    this.view.lblPrivacyAndSecurity.text = voltmx.i18n.getLocalizedString("Privacy & Security");

    this.view.lblHelpSupport.text =  voltmx.i18n.getLocalizedString("Help & Support");

    this.view.lblLogout.text =  voltmx.i18n.getLocalizedString("Logout");

      this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");

      this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");

      this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");
    
      this.view.lblImages.text = voltmx.i18n.getLocalizedString("Total Completed");
    
      this.view.lblUsername.text = voltmx.store.getItem("username");
    
      this.view.lblRole.text = voltmx.store.getItem("jobTitle");
    
       var roleText = self.view.lblRole.text || "";

var calculatedWidth = (roleText.length * 3.3); // adjust multiplier if needed

if (calculatedWidth < 30) {
    calculatedWidth = 30;
}

if (calculatedWidth > 90) {
    calculatedWidth = 90;
}

self.view.flxRole.width = calculatedWidth + "%";
    
      this.view.lblRoleValue.text = voltmx.store.getItem("jobTitle");
    
      this.view.lblEmailValue.text = voltmx.store.getItem("email");
    this.view.lblSettings.text =  voltmx.i18n.getLocalizedString("Settings");
    this.view.lblLanguageToggle.text = voltmx.i18n.getLocalizedString("Language Toggle");
    this.view.flxHeading.lblImages.text = voltmx.i18n.getLocalizedString("Profile");
    this.view.lblBarCodeScanner.text = voltmx.i18n.getLocalizedString("Bar Code Scanner");
    
    this.view.lblUsername.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblEmailValue.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblRoleValue.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
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
    this.imagesPending = parseInt(this.completedVehicles || 0);

this.updateFinalCounts();
    

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

  this.inwardPending = parseInt(this.completedVehicles || 0);
  this.updateFinalCounts();
  


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
  "status": "Completed", // Pending || Completed
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

  this.inspectionPending = parseInt(this.completedVehicles || 0);
  this.updateFinalCounts();
  


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

    this.washingPending = parseInt(this.completedVehicles || 0);
    this.updateFinalCounts();
    
    

 
  
  },
  
  operationFailurePendingwashing: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },
 
  
  
  
  
  /////////////////////////////////////////////////////////
 
 });