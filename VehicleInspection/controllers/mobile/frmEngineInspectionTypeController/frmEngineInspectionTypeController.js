define({ 

  onNavigate: function(context)
  {
    var self = this;
    this.adjustRTL();
    this.lovId = context.lovId;
    this.objectId = context.object_id;
    //     this.createUI();
    this.view.preShow = this.onPreShow.bind(this);
    this.flxSelectedItems = {}; 
    this.inspectionData = {};

  },

  onPreShow: function()
  {
    var self = this;
    toggleFooterIcons(this.view, "frmEngineInspectionType"); 

    this.fileDetails = [];

    this.view.flxAddDetailsAndUpload.flxCloseAddDetails.onClick = () =>
    {
      self.view.flxAddDetailsAndUpload.setVisibility(false);
    }
    this.view.flxAddDetailsAndUpload.flxUploadImages.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(true);
    }
    
    if(this.view.saveresponse)
      {
        this.view.saveresponse.setVisibility(false);
      }
    
    this.view.saveresponse.btnClose.onClick = () =>
    {
      this.view.saveresponse.setVisibility(false);
    }

    this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
    this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxChooseFileTakePhoto.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);
    this.view.flxAddDetailsAndUpload.flxRetake.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(true);
    }
    this.view.flxChooseFileTakePhoto.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(false);
    }
    this.view.flxAddDetailsAndUpload.setVisibility(false);

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

            if (response) {   // YES clicked

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
            // NO clicked → do nothing (alert closes automatically)
          }
        };

        voltmx.ui.Alert(alertConfig, {});

      } else {
        NavigationManager.pop();
      }
    };
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.onSaveResponseClick.bind(this);
    this.view.flxAddDetailsAndUpload.btnSubmitUpload.onClick = this.onAddDetailsSubmit.bind(this);
    this.invokeGetInspectionDetailsList();
  },

  createUIWithRecords: function(records)
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    self.view.flxInspectionSubTypes.removeAll();
//     self.records = records;
    for(var i=0;i<records.length;i++){
      var basicProperties = {
        id: "flxItem"+i,
        isVisible: true,
        width: "90%",
        //   height: voltmx.flex.USE_PREFERRED_SIZE,
        height: "200dp",
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
          //     text: "Engine Upper Cover",
          text: records[i].item_name || "N/A",
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
      var recordRating = Number(records[i].rating) || 0;

      for (var rating = 1; rating <= 10; rating++) {


        var flxSkin =  recordRating >= rating ? "sknFlx61b35cBorder4px" : "sknFlxFFFFFFd2d5daBorderRadius4px";
        var labelSkin = recordRating >= rating ? "sknlblDubaiffffff16pxMedium" : "sknlblDubai231f2016pxMedium";
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
            //         skin: "sknFlxFFFFFFd2d5daBorderRadius4px",
            skin: flxSkin,
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
            //         skin: "sknlblDubai231f2016pxMedium",
            skin: labelSkin,
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
          onClick: this.showAddDetails.bind(this,records[i],i)
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


  onOptionSelect: function (index, selectedRating) {

    var record = this.records[index];
    var id = record.id;

    var flxItem = this.view["flxItem" + index];

    // Initialize storage object if not exists
    //     if (!this.selectedRatings) {
    //         this.selectedRatings = {};
    //     }

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
    //     this.selectedRatings[index] = selectedRating;

    if(!this.inspectionData){
      this.inspectionData = {};
    }

    if(!this.inspectionData[id]){
      this.inspectionData[id] = {
        id: Number(id),
        insp_pac_lov_id: Number(record.insp_pac_lov_id),
        item_name: record.item_name
      };
    }

    this.inspectionData[id].rating = selectedRating;


    this.view.forceLayout();
  },

  //   onAddDetailsSubmit: function()
  //   {
  //     var self = this;
  //     ImageUploadAndDeletion.uploadImage(self.objectId,self.fileDetails);
  //   },

  onAddDetailsSubmit: function()
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
            self.view.flxAddDetailsAndUpload.setVisibility(false);
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
              var id = record.id;

              if(!self.inspectionData){
                self.inspectionData = {};
              }

              if(!self.inspectionData[id]){
                self.inspectionData[id] = {
                  id: Number(id),
                  insp_pac_lov_id: Number(record.insp_pac_lov_id),
                  item_name: record.item_name,
                  notes: self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text,
                  repair_estimate_aed: Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text),
                  image_url_id: imageLog.id
                };
              }
              else
              {
                self.inspectionData[id].notes = self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text;
                self.inspectionData[id].repair_estimate_aed = Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text);
                self.inspectionData[id].image_url_id = imageLog.id;
              }

              // self.inspectionData[id].image_url_id = imageLog.id;

//               self.inspectionData[id].__newImageThisSession = true;

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

    var baseURL = voltmx.store.getItem("BASE_URL");

    if (baseURL && !baseURL.endsWith("/")) {

      baseURL += "/";

    }

    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");

    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var endUrl = "services/ms_inspection/api/v1/upsert-inspection-details";

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
                break; // first validation error
              }
            }

            alert(errMsg);
            return;
          }

          // -------- SUCCESS HANDLING ----------
          if (response && response.success) {

            var data = response.data || {};
            var updated = data.updated_count || 0;
            var created = data.created_count || 0;
            var total = data.total_count || 0;
            var details = data.inspection_details || [];

            var message = "";

            // Case 1 : Multiple inspection items saved
            if (total > 1) {
              message = updated + " inspection item(s) updated successfully";
            }

            // Case 2 : Single item updated
            else if (total === 1) {
              message = "Inspection details saved successfully";
            }

            // Case 3 : Check image upload
            if (details.length > 0 && details[0].object_images) {
              message = "Inspection details and image uploaded successfully";
            }
            voltmx.store.setItem("tStore", "");  
            self.tempStore = [];       
            
            // ====================== FIX START ======================
                    // After upsert, server returns the final id for every record
                    // (especially important for brand-new records that had no id).
                    // We update the local inspectionData so that any further changes
                    // in the same session send the correct id (exactly like a page reload).
//                     if (details && details.length > 0) {
//                         var detailMap = {};
//                         details.forEach(function (detail) {
//                             if (detail && detail.insp_pac_lov_id != null) {
//                                 detailMap[detail.insp_pac_lov_id] = detail;
//                             }
//                         });

//                         Object.keys(self.inspectionData).forEach(function (key) {
//                             var item = self.inspectionData[key];
//                             var lovId = item.insp_pac_lov_id;
//                             if (lovId != null && detailMap[lovId]) {
//                                 var returned = detailMap[lovId];
//                                 if (returned.id != null) {
//                                     item.id = Number(returned.id);   // now future saves will send this id
//                                 }
//                             }
//                         });
//                     }
                    // ====================== FIX END ======================
            self.invokeGetInspectionDetailsList();
            voltmx.print("tStore cleared after successful save");

            // Inside success block
//             Object.keys(self.inspectionData).forEach(function(key) {
//               delete self.inspectionData[key].__newImageThisSession;
//             });

//             alert(message);
            message = "Inspection details saved successfully";
            self.view.saveresponse.setVisibility(true);
            self.view.saveresponse.lblUPdatedsucessfully.text = message;
          }

        } catch (e) {

          voltmx.print("API Error: " + e);

        }

      }

    };
    
    var inspectionDetails = [];

    // Send only items user touched this session (i.e., in inspectionData)
    Object.keys(self.inspectionData).forEach(function(id) {
        var item = self.inspectionData[id];

        var payloadItem = {
            id: item.id && item.id !== "" && item.id !== null ? Number(item.id) : undefined,
            insp_pac_lov_id: Number(item.insp_pac_lov_id),
            item_name: item.item_name || "",
            rating: item.rating !== undefined ? Number(item.rating) : undefined,
            notes: item.notes || "",
            repair_estimate_aed: item.repair_estimate_aed ? Number(item.repair_estimate_aed) : undefined,
//             image_url_id: item.image_url_id || null   // send whatever is there (old or new)
        };
    
      if (item.image_url_id && !isNaN(Number(item.image_url_id)) && Number(item.image_url_id) > 0) {
        payloadItem.image_url_id = Number(item.image_url_id);
    }
       
        inspectionDetails.push(payloadItem);
    });

        var data = 
            {
              "object_id": self.objectId,
              "inspection_details": inspectionDetails
            }


    request.send(JSON.stringify(data));



  },

  showAddDetails: function(record,index)
  {
    var self = this;
    this.record = record;
    this.currentIndex = index;
    this.view.flxAddDetailsAndUpload.setVisibility(true);
    this.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text = record.repair_estimate_aed;
    this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text = record.notes || "";

    if(record.file_url){
      self.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(true);
      self.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(false);
      self.view.flxAddDetailsAndUpload.imgUploadedImg.imageWhileDownloading = "loading.gif";
      self.view.flxAddDetailsAndUpload.imgUploadedImg.src = record.file_url;

    }
    else
    {
      self.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(false);
      self.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(true);

    }

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
          "inspection_subcategory":self.record.item_name,
          "filename": filefullname,
          "base64": base64Data
        });

        //       self.selectedPdfFileName = filefullname;
        self.selectedPdfBase64 = base64Data;


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
        filename: filefullname,
        base64: base64Image
      });



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

  estimateBase64Size: function (base64Str) {
    if (!base64Str || typeof base64Str !== "string") {
      return 0; // or handle error gracefully
    }

    let padding = (base64Str.match(/=*$/) || [""])[0].length;
    return Math.floor((base64Str.length * 3) / 4) - padding;
  },

  invokeGetInspectionDetailsList: function()
  {

    var self = this;
    voltmx.application.showLoadingScreen(null,"LoadingScreen",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);

    var serviceName = "fry_int_inspection";
    var integrationObj =  voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "get-inspection-details-list";
    var headers = 
        {
          "user_token": voltmx.store.getItem("getUserAccesstoken")
        }

    var data = 
        {
          "master_lov_id": self.lovId,
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
          self.inspectionData = {};
        self.records.forEach(function(record) {
            var id = record.id;
            if (id) {  // only process existing records
                self.inspectionData[id] = {
                    id: Number(id),
                    insp_pac_lov_id: Number(record.insp_pac_lov_id),
                    item_name: record.item_name,
                    rating: record.rating || 0,                     // preserved from backend
                    notes: record.notes || "",                      // preserved
                    repair_estimate_aed: Number(record.repair_estimate_aed) || 0,
                    image_url_id: record.image_url_id || null       // preserved from backend
                };
            }
        });
          
          
          self.createUIWithRecords(response.records);
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