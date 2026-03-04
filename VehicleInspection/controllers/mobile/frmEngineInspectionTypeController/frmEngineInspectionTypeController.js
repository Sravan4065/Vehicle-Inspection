define({ 

 onNavigate: function()
  {
    var self = this;
    this.adjustRTL();
    this.createUI();
    this.view.preShow = this.onPreShow.bind(this);
    this.flxSelectedItems = {}; 
   
  },
  
  onPreShow: function()
  {
    var self = this;
   toggleFooterIcons(this.view, "frmEngineInspectionType"); 
   
     this.view.flxAddDetailsAndUpload.flxCloseAddDetails.onClick = () =>
    {
      self.view.flxAddDetailsAndUpload.setVisibility(false);
    }
    this.view.flxAddDetailsAndUpload.flxUploadImages.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(true);
    }
    
       this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
     this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxChooseFileTakePhoto.onClick = this.camOnCaptureAction.bind(this);
    this.view.flxAddDetailsAndUpload.flxRetake.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(true);
    }
    this.view.flxChooseFileTakePhoto.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(false);
    }
    this.view.flxAddDetailsAndUpload.setVisibility(false);
  },
  
  createUI: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    self.view.flxInspectionSubTypes.removeAll();
    for(var i=0;i<5;i++){
    var basicProperties = {
  id: "flxItem"+i,
  isVisible: true,
    width: "90%",
  height: voltmx.flex.USE_PREFERRED_SIZE,
  left: "0dp",
  top: "6dp",
  centerX: "50%",
  layoutType: voltmx.flex.FLOW_VERTICAL,
  clipBounds: true,
  skin: "sknFlxFFFFFFd2d5daBorderRadius8px"
};

var layoutProperties = {

};

var platformSpecificProperties = {};

var flxItem = new voltmx.ui.FlexContainer(
  basicProperties,
  layoutProperties,
  platformSpecificProperties
);
    
    
    var lblSubType = new voltmx.ui.Label(
  {
    id: "lblSubType"+i,
    isVisible: true,
    text: "Engine Upper Cover",
      left: isArabic ? "": "3%",
    right: isArabic ? "3%": "",
    top: "10dp",
    width: voltmx.flex.USE_PREFERRED_SIZE,
    skin: "sknLblDubai00000014pxMedium"
  },
  {
  
  },
  {}
);


var lblSelectCondition = new voltmx.ui.Label(
  {
    id: "lblSelectCondition"+i,
    isVisible: true,
    text: "Select Condition",
    skin: "sknLblDubai00000012pxRegular",
    left: isArabic ? "": "3%",
    right: isArabic ? "3%": "",
    top: "5dp",
    width: voltmx.flex.USE_PREFERRED_SIZE
  },
  {
    
  },
  {}
);


var flxSelectOptions = new voltmx.ui.FlexContainer(
  {
    id: "flxSelectOptions"+i,
    isVisible: true,
    clipBounds: true,
    width: "94%",
    height: "36dp",
    centerX: "50%",
    top: "10dp",
    layoutType: voltmx.flex.FLOW_HORIZONTAL,
    skin: "sknFlxBasic"
  },
  {
    
  },
  {}
);
      
      for (var rating = 1; rating <= 10; rating++) {

    var flxRate = new voltmx.ui.FlexContainer(
    {
        id: "flxRate"+i+"_"+rating,
        isVisible: true,
        width: "9%",
        height: "100%",
        left: "1%",
//         right: isArabic ? "0dp" : "",
        centerY: "50%",
        layoutType: voltmx.flex.FREE_FORM,
        clipBounds: true,
        skin: "sknFlxFFFFFFd2d5daBorderRadius4px",
        onClick: this.onOptionSelect.bind(this, i, rating)
    },
    {},
    {}
    );

    var lblRateItem = new voltmx.ui.Label(
    {
        id: "RateItem"+i+"_"+rating,
        isVisible: true,
        text: rating.toString(),
        skin: "sknlblDubai231f2016pxMedium",
        centerY: "50%",
        centerX: "50%",
        width: voltmx.flex.USE_PREFERRED_SIZE
    },
    {},
    {}
    );

    flxRate.add(lblRateItem);
    flxSelectOptions.add(flxRate);
      }

var flxAddDetails = new voltmx.ui.FlexContainer(
  {
    id: "flxAddDetails"+i,
    isVisible: true,
    clipBounds: true,
    layoutType: voltmx.flex.FREE_FORM,
    skin: "sknFlxFFFFFFd2d5daBorderRadius8px",
      width: "94%",
    height: "45dp",
    centerX: "50%",
    top: "10dp",
    bottom: "5dp",
    onClick: this.showAddDetails.bind(this)
  },
  {
  
  },
  {}
);

      var imgAdd = new voltmx.ui.Image2(
        {
    id: "imgAdd"+i,
    isVisible: true,
    left: isArabic ? "" : "38%",
    right: isArabic ? "38%" : "",
    centerY: "50%",
    width: "18dp",
    height: "18dp",
    src: "addicon.png"
  },
  {
  
  },
  {}
      );
      
      var lblAddDetails = new voltmx.ui.Label(
  {
    id: "lblAddDetails"+i,
    isVisible: true,
    text: "Add Details",
    skin: "sknLblDubai00000012pxMedium",
//     left: "50%",
   left: isArabic ? "" : "50%",
    right: isArabic ? "50%" : "",
    centerY: "50%",
    width: voltmx.flex.USE_PREFERRED_SIZE
  },
  {
    
  },
  {}
);
      
      flxAddDetails.add(imgAdd,lblAddDetails);

flxItem.add(
  lblSubType,
  lblSelectCondition,
  flxSelectOptions,
  flxAddDetails
);
    
    this.view.flxInspectionSubTypes.add(flxItem);

  }
  },
  
