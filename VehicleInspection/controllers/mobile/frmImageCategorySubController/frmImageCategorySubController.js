define({
    onNavigate: function(context) {
        var self = this;
        this.objectId = context.record.object_id;
        this.context = context;
        this.view.preShow = this.onPreShow.bind(this);

        this.uploadedImages = {};      // New uploads (base64) by index
        this.existingImages = [];      // Backend images
        this.currentIndex = null;
        this.currentViewName = "";
    },

    onPreShow: function() {
        var self = this;
        toggleFooterIcons(this.view, "frmImageCategorySub");

        this.fileDetails = [];
        this.view.lblSelectedvaluedata.text = this.context.record.model || "";
        this.view.lblCategoryValue.text = this.context.subCat || "";

        this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick =
            this.flxChooseFromLibraryOnClickAction.bind(this);
        this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture =
            this.camOnCaptureAction.bind(this);
        this.view.flxChooseFileTakePhoto.flxTakeAPhoto.onClick =
            this.camOnCaptureAction.bind(this);
        this.view.flxChooseFileTakePhoto.onClick = () => {
            self.view.flxChooseFileTakePhoto.setVisibility(false);
        };

        this.view.flxHeading.flxBack.onClick = this.onBackClick.bind(this);

        this.createUI();
        this.getImagesFilesById();
    },

    onBackClick: function() {
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
                        ImageUploadAndDeletion.deleteImage(tStore, function(res, err) {
                            if (!err && res && res.opstatus === 0) {
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
    },

    createUI: function() {
        var self = this;
        self.view.flxDynamicImageViews.removeAll();

        var subCatId = self.context.subCatId || "";
        var viewNames = [];

        switch (subCatId) {
            case "1": viewNames = ["Front View", "Rear View", "Side View", "Interior", "Odometer"]; break;
            case "2": viewNames = ["Front Damage", "Rear Damage", "Left Side Damage", "Right Side Damage", "Close-up Damage"]; break;
            case "3": viewNames = ["Engine Bay", "Battery", "Radiator", "Underbody", "Exhaust"]; break;
            case "4": viewNames = ["RC Document", "Insurance", "PUC Certificate", "Invoice", "Other Docs"]; break;
            default:  viewNames = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5"]; break;
        }

        // Main dynamic container with autogrow
        var flxMain = new voltmx.ui.FlexContainer({
            id: "flxMainImages",
            width: "100%",
            height: "preferred",
            top: "10dp",
            autogrowMode: voltmx.flex.AUTOGROW_HEIGHT,   // ← Important fix
            layoutType: voltmx.flex.FLOW_VERTICAL,
            skin: "sknFlxTransparent"
        }, {}, {});

        var itemsPerRow = 2;
        var totalItems = viewNames.length;

        for (var row = 0; row < Math.ceil(totalItems / itemsPerRow); row++) {
            var flxRow = new voltmx.ui.FlexContainer({
                id: "flxImageRow_" + row,
                width: "100%",
                height: "230dp",
                layoutType: voltmx.flex.FREE_FORM
            }, {}, {});

            for (var col = 0; col < itemsPerRow; col++) {
                var index = row * itemsPerRow + col;
                if (index >= totalItems) break;

                let currentIndex = index;
                let viewName = viewNames[index] || "Image " + (index + 1);

                var flxItem = self.createImageBox(currentIndex, viewName);
                flxRow.add(flxItem);
            }

            flxMain.add(flxRow);
        }

        self.view.flxDynamicImageViews.add(flxMain);
    },

    createImageBox: function(index, viewName) {
        var self = this;

        var flxItem = new voltmx.ui.FlexContainer({
            id: "flxItem" + index,
            height: "220dp",
            width: "48%",
            left: (index % 2 === 0) ? "1%" : "51%",
            skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
            layoutType: voltmx.flex.FREE_FORM
        }, {}, {});

        var flxImgItem = new voltmx.ui.FlexContainer({
            id: "flxImgItem" + index,
            height: "100dp",
            width: "90%",
            centerX: "50%",
            top: "10dp",
            skin: "sknFlxEFEFEFRadius5px",
            clipBounds: true
        }, {}, {});

        var imgItem = new voltmx.ui.Image2({
            id: "imgItem" + index,
            height: "100%",
            width: "100%",
            centerX: "50%",
            centerY: "50%",
            src: "defaulticon.png",
            dynamicImageLoading: true,
            "imageWhileDownloading": "loading.gif"
        }, { 
            imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS 
        }, {});

        flxImgItem.add(imgItem);

        var lblItemName = new voltmx.ui.Label({
            id: "lblItemName" + index,
            centerX: "50%",
            top: "120dp",
            text: viewName,
            skin: "sknLblDubai231f2020pxRegular"
        }, {}, {});

        var flxClick = new voltmx.ui.FlexContainer({
            id: "flxClick" + index,
            height: "40dp",
            width: "90%",
            centerX: "50%",
            bottom: "12dp",
            skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
            onClick: function() {
                self.openUploadPopup(index, viewName);
            }
        }, {}, {});

        var lblClick = new voltmx.ui.Label({
            id: "lblClick" + index,
            centerY: "50%",
            centerX: "50%",
            text: "Click",
            skin: "sknLblDubai231f2018pxMedium"
        }, {}, {});

        flxClick.add(lblClick);
        flxItem.add(flxImgItem, lblItemName, flxClick);

        return flxItem;
    },

    openUploadPopup: function(index, viewName) {
        this.currentIndex = index;
        this.currentViewName = viewName;
        this.view.flxChooseFileTakePhoto.setVisibility(true);
    },

//     updateImagePreview: function() {
//         for (var i = 0; i < 5; i++) {
//             var imgWidget = this.view["imgItem" + i];
//             var lblClickWidget = this.view["lblClick" + i];

//             if (!imgWidget) continue;

//             if (this.uploadedImages[i]) {
//                 imgWidget.base64 = this.uploadedImages[i];
//                 if (lblClickWidget) lblClickWidget.text = "Retake";
//             }
//             else if (this.existingImages[i] && this.existingImages[i].file_url) {
//                 imgWidget.src = this.existingImages[i].file_url;
//                 if (lblClickWidget) lblClickWidget.text = "Retake";
//             }
//             else {
//                 imgWidget.src = "defaulticon.png";
//                 if (lblClickWidget) lblClickWidget.text = "Click";
//             }
//         }
//     },
  
//   updateImagePreview: function () {
//     for (var i = 0; i < 5; i++) {

//         var imgWidget = this.view["imgItem" + i];
//         var lblClickWidget = this.view["lblClick" + i];
//         var lblItemName = this.view["lblItemName" + i];

//         if (!imgWidget || !lblItemName) continue;

//         var subCatKey = lblItemName.text || "";
//         var matchedImages = this.groupedImages[subCatKey] || [];

//         // Priority 1: newly uploaded image
//         if (this.uploadedImages[i]) {
//             imgWidget.base64 = this.uploadedImages[i];
//             if (lblClickWidget) lblClickWidget.text = "Retake";
//         }
//         // Priority 2: existing mapped image
//         else if (matchedImages.length > 0 && matchedImages[0].file_url) {
//             imgWidget.src = matchedImages[0].file_url;

//             // remove used image so next slot gets next image
//             matchedImages.shift();

//             if (lblClickWidget) lblClickWidget.text = "Retake";
//         }
//         // Default
//         else {
//             imgWidget.src = "defaulticon.png";
//             if (lblClickWidget) lblClickWidget.text = "Click";
//         }
//     }
// },
  
  updateImagePreview: function () {
    for (var i = 0; i < 5; i++) {

        var imgWidget = this.view["imgItem" + i];
        var lblClickWidget = this.view["lblClick" + i];
        var lblItemName = this.view["lblItemName" + i];

        if (!imgWidget || !lblItemName) continue;

        var key = lblItemName.text || "";
        var matchedImages = this.groupedImages[key] || [];

        // ✅ uploaded image (fixed)
        if (this.uploadedImages && this.uploadedImages[key]) {
            imgWidget.base64 = this.uploadedImages[key];
            if (lblClickWidget) lblClickWidget.text = "Retake";
        }
        // existing image
        else if (matchedImages.length > 0 && matchedImages[0].file_url) {
            imgWidget.src = matchedImages[0].file_url;
            matchedImages.shift();
            if (lblClickWidget) lblClickWidget.text = "Retake";
        }
        else {
            imgWidget.src = "defaulticon.png";
            if (lblClickWidget) lblClickWidget.text = "Click";
        }
    }
},

    flxChooseFromLibraryOnClickAction: function() {
        var self = this;
        voltmx.phone.openMediaGallery(function(rawbytes) {
            if (!rawbytes) return;

            var base64Data = voltmx.convertToBase64(rawbytes);
//             self.uploadedImages[self.currentIndex] = base64Data;
          if (!self.uploadedImages) self.uploadedImages = {};

self.uploadedImages[self.currentViewName] = base64Data;

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

    camOnCaptureAction: function() {
      var self = this;
        var rawBytes = this.view.flxChooseFileTakePhoto.camTakeAPhoto.rawBytes;
        if (!rawBytes) return;

        var base64Image = voltmx.convertToBase64(rawBytes);
//         this.uploadedImages[this.currentIndex] = base64Image;
      
       if (!self.uploadedImages) self.uploadedImages = {};

self.uploadedImages[self.currentViewName] = base64Image;

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

    uploadImages: function() {
        var self = this;
        ImageUploadAndDeletion.uploadImage(
            self.objectId,
            self.fileDetails,
            function(response, error) {
                if (error) {
                    alert("Image upload failed");
                    return;
                }
                if (response && response.message === "Success") {
                    alert("Upload Successful");
                } else {
                    alert("Upload failed");
                }
            }
        );
    },

    getImagesFilesById: function() {
        var self = this;
        voltmx.application.showLoadingScreen(null, "Loading Images...", 
            constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, null);

        var integrationObj = voltmx.sdk.getCurrentInstance().getIntegrationService("fry_int_fleet");

        integrationObj.invokeOperation(
            "get-images-files-by-id",
            { "user_token": voltmx.store.getItem("getUserAccesstoken") },
            { "object_id": self.objectId,
               "inspection_images": "true"
            },
            function(response) {
                voltmx.application.dismissLoadingScreen();

                if (response && response.records && response.records.length > 0) {
                    var subCat = self.context.subCat || "";
                    self.existingImages = response.records.filter(function(record) {
                        return record.category === "Images" && 
                               record.inspection_category === subCat;
                    });
                  
                  self.groupedImages = {};

self.existingImages.forEach(function(item) {
    var key = item.inspection_subcategory || "NA";

    if (!self.groupedImages[key]) {
        self.groupedImages[key] = [];
    }

    // limit to 5 per subcategory
    if (self.groupedImages[key].length < 5) {
        self.groupedImages[key].push(item);
    }
});
                } else {
                    self.existingImages = [];
                }

                self.updateImagePreview();
            },
            function(error) {
                voltmx.application.dismissLoadingScreen();
                voltmx.print("Error loading images: " + JSON.stringify(error));
                self.existingImages = [];
                self.updateImagePreview();
            }
        );
    }
});