
define({
   onNavigate: function(context)
  {
    var self = this;
    this.lovId = context.lovId;
    this.objectId = context.object_id;
    this.resetFormData();
    this.view.preShow = this.onPreShow.bind(this);

    // Helper added for fresh vs existing records
    this.getRecordKey = function(record) {
        if (!record) return null;
        // Existing inspected record → use real numeric ID
        if (record.id && record.id !== "" && record.id !== null) {
            return Number(record.id);
        }
        // Fresh vehicle (no inspection yet) → use stable string key based on position
        return "new_" + (record.position || "");
    };
  },
  
  resetFormData: function() {
    var self = this;
    self.records = [];
    self.inspectionData = {};
    self.currentRecord = null;
    self.currentIndex = null;
    self.tempStore = [];
    self.index = null; // used for upload popup
    
    // Clear any stored temp images for this form
    voltmx.store.setItem("tStore", "");
  },

  createButtons: function(records) {
    var self = this;
    self.view.flxDirections.removeAll();
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var btn = new voltmx.ui.Button({
            "height": "30dp",
            "id": "btnFrontleft" + i,
            "isVisible": true,
            "left": "5%",
            "skin": (i === 0) ? "sknBtnd3243018px" : "sknBtnebebeb18px",
            "text": record.position || "Position " + (i + 1),
            "top": "0",
            "width": "25%",
            "onClick": (function(currentRecord, currentIndex) {
                return function() {
                    self.navToButtonSpecific(currentRecord, currentIndex);
                };
            })(record, i)
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        self.view.flxDirections.add(btn);
    }
    if (records.length > 0) {
        self.navToButtonSpecific(records[0], 0);
        
    }
},

// navToButtonSpecific: function(record, index) {
//     var self = this;
//     self.record = record;
//     var widgets = self.view.flxDirections.widgets();
//     for (var i = 0; i < widgets.length; i++) {
//         widgets[i].skin = "sknBtnebebeb18px";
//     }
//     self.view["btnFrontleft" + index].skin = "sknBtnd3243018px";

//     this.view.details.txbData.text = record.manufacturer || "";
//     this.view.details1.txbData.text = record.size || "";
//     this.view.details2.txbData.text = record.manufacture_date || "";
//     this.view.txsumreport3.text = record.notes || "";

//     var rating = parseInt(record.condition_rating || "0", 10);
//     for (var j = 1; j <= 5; j++) {
//         self.view["imgStar" + j].src = (j <= rating) ? "greenstar.png" : "ashstar.png";
//     }

//     self.currentRecord = record;
//     self.currentIndex = index;

//     if (record.file_url && record.file_url !== "") {
//         self.view.imgItem.src = record.file_url;
//     } else {
//         self.view.imgItem.src = "defaulticon.png";
//     }
//     self.view.lblItemName.text = record.position;
// },
navToButtonSpecific: function(record, index) {
    var self = this;
    var key = self.getRecordKey(record);
    
    // Use latest data from inspectionData (session), fallback to original record
    var displayData = (key && self.inspectionData && self.inspectionData[key]) 
                      ? self.inspectionData[key] 
                      : record;

    self.record = record;  // kept for upload & other references

    // Highlight active button
    var widgets = self.view.flxDirections.widgets();
    for (var i = 0; i < widgets.length; i++) {
        widgets[i].skin = "sknBtnebebeb18px";
    }
    self.view["btnFrontleft" + index].skin = "sknBtnd3243018px";

    // Populate ALL fields from latest data
    this.view.details.txbData.text = displayData.manufacturer || "";
    this.view.details1.txbData.text = displayData.size || "";
    this.view.details2.txbData.text = displayData.manufacture_date || "";
    this.view.txsumreport3.text = displayData.notes || "";   // ← Remarks now persist

    // Stars from latest rating
    var rating = parseInt(displayData.condition_rating || "0", 10);
    for (var j = 1; j <= 5; j++) {
        self.view["imgStar" + j].src = (j <= rating) ? "greenstar.png" : "ashstar.png";
    }

    self.currentRecord = record;
    self.currentIndex = index;

    // Image from latest uploaded URL
    if (displayData.file_url && displayData.file_url !== "") {
        self.view.imgItem.src = displayData.file_url;
    } else {
        self.view.imgItem.src = "defaulticon.png";
    }

    self.view.lblItemName.text = record.position;
},
callRate: function(context) {
    var self = this;
    var widgetId = context.id;
    var rating = parseInt(widgetId.replace("flxStar", ""), 10);

    for (var i = 1; i <= 5; i++) {
        self.view["imgStar" + i].src = (i <= rating) ? "greenstar.png" : "ashstar.png";
    }

    if (self.currentRecord) {
        var key = self.getRecordKey(self.currentRecord);
        if (!key) return;

        if (!self.inspectionData) {
            self.inspectionData = {};
        }
        if (!self.inspectionData[key]) {
            self.inspectionData[key] = {
                id: self.currentRecord.id ? Number(self.currentRecord.id) : undefined,
                insp_pac_lov_id: Number(self.currentRecord.insp_pac_lov_id),
                item_name: self.currentRecord.item_name,
                position: self.currentRecord.position,
                manufacturer: self.currentRecord.manufacturer || "",
                size: self.currentRecord.size || "",
                manufacture_date: self.currentRecord.manufacture_date || "",
                notes: self.currentRecord.notes || ""
            };
        }
        self.inspectionData[key].condition_rating = Number(rating);
    }
},

  onPreShow: function()
  {
    var self = this;
   toggleFooterIcons(this.view, "frmTyres");
   
    for (var n = 1; n <= 5; n++) {
        self.view["imgStar" + n].src = "ashstar.png";
    }
   var i=1;
while (i < 6) {
  this.view["flxStar" + i].onClick =
    this.callRate.bind(this);
  i++;
}
   this.view.details.txbData.setEnabled(false);
   this.view.details1.txbData.setEnabled(false);
    this.view.details2.txbData.setEnabled(false);
    this.view.txsumreport3.onTextChange = this.onNotesChange.bind(this);
    this.createUIBox();
    this.masterfleetspecvalues();
    this.invokeGetInspectionTyresList();
   
    this.view.details.flxArrow.onClick = () =>
    {
      this.view.details.flxSegment.setVisibility(!this.view.details.flxSegment.isVisible);
    }
   
    this.view.details1.flxArrow.onClick = () =>
    {
      this.view.details1.flxSegment.setVisibility(!this.view.details1.flxSegment.isVisible);
    }
   
    this.view.details2.flxArrow.onClick = () =>
    {
      this.view.details2.flxSegment.setVisibility(!this.view.details2.flxSegment.isVisible);
    }
   
    this.view.flxChooseFileTakePhoto.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(false);
    }
   
      this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
    this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxChooseFileTakePhoto.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
   
    this.view.details.segVehicleDetails.onRowClick = this.onRowClickSeg1.bind(this);
    this.view.details1.segVehicleDetails.onRowClick = this.onRowClickSeg2.bind(this);
    this.view.details2.segVehicleDetails.onRowClick = this.onRowClickSeg3.bind(this);
   
    this.view.flxHeadingWithButton.flxBack.onClick = () => {
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
              ImageUploadAndDeletion.deleteImage(tStore, function(response, error){
                if(error){
                  alert("Image deletion failed");
                  voltmx.print("Delete Error: " + JSON.stringify(error));
                  return;
                }
                if(response){
                  voltmx.print("Delete Response: " + JSON.stringify(response));
                  if(response.opstatus === 0){
                    voltmx.store.setItem("tStore","");
                    NavigationManager.pop();
                  }else{
                    alert("Failed to delete image");
                  }
                }else{
                  alert("Invalid response from server");
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
   
  this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.onSaveResponseClick.bind(this);
  if(this.view.saveresponse)
      {
        this.view.saveresponse.setVisibility(false);
      }
   
    this.view.saveresponse.btnClose.onClick = () =>
    {
      this.view.saveresponse.setVisibility(false);
    };
  },

  onRowClickSeg1: function() {
    var self = this;
    var selectedRowItems = self.view.details.segVehicleDetails.selectedRowItems;
    if (selectedRowItems && selectedRowItems[0] && self.currentRecord) {
        var key = self.getRecordKey(self.currentRecord);
        if (!key) return;
        var value = selectedRowItems[0].lblData || "";
        if (!self.inspectionData) self.inspectionData = {};
        if (!self.inspectionData[key]) {
            self.inspectionData[key] = {
                id: self.currentRecord.id ? Number(self.currentRecord.id) : undefined,
                insp_pac_lov_id: Number(self.currentRecord.insp_pac_lov_id),
                item_name: self.currentRecord.item_name,
                position: self.currentRecord.position,
                manufacturer: value,
                size: self.currentRecord.size || "",
                manufacture_date: self.currentRecord.manufacture_date || "",
                condition_rating: Number(self.currentRecord.condition_rating) || 0,
                notes: self.currentRecord.notes || ""
            };
        } else {
            self.inspectionData[key].manufacturer = value;
        }
        self.view.details.txbData.text = value;
        self.view.details.flxSegment.setVisibility(false);
    }
},
onRowClickSeg2: function() {
    var self = this;
    var selectedRowItems = self.view.details1.segVehicleDetails.selectedRowItems;
    if (selectedRowItems && selectedRowItems[0] && self.currentRecord) {
        var key = self.getRecordKey(self.currentRecord);
        if (!key) return;
        var value = selectedRowItems[0].lblData || "";
        if (!self.inspectionData) self.inspectionData = {};
        if (!self.inspectionData[key]) {
            self.inspectionData[key] = {
                id: self.currentRecord.id ? Number(self.currentRecord.id) : undefined,
                insp_pac_lov_id: Number(self.currentRecord.insp_pac_lov_id),
                item_name: self.currentRecord.item_name,
                position: self.currentRecord.position,
                manufacturer: self.currentRecord.manufacturer || "",
                size: value,
                manufacture_date: self.currentRecord.manufacture_date || "",
                condition_rating: Number(self.currentRecord.condition_rating) || 0,
                notes: self.currentRecord.notes || ""
            };
        } else {
            self.inspectionData[key].size = value;
        }
        self.view.details1.txbData.text = value;
        self.view.details1.flxSegment.setVisibility(false);
    }
},
onRowClickSeg3: function() {
    var self = this;
    var selectedRowItems = self.view.details2.segVehicleDetails.selectedRowItems;
    if (selectedRowItems && selectedRowItems[0] && self.currentRecord) {
        var key = self.getRecordKey(self.currentRecord);
        if (!key) return;
        var value = selectedRowItems[0].lblData || "";
        if (!self.inspectionData) self.inspectionData = {};
        if (!self.inspectionData[key]) {
            self.inspectionData[key] = {
                id: self.currentRecord.id ? Number(self.currentRecord.id) : undefined,
                insp_pac_lov_id: Number(self.currentRecord.insp_pac_lov_id),
                item_name: self.currentRecord.item_name,
                position: self.currentRecord.position,
                manufacturer: self.currentRecord.manufacturer || "",
                size: self.currentRecord.size || "",
                manufacture_date: value,
                condition_rating: Number(self.currentRecord.condition_rating) || 0,
                notes: self.currentRecord.notes || ""
            };
        } else {
            self.inspectionData[key].manufacture_date = value;
        }
        self.view.details2.txbData.text = value;
        self.view.details2.flxSegment.setVisibility(false);
    }
},

  createUIBox: function()
  {
    this.view.flxItems.removeAll();
   
     var flxItem = new voltmx.ui.FlexContainer({
     
      id: "flxItem",
      height: "230dp",
      width: "48%",
      left: "0%",
      top: "15dp",
      skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
      layoutType: voltmx.flex.FREE_FORM
     
     
    }, {}, {})
       
             var flxImgItem = new voltmx.ui.FlexContainer({
     
      id: "flxImgItem",
       height: "100dp",
      width: "90%",
      centerX: "50%",
      skin: "sknFlxEFEFEFRadius5px",
        top: "10dp",
      layoutType: voltmx.flex.FREE_FORM,
      clipBounds: true
     
     
    }, {}, {})
       
      var imgItem = new voltmx.ui.Image2({
     
      id: "imgItem",
      height: "100%",
      width: "100%",
      centerX: "50%",
      centerY: "50%",
      src: "defaulticon.png",
      dynamicImageLoading: true,
      "imageWhileDownloading": "loading.gif"
    }, {imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS}, {})
     
      flxImgItem.add(imgItem);
     
      var lblItemName = new voltmx.ui.Label({
     
      id: "lblItemName",
       centerX: "50%",
       text: "Item",
       top: "120dp",
      skin: "sknLblDubai231f2020pxRegular",
    }, {}, {});
       
           var flxClick = new voltmx.ui.FlexContainer({
     
      id: "flxClick",
      height: "40dp",
      width: "90%",
      centerX: "50%",
      bottom: "12dp",
      skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
      layoutType: voltmx.flex.FREE_FORM,
      onClick: this.openUploadPopup.bind(this)
    }, {}, {})
          
            var imgCamera = new voltmx.ui.Image2({
     
      id: "imgCamera",
      height: "15dp",
      width: "15dp",
      left: "25%",
      centerY: "50%",
      src: "cameraclick.png"
    }, {}, {})
          
        var lblClick = new voltmx.ui.Label({
     
      id: "lblClick",
        centerY: "50%",
        left: "48%",
       text: "Click",
      skin: "sknLblDubai231f2018pxMedium",
    }, {}, {});
       
        flxClick.add(imgCamera,lblClick);
       
        flxItem.add(flxImgItem,lblItemName,flxClick);
   
    this.view.flxItems.add(flxItem);
  },

  openUploadPopup: function()
  {
    this.view.flxChooseFileTakePhoto.setVisibility(true);
  },

    invokeGetInspectionTyresList: function()
  {
   
    var self = this;
voltmx.application.showLoadingScreen(null,"LoadingScreen",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);
   
    var serviceName = "fry_int_inspection";
   var integrationObj = voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "get-inspection-tyres-list";
    var headers =
        {
          "user_token": voltmx.store.getItem("getUserAccesstoken")
        }
   
    var data =
        {
         "insp_pac_lov_id": self.lovId,
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
              self.records = response.records;
              // Load ALL records into inspectionData (preserve existing values)
              // Fresh records (no id) are now safely keyed by "new_" + position
              self.inspectionData = {};
              self.records.forEach(function(record) {
                var key = self.getRecordKey(record);
                if (key) {
                  var hasRealId = !!(record.id && record.id !== "" && record.id !== null);
                  self.inspectionData[key] = {
                    id: hasRealId ? Number(record.id) : undefined,
                    insp_pac_lov_id: Number(record.insp_pac_lov_id),
                    item_name: record.item_name,
                    position: record.position,
                    manufacturer: record.manufacturer || "",
                    size: record.size || "",
                    manufacture_date: record.manufacture_date || "",
                    condition_rating: Number(record.condition_rating) || 0,
                    notes: record.notes || "",
                    repair_estimate_aed: Number(record.repair_estimate_aed) || 0,
                    image_url_id: record.image_url_id || null,
                    file_url: record.file_url || null
                  };
                }
              });
             
              self.createButtons(response.records);
              self.view.flxScrollContainer.setVisibility(true);
            }
          else
            {
              self.view.flxDirections.removeAll();
              self.view.flxScrollContainer.setVisibility(false);
              voltmx.print("no records");
            }
        }
      else
        {
          self.view.flxDirections.removeAll();
          self.view.flxScrollContainer.setVisibility(false);
          voltmx.print("Invalid response");
        }
    }
   
    function failureCallback(error)
    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);
    }
   
  },

   masterfleetspecvalues: function(){
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, { shouldShowLabelInBottom: "true", separatorHeight: 45, progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL, progressIndicatorColor: "Gray" });
      var serviceName = "fry_int_fleet";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "master-fleet-spec-values";
      var data = {
        "spec_list": "name;size;year_make",
        "widget_name": "fleet_specs_details;fleet_insp_details",
        "asset_definitions": "false",
        "auction_types": "false",
        "payment_methods": "false"
      }
      var headers = {
        "user_token": voltmx.store.getItem("getUserAccesstoken")
      };
      integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        self.operationSuccessFleet.bind(self),
        self.operationFailureFleet.bind(self)
      );
    });
  },
  operationSuccessFleet: function(response){
    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
    if(!response || !response.data || response.data.length === 0){
      voltmx.print("Invalid response");
      return;
    }
    var res = response.data[0];
    this.setSegmentData(this.view.details.segVehicleDetails, res.name);
    this.setSegmentData(this.view.details1.segVehicleDetails, res.size);
    this.setSegmentData(this.view.details2.segVehicleDetails, res.year_make);
  },
  operationFailureFleet: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

   setSegmentData: function(segment, data){
    var segData = [];
    data.forEach(function(item){
      segData.push({
        lblData: item.value
      });
    });
    segment.setData(segData);
  },

 flxChooseFromLibraryOnClickAction: function () {
    var self = this;
    voltmx.phone.openMediaGallery(function (rawbytes) {
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
        var sizeInBytes = self.estimateBase64Size(base64Data);
        var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        if (sizeInBytes > 10 * 1024 * 1024) {
          alert("Image too large. Please select an image smaller than 10 MB.");
          return;
        }
        var filetype = detectFileType(base64Data) || ".jpg";
        var filefullname = filename + filetype;
        this.fileDetails = [];
        this.fileDetails.push({
          "is_thumbnail":"false",
          "inspection_category": self.record.value_en,
          "inspection_subcategory":self.record.position,
          "filename": filefullname,
          "base64": base64Data
        });
        self.view.flxChooseFileTakePhoto.setVisibility(false);
        self.view.imgItem.base64 = base64Data;
        self.uploadImage();
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
          filename = "captured_image_" + new Date().getTime();
        }
      } catch (e) {
        voltmx.print("Error extracting filename: " + e.message);
        filename = "captured_image_" + new Date().getTime();
      }
      var base64Image = voltmx.convertToBase64(rawBytes);
      var sizeInBytes = this.estimateBase64Size(base64Image);
      var sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      if (sizeInBytes > 10 * 1024 * 1024) {
        alert(" Image too large. Please capture an image smaller than 10 MB.");
        return;
      }
      var filetype = detectFileType(base64Image) || ".jpg";
      var filefullname = filename + filetype;
      this.fileDetails = [];
      this.fileDetails.push({
        "is_thumbnail":"false",
          "inspection_category": self.record.value_en,
          "inspection_subcategory":self.record.position,
        filename: filefullname,
        base64: base64Image
      });
      self.view.imgItem.base64 = base64Image;
      self.view.flxChooseFileTakePhoto.setVisibility(false);
     
      self.uploadImage();
    } else {
      voltmx.print("No image captured from camera.");
    }
  },
  estimateBase64Size: function (base64Str) {
    if (!base64Str || typeof base64Str !== "string") {
      return 0;
    }
    let padding = (base64Str.match(/=*$/) || [""])[0].length;
    return Math.floor((base64Str.length * 3) / 4) - padding;
  },