//   onOptionSelect: function (index, selectedType) {

//     var flxItem = this.view["flxItem" + index];

//     // Map each option to its UI widgets
//     var optionsMap = {
//         PASS: {
//             flx: flxItem["flxPass" + index],
//             lbl: flxItem["lblPass" + index],
//             img: flxItem["imgTick" + index],
//             flxSelectedSkin: "sknFlxFFFFFF0AAA00BorderRadius8px", // commented selected skin
//             lblSelectedSkin: "sknLblDubai61b35c12pxRegular",
//             imgSelectedSrc: "tickpassgreen.png"
//         },
//         REPAIR: {
//             flx: flxItem["flxNeedsRepair" + index],
//             lbl: flxItem["lblNeedsRepair" + index],
//             img: flxItem["imgNeedsRepair" + index],
//             flxSelectedSkin: "sknFlxFFFFFFd32437BorderRadius8px",
//             lblSelectedSkin: "sknLblDubaid3243712pxRegular",
//             imgSelectedSrc: "crossneedrepairred.png"
//         },
//         NA: {
//             flx: flxItem["flxNotApplicable" + index],
//             lbl: flxItem["lblNotApplicable" + index],
//             img: flxItem["imgNotApplicable" + index],
//             flxSelectedSkin: "sknFlxFFFFFFFFA500BorderRadius8px",
//             lblSelectedSkin: "sknLblDubaiFFA50012pxRegular",
//             imgSelectedSrc: "notappiconyellow.png"
//         }
//     };

//     // Reset all options to default
//     for (var key in optionsMap) {
//         optionsMap[key].flx.skin = "sknFlxFFFFFFd2d5daBorderRadius8px"; // current default
//         optionsMap[key].lbl.skin = "sknLblDubai00000012pxRegular";       // current default
//         // Reset image to default (commented ones are only for selection)
//         if(key === "PASS") optionsMap[key].img.src = "tickpass.png";
//         else if(key === "REPAIR") optionsMap[key].img.src = "crossneedrepair.png";
//         else optionsMap[key].img.src = "notappicon.png";
//     }

//     // Apply selection
//     var selected = optionsMap[selectedType];
//     selected.flx.skin = selected.flxSelectedSkin;
//     selected.lbl.skin = selected.lblSelectedSkin;
//     selected.img.src = selected.imgSelectedSrc;

//     // Track selection
//     this.flxSelectedItems[index] = {
//         selected: selectedType,
//         flx: selected.flx,
//         lbl: selected.lbl,
//         img: selected.img
//     };

