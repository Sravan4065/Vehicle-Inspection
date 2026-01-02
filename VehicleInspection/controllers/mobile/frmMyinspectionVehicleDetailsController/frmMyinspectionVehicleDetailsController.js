define({ 

 //Type your controller code here 
onNavigate: function(){
  this.adjustRTL();
},
  

  
  adjustRTL: function () {

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign = isArabic
        ? constants.TEXT_ALIGN_RIGHT
        : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic === true;

    if (isArabic) {

        this.view.lblId.right = "0%";
        this.view.lblDescription.right = "0%";
        this.view.lblYear.right = "0%";
        this.view.lblServicetype.right = "0%";
        this.view.lblRequestedtime.right = "0%";
        this.view.lblNotes.right = "0%";
        this.view.lblStatus.right = "0%";
        this.view.lblINspectionReport.right = "0%";
        this.view.btnStart.right = "0%";
      
        this.view.lblId.left = null;
        this.view.lblDescription.left = null;
        this.view.lblYear.left = null;
        this.view.lblServicetype.left = null;
        this.view.lblRequestedtime.left = null;
        this.view.lblNotes.left = null;
        this.view.lblStatus.left = null;
        this.view.lblINspectionReport.left = null;
        this.view.btnStart.left = null;

        this.view.lblIdData.left = "0%";
        this.view.lblDescriptionData.left = "0%";
        this.view.lblYearData.left = "0%";
        this.view.lblServiceTypeData.left = "0%";
        this.view.lblRequestedtimedata.left = "0%";
        this.view.lblNotesData.left =  "0%";
        this.view.lblStatusData.left =  "0%";
        this.view.lblInspectionReportData.left =  "0%";
        this.view.btnClose.left =  "0%";
      
      
        this.view.lblIdData.right =null;
        this.view.lblDescriptionData.right =null;
        this.view.lblYearData.right =null;
        this.view.lblServiceTypeData.right =null;
        this.view.lblRequestedtimedata.right =null;
        this.view.lblNotesData.right =null;
        this.view.lblStatusData.right =null;
        this.view.lblInspectionReportData.right =null;
        this.view.btnClose.right =null;


    } else {

        this.view.lblIdData.left = null;
        this.view.lblDescriptionData.left= null;
        this.view.lblYearData.left = null;
        this.view.lblServiceTypeData.left= null;
        this.view.lblRequestedtimedata.left = null;
        this.view.lblNotesData.left = null;
        this.view.lblStatusData.left = null;
        this.view.lblInspectionReportData.left = null;
        this.view.btnClose.left= null;
      
        this.view.lblIdData.right ="0%";
        this.view.lblDescriptionData.right  ="0%";
        this.view.lblYearData.right ="0%";
        this.view.lblServiceTypeData.right  ="0%";
        this.view.lblRequestedtimedata.right ="0%";
        this.view.lblNotesData.right  ="0%";
        this.view.lblStatusData.right  ="0%";
        this.view.lblInspectionReportDat.right ="0%";
        this.view.btnClose.right ="0%";
      
         this.view.lblId.right = null;
        this.view.lblDescription.right = null;
        this.view.lblYear.right = null;
        this.view.lblServicetype.right = null;
        this.view.lblRequestedtime.right = null;
        this.view.lblNotes.right  = null;
        this.view.lblStatus.right = null;
        this.view.lblINspectionReport.right = null;
        this.view.btnStart.right = null;
      
         this.view.lblId.left = "0%";
        this.view.lblDescription.left = "0%";
        this.view.lblYear.left = "0%";
        this.view.lblServicetype.left = "0%";
        this.view.lblRequestedtime.left = "0%";
        this.view.lblNotes.left = "0%";
        this.view.lblStatus.left = "0%";
        this.view.lblINspectionReport.left = "0%";
        this.view.btnStart.left = "0%";

    }

    this.view.lblId.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblIdData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblDescription.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblDescriptionData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblYear.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblYearData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblServicetype.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblServiceTypeData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblRequestedtime.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblRequestedtimedata.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblNotes.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblNotesData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblStatus.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblStatusData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.lblINspectionReport.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.lblInspectionReportData.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    this.view.btnStart.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
        : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    this.view.btnClose.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_LEFT
        : constants.CONTENT_ALIGN_MIDDLE_RIGHT;

    var labelList = [
        "lblId",
        "lblIdData",
        "lblDescription",
        "lblDescriptionData",
        "lblYear",
        "lblYearData",
        "lblServicetype",
        "lblServiceTypeData",
        "lblRequestedtime",
        "lblRequestedtimedata",
        "lblNotes",
        "lblNotesData",
        "lblStatus",
        "lblStatusData",
        "lblINspectionReport",
        "lblInspectionReportData",
        "btnStart",
        "btnClose"
    ];

    for (var i = 0; i < labelList.length; i++) {
        if (this.view[labelList[i]]) {
            this.view[labelList[i]].contentAlignment = labelAlignment;
        }
    }

    var flexList = [
        "flxId",
        "flxDescription",
        "flxYear",
        "flxServiceType",
        "flxRequestedtime",
        "fxlNotes",
        "flxStatus",
        "flxInspectionReport",
        "flxSaveclose"
    ];

    for (var j = 0; j < flexList.length; j++) {
        if (this.view[flexList[j]]) {
            this.view[flexList[j]].reverseLayoutDirection = direction;
        }
    }

    this.view.flxHeader.lblInspectionIQ.text =
        voltmx.i18n.getLocalizedString("InspectioniQ");

    this.view.lblId.text =
        voltmx.i18n.getLocalizedString("ID");

    this.view.lblDescription.text =
        voltmx.i18n.getLocalizedString("Description");

    this.view.lblYear.text =
        voltmx.i18n.getLocalizedString("Year");

    this.view.lblServicetype.text =
        voltmx.i18n.getLocalizedString("Service Type");

    this.view.lblRequestedtime.text =
        voltmx.i18n.getLocalizedString("Requested Time");

    this.view.lblNotes.text =
        voltmx.i18n.getLocalizedString("Notes");

    this.view.lblStatus.text =
        voltmx.i18n.getLocalizedString("Status");

    this.view.lblINspectionReport.text =
        voltmx.i18n.getLocalizedString("Inspection Report");

    this.view.btnStart.text =
        voltmx.i18n.getLocalizedString("Start");

    this.view.btnClose.text =
        voltmx.i18n.getLocalizedString("Close");
}

  
 });