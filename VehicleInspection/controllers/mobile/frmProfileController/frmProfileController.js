define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxLanguageToggle.onClick = this.changeApplicationCurrentLocale.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmProfile");
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

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic ?constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign =  isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;


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

      "lblLogout"




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

  }
 
 });