//     this.view.forceLayout();
// },
  
  onOptionSelect: function (index, selectedRating) {

    var flxItem = this.view["flxItem" + index];

    // Initialize storage object if not exists
    if (!this.selectedRatings) {
        this.selectedRatings = {};
    }

    // Loop from 1 to 10 and update UI
    for (var rating = 1; rating <= 10; rating++) {

        var flxRate = flxItem["flxSelectOptions" + index]["flxRate" + index + "_" + rating];
        var lblRate = flxRate["RateItem" + index + "_" + rating];

        if (rating <= selectedRating) {
            // Selected (Green)
            flxRate.skin = "sknFlx61b35cBorder4px";
            lblRate.skin = "sknlblDubaiffffff16pxMedium";
        } else {
            // Default
            flxRate.skin = "sknFlxFFFFFFd2d5daBorderRadius4px";
            lblRate.skin = "sknlblDubai231f2016pxMedium";
        }
    }

    // Store selected rating locally per item
    this.selectedRatings[index] = selectedRating;

    this.view.forceLayout();
},
  
  showAddDetails: function()
  {
    this.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(false);
    this.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(true);
    this.view.flxAddDetailsAndUpload.setVisibility(true);
  },
  
   flxChooseFromLibraryOnClickAction: function () {
  var self = this;

  voltmx.phone.openMediaGallery(function (rawbytes) {
    var index = this.index;
    if (rawbytes) {
      voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));

      var filename = "";
      try {
        var resourcePath = rawbytes.getResourcePath && rawbytes.getResourcePath();
        if (resourcePath) {
          var normalizedPath = resourcePath.replace(/\\/g, "/");
          filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
          if (!filename || filename.trim() === "") {
            filename = "image_from_gallery_" + new Date().getTime();
          }
        } else {
          filename = "image_from_gallery_" + new Date().getTime();
        }
      } catch (e) {
        voltmx.print("Error getting resource path: " + e.message);
        filename = "image_from_gallery_" + new Date().getTime();
      }

      var base64Data = voltmx.convertToBase64(rawbytes);

//       var sizeInBytes = self.estimateBase64Size(base64Data);
//       var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

//       if (sizeInBytes > 10 * 1024 * 1024) {
//         alert("Image too large. Please select an image smaller than 10 MB.");
//         return;
//       }

//       var filetype = detectFileType(base64Data) || ".jpg";
//       var filefullname = filename + filetype;

//       self.selectedPdfFileName = filefullname;
      self.selectedPdfBase64 = base64Data;
//       self.view[imgItem].index = base64Data;
       
//       self.fleetDocUpload();
      
      self.view.flxChooseFileTakePhoto.setVisibility(false);
      self.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(true);
      self.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(false);
      self.view.flxAddDetailsAndUpload.imgUploadedImg.base64 = base64Data;
      self.view.flxAddDetailsAndUpload.lblImgName.text = filename;

      voltmx.print(" Base64 Image Uploaded: " + base64Data);
    }
  }.bind(this), {}, {
    action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
    format: voltmx.phone.MEDIA_DOCUMENT_RAW,
    mimetype: "image/*"
  });
},
  
  camOnCaptureAction: function () {
    var self = this;
  var rawBytes = this.view.flxChooseFileTakePhoto.camTakeAPhoto.rawBytes;

  if (rawBytes) {
    // Convert raw bytes to base64
    var filename = "";

    try {
      var resourcePath = rawBytes.getResourcePath && rawBytes.getResourcePath();

      if (resourcePath) {
        var normalizedPath = resourcePath.replace(/\\/g, "/");
        filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);

        if (!filename || filename.trim() === "") {
          filename = "captured_image_" + new Date().getTime();
        }
      } else {
        // Fallback for iOS or invalid resourcePath
        filename = "captured_image_" + new Date().getTime();
      }
    } catch (e) {
      voltmx.print("Error extracting filename: " + e.message);
      filename = "captured_image_" + new Date().getTime();
    }

    var base64Image = voltmx.convertToBase64(rawBytes);

//     var sizeInBytes = this.estimateBase64Size(base64Image);
//     var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

//     if (sizeInBytes > 10 * 1024 * 1024) {
//       alert(" Image too large. Please capture an image smaller than 10 MB.");
//       return;
//     }

//     var filetype = detectFileType(base64Image) || ".jpg";
//     var filefullname = filename + filetype;

//     this.filenameCam = filefullname;
//     this.selectedPdfFileName = filefullname;
    this.selectedPdfBase64 = base64Image;
    self.view.flxChooseFileTakePhoto.setVisibility(false);
      self.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(true);
      self.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(false);
      self.view.flxAddDetailsAndUpload.imgUploadedImg.base64 = base64Image;
      self.view.flxAddDetailsAndUpload.lblImgName.text = filename;

//     this.fleetDocUpload();

    this.view.flxChooseFileTakePhoto.setVisibility(false);
  
  } else {
    voltmx.print("No image captured from camera.");
  }
},
  
  adjustRTL: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    this.view.flxIndicator.reverseLayoutDirection = isArabic;
    this.view.flxHeadingWithButton.flxHeading.reverseLayoutDirection = isArabic;
    this.view.flxIndicator.flxPass.reverseLayoutDirection = isArabic;
    this.view.flxIndicator.flxNeedsRepair.reverseLayoutDirection = isArabic;
    this.view.flxIndicator.flxNotApplicable.reverseLayoutDirection = isArabic;
    
