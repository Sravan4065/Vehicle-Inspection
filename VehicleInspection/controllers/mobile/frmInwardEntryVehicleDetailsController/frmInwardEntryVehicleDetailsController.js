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

    
    
 

    var labelList =[

   "lblTechnicalInformation",
      "lblChassisNumber",
      "lblEngineNumber",
      "lblSellerInformation",
      "lblSellerName",
      "lblSubmittedDate",
      "lblBasicInformation",
      "lblBodyStyle",
      "lblFuelType",
      "lblFuelType",
      "lblYear",
      "lblMileage",
      "lblTransmission",
      "lblExteriorColor",
      "lblInteriorColor",
      "lblDriveType",
      "lblEngine"




];
   if (isArabic) {

    /* RIGHT = 0% */
     this.view.lblTechnicalInformation.right ="5%";
     this.view.lblSellerInformation.right="5%";
     this.view.lblBasicInformation.right ="5%";
    this.view.lblChassisNumber.right = "0%";
    this.view.lblEngineNumber.right = "0%";
    this.view.lblSellerName.right = "0%";
    this.view.lblSubmittedDate.right = "0%";
    this.view.lblBodyStyle.right = "0%";
    this.view.lblFuelType.right = "0%";
    this.view.lblLocation.right = "0%";
    this.view.lblYear.right = "0%";
    this.view.lblMileage.right = "0%";
    this.view.lblTransmission.right = "0%";
    this.view.lblExteriorColor.right = "0%";
    this.view.lblInteriorColor.right = "0%";
    this.view.lblDriveType.right = "0%";
    this.view.lblEngine.right = "0%";

    /* LEFT = null */
      this.view.lblTechnicalInformation.left=null;
      this.view.lblSellerInformation.left=null;
       this.view.lblBasicInformation.left =null;
    this.view.lblChassisNumber.left = null;
    this.view.lblEngineNumber.left = null;
    this.view.lblSellerName.left = null;
    this.view.lblSubmittedDate.left = null;
    this.view.lblBodyStyle.left = null;
    this.view.lblFuelType.left = null;
    this.view.lblLocation.left = null;
    this.view.lblYear.left = null;
    this.view.lblMileage.left = null;
    this.view.lblTransmission.left = null;
    this.view.lblExteriorColor.left = null;
    this.view.lblInteriorColor.left = null;
    this.view.lblDriveType.left = null;
    this.view.lblEngine.left = null;
     
   this.view.lblChassisValue.left = "0%";
     this.view.lblEngineNumberValue.left = "0%"; 
     this.view.lblSellerNameValue.left = "0%";
     this.view.lblSubmittedDateValue.left = "0%";
     this.view.lblBodyStyleValue.left = "0%";
     this.view.lblFuelTypeValue.left = "0%"; 
     this.view.lblLocationValue.left = "0%"; 
     this.view.lblYearValue.left = "0%"; 
     this.view.lblMileageValue.left = "0%"; 
     this.view.lblTransmissionValue.left = "0%"; 
     this.view.lblExteriorColorValue.left = "0%"; 
     this.view.lblInteriorColorValue.left = "0%";
     this.view.lblDriveTypeValue.left = "0%";
     this.view.lblEngineValue.left = "0%"; 
     
     
      this.view.lblChassisValue.right = null;
     this.view.lblEngineNumberValue.right = null;
     this.view.lblSellerNameValue.right = null;
     this.view.lblSubmittedDateValue.right = null;
     this.view.lblBodyStyleValue.right = null;
     this.view.lblFuelTypeValue.right = null; 
     this.view.lblLocationValue.right = null; 
     this.view.lblYearValue.right = null; 
     this.view.lblMileageValue.right = null; 
     this.view.lblTransmissionValue.right = null; 
     this.view.lblExteriorColorValue.right = null;
     this.view.lblInteriorColorValue.right = null;
     this.view.lblDriveTypeValue.right = null;
     this.view.lblEngineValue.right = null; 
     

} else {

    /* LEFT = 0% */
   this.view.lblTechnicalInformation.left ="5%";
  this.view.lblSellerInformation.left ="5%";
    this.view.lblBasicInformation.left ="5%";
    this.view.lblChassisNumber.left = "0%";
    this.view.lblEngineNumber.left = "0%";
    this.view.lblSellerName.left = "0%";
    this.view.lblSubmittedDate.left = "0%";
    this.view.lblBodyStyle.left = "0%";
    this.view.lblFuelType.left = "0%";
    this.view.lblLocation.left = "0%";
    this.view.lblYear.left = "0%";
    this.view.lblMileage.left = "0%";
    this.view.lblTransmission.left = "0%";
    this.view.lblExteriorColor.left = "0%";
    this.view.lblInteriorColor.left = "0%";
    this.view.lblDriveType.left = "0%";
    this.view.lblEngine.left = "0%";

    /* RIGHT = null */
   this.view.lblTechnicalInformation.right =null;
   this.view.lblSellerInformation.right =null;
    this.view.lblBasicInformation.right =null;
    this.view.lblChassisNumber.right = null;
    this.view.lblEngineNumber.right = null;
    this.view.lblSellerName.right = null;
    this.view.lblSubmittedDate.right = null;
    this.view.lblBodyStyle.right = null;
    this.view.lblFuelType.right = null;
    this.view.lblLocation.right = null;
    this.view.lblYear.right = null;
    this.view.lblMileage.right = null;
    this.view.lblTransmission.right = null;
    this.view.lblExteriorColor.right = null;
    this.view.lblInteriorColor.right = null;
    this.view.lblDriveType.right = null;
    this.view.lblEngine.right = null;
  
  
   this.view.lblChassisValue.right = "0%";
     this.view.lblEngineNumberValue.right = "0%"; 
     this.view.lblSellerNameValue.right = "0%";
     this.view.lblSubmittedDateValue.right = "0%";
     this.view.lblBodyStyleValue.right = "0%";
     this.view.lblFuelTypeValue.right = "0%"; 
     this.view.lblLocationValue.right = "0%"; 
     this.view.lblYearValue.right = "0%"; 
     this.view.lblMileageValue.right = "0%"; 
     this.view.lblTransmissionValue.right = "0%"; 
     this.view.lblExteriorColorValue.right = "0%"; 
     this.view.lblInteriorColorValue.right = "0%";
     this.view.lblDriveTypeValue.right = "0%";
     this.view.lblEngineValue.right = "0%"; 
     
     
      this.view.lblChassisValue.left = null;
     this.view.lblEngineNumberValue.left = null;
     this.view.lblSellerNameValue.left = null;
     this.view.lblSubmittedDateValue.left = null;
     this.view.lblBodyStyleValue.left = null;
     this.view.lblFuelTypeValue.left = null; 
     this.view.lblLocationValue.left = null; 
     this.view.lblYearValue.left = null; 
     this.view.lblMileageValue.left = null; 
     this.view.lblTransmissionValue.left = null; 
     this.view.lblExteriorColorValue.left = null;
     this.view.lblInteriorColorValue.left = null;
     this.view.lblDriveTypeValue.left = null;
     this.view.lblEngineValue.left = null; 
  
  
  
  
  
}

  
 this.view.lblChassisNumber.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblEngineNumber.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblSellerName.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblSubmittedDate.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblBodyStyle.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblFuelType.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblLocation.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblYear.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblMileage.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblTransmission.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblExteriorColor.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblInteriorColor.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblDriveType.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

