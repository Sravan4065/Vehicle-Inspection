// define({
//   onNavigate: function(context) {
//     var self = this;
// //     this.adjustRTL();
// //     this.lovId = context.lovId;
//     this.objectId = context.record.object_id;
//     this.context = context;
//     this.view.preShow = this.onPreShow.bind(this);
//     this.flxSelectedItems = {};
//     this.inspectionData = {};
//     this.currentViewName = ""; // to store "Front View" or "Rear View"
//   },

//   onPreShow: function() {
//     var self = this;
//     toggleFooterIcons(this.view, "frmImageCategorySub");
//     this.fileDetails = [];
//     this.view.lblSelectedvaluedata.text = this.context.record.model;
//     this.view.lblCategoryValue.text = this.context.subCat;
//     this.view.flxChooseFileTakePhoto.onClick = () => {
//       this.view.flxChooseFileTakePhoto.setVisibility(false);
//     };

//     this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
//     this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture = this.camOnCaptureAction.bind(this);
//     this.view.flxChooseFileTakePhoto.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);

// //     this.view.flxAddDetailsAndUpload.flxRetake.onClick = () => {
// //       self.view.flxChooseFileTakePhoto.setVisibility(true);
// //     };

//     this.view.flxChooseFileTakePhoto.onClick = () => {
//       self.view.flxChooseFileTakePhoto.setVisibility(false);
//     };

// //     this.view.flxAddDetailsAndUpload.setVisibility(false);

//     // Back button with discard check
//     this.view.flxHeading.flxBack.onClick = () => {
//       var tStore = voltmx.store.getItem("tStore");
//       if (tStore && tStore.length > 0) {
//         var alertConfig = {
//           message: "Do you want to discard the changes?",
//           alertType: constants.ALERT_TYPE_CONFIRMATION,
//           alertTitle: "Confirmation",
//           yesLabel: "Yes",
//           noLabel: "No",
//           alertHandler: function(response) {
//             if (response) {
//               ImageUploadAndDeletion.deleteImage(tStore, function(response, error) {
//                 if (error) {
//                   alert("Image deletion failed");
//                   voltmx.print("Delete Error: " + JSON.stringify(error));
//                   return;
//                 }
//                 if (response && response.opstatus === 0) {
//                   voltmx.store.setItem("tStore", "");
//                   NavigationManager.pop();
//                 } else {
//                   alert("Failed to delete image");
//                 }
//               });
//             }
//           }
//         };
//         voltmx.ui.Alert(alertConfig, {});
//       } else {
//         NavigationManager.pop();
//       }
//     };
//   this.createUI();
//   },

//   createUI: function() {
//     var self = this;
//     self.view.flxDynamicImageViews.removeAll();

//     // Hardcoded for 2 views: Front View and Rear View
//     var viewNames = ["Front View", "Rear View"];

//     for (var i = 0; i < 2; i++) {
//       var viewName = viewNames[i];

//       // Create row container (only one row needed for 2 items)
//       var flxRow = new voltmx.ui.FlexContainer({
//         id: "flxRow" + i,
//         height: "220dp",
//         width: "100%",
//         top: "10dp",
//         layoutType: voltmx.flex.FREE_FORM
//       }, {}, {});

//       var flxItem = new voltmx.ui.FlexContainer({
//         id: "flxItem" + i,
//         height: "100%",
//         width: "48%",
//         left: (i === 0) ? "0dp" : "",
//         right: (i === 0) ? "" : "0dp",
//         skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
//         layoutType: voltmx.flex.FREE_FORM
//       }, {}, {});

//       var flxImgItem = new voltmx.ui.FlexContainer({
//         id: "flxImgItem" + i,
//         height: "100dp",
//         width: "90%",
//         centerX: "50%",
//         top: "10dp",
//         skin: "sknFlxEFEFEFRadius5px",
//         layoutType: voltmx.flex.FREE_FORM,
//         clipBounds: true
//       }, {}, {});

//       var imgItem = new voltmx.ui.Image2({
//         id: "imgItem" + i,
//         height: "100%",
//         width: "100%",
//         centerX: "50%",
//         centerY: "50%",
//         src: "defaulticon.png"
//       }, { imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS }, {});

//       flxImgItem.add(imgItem);

//       var lblItemName = new voltmx.ui.Label({
//         id: "lblItemName" + i,
//         centerX: "50%",
//         top: "120dp",
//         text: viewName,  // ← Changed: "Front View" / "Rear View"
//         skin: "sknLblDubai231f2020pxRegular"
//       }, {}, {});

