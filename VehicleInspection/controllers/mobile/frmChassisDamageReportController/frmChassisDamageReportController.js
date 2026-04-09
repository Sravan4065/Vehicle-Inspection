define({ 

  onNavigate: function(context)
  {
   
    var self = this;
    self.selectedChecks = ""; 
     this.view.saveresponse.setVisibility(false);
    self.panelIdMap = {};
    this.view.preShow = this.onPreShow.bind(this);
    this.lovId = context.lovId;
    this.objectId = context.object_id;
    this.view.flxHeadingWithButton.btnSaveResponse.onClick =this.submitOnClickAction.bind(this);
   // this.view.saveresponse.btnClose.onClick = this.closepopup();
    
  
  },
  
  closepopup: function(){
    this.view.saveresponse.setVisibility(false);
    var nav = new voltmx.mvc.Navigation("frmChooseInspectionType");
    nav.navigate();
  },

  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmChassisDamageReport");
    this.invokePaintCondition();
      if(this.view.saveresponse)
      {
        this.view.saveresponse.setVisibility(false);
      }
    
    this.view.saveresponse.btnClose.onClick = () =>
    {
      this.view.saveresponse.setVisibility(false);
    }
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
    voltmx.print("Selected Checks: " + self.selectedChecks);
  },

  invokePaintCondition: function() {
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_inspection";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "get-inspection-body-panels";

      var data = {
        "insp_pac_lov_id": self.lovId,
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
    var baseURL = "https://dev2-hcltx.et.ae:443/";
    if (baseURL && !baseURL.endsWith("/")) {
      baseURL += "/";
    }

    var appkey = "30cc719c34beb54afc9dd174a5304067";
    var appsecret = "bfa04e3bfce8de77f65467f2e352245";
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
           self.view.saveresponse.lblUPdatedsucessfully.text = "Panel list saved Sucessfully";
           
        } catch (e) {
          voltmx.print("API Error: " + e);
          alert("Something went wrong");
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
        panel_number: Number(num),
        panel_name: "",
        is_damaged: false,
        damage_description: "",
        repair_estimate_aed: 0,
        notes: "",
        inspection_date: "2024-01-15T10:30:00Z"
      };


      if(self.panelIdMap[num]){
        panelObj.id = Number(self.panelIdMap[num]);
      }

      panels.push(panelObj);
    });

    var requestPayload = {
      "object_id": self.objectId,
      "inspection_body_panels":panels,
      //"insp_pac_lov_id":Number(self.lovId)
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
  }

});