this.view.lblEngine.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
    
    
   this.view.lblChassisValue.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
     this.view.lblEngineNumberValue.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
     this.view.lblSellerNameValue.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
     this.view.lblSubmittedDateValue.contentAlignment =
    isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
     this.view.lblBodyStyleValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblFuelTypeValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblLocationValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblYearValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblMileageValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblTransmissionValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT; 
     this.view.lblExteriorColorValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblInteriorColorValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblDriveTypeValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblEngineValue.contentAlignment =
   isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;  
    
    
    

  

    for(var i=0;i<labelList.length;i++){

      if(this.view[labelList[i]]){

        this.view[labelList[i]].contentAlignmemnt = labelAlignment;

      }

    }

    var flexList =[

  "flxLotModel"



      ];

    for(var j=0;j<flexList.length;j++){

      if(this.view[flexList[j]]){

        this.view[flexList[j]].reverseLayoutDirection = direction;

      }

    }

    this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");

    this.view.lblTechnicalInformation.text = voltmx.i18n.getLocalizedString("Technical Information");

      this.view.lblChassisNumber.text = voltmx.i18n.getLocalizedString("Chassis Number");

      this.view.lblEngineNumber.text =voltmx.i18n.getLocalizedString("Engine Number");

      this.view.lblSellerInformation.text =voltmx.i18n.getLocalizedString("Seller Information");

      this.view.lblSellerName.text =voltmx.i18n.getLocalizedString("Seller Name");

     this.view.lblSubmittedDate.text =voltmx.i18n.getLocalizedString("Submitted Date");


    this.view.lblBasicInformation.text = voltmx.i18n.getLocalizedString("Basic Information");

    this.view.lblBodyStyle.text = voltmx.i18n.getLocalizedString("Body Style");

    this.view.lblFuelType.text = voltmx.i18n.getLocalizedString("Fuel Type");

    this.view.lblLocation.text =  voltmx.i18n.getLocalizedString("Location");

    this.view.lblYear.text =  voltmx.i18n.getLocalizedString("Year");

      this.view.lblMileage.text =voltmx.i18n.getLocalizedString("Mileage");

      this.view.lblTransmission.text =voltmx.i18n.getLocalizedString("Transmission");

      this.view.lblExteriorColor.text =voltmx.i18n.getLocalizedString("Exterior Color");

      this.view.lblInteriorColor.text =voltmx.i18n.getLocalizedString("Interior Color");
    
      this.view.lblDriveType.text =voltmx.i18n.getLocalizedString("Drive Type");
    
      this.view.lblEngine.text =voltmx.i18n.getLocalizedString("Engine");

  }
 });