uploadImage: function()
  {
    var self = this;
    ImageUploadAndDeletion.uploadImage(
      self.objectId,
      self.fileDetails,
      function(response, error){
        if(error){
          alert("Image upload failed");
          return;
        }
        if(response){
          if(response.message === "Success"){
            alert(response.message || "Upload Successful");
            var parsed = JSON.parse(response.response || "[]");
            if(parsed && parsed.length > 0){
              var item = parsed[0];
              var payload = JSON.parse(item.object_image_payload || "{}");
              var imageLog = JSON.parse(item.object_image_loged_result || "{}");
              var index = self.currentIndex;
              if (typeof index === "undefined" || !self.records[index]) {
                voltmx.print("Error: currentIndex is undefined or invalid");
                return;
              }
              var record = self.records[index];
              var key = self.getRecordKey(record);
              if (!key) {
                voltmx.print("Error: could not determine record key for image");
                return;
              }
              if(!self.inspectionData){
                self.inspectionData = {};
              }
              if(!self.inspectionData[key]){
                self.inspectionData[key] = {
                  id: record.id ? Number(record.id) : undefined,
                  insp_pac_lov_id: Number(record.insp_pac_lov_id),
                  image_url_id: imageLog.id,
                  position: record.position,
                  manufacturer: record.manufacturer,
                  manufacture_date: record.manufacture_date,
                  size: record.size,
                  condition_rating: Number(record.condition_rating),
                  notes: record.notes
                };
              }
              else
              {
                self.inspectionData[key].image_url_id = imageLog.id;
                self.inspectionData[key].file_url = payload.file_url || "";
              }
              var obj = {
                file_name: payload.file_name,
                file_url: payload.file_url,
                object_id: payload.object_id,
                image_id: imageLog.id
              };
              if(!this.tempStore){
                this.tempStore = [];
              }
              this.tempStore.push(obj);
              voltmx.store.setItem("tStore",this.tempStore);
              voltmx.print("Temp Store: " + JSON.stringify(this.tempStore));
            }
          }
          else{
            if(response.response)
            {
              var parsed = JSON.parse(response.response || "[]");
              var errCode = parsed[0] && parsed[0].error_code;
              if(errCode == 409){
                alert("File already exists");
              }
              else
              {
                alert("Failed");
              }
            }
          }
        }
        else
        {
          alert("Invalid response");
        }
      }
    );
  },
  onSaveResponseClick: function () {
    var self = this;
    
      var isValid = true;

for (var key in self.inspectionData) {

  var item = self.inspectionData[key];

//   var hasNotes = item.notes && item.notes.trim() !== "";
//   var hasEstimate = item.repair_estimate_aed && Number(item.repair_estimate_aed) > 0;
//   var hasImage = item.image_url_id;
  var hasRating = item.condition_rating && Number(item.condition_rating) > 0;

  if (!(hasRating)) {
    isValid = false;
    break;
  }
}
     if(isValid){
    var baseURL = voltmx.store.getItem("BASE_URL");
    if (baseURL && !baseURL.endsWith("/")) {
      baseURL += "/";
    }
    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var encodeVal = base64Encode(appkey + ":" + appsecret);
    var endUrl = "services/ms_inspection/api/v1/upsert-inspection-tyres";
    var url = baseURL + endUrl;
    var request = new voltmx.net.HttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Authorization", "Basic " + encodeVal);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("user_token", voltmx.store.getItem("getUserAccesstoken"));
    request.onReadyStateChange = function () {
      if (request.readyState === 4) {
        try {
          var response = JSON.parse(request.responseText);
          voltmx.print("API Response: " + JSON.stringify(response));
          if (response && response.error) {
            var errMsg = response.error.message || "Request failed";
            if (response.error.details) {
              var details = response.error.details;
              for (var key in details) {
                errMsg = details[key];
                break;
              }
            }
            alert(errMsg);
            return;
          }
          if (response && response.success) {
            var data = response.data || {};
            var updated = data.updated_count || 0;
            var created = data.created_count || 0;
            var total = data.total_count || 0;
            var details = data.inspection_details || [];
            var message = "";
            if (total > 1) {
              message = updated + " inspection item(s) updated successfully";
            }
            else if (total === 1) {
              message = "Inspection details saved successfully";
            }
            if (details.length > 0 && details[0].object_images) {
              message = "Inspection details and image uploaded successfully";
            }
            message = voltmx.i18n.getLocalizedString("Inspection details saved successfully");
            voltmx.store.setItem("tStore", "");
            self.tempStore = [];
            voltmx.print("tStore cleared after successful save");
            self.view.saveresponse.setVisibility(true);
            self.view.saveresponse.lblUPdatedsucessfully.text = message;
          }
        } catch (e) {
          voltmx.print("API Error: " + e);
        }
      }
    };
   
    var inspection_tyres = [];
    Object.keys(self.inspectionData).forEach(function(key) {
        var item = self.inspectionData[key];
      if (!item) return;
      var payloadItem = {
        id: item.id && item.id !== "" && item.id !== null ? Number(item.id) : undefined,
        insp_pac_lov_id: Number(item.insp_pac_lov_id),
        position: item.position || "",
//         condition_rating: item.condition_rating !== undefined ? Number(item.condition_rating) : undefined,
        notes: item.notes || "",
        manufacturer: item.manufacturer,
        manufacture_date: item.manufacture_date,
        size: item.size,
      };
      
      if (item.condition_rating !== undefined && Number(item.condition_rating) > 0) {
            payloadItem.condition_rating = Number(item.condition_rating);
        }
   
      if (item.image_url_id && !isNaN(Number(item.image_url_id)) && Number(item.image_url_id) > 0) {
        payloadItem.image_url_id = Number(item.image_url_id);
    }
      
        inspection_tyres.push(payloadItem);
    });
        var data =
            {
              "object_id": self.objectId,
              "inspection_tyres": inspection_tyres
            }
    request.send(JSON.stringify(data));
     }
        else
      {
        alert("All ratings are mandatory");
      }
  },
  
  onNotesChange: function() {
    var self = this;
    if (!self.currentRecord) return;

    var key = self.getRecordKey(self.currentRecord);
    if (!key) return;

    if (!self.inspectionData) self.inspectionData = {};
    if (!self.inspectionData[key]) {
        self.inspectionData[key] = {
            id: self.currentRecord.id ? Number(self.currentRecord.id) : undefined,
            insp_pac_lov_id: Number(self.currentRecord.insp_pac_lov_id),
            item_name: self.currentRecord.item_name,
            position: self.currentRecord.position,
            manufacturer: self.currentRecord.manufacturer || "",
            size: self.currentRecord.size || "",
            manufacture_date: self.currentRecord.manufacture_date || "",
            condition_rating: Number(self.currentRecord.condition_rating) || 0,
            notes: "",
            file_url: null
        };
    }

    self.inspectionData[key].notes = self.view.txsumreport3.text || "";
},
 });