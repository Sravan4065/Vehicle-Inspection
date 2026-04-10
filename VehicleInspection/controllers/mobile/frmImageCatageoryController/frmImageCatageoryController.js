define({ 


  onNavigate: function(context)
  {
    this.view.preShow = this.onPreShow.bind(this);
    this.context = context.record;
    this.adjustRTL();
  },




  adjustRTL: function () {

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    var direction = isArabic;
    var labelAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    var setPosition = function(widget, left, right) {
      if (!widget) return;
      widget.left = left || "";
      widget.right = right || "";
    };

    var setAlignment = function(widget) {
      if (!widget) return;
      widget.contentAlignment = isArabic
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT
      : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    };

    var flexList = [
      //             "flxHeading",
      "flxStatusnumber"
    ];
    for (var j = 0; j < flexList.length; j++) {
      var flx = this.view[flexList[j]];
      if (!flx) continue;
      setPosition(
        flx,
        isArabic ? "80%" : "",
        isArabic ? "" : "80%"
      );
      if (this.view[flexList[j]]) {
        this.view[flexList[j]].reverseLayoutDirection = direction;
      }
    }
    var labelList = [
      "lblSelectedVehicle", 
      "lblSelectedvaluedata", 
      "lblSelectcatageory",
      "lblChoosetocapture"
    ];

    for (var i = 0; i < labelList.length; i++) {

      var lbl = this.view[labelList[i]];
      if (!lbl) continue;

      lbl.contentAlignment = labelAlignment;

      setPosition(
        lbl,
        isArabic ? "" : "0dp",
        isArabic ? "0dp" : ""
      );
    }

    this.view.flxHeading.lblImages.text = voltmx.i18n.getLocalizedString("Images");
    this.view.lblSelectedVehicle.text = voltmx.i18n.getLocalizedString("Selected Vehicle");
    this.view.lblSelectcatageory.text = voltmx.i18n.getLocalizedString("Select Image Category");
    this.view.lblChoosetocapture.text = voltmx.i18n.getLocalizedString("Choose which type of photos to capture");

    // Reverse layout
    this.view.flxHeading.reverseLayoutDirection = isArabic;


    // Button
    //     setPosition(
    //         this.view.flxHeadingWithButton.btnSaveResponse,
    //         isArabic ? "5%" : "",
    //         isArabic ? "" : "5%"
    //     );

    // 🔥 ALL details in one loop
    //     var detailsList = [

    //     ];

    //     var self = this;

    //     detailsList.forEach(function(id) {

    //         var item = self.view[id];
    //         if (!item) return;

    //         // Alignment
    //         setAlignment(item.txbData);
    //         setAlignment(item.lblNamedata);

    //         // Label position
    //         setPosition(
    //             item.flxStatusnumber,
    //             isArabic ? "80%" : "",
    //             isArabic ? "" : "80%"
    //         );

    //         // Data position
    //         setPosition(
    //             item.txbData,
    //             isArabic ? "" : "0dp",
    //             isArabic ? "16dp" : ""
    //         );

    //         // Arrow position
    //         if (item.flxArrow) {
    //             setPosition(
    //                 item.flxArrow,
    //                 isArabic ? "8dp" : "",
    //                 isArabic ? "" : "8dp"
    //             );
    //         }
    //     });

    // 🔥 Labels mapping (clean)
    //     var labelsMap = {
    //         lblImages: "Vehicle Details",
    //         btnSaveResponse: "save response",
    //         details1: "Vehicle Make",
    //         details2: "Vehicle Model",
    //         details3: "Vehicle Type",
    //         details4: "Vehicle Color",
    //         details5: "Trim",
    //         details6: "Interior Color",
    //         details8: "Transmission",
    //         details9: "Mileage KM",
    //         details10: "Regional Services",
    //         details11: "Fuel Type",
    //         details12: "No Of Keys",
    //         details15: "Year"
    //     };

    // Apply labels
    //     this.view.flxHeadingWithButton.lblImages.text =
    //         voltmx.i18n.getLocalizedString(labelsMap.lblImages);

    //     this.view.flxHeadingWithButton.btnSaveResponse.text =
    //         voltmx.i18n.getLocalizedString(labelsMap.btnSaveResponse);

    this.view.flxHeader1.lblInspectionIQ.text = 
      voltmx.i18n.getLocalizedString("InspectioniQ");

    //     Object.keys(labelsMap).forEach(function(key) {
    //         if (key.startsWith("details") && self.view[key]) {
    //             self.view[key].lblNamedata.text =
    //                 voltmx.i18n.getLocalizedString(labelsMap[key]);
    //         }
    //     });
  },




  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmImageCatageory");

    this.view.Segimagcatageory.onRowClick =  this.onRowClickAction.bind(this);


    this.view.lblSelectedvaluedata.text = this.context.model;
    this.view.lblStatusNumber.text = this.context.lot_no;

    this.setDataToSeg();
  },

  setDataToSeg: function()
  {
    var self = this;
        var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    self.view.Segimagcatageory.widgetDataMap = 
      {
      flxInwardIcon: "flxInwardIcon",
      imgInwardIcon: "imgInwardIcon",
      flxInwardEntryRightTop: "flxInwardEntryRightTop",
      lblInwardEntry: "lblInwardEntry",
      flxInwardCount: "flxInwardCount",
      lblInwardCount: "lblInwardCount",
      lblVehicleInspectionAndBarCode: "lblVehicleInspectionAndBarCode",
      flxViewDetailsInwardEntry: "flxViewDetailsInwardEntry",
      lblStatrCapturing: "lblStatrCapturing",
      imgFArrowIE: "imgFArrowIE",
      flxInwardEntry: "flxInwardEntry"
    }

    var data = [

      {
        flxInwardIcon: {
          skin: "sknFlxe5e5e7bgborder",
          "left": isArabic ? "" : "4%",
          "right": isArabic ? "4%": "",
          "reverseLayoutDirection": isArabic
        },
        flxInwardEntryRightTop: {
          "left": isArabic ? "" : "0dp",
          "right": isArabic ? "0dp": "",
          "reverseLayoutDirection": isArabic
        },
        flxInwardCount: {
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "": "4%",
        },
        lblInwardEntry: { 
          text: voltmx.i18n.getLocalizedString("Exterior Photos"), 
        },
        lblInwardCount: { text: "4 photos" },
        key: 1,
        lblVehicleInspectionAndBarCode: 
        { 
          text: voltmx.i18n.getLocalizedString("Document Interior Condition"),
         contentAlignment: isArabic 
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
        : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        lblStatrCapturing:
        {
          text: voltmx.i18n.getLocalizedString("Start Capturing"),
        },
        flxStartCapturing: {
          "reverseLayoutDirection": isArabic
        },
        imgInwardIcon: { src: "interiorphotos.png" },
        imgFArrowIE: { src: "frontarrowwhite.png" },
        //     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmInwardEntrySummary")}
      },
      {
        flxInwardIcon:
        {
          skin: "sknFlxe5e5e7bgborder",
          "left": isArabic ? "" : "4%",
          "right": isArabic ? "4%": "",
          "reverseLayoutDirection": isArabic
        },
          flxInwardEntryRightTop: {
          "left": isArabic ? "" : "0dp",
          "right": isArabic ? "0dp": "",
          "reverseLayoutDirection": isArabic
        },
        flxInwardCount: {
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "": "4%",
        },
        lblInwardEntry:
        {
//           text: "Damage Documentation"
          text: voltmx.i18n.getLocalizedString("Damage Documentation"), 
        },
        lblInwardCount: { text: "7 pending" },
        key: 2,
        lblVehicleInspectionAndBarCode: 
        {
          text   : voltmx.i18n.getLocalizedString("Close-up photos of any damage"),
          contentAlignment: isArabic 
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
        : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        flxStartCapturing: {
          "reverseLayoutDirection": isArabic
        },
        lblStatrCapturing: {
          text: voltmx.i18n.getLocalizedString("Start Capturing"),
        },
        imgInwardIcon: { src: "warning.png" },
        imgFArrowIE: { src: "frontarrowwhite.png" },
        //     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmMyInspectionsSummary")}

      },
      {
         flxInwardIcon:
        {
           skin: "sknFlxe5e5e7bgborder",
          "left": isArabic ? "" : "4%",
          "right": isArabic ? "4%": "",
          "reverseLayoutDirection": isArabic
        },
          flxInwardEntryRightTop: {
          "left": isArabic ? "" : "0dp",
          "right": isArabic ? "0dp": "",
          "reverseLayoutDirection": isArabic
        },
        flxInwardCount: {
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "": "4%",
        },
        lblInwardEntry:
        { 
//           text: "Engine & Mechanical" 
           text: voltmx.i18n.getLocalizedString("Engine & Mechanical"), 
        },
        lblInwardCount: { text: "4 pending" },
        key: 3,
        lblVehicleInspectionAndBarCode: { 
//           text: "Engine bay and mechanical components" 
          
          text: voltmx.i18n.getLocalizedString("Engine bay and mechanical components"),
          contentAlignment: isArabic 
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
        : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        flxStartCapturing: {
          "reverseLayoutDirection": isArabic
        },
        lblStatrCapturing: {
          text: voltmx.i18n.getLocalizedString("Start Capturing"),
        },
        imgInwardIcon: { src: "settings.png" },
        imgFArrowIE: { src: "frontarrowwhite.png" },
        //     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmImagesSummary")}

      },
      {
          flxInwardIcon:
        {
           skin: "sknFlxe5e5e7bgborder",
          "left": isArabic ? "" : "4%",
          "right": isArabic ? "4%": "",
          "reverseLayoutDirection": isArabic
        },
          flxInwardEntryRightTop: {
          "left": isArabic ? "" : "0dp",
          "right": isArabic ? "0dp": "",
          "reverseLayoutDirection": isArabic
        },
        flxInwardCount: {
          "left": isArabic ? "4%" : "",
          "right": isArabic ? "": "4%",
        },
        lblInwardEntry:
        { 
           text: voltmx.i18n.getLocalizedString("Documents"), 
        },
        lblInwardCount: { text: "3 pending" },
        key: 4,
        lblVehicleInspectionAndBarCode: { 
          text: voltmx.i18n.getLocalizedString("Vehicle Documents and papers"),
          contentAlignment: isArabic 
        ? constants.CONTENT_ALIGN_MIDDLE_RIGHT 
        : constants.CONTENT_ALIGN_MIDDLE_LEFT
        },
        lblStatrCapturing: {
          text: voltmx.i18n.getLocalizedString("Start Capturing"),
        },
        imgInwardIcon: { src: "googledocs.png" },
        imgFArrowIE: { src: "frontarrowwhite.png" },
        //     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmWashingSummary")}
      }
    ];

    self.view.Segimagcatageory.setData(data);
  },


  onRowClickAction: function()
  {
    var self = this;
    var selectedRow = self.view.Segimagcatageory && 
        self.view.Segimagcatageory.selectedRowItems;

    if(selectedRow && selectedRow[0].key)
    {
      switch(String(selectedRow[0].key))
      {
        case "1":
          //               NavigationManager.push("frmVehicledetailsInspectionType",selectedRow[0].lov_id);
          NavigationManager.push("frmImageCategorySub",{
            record: self.context,
            subCat: "Exterior Images",
            subCatId: "1",
          });
          break;
        case "2":
          //               new voltmx.mvc.Navigation("frmEngineInspectionType").navigate();
          NavigationManager.push("frmImageCategorySub",{
            record: self.context,
            subCat: "Damage Documentation",
            subCatId: "2",
          });
          break;
        case "3":
          //               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
          NavigationManager.push("frmImageCategorySub",{
            record: self.context,
            subCat: "Engine and Mechanical",
            subCatId: "3",
          });
          break;
        case "4":
          //               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
          NavigationManager.push("frmImageCategorySub",{
            record: self.context,
            subCat: "Documents",
            subCatId: "4",
          });
          break;
        default:
          return;
      }
    }
  }
});