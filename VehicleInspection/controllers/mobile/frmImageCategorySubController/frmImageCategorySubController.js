define({ 

 onNavigate: function()
  {
    this.createUI();
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmImageCategorySub");
    this.view.flxChooseFileTakePhoto.onClick = () => {
      this.view.flxChooseFileTakePhoto.setVisibility(false);
    }
    this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
     this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxChooseFileTakePhoto.onClick = this.camOnCaptureAction.bind(this);
  },
  
  createUI: function()
  {
    
    this.view.flxDynamicImageViews.removeAll();
    
    for(var i=0;i<8;i++)
      {
        var flxRow;
        if(i%2 === 0){
     flxRow = new voltmx.ui.FlexContainer({
      
      id: "flxRow" + i,
      height: "220dp",
      width: "100%",
      top: "10dp",
      layoutType: voltmx.flex.FREE_FORM
      
      
    }, {}, {})
    
    }
        
        var flxItem = new voltmx.ui.FlexContainer({
      
      id: "flxItem" + i,
      height: "100%",
      width: "48%",
      left: (i%2 === 0) ? "0dp":"",
      right: (i%2 === 0) ? "" : "0dp",
      skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
      layoutType: voltmx.flex.FREE_FORM
      
      
    }, {}, {})
        
             var flxImgItem = new voltmx.ui.FlexContainer({
      
      id: "flxImgItem" + i,
       height: "100dp",
      width: "90%",
      centerX: "50%",
      skin: "sknFlxEFEFEFRadius5px",
        top: "10dp",
      layoutType: voltmx.flex.FREE_FORM,
      clipBounds: true
      
      
    }, {}, {})
        
      var imgItem = new voltmx.ui.Image2({
      
      id: "imgItem" + i,
      height: "100%",
      width: "100%",
      centerX: "50%",
      centerY: "50%",
      src: "defaulticon.png"

    }, {imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS}, {})
      
      flxImgItem.add(imgItem);
      
      var lblItemName = new voltmx.ui.Label({
      
      id: "lblItemName" + i,
//       height: "100%",
//       width: "48%",
       centerX: "50%",
       text: "Item" + i,
       top: "120dp",
      skin: "sknLblDubai231f2020pxRegular",
    }, {}, {});
        
           var flxClick = new voltmx.ui.FlexContainer({
      
      id: "flxClick" + i,
      height: "40dp",
      width: "90%",
      centerX: "50%",
      bottom: "12dp",
      skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
      layoutType: voltmx.flex.FREE_FORM,
      onClick: this.openUploadPopup.bind(this,i)
    }, {}, {})
           
            var imgCamera = new voltmx.ui.Image2({
      
      id: "imgCamera" + i,
      height: "15dp",
      width: "15dp",
      left: "25%",
      centerY: "50%",
      src: "cameraclick.png"

    }, {}, {})
           
        var lblClick = new voltmx.ui.Label({
      
      id: "lblClick" + i,
//       height: "100%",
//       width: "48%",
        centerY: "50%",
        left: "48%",
       text: "Click",
      skin: "sknLblDubai231f2018pxMedium",
    }, {}, {});
        
        flxClick.add(imgCamera,lblClick); 
        
        flxItem.add(flxImgItem,lblItemName,flxClick);
        
        
        flxRow.add(flxItem);
        
        if(i%2 !== 0)
        this.view.flxDynamicImageViews.add(flxRow);
        
        
    
  }
  },
  
  openUploadPopup: function(index)
  {
    this.index = index;
    this.view.flxChooseFileTakePhoto.setVisibility(true);
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
      if (self.view["imgItem" + index]) {
  self.view["imgItem" + index].base64 = base64Data;
}
      if (self.view["imgCamera" + index]) {
  self.view["imgCamera" + index].src = "retake.png";
}
      if (self.view["lblClick" + index]) {
  self.view["lblClick" + index].text = "Retake";
}
//       self.fleetDocUpload();

      self.view.flxChooseFileTakePhoto.setVisibility(false);
      

      voltmx.print(" Base64 Image Uploaded: " + base64Data);
    }
  }.bind(this), {}, {
    action: voltmx.phone.ACTION_OPEN_MEDIA_GALLERY,
    format: voltmx.phone.MEDIA_DOCUMENT_RAW,
    mimetype: "image/*"
  });
},
  
  camOnCaptureAction: function () {
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

//     this.fleetDocUpload();

    this.view.flxChooseFileTakePhoto.setVisibility(false);
  
  } else {
    voltmx.print("No image captured from camera.");
  }
},


 });