//content alignment--
   this.view.flxAddDetailsAndUpload.lblPleaseEnter.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
   this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.contentAlignment = isArabic ? constants.CONTENT_ALIGN_TOP_RIGHT : constants.CONTENT_ALIGN_TOP_LEFT;
    this.view.flxAddDetailsAndUpload.lblPleaseEnter.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
      //content alignment--
    
    if(isArabic)
      {
        this.view.flxHeadingWithButton.btnSaveResponse.right = "";
        this.view.flxHeadingWithButton.btnSaveResponse.left = "5%";
        
        this.view.flxHeadingWithButton.flxBack.left = "";
        this.view.flxHeadingWithButton.flxBack.right = "5%";
        
        this.view.flxHeadingWithButton.lblImages.left = "";
        this.view.flxHeadingWithButton.lblImages.right = "3%";
        
        this.view.flxAddDetailsAndUpload.lblAddDetails.left = "";
        this.view.flxAddDetailsAndUpload.lblAddDetails.right = "3%";
        
        this.view.flxAddDetailsAndUpload.flxCloseAddDetails.right = "";
        this.view.flxAddDetailsAndUpload.flxCloseAddDetails.left = "0dp";
        
        this.view.flxAddDetailsAndUpload.lblPleaseEnter.left = "";
        this.view.flxAddDetailsAndUpload.lblPleaseEnter.right = "3%";
        
        this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.left = "";
        this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.right = "0dp";
        
        this.view.flxIndicator.flxPass.left = "";
        this.view.flxIndicator.flxPass.right = "0dp";
        
        this.view.flxIndicator.flxNotApplicable.left = "";
        this.view.flxIndicator.flxNotApplicable.right = "2%";
        
        this.view.flxIndicator.imgPassIcon.left = "";
        this.view.flxIndicator.imgPassIcon.right = "13%";
        
        this.view.flxIndicator.lblPass.left = "";
        this.view.flxIndicator.lblPass.right = "8%";
        
        this.view.flxIndicator.imgNeedsRepair.left = "";
        this.view.flxIndicator.imgNeedsRepair.right = "13%";
        
        this.view.flxIndicator.lblNeedsRepair.left = "";
        this.view.flxIndicator.lblNeedsRepair.right = "8%";
        
        this.view.flxIndicator.imgNotApplicable.left = "";
        this.view.flxIndicator.imgNotApplicable.right = "8%";
        
        this.view.flxIndicator.lblNotApplicable.left = "";
        this.view.flxIndicator.lblNotApplicable.right = "8%";
        
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.flxHeadingWithButton.imgBack.transform = flipTransform;
      }
    else
      {
        this.view.flxHeadingWithButton.btnSaveResponse.right = "5%";
        this.view.flxHeadingWithButton.btnSaveResponse.left = "";
        
        this.view.flxHeadingWithButton.flxBack.left = "5%";
        this.view.flxHeadingWithButton.flxBack.right = "";
        
        this.view.flxHeadingWithButton.lblImages.left = "3%";
        this.view.flxHeadingWithButton.lblImages.right = "";
        
        this.view.flxAddDetailsAndUpload.lblAddDetails.left = "3%";
        this.view.flxAddDetailsAndUpload.lblAddDetails.right = "";
        
        this.view.flxAddDetailsAndUpload.flxCloseAddDetails.right = "0dp";
        this.view.flxAddDetailsAndUpload.flxCloseAddDetails.left = "";
        
        this.view.flxAddDetailsAndUpload.lblPleaseEnter.left = "3%";
        this.view.flxAddDetailsAndUpload.lblPleaseEnter.right = "";
        
        this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.left = "0dp";
        this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.right = "";
        
        this.view.flxIndicator.flxPass.left = "0%";
        this.view.flxIndicator.flxPass.right = "";
        
        this.view.flxIndicator.flxNotApplicable.left = "2%";
        this.view.flxIndicator.flxNotApplicable.right = "";
        
        this.view.flxIndicator.imgPassIcon.left = "13%";
        this.view.flxIndicator.imgPassIcon.right = "";
        
        this.view.flxIndicator.lblPass.left = "8%";
        this.view.flxIndicator.lblPass.right = "";
        
        this.view.flxIndicator.imgNeedsRepair.left = "13%";
        this.view.flxIndicator.imgNeedsRepair.right = "";
        
        this.view.flxIndicator.lblNeedsRepair.left = "8%";
        this.view.flxIndicator.lblNeedsRepair.right = "";
        
        this.view.flxIndicator.imgNotApplicable.left = "8%";
        this.view.flxIndicator.imgNotApplicable.right = "";
        
        this.view.flxIndicator.lblNotApplicable.left = "8%";
        this.view.flxIndicator.lblNotApplicable.right = "";
        
         this.view.flxHeadingWithButton.imgBack.transform = voltmx.ui.makeAffineTransform();
      }
  }

 });