//       var flxClick = new voltmx.ui.FlexContainer({
//         id: "flxClick" + i,
//         height: "40dp",
//         width: "90%",
//         centerX: "50%",
//         bottom: "12dp",
//         skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
//         layoutType: voltmx.flex.FREE_FORM,
//         onClick: function() {
//           self.openUploadPopup(i, viewName);  // Pass index and view name
//         }
//       }, {}, {});

//       var imgCamera = new voltmx.ui.Image2({
//         id: "imgCamera" + i,
//         height: "15dp",
//         width: "15dp",
//         left: "25%",
//         centerY: "50%",
//         src: "cameraclick.png"
//       }, {}, {});

//       var lblClick = new voltmx.ui.Label({
//         id: "lblClick" + i,
//         centerY: "50%",
//         left: "48%",
//         text: "Click",
//         skin: "sknLblDubai231f2018pxMedium"
//       }, {}, {});

//       flxClick.add(imgCamera, lblClick);
//       flxItem.add(flxImgItem, lblItemName, flxClick);
//       flxRow.add(flxItem);

//       self.view.flxDynamicImageViews.add(flxRow);
//     }
//   },

//   openUploadPopup: function(index, viewName) {
//     this.currentIndex = index;
//     this.currentViewName = viewName;  // Store current view name for fileDetails
//     this.view.flxChooseFileTakePhoto.setVisibility(true);
//   },

//   flxChooseFromLibraryOnClickAction: function () {
//     var self = this;
//     voltmx.phone.openMediaGallery(function (rawbytes) {
//       if (rawbytes) {
//         voltmx.print("JsonRawBytes: " + JSON.stringify(rawbytes));
//         var filename = "";
//         try {
//           var resourcePath = rawbytes.getResourcePath && rawbytes.getResourcePath();
//           if (resourcePath) {
//             var normalizedPath = resourcePath.replace(/\\/g, "/");
//             filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
//             if (!filename || filename.trim() === "") {
//               filename = "image_from_gallery_" + new Date().getTime();
//             }
//           } else {
//             filename = "image_from_gallery_" + new Date().getTime();
//           }
//         } catch (e) {
//           voltmx.print("Error getting resource path: " + e.message);
//           filename = "image_from_gallery_" + new Date().getTime();
//         }
//         var base64Data = voltmx.convertToBase64(rawbytes);
//         var sizeInBytes = self.estimateBase64Size(base64Data);
//         var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
//         if (sizeInBytes > 10 * 1024 * 1024) {
//           alert("Image too large. Please select an image smaller than 10 MB.");
//           return;
//         }
//         var filetype = detectFileType(base64Data) || ".jpg";
//         var filefullname = filename + filetype;

//         self.fileDetails = [];
//         self.fileDetails.push({
//           "is_thumbnail": "false",
//           "inspection_category": self.context.subCat || "Tyres Condition",  // from context
//           "inspection_subcategory": self.currentViewName || "Front View",   // ← Now uses current view name
//           "filename": filefullname,
//           "base64": base64Data
//         });

// //         self.selectedPdfBase64 = base64Data;
//         self.view.flxChooseFileTakePhoto.setVisibility(false);
//        self.uploadImages();
//         voltmx.print("Base64 Image Uploaded: " + base64Data);
//       }
//       else
//         {
//           voltmx.print('no raw bytes');
//         }
//     }.bind(this), {}, {
//       action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
//       format: voltmx.phone.MEDIA_DOCUMENT_RAW,
//       mimetype: "image/*"
//     });
    
    
//   },

//   camOnCaptureAction: function () {
//     var self = this;
//     var rawBytes = this.view.flxChooseFileTakePhoto.camTakeAPhoto.rawBytes;
//     if (rawBytes) {
//       var filename = "";
//       try {
//         var resourcePath = rawBytes.getResourcePath && rawBytes.getResourcePath();
//         if (resourcePath) {
//           var normalizedPath = resourcePath.replace(/\\/g, "/");
//           filename = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
//           if (!filename || filename.trim() === "") {
//             filename = "captured_image_" + new Date().getTime();
//           }
//         } else {
//           filename = "captured_image_" + new Date().getTime();
//         }
//       } catch (e) {
//         voltmx.print("Error extracting filename: " + e.message);
//         filename = "captured_image_" + new Date().getTime();
//       }

//       var base64Image = voltmx.convertToBase64(rawBytes);
//       var sizeInBytes = this.estimateBase64Size(base64Image);
//       var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
//       if (sizeInBytes > 10 * 1024 * 1024) {
//         alert("Image too large. Please capture an image smaller than 10 MB.");
//         return;
//       }
//       var filetype = detectFileType(base64Image) || ".jpg";
//       var filefullname = filename + filetype;

