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
      }


    var labelList =[

      "lblUsername",

      "lblRole",

      "lblEmail",

      "lblEmailValue",

      "lblRoleID",

      "lblRoleValue",

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

      this.view.lblTotalCompleted.text =voltmx.i18n.getLocalizedString("Total Completed");

      this.view.lblInspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.lblWashing.text =voltmx.i18n.getLocalizedString("Washing");

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
    
      this.view.lblUsername.text = voltmx.store.getItem("username");
    
      this.view.lblRole.text = voltmx.store.getItem("jobTitle");
    
      this.view.lblRoleValue.text = voltmx.store.getItem("jobTitle");
    
      this.view.lblEmailValue.text = voltmx.store.getItem("email");
    this.view.lblSettings.text =  voltmx.i18n.getLocalizedString("Settings");
    this.view.lblLanguageToggle.text = voltmx.i18n.getLocalizedString("Language Toggle");
    this.view.flxHeading.lblImages.text = voltmx.i18n.getLocalizedString("Profile");
    this.view.lblBarCodeScanner.text = voltmx.i18n.getLocalizedString("Bar Code Scanner");

  }
 
 });