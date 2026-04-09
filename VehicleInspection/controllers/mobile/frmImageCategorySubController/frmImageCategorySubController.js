define({
  onNavigate: function(context) {
    var self = this;
    this.objectId = context.record.object_id;
    this.context = context;
    this.view.preShow = this.onPreShow.bind(this);
    this.flxSelectedItems = {};
    this.inspectionData = {};
    this.currentViewName = "";
    this.uploadedImages = {}; // ✅ store images by index
  },

  onPreShow: function() {
    var self = this;
    toggleFooterIcons(this.view, "frmImageCategorySub");

    this.fileDetails = [];
    this.view.lblSelectedvaluedata.text = this.context.record.model;
    this.view.lblCategoryValue.text = this.context.subCat;

    this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick =
      this.flxChooseFromLibraryOnClickAction.bind(this);

    this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture =
      this.camOnCaptureAction.bind(this);

    this.view.flxChooseFileTakePhoto.flxTakeAPhoto.onClick =
      this.camOnCaptureAction.bind(this);

    this.view.flxChooseFileTakePhoto.onClick = () => {
      self.view.flxChooseFileTakePhoto.setVisibility(false);
    };

    this.view.flxHeading.flxBack.onClick = () => {
      var tStore = voltmx.store.getItem("tStore");
      if (tStore && tStore.length > 0) {
        var alertConfig = {
          message: "Do you want to discard the changes?",
          alertType: constants.ALERT_TYPE_CONFIRMATION,
          alertTitle: "Confirmation",
          yesLabel: "Yes",
          noLabel: "No",
          alertHandler: function(response) {
            if (response) {
              ImageUploadAndDeletion.deleteImage(tStore, function(response, error) {
                if (error) return;
                if (response && response.opstatus === 0) {
                  voltmx.store.setItem("tStore", "");
                  NavigationManager.pop();
                }
              });
            }
          }
        };
        voltmx.ui.Alert(alertConfig, {});
      } else {
        NavigationManager.pop();
      }
    };

    this.createUI();
  },

  createUI: function() {
    var self = this;
    self.view.flxDynamicImageViews.removeAll();
  

    var subCatId = self.context.subCatId;
var viewNames = [];

switch (subCatId) {

  case "1": // Exterior Images
    viewNames = ["Front View", "Rear View", "Side View", "Interior", "Odometer"];
    break;

  case "2": // Damage Documentation
    viewNames = ["Front Damage", "Rear Damage", "Left Side Damage", "Right Side Damage", "Close-up Damage"];
    break;

  case "3": // Engine and Mechanical
    viewNames = ["Engine Bay", "Battery", "Radiator", "Underbody", "Exhaust"];
    break;

  case "4": // Documents
    viewNames = ["RC Document", "Insurance", "PUC Certificate", "Invoice", "Other Docs"];
    break;

  default:
    viewNames = [];
    break;
}
    var flxRow = new voltmx.ui.FlexContainer({
      id: "flxRow",
      height: "220dp",
      width: "100%",
      top: "10dp",
      layoutType: voltmx.flex.FREE_FORM
    }, {}, {});

    for (var i = 0; i < 5; i++) {
      let index = i;
      let viewName = viewNames[i];

      var flxItem = new voltmx.ui.FlexContainer({
        id: "flxItem" + i,
        height: "100%",
        width: "48%",
        left: (i === 0) ? "1%" : "51%",   // ✅ SIDE BY SIDE FIX
        skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
        layoutType: voltmx.flex.FREE_FORM
      }, {}, {});

      var flxImgItem = new voltmx.ui.FlexContainer({
        id: "flxImgItem" + i,
        height: "100dp",
        width: "90%",
        centerX: "50%",
        top: "10dp",
        skin: "sknFlxEFEFEFRadius5px",
        layoutType: voltmx.flex.FREE_FORM,
        clipBounds: true
      }, {}, {});

      var imgItem = new voltmx.ui.Image2({
        id: "imgItem" + i,
        height: "100%",
        width: "100%",
        centerX: "50%",
        centerY: "50%",
        src: "defaulticon.png",
        dynamicImageLoading: true
      }, { imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS }, {});

      flxImgItem.add(imgItem);

      var lblItemName = new voltmx.ui.Label({
        id: "lblItemName" + i,
        centerX: "50%",
        top: "120dp",
        text: viewName,
        skin: "sknLblDubai231f2020pxRegular"
      }, {}, {});

      var flxClick = new voltmx.ui.FlexContainer({
        id: "flxClick" + i,
        height: "40dp",
        width: "90%",
        centerX: "50%",
        bottom: "12dp",
        skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
        layoutType: voltmx.flex.FREE_FORM,
        onClick: function() {
          self.openUploadPopup(index, viewName);
        }
      }, {}, {});

      var lblClick = new voltmx.ui.Label({
        id: "lblClick" + i,
        centerY: "50%",
        centerX: "50%",
        text: "Click",
        skin: "sknLblDubai231f2018pxMedium"
      }, {}, {});

      flxClick.add(lblClick);
      flxItem.add(flxImgItem, lblItemName, flxClick);
      flxRow.add(flxItem);
    }

    self.view.flxDynamicImageViews.add(flxRow);
    
    self.getImagesFilesById();
  },

  openUploadPopup: function(index, viewName) {
    this.currentIndex = index;
    this.currentViewName = viewName; // ✅ already correct
    this.view.flxChooseFileTakePhoto.setVisibility(true);
  },

  // ✅ AFTER GALLERY SELECT → STORE IMAGE FOR UI
  flxChooseFromLibraryOnClickAction: function () {
    var self = this;

    voltmx.phone.openMediaGallery(function (rawbytes) {
      if (!rawbytes) return;

      var base64Data = voltmx.convertToBase64(rawbytes);

      // ✅ store image for UI preview
      self.uploadedImages[self.currentIndex] = base64Data;

      self.updateImagePreview();

      var filefullname = "image_" + new Date().getTime() + ".jpg";

      self.fileDetails = [{
        "is_thumbnail": "false",
        "inspection_category": self.context.subCat,
        "inspection_subcategory": self.currentViewName,
        "filename": filefullname,
        "base64": base64Data
      }];

      self.view.flxChooseFileTakePhoto.setVisibility(false);
      self.uploadImages();

    }, {}, {
      action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
      format: voltmx.phone.MEDIA_DOCUMENT_RAW,
      mimetype: "image/*"
    });
  },

  // ✅ CAMERA PREVIEW ALSO
  camOnCaptureAction: function () {
    var rawBytes = this.view.flxChooseFileTakePhoto.camTakeAPhoto.rawBytes;
    if (!rawBytes) return;

    var base64Image = voltmx.convertToBase64(rawBytes);

    // ✅ store image for UI preview
    this.uploadedImages[this.currentIndex] = base64Image;

    this.updateImagePreview();

    this.fileDetails = [{
      filename: "captured_" + new Date().getTime() + ".jpg",
      base64: base64Image,
      is_thumbnail: "false",
      inspection_category: this.context.subCat,
      inspection_subcategory: this.currentViewName
    }];

    this.view.flxChooseFileTakePhoto.setVisibility(false);
    this.uploadImages();
  },

  // ✅ SHOW IMAGE IN UI
  updateImagePreview: function() {
    for (var i = 0; i < 5; i++) {
      var img = this.view["imgItem" + i];
      if (this.uploadedImages[i]) {
        img.base64 = this.uploadedImages[i]; // ✅ show image
      }
    }
  },

  uploadImages: function() {
    var self = this;

    ImageUploadAndDeletion.uploadImage(
      self.objectId,
      self.fileDetails,
      function(response, error){

        if(error){
          alert("Image upload failed");
          return;
        }

        if(response && response.message === "Success"){
          alert("Upload Successful");
        }
      }
    );
  },
  
  getImagesFilesById: function()
  {
     var self = this;
    voltmx.application.showLoadingScreen(null,"LoadingScreen",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);

    var serviceName = "fry_int_fleet";
    var integrationObj =  voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "get-images-files-by-id";
    var headers = 
        {
          "user_token": voltmx.store.getItem("getUserAccesstoken")
        }

    var data = 
        {
          "object_id": self.objectId
        }
    integrationObj.invokeOperation(operationName, headers, data, successCallback, failureCallback)

    function successCallback(response)
    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(response);
      if(response && response.records)
      {
        if(response.records.length > 0)
        {
         var subCat = self.context.subCat || "";
        var imageRecords  = response.records.filter(function(record) {
    return record.category === "Images" &&  record.inspection_category === subCat;
});
          var lastTwoImages = imageRecords.slice(-5); // safest way

      if (lastTwoImages.length > 0 && self.view["imgItem0"]) {
    self.view["imgItem0"].src = lastTwoImages[0].file_url || "";
    self.view["lblClick0"].text = "Retake";
}

if (lastTwoImages.length > 1 && self.view["imgItem1"]) {
    self.view["imgItem1"].src = lastTwoImages[1].file_url || "";
    self.view["lblClick1"].text = "Retake";
}
     if (lastTwoImages.length > 2 && self.view["imgItem2"]) {
    self.view["imgItem2"].src = lastTwoImages[2].file_url || "";
    self.view["lblClick2"].text = "Retake";
}

if (lastTwoImages.length > 3 && self.view["imgItem3"]) {
    self.view["imgItem3"].src = lastTwoImages[3].file_url || "";
    self.view["lblClick3"].text = "Retake";
}
            if (lastTwoImages.length > 4 && self.view["imgItem4"]) {
    self.view["imgItem4"].src = lastTwoImages[4].file_url || "";
    self.view["lblClick4"].text = "Retake";
}

      
      
          
        }
        else
        {
          voltmx.print("no records");
        }
      }
      else
      {
        voltmx.print("Invalid response");
      }
    }

    function failureCallback(error)
    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);
    }
  }
});