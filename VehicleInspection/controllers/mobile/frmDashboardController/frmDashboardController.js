define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
    this.view.flxViewAll.onClick = () =>
    {
      new voltmx.mvc.Navigation("frmActivityist").navigate();
    }
  },
  
  onPreShow: function()
  {
    NavigationManager.init("frmDashboard");
    toggleFooterIcons(this.view, "frmDashboard");
    this.setDataToSeg();
  },

  setDataToSeg: function()
  {
    var self = this;

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
    flxInwardEntry: "flxInwardEntry"
};


    var data = [

      {
    flxInwardIcon:{skin: "sknFlxDBFCE7Radius5px"},
    lblInwardEntry: { text: "Inward Entry" },
    lblInwardCount: { text: "4 pending" },
    lblVehicleInspectionAndBarCode: { text: "Vehicle Inspection & Barcode printing" },
    lblViewDetailsInwardEntry: { text: "View Details" },
    imgInwardIcon: { src: "inwardentrygreen.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
    flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmInwardEntrySummary")}
},
      {
    flxInwardIcon:{skin: "sknFlxffd5daRadius5px"},
    lblInwardEntry: { text: "Vehicle Inspection" },
    lblInwardCount: { text: "7 pending" },
    lblVehicleInspectionAndBarCode: { text: "Vehicle inspection process" },
    lblViewDetailsInwardEntry: { text: "View Details" },
    imgInwardIcon: { src: "viicon.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
    flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmMyInspectionsSummary")}

},
       {
    flxInwardIcon:{skin: "sknFlxDBFCE7Radius5px"},
    lblInwardEntry: { text: "Images" },
    lblInwardCount: { text: "4 pending" },
    lblVehicleInspectionAndBarCode: { text: "Vehicle images uploads" },
    lblViewDetailsInwardEntry: { text: "View Details" },
    imgInwardIcon: { src: "imagesicon.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
    flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmImagesSummary")}

},
       {
    flxInwardIcon:{skin: "sknFlxe0e7ffRadius5px"},
    lblInwardEntry: { text: "Washing" },
    lblInwardCount: { text: "3 pending" },
    lblVehicleInspectionAndBarCode: { text: "Vehicle washing process" },
    lblViewDetailsInwardEntry: { text: "View Details" },
    imgInwardIcon: { src: "carwashicon.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
    flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmWashingSummary")}
}
    ];

    self.view.segActivities.setData(data);
  }
  },
  
  navToRelatedActivity: function(navigatingFormName) 
      { 
//         new voltmx.mvc.Navigation(navigatingFormName).navigate();
        NavigationManager.push(navigatingFormName);
        
      },
  adjustRTL: function(){

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic ?constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign =  isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;


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

    this.view.lblWelcomeBack.text = voltmx.i18n.getLocalizedString("Welcome back");

      this.view.lblHeresisOverView = voltmx.i18n.getLocalizedString("Here’s your overview for today");

      this.view.lblAssigned.text =voltmx.i18n.getLocalizedString("Assigned");

      this.view.lblPending.text =voltmx.i18n.getLocalizedString("Pending");

      this.view.lblViewAll.text =voltmx.i18n.getLocalizedString("View All");

      this.view.lblSelectACategory.text =voltmx.i18n.getLocalizedString("Main Categories");

      this.view.flxfooter.lblHome.text =voltmx.i18n.getLocalizedString("Dashboard");

      this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");

      this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");

      this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");

  }
 
 });