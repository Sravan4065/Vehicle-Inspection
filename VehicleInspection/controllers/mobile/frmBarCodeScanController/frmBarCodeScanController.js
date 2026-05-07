define({ 


  onNavigate: function()
  {
    this.adjustRTL();
  },
  
  adjustRTL: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    
    this.view.flxHeading.lblImages.text =voltmx.i18n.getLocalizedString("Bar Code Scanner");
     this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
  }
  
  

 });