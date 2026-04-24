define({ 

  onNavigate: function(context)
  {
   
    var self = this;
    self.selectedChecks = ""; 
    self.tempChecks = "";
     this.view.saveresponse.setVisibility(false);
    self.panelIdMap = {};
    this.view.preShow = this.onPreShow.bind(this);
    this.lovId = context.lovId;
    this.objectId = context.object_id;
    this.view.flxHeadingWithButton.btnSaveResponse.onClick =this.submitOnClickAction.bind(this);
  //  this.view.saveresponse.btnClose.onClick = this.closepopup();
    
  
  },
  
  closepopup: function(){
    this.view.saveresponse.setVisibility(false);
    var nav = new voltmx.mvc.Navigation("frmChooseInspectionType");
    nav.navigate();
  },

  onPreShow: function()
  {
    var self = this;
       if(this.view.saveresponse)
      {
        this.view.saveresponse.setVisibility(false);
      }
//     this.createUIWithRecords();
    this.invokeGetInspectionDetailsList();
     this.view.flxAddDetailsAndUpload.flxCloseAddDetails.onClick = () =>
    {
      self.view.flxAddDetailsAndUpload.setVisibility(false);
    }
    this.view.flxAddDetailsAndUpload.flxUploadImages.onClick = () =>
    {
      self.view.flxChooseFileTakePhoto.setVisibility(true);
    }
     this.view.flxSuccessUpload.flxClose.onClick = () =>
    {
      self.view.flxSuccessUpload.setVisibility(false);
    }
     this.view.flxSuccessUpload.btnClose.onClick = () =>
    {
      self.view.flxSuccessUpload.setVisibility(false);
    }
     this.view.flxChooseFileTakePhoto.flxChooseFromLibrary.onClick = this.flxChooseFromLibraryOnClickAction.bind(this);
    this.view.flxChooseFileTakePhoto.camTakeAPhoto.onCapture = this.camOnCaptureAction.bind(this);
    this.view.flxChooseFileTakePhoto.flxTakeAPhoto.onClick = this.camOnCaptureAction.bind(this);

    this.view.saveresponse.btnClose.onClick = () =>
    {
      this.view.saveresponse.setVisibility(false);
    }
    toggleFooterIcons(this.view, "frmChassisDamageReport");
//     this.invokePaintCondition();
    this.view.flxAddDetailsAndUpload.btnSubmitUpload.onClick = this.onAddDetailsSubmit.bind(this);

    
//     this.view.btnChip.onClick = () => 
//     {
//       self.view.btnChip.skin = "sknBtnd3243018px";
//       self.view.btnDent.skin = "sknBtnebebeb18px";
//       self.view.btnFaded.skin = "sknBtnebebeb18px";
//       self.view.btnRepainted.skin = "sknBtnebebeb18px";
//       self.view.btnScratch.skin = "sknBtnebebeb18px";
//     }
    
//     this.view.btnChip.onClick = function() {
//     this.setSelectedButton(this.view.btnChip);
// }.bind(this);

// this.view.btnDent.onClick = function() {
//     this.setSelectedButton(this.view.btnDent);
// }.bind(this);

// this.view.btnFaded.onClick = function() {
//     this.setSelectedButton(this.view.btnFaded);
// }.bind(this);

// this.view.btnRepainted.onClick = function() {
//     this.setSelectedButton(this.view.btnRepainted);
// }.bind(this);

// this.view.btnScratch.onClick = function() {
//     this.setSelectedButton(this.view.btnScratch);
// }.bind(this);
  },

  setSelectedButton: function(selectedBtn) {
    var defaultSkin = "sknBtnebebeb18px";
    var activeSkin = "sknBtnd3243018px";

    // reset all
    this.view.btnChip.skin = defaultSkin;
    this.view.btnDent.skin = defaultSkin;
    this.view.btnFaded.skin = defaultSkin;
    this.view.btnRepainted.skin = defaultSkin;
    this.view.btnScratch.skin = defaultSkin;

    // set selected
    selectedBtn.skin = activeSkin;
},
  
  createCheckBoxes: function (totalItems,response) {
    var self = this;
    self.view.flxCheckBoxes.removeAll();
    var screenWidth = voltmx.os.deviceInfo().screenWidth - 10;
    var itemSize = 30; 
    var margin = 10;
    var itemsPerRow = Math.floor(screenWidth / (itemSize + margin));
    var currentLeft = 6;
    var currentTop = 10;
    var countInRow = 0;

    for (var i = 1; i <= totalItems; i++) {
      if (countInRow >= itemsPerRow) {
        currentLeft = 5;
        currentTop += 44; 
        countInRow = 0;
      }
      let index = i; 
      var flxItem = new voltmx.ui.FlexContainer({
        id: "flxItem" + index,
        width: "35dp",
        height: "35dp",
        left: currentLeft + "dp",
        top: currentTop + "dp",
        layoutType: voltmx.flex.FLOW_HORIZONTAL,
        clipBounds: true,
        isVisible: true,
        skin: "sknFlxBasic",
        onClick: self.onCheckClick.bind(self, index)
      }, {}, {});

      var flxCheck = new voltmx.ui.FlexContainer({
        id: "flxCheck" + index,
        width: "12dp",
        height: "12dp",
        centerY: "50%",
        skin: "sknFlxFFFFFFBorder383838Radius4px"
      }, {}, {});

      var imgTick = new voltmx.ui.Image2({
        id: "imgTick" + index,
        src: "imgtickblack.png",
        centerX: "50%",
        centerY: "50%",
        width: "110%",
        height: "110%",
        isVisible: false
      }, {
        imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS
      }, {});

      flxCheck.add(imgTick);

      var lblNo = new voltmx.ui.Label({
        id: "lblCheckNo" + index,
        text: index.toString(),
        left: "5dp",
        centerY: "50%",
        skin: "sknlblDubai231f2016pxMedium",
        width: voltmx.flex.USE_PREFERRED_SIZE
      }, {}, {});

      flxItem.add(flxCheck, lblNo);
      self.view.flxCheckBoxes.add(flxItem);
      currentLeft += itemSize + margin;
      countInRow++;
    }
  },

  onCheckClick: function (index) {
    var self = this;
    var imgTick = self.view.flxCheckBoxes["flxItem" + index]["flxCheck" + index]["imgTick" + index];

    var selectedArr = self.selectedChecks ? self.selectedChecks.split(",") : [];
    if (imgTick.isVisible) {
      // UNCHECK
      imgTick.isVisible = false;
      selectedArr = selectedArr.filter(function (item) {
        return item !== index.toString();
      });
    } else {
      // CHECK
      imgTick.isVisible = true;
      selectedArr.push(index.toString());
    }

    self.selectedChecks = selectedArr.join(",");
    self.tempChecks = selectedArr.join(",");
    
    voltmx.print("Selected Checks: " + self.selectedChecks);
  },

  invokePaintCondition: function(sub_cat_id) {
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_inspection";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "get-inspection-body-panels";

      var data = {
        "insp_pac_lov_id": self.lovId,
        "lovs_sub_cat_id": sub_cat_id,
        "object_id":self.objectId 
      };
      var headers = {
        "user_token": voltmx.store.getItem("getUserAccesstoken") 
      };

      integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        self.operationSuccessPending.bind(self),
        self.operationFailurePending.bind(self)
      );
    });
  },

  operationSuccessPending: function(response)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
    this.loadInspectionPanels(response);
  },

  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  submitOnClickAction: function () {
    var self = this;
    var baseURL =  voltmx.store.getItem("BASE_URL");
    if (baseURL && !baseURL.endsWith("/")) {
      baseURL += "/";
    }

    var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var endUrl = "services/ms_inspection/api/v1/upsert-inspection-body-panels";
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
          self.view.saveresponse.setVisibility(true);
          self.selectedChecks = "";
          self.tempChecks = "";
            self.view.saveresponse.lblUPdatedsucessfully.text = "Panel list saved Sucessfully";
        } catch (e) {
          voltmx.print("API Error: " + e);
        }
      }
    };
    var selectedArr = [];
    var containerWidgets = self.view.flxCheckBoxes.widgets();

    for (var i = 0; i < containerWidgets.length; i++) {

      var item = containerWidgets[i];
      var checkFlex = item.widgets()[0];
      var tickImg = checkFlex.widgets()[0];

      if (tickImg.isVisible) {
        var panelNumber = i + 1;
        selectedArr.push(panelNumber.toString());
      }
    }

    self.selectedChecks = selectedArr.join(",");
    var panels = [];
    var numbers = self.selectedChecks ? self.selectedChecks.split(",") : [];
    numbers.forEach(function(num){

      var panelObj = {
        insp_pac_lov_id: Number(self.lovId),
        "lovs_sub_cat_id": Number(self.lovs_sub_cat_id),
        panel_number: Number(num),
        panel_name: "",
        is_damaged: false,
        damage_description: "",
        repair_estimate_aed: 0,
        notes: "",
        inspection_date: "2024-01-15T10:30:00Z"
      };


      if(self.panelIdMap[num]){
        panelObj.id = Number(self.panelIdMap[num]);;
      }

      panels.push(panelObj);
    });

    var requestPayload = {
      "object_id": self.objectId,
      "inspection_body_panels":panels,
     // "insp_pac_lov_id":Number(self.lovId)
      
    };
        if (!self.selectedChecks || self.selectedChecks.length === 0) {
    alert("Please select at least one panel");
    return; // stop API call
}

    var requestData = JSON.stringify(requestPayload);
    request.send(requestData);
  },

  loadInspectionPanels: function(response) {

    var self = this;
    self.selectedChecks = "";   
    var totalItems = 21;
    self.createCheckBoxes(totalItems);
    var containerWidgets = self.view.flxCheckBoxes.widgets();
    var item, checkFlex, tickImg;

    for (var i = 0; i < containerWidgets.length; i++) {

      item = containerWidgets[i];
      checkFlex = item.widgets()[0];
      tickImg = checkFlex.widgets()[0];

      tickImg.isVisible = false;
    }

    if (!response || !response.records || response.records.length === 0) {
      self.view.flxCheckBoxes.forceLayout();
      return;
    }

    var records = response.records;
    for (var j = 0; j < records.length; j++) {

      var panelNum = Number(records[j].panel_number);
      var index = panelNum - 1;
      self.panelIdMap[panelNum] = Number(records[j].id);
      if (containerWidgets[index]) {

        item = containerWidgets[index];
        checkFlex = item.widgets()[0];
        tickImg = checkFlex.widgets()[0];

        tickImg.isVisible = true;
        self.selectedChecks += panelNum + ",";
      }
    }
    if(self.selectedChecks.endsWith(",")){
      self.selectedChecks = self.selectedChecks.slice(0,-1);
    }
    self.view.flxCheckBoxes.forceLayout();
  },
  
    createUIWithRecords: function()
  {
    var self = this;
    var records = [{
    "insp_pac_lov_id": "35",
    "value_en": "Exterior",
    "item_name": "Wind Screen"
}]
    self.records = records;
    self.inspectionData = {};
     self.records.forEach(function(record) {
     var key = record.item_name;
//            self.inspectionData[key] = {
//     id: record.id ? Number(record.id) : null,
//     insp_pac_lov_id: Number(record.insp_pac_lov_id),
//     item_name: record.item_name,
//     rating: record.rating || 0,
//     notes: record.notes || "",
//     repair_estimate_aed: Number(record.repair_estimate_aed) || 0,
//     image_url_id: record.image_url_id || null
//   };
       self.inspectionData[key] = {
    id: record.id ? Number(record.id) : null,
    insp_pac_lov_id: Number(record.insp_pac_lov_id),
    item_name: record.item_name,
    rating: record.rating || 0,
    notes: record.notes || "",
    repair_estimate_aed: Number(record.repair_estimate_aed) || 0,
    image_url_id: record.image_url_id || null,
    // === NEW LINES (display fields) ===
    file_url: record.file_url || null,
    file_name: record.file_name || "",
    
    // === NEW: Delete payload for existing images ===
        retakeDeletePayload: record.image_url_id ? {
            file_name: record.file_name || "",
            image_url: record.file_url || "",
            object_id: (self.objectId),
            image_id: (record.image_url_id)
        } : null
         //
  };   
        });
          
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
          text: voltmx.i18n.getLocalizedString("Select Condition"),
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
          text: voltmx.i18n.getLocalizedString("Add Details"),
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
//     var id = record.id;
    var key = record.item_name;

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

//     if(!this.inspectionData){
//       this.inspectionData = {};
//     }

//     if(!this.inspectionData[id]){
//       this.inspectionData[id] = {
//         id: Number(id),
//         insp_pac_lov_id: Number(record.insp_pac_lov_id),
//         item_name: record.item_name
//       };
//     }

//     this.inspectionData[id].rating = selectedRating;
if (!this.inspectionData[key]) {
  this.inspectionData[key] = {
    id: record.id ? Number(record.id) : null,
    insp_pac_lov_id: Number(record.insp_pac_lov_id),
    item_name: record.item_name
  };
}

this.inspectionData[key].rating = selectedRating;

    this.view.forceLayout();
  },

  //   onAddDetailsSubmit: function()
  //   {
  //     var self = this;
  //     ImageUploadAndDeletion.uploadImage(self.objectId,self.fileDetails);
  //   },

  onAddDetailsSubmit: function () {
  var self = this;
// if (
//   (self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text || "").trim() !== "" &&
//   (self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text || "").trim() !== ""
// )
    var details = String(self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text || "").trim();
var cost = String(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text || "").trim();

if (details !== "" && cost !== "" && Number(cost) >= 0) 
    {
  var index = self.currentIndex;
  if (typeof index === "undefined" || !self.records[index]) {
    voltmx.print("Error: currentIndex is undefined or invalid");
    return;
  }

  var record = self.records[index];
  var key = record.item_name;

  if (!self.inspectionData[key]) {
    self.inspectionData[key] = {
      id: record.id ? Number(record.id) : null,
      insp_pac_lov_id: Number(record.insp_pac_lov_id),
      item_name: record.item_name,
      notes: self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text,
      repair_estimate_aed: Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text),
      image_url_id: null
    };
  } else {
    self.inspectionData[key].notes =
      self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text;

    self.inspectionData[key].repair_estimate_aed =
      Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text);
  }

  if (!self.fileDetails || Object.keys(self.fileDetails).length === 0) {

    voltmx.print("No file selected → skipping upload");
     
    self.view.flxAddDetailsAndUpload.setVisibility(false);
    alert("Saved");
    return; 
  }

  ImageUploadAndDeletion.uploadImage(
    self.objectId,
    self.fileDetails,
    function (response, error) {

      if (error) {
        alert("Image upload failed");
        return;
      }

      if (response) {

        if (response.message === "Success") {

          self.view.flxAddDetailsAndUpload.setVisibility(false);
          self.view.flxSuccessUpload.setVisibility(true);

          var parsed = JSON.parse(response.response || "[]");

          if (parsed && parsed.length > 0) {

            var item = parsed[0];
            var payload = JSON.parse(item.object_image_payload || "{}");
            var imageLog = JSON.parse(item.object_image_loged_result || "{}");

            self.inspectionData[key].image_url_id = imageLog.id;
            
            self.inspectionData[key].file_url = payload.file_url;
    self.inspectionData[key].file_name = payload.file_name;
            
            self.inspectionData[key].retakeDeletePayload = {
            file_name: payload.file_name,
            image_url: payload.file_url,
            object_id: (self.objectId),
            image_id: imageLog.id
        };

            var obj = {
              file_name: payload.file_name,
              image_url: payload.file_url,
              object_id: payload.object_id,
              image_id: imageLog.id
            };

            if (!self.tempStore) {
              self.tempStore = [];
            }

            self.tempStore.push(obj);
            voltmx.store.setItem("tStore", self.tempStore);

            voltmx.print("Temp Store: " + JSON.stringify(self.tempStore));
          }

          self.fileDetails = {};
        }
        else {
          if (response.response) {
            var parsed = JSON.parse(response.response || "[]");
            var errCode = parsed[0] && parsed[0].error_code;

            if (errCode == 409) {
              alert(voltmx.i18n.getLocalizedString("File already exists"));
            } else {
              alert("Failed");
            }
          }
        }
      }
      else {
        alert("Invalid response");
      }
    }
  );
    }
},
  
  showAddDetails: function(record, index) {
  var self = this;
  this.record = record;
  this.currentIndex = index;

  var key = record.item_name;
  var localData = this.inspectionData[key];

  // Safety fallback (should never hit after the changes above)
  if (!localData) {
    localData = record;
  }

  this.view.flxAddDetailsAndUpload.setVisibility(true);

  // Always read from local (updated) state
  this.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text = 
    localData.repair_estimate_aed != null ? localData.repair_estimate_aed : "";

  this.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text = 
    localData.notes || "";

  // Image handling
  if (localData.file_url) {
    self.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(true);
    self.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(false);
    self.view.flxAddDetailsAndUpload.imgUploadedImg.imageWhileDownloading = "loading.gif";
    self.view.flxAddDetailsAndUpload.imgUploadedImg.src = localData.file_url;
    self.view.flxAddDetailsAndUpload.lblImgName.text = localData.file_name || "";
  } else {
    self.view.flxAddDetailsAndUpload.flxUploadedImage.setVisibility(false);
    self.view.flxAddDetailsAndUpload.flxUploadImages.setVisibility(true);
  }
},
  
  onAddDetailsSubmit: function () {
  var self = this;
// if (
//   (self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text || "").trim() !== "" &&
//   (self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text || "").trim() !== ""
// )
    var details = String(self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text || "").trim();
var cost = String(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text || "").trim();

if (details !== "" && cost !== "" && Number(cost) > 0) 
    {
  var index = self.currentIndex;
  if (typeof index === "undefined" || !self.records[index]) {
    voltmx.print("Error: currentIndex is undefined or invalid");
    return;
  }

  var record = self.records[index];
  var key = record.item_name;

  if (!self.inspectionData[key]) {
    self.inspectionData[key] = {
      id: record.id ? Number(record.id) : null,
      insp_pac_lov_id: Number(record.insp_pac_lov_id),
      item_name: record.item_name,
      notes: self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text,
      repair_estimate_aed: Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text),
      image_url_id: null
    };
  } else {
    self.inspectionData[key].notes =
      self.view.flxAddDetailsAndUpload.txtAreaPleaseEnterDetails.text;

    self.inspectionData[key].repair_estimate_aed =
      Number(self.view.flxAddDetailsAndUpload.txtAreaEstimatedCost.text);
  }

  if (!self.fileDetails || Object.keys(self.fileDetails).length === 0) {

    voltmx.print("No file selected → skipping upload");
     
    self.view.flxAddDetailsAndUpload.setVisibility(false);
    alert("Saved");
    return; 
  }

  ImageUploadAndDeletion.uploadImage(
    self.objectId,
    self.fileDetails,
    function (response, error) {

      if (error) {
        alert("Image upload failed");
        return;
      }

      if (response) {

        if (response.message === "Success") {

          self.view.flxAddDetailsAndUpload.setVisibility(false);
          self.view.flxSuccessUpload.setVisibility(true);

          var parsed = JSON.parse(response.response || "[]");

          if (parsed && parsed.length > 0) {

            var item = parsed[0];
            var payload = JSON.parse(item.object_image_payload || "{}");
            var imageLog = JSON.parse(item.object_image_loged_result || "{}");

            self.inspectionData[key].image_url_id = imageLog.id;
            
            self.inspectionData[key].file_url = payload.file_url;
    self.inspectionData[key].file_name = payload.file_name;
            
            self.inspectionData[key].retakeDeletePayload = {
            file_name: payload.file_name,
            image_url: payload.file_url,
            object_id: (self.objectId),
            image_id: imageLog.id
        };

            var obj = {
              file_name: payload.file_name,
              image_url: payload.file_url,
              object_id: payload.object_id,
              image_id: imageLog.id
            };

            if (!self.tempStore) {
              self.tempStore = [];
            }

            self.tempStore.push(obj);
            voltmx.store.setItem("tStore", self.tempStore);

            voltmx.print("Temp Store: " + JSON.stringify(self.tempStore));
          }

          self.fileDetails = {};
        }
        else {
          if (response.response) {
            var parsed = JSON.parse(response.response || "[]");
            var errCode = parsed[0] && parsed[0].error_code;

            if (errCode == 409) {
              alert(voltmx.i18n.getLocalizedString("File already exists"));
            } else {
              alert("Failed");
            }
          }
        }
      }
      else {
        alert("Invalid response");
      }
    }
  );
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
          "is_thumbnail":"false",
          "inspection_category": self.record.value_en,
          "inspection_subcategory":self.record.item_name,
        "filename": filefullname,
        "base64": base64Image
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
         
          voltmx.print(response.records);
          self.createButtons(response.records);
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
  
  createButtons: function(records) {
    var self = this;
    self.view.flxButtonScroll.removeAll();
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var btn = new voltmx.ui.Button({
            "height": "30dp",
            "id": "btnSubType" + i,
            "isVisible": true,
            "left": "5%",
            "skin": (i === 0) ? "sknBtnd3243018px" : "sknBtnebebeb18px",
            "text": record.item_name || "Type " + (i + 1),
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
        self.view.flxButtonScroll.add(btn);
    }
    if (records.length > 0) {
        self.navToButtonSpecific(records[0], 0);
        
    }
},
  
//   navToButtonSpecific: function(record,index)
//   {
//     var self = this;
//     if(self.selectedChecks)
//       {
//         alert('Save changes before switching tabs.Other wise changes will be discarded');
//         return;
//       }
    
    
//       var widgets = self.view.flxButtonScroll.widgets();
//     for (var i = 0; i < widgets.length; i++) {
//         widgets[i].skin = "sknBtnebebeb18px";
//     }
//     self.view["btnFrontleft" + index].skin = "sknBtnd3243018px";
    
//     self.invokePaintCondition(record.lovs_sub_cat_id);
    
//   }
  
  navToButtonSpecific: function(record, index) {
  var self = this;

  if (self.tempChecks) {

    var alertHandler = function(response) {
      if (response === true) {
        self.tempChecks = "";

        self.proceedNavigation(record, index);
      } else {
        return;
      }
    };

    voltmx.ui.Alert(
      {
        message: "Save changes before switching tabs. Otherwise changes will be discarded. Do you want to continue?",
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        alertTitle: "Confirmation",
        yesLabel: "Yes",
        noLabel: "No",
        alertHandler: alertHandler
      },
      {}
    );

    return;
  }

  // If no pending changes
  self.proceedNavigation(record, index);
},
  
  proceedNavigation: function(record, index) {
  var self = this;

   self.lovs_sub_cat_id = record.lovs_sub_cat_id;
  var widgets = self.view.flxButtonScroll.widgets();
  for (var i = 0; i < widgets.length; i++) {
    widgets[i].skin = "sknBtnebebeb18px";
  }

  self.view["btnSubType" + index].skin = "sknBtnd3243018px";

  self.invokePaintCondition(record.lovs_sub_cat_id);
}


});