//       this.fileDetails = [];
//       this.fileDetails.push({
//         filename: filefullname,
//         base64: base64Image
//       });

//       // Update fileDetails with subcategory (same as gallery)
//       this.fileDetails[0].is_thumbnail = "false";
//       this.fileDetails[0].inspection_category = self.context.subCat || "Tyres Condition";
//       this.fileDetails[0].inspection_subcategory = self.currentViewName || "Front View";  // ← Now uses current view name
      
// //       this.selectedPdfBase64 = base64Image;
//       self.view.flxChooseFileTakePhoto.setVisibility(false);
//       self.uploadImages();
//     } else {
//       voltmx.print("No image captured from camera.");
//     }
    
    
//   },

//   estimateBase64Size: function (base64Str) {
//     if (!base64Str || typeof base64Str !== "string") {
//       return 0;
//     }
//     let padding = (base64Str.match(/=*$/) || [""])[0].length;
//     return Math.floor((base64Str.length * 3) / 4) - padding;
//   },

//    uploadImages: function()
//   {
//     var self = this;

//     ImageUploadAndDeletion.uploadImage(
//       self.objectId,
//       self.fileDetails,
//       function(response, error){

//         if(error){
//           alert("Image upload failed");
//           return;
//         }
//         if(response){
//           if(response.message === "Success"){
// //             self.view.flxAddDetailsAndUpload.setVisibility(false);
//             alert(response.message || "Upload Successful");
//             var parsed = JSON.parse(response.response || "[]");

//             if(parsed && parsed.length > 0){

//               var item = parsed[0];

//               var payload = JSON.parse(item.object_image_payload || "{}");
//               var imageLog = JSON.parse(item.object_image_loged_result || "{}");
//               var index = self.currentIndex;
//               if (typeof index === "undefined" || !self.records[index]) {
//                 voltmx.print("Error: currentIndex is undefined or invalid");
//                 return;
//               }

// //               var record = self.records[index];
// //               var id = record.id;

// //               if(!self.inspectionData){
// //                 self.inspectionData = {};
// //               }

// //               if(!self.inspectionData[id]){
// //                 self.inspectionData[id] = {
// //                   id: Number(id),
// //                   insp_pac_lov_id: Number(record.insp_pac_lov_id),
// //                   item_name: record.item_name,
// //                   notes: self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text,
// //                   repair_estimate_aed: Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text),
// //                   image_url_id: imageLog.id
// //                 };
// //               }
// //               else
// //               {
// //                 self.inspectionData[id].notes = self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text;
// //                 self.inspectionData[id].repair_estimate_aed = Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text);
// //                 self.inspectionData[id].image_url_id = imageLog.id;
// //               }

//               // self.inspectionData[id].image_url_id = imageLog.id;

// //               self.inspectionData[id].__newImageThisSession = true;

//               var obj = {
//                 file_name: payload.file_name,
//                 file_url: payload.file_url,
//                 object_id: payload.object_id,
//                 image_id: imageLog.id
//               };

//               if(!this.tempStore){
//                 this.tempStore = [];
//               }


//               this.tempStore.push(obj);

//               voltmx.store.setItem("tStore",this.tempStore);

//               voltmx.print("Temp Store: " + JSON.stringify(this.tempStore));
//             }
//           }
//           else{
//             if(response.response)
//             {
//               var parsed = JSON.parse(response.response || "[]");
//               var errCode = parsed[0] && parsed[0].error_code;

//               if(errCode == 409){
//                 alert("File already exists");
//               }
//               else
//               {
//                 alert("Failed");
//               }
//             }
//           }
//         }
//         else
//         {
//           alert("Invalid response");
//         }
//       }
//     );
//   },
// });


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

  // ✅ FIXED SIDE-BY-SIDE UI
  createUI: function() {
    var self = this;
    self.view.flxDynamicImageViews.removeAll();

    var viewNames = ["Front View", "Rear View"];

    // 🔥 Only ONE ROW
    var flxRow = new voltmx.ui.FlexContainer({
      id: "flxRow",
      height: "220dp",
      width: "100%",
      top: "10dp",
      layoutType: voltmx.flex.FREE_FORM
    }, {}, {});

    for (var i = 0; i < 2; i++) {
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
        src: "defaulticon.png"
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
    for (var i = 0; i < 2; i++) {
      var img = this.view["imgItem" + i];
      if (this.uploadedImages[i]) {
        img.base64 = this.uploadedImages[i]; // ✅ show image
      }
    }
  },

  // 🔥 YOUR EXISTING LOGIC (UNCHANGED)
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
  }
});