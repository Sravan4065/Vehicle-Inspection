define({ 

 //Type your controller code here 

  onNavigate: function(){
  this.adjustRTL();
},
  
  
  
  
  
  adjustRTL: function(){

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic ?constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign =  isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;
    
    if(isArabic)
    {
      this.view.lblVehicleNumber.right = "5%";
      this.view.lblVehicleNumberdata.right = "5%";

      this.view.lblMakemodel.right = "5%";
      this.view.lblMakemodeldata.right = "5%";

      this.view.lblPackage.right = "5%";
      this.view.lblPackagedata.right = "5%";
      this.view.lblVehicleNumber.left = null;
      this.view.lblVehicleNumberdata.left = null;

      this.view.lblMakemodel.left = null;
      this.view.lblMakemodeldata.left = null;

      this.view.lblPackage.left = null;
      this.view.lblPackagedata.left = null;



      this.view.lblInspectername.left ="5%";
      this.view.lblInspectednamedata.left ="5%";

      this.view.lblInspectiondate.left ="5%";
      this.view.lblInspectiondatedata.left ="5%";

      this.view.lbloverallstatus.left ="5%";
      this.view.lblOverallsstatusData.left ="5%";


      this.view.lblInspectername.right = null;
      this.view.lblInspectednamedata.right = null;

      this.view.lblInspectiondate.right = null;
      this.view.lblInspectiondatedata.right = null;

      this.view.lbloverallstatus.right = null;
      this.view.lblOverallsstatusData.right = null;
    
    }
    else{
    
    this.view.lblInspectername.right ="5%";
    this.view.lblInspectednamedata.right ="5%";

    this.view.lblInspectiondate.right ="5%";
    this.view.lblInspectiondatedata.right ="5%";

    this.view.lbloverallstatus.right ="5%";
    this.view.lblOverallsstatusData.right ="5%";

    this.view.lblInspectername.left =null;
    this.view.lblInspectednamedata.left =null;

    this.view.lblInspectiondate.left =null;
    this.view.lblInspectiondatedata.left =null;

    this.view.lbloverallstatus.left =null;
    this.view.lblOverallsstatusData.left =null;




    this.view.lblVehicleNumber.left = "5%";
    this.view.lblVehicleNumberdata.left = "5%";

    this.view.lblMakemodel.left = "5%";
    this.view.lblMakemodeldata.left = "5%";

    this.view.lblPackage.left = "5%";
    this.view.lblPackagedata.left = "5%";
    this.view.lblVehicleNumber.right = null;
    this.view.lblVehicleNumberdata.right = null;

    this.view.lblMakemodel.right = null;
    this.view.lblMakemodeldata.right = null;

    this.view.lblPackage.right = null;
    this.view.lblPackagedata.right = null;

    }
    
     this.view.lblVehicleNumber.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblVehicleNumberdata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblMakemodel.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
    this.view.lblMakemodeldata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblPackage.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblPackagedata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
    this.view.lblInspectername.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblInspectednamedata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblInspectiondate.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblInspectiondatedata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lbloverallstatus.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblOverallsstatusData.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
  }
  
  
  
  
  
 });