define({ 

  onNavigate: function()
  {
//     this.isSearchActive = false;
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);

  },

  onPreShow: function()
  {

    toggleFooterIcons(this.view, "frmImagesSummary");

    //      this.view.flxHeading.flxBack.onClick = () =>
    //     {
    //       NavigationManager.pop();
    //     }
     this.lot = "";
    this.title = "";
    this.view.flxSearchComponent.tbxSearchBy.text = "";
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segImagesLIst.setData([]);

    this.showPendingVehicles();

    //     this.view.segImagesLIst.onRowClick = () =>
    //     {
    //       NavigationManager.push("frmImageCatageory");
    //     }

    this.view.segImagesLIst.onRowClick = () =>
    {
      if (this.isPending) {
        var selectedItem = this.view.segImagesLIst.selectedRowItems[0];

        NavigationManager.push("frmImageCatageory", {
          "record": selectedItem
        });
      }
    }

    this.view.flxPendingVehicles.onClick = () =>
    {
      this.showPendingVehicles();
    },

      this.view.flxCompletedVehicles.onClick = () =>
      {
        this.showCompletedVehicles();
      }

      this.view.btnLoadMore.onClick = this.onLoadMoreClick.bind(this);
    this.view.flxSearchComponent.flxSearch.onClick = this.invokeServiceWithSearch.bind(this);
    this.view.flxSearchComponent.tbxSearchBy.onTextChange = this.onTextChange.bind(this);
  },

 

  onLoadMoreClick: function()
  {
    var self = this;
    if (self.isSearchActive) {
      return;
    }
    if(self.isPending)
    {
      self.pageSize += 10;
      self.invokeImagespending();
    }
    else
    {
      self.pageSize += 10;
      self.invokePhotoCompleted();
    }
  },


  showPendingVehicles: function()
  {

    this.isPending = true;
    this.pageSize = 10;
    this.currentOffset = 0;
     this.lot = "";
    this.title = "";
    this.view.flxSearchComponent.tbxSearchBy.text = "";
    this.view.segImagesLIst.setData([]);
    this.invokeImagespending();
    this.view.flxPendingVehicles.skin = "sknFlxFFE2E5";
    this.view.lblPendingVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblPendingCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULPending.skin = "sknflxd32437";

    this.view.flxCompletedVehicles.skin = "sknFlxBasic";
    this.view.lblCompletedVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblCompletedCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULCompleted.skin = "sknFlxE4E4E4";
  },

  showCompletedVehicles: function()
  {

    this.isPending = false;
    this.pageSize = 10;
    this.currentOffset = 0;
     this.lot = "";
    this.title = "";
    this.view.flxSearchComponent.tbxSearchBy.text = "";
    this.view.segImagesLIst.setData([]);
    this.invokePhotoCompleted();

    this.view.flxPendingVehicles.skin = "sknFlxBasic";
    this.view.lblPendingVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblPendingCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULPending.skin = "sknFlxE4E4E4";

    this.view.flxCompletedVehicles.skin = "sknFlxFFE2E5";
    this.view.lblCompletedVehicles.skin = "sknlblDubaid3243720pxMedium";
    this.view.lblCompletedCount.skin = "sknLblDubai231f2020pxRegular";
    this.view.flxULCompleted.skin = "sknflxd32437";
  },

   invokeServiceWithSearch: function()
  {
    var self = this;
    this.pageSize = 10;
    this.currentOffset = 0;
    this.view.segImagesLIst.setData([]);
    this.view.btnLoadMore.setVisibility(false);
   var searchText = (self.view.flxSearchComponent.tbxSearchBy && self.view.flxSearchComponent.tbxSearchBy.text ? self.view.flxSearchComponent.tbxSearchBy.text : "").trim();


//     if (!searchText) return;

    // Decide which field to use
    if (!isNaN(searchText)) {
        self.lot = searchText;
        self.title = "";  // clear the other
    } else {
        self.title = searchText;
        self.lot = "";    // clear the other
    }

//     self.getUnderReviewCars();
    if(self.isPending)
      {
        self.invokeImagespending();
      }
    else
      {
        self.invokePhotoCompleted();
      }
  },
  
  onTextChange: function()
  {
    var self = this;
    
    var textBoxText = self.view.flxSearchComponent.tbxSearchBy.text;
    if(textBoxText === "")
      {
        if(self.isPending)
      {
        self.showPendingVehicles();
      }
    else
      {
        self.showCompletedVehicles();
      }
      }
  },
  
  invokeImagespending: function() {
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_inspection";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "get-photo-vehicle";

      var data = {
        "lot_no": self.lot || "",
        "model": self.title || "",
        "chassis_number": "",
        "location": "",
        "is_photo_done": "0",
        "days": "7",
        "page": "1",
        "page_size": self.pageSize || 10
      };

      // Headers
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

    if (!response.records || response.records.length === 0) {
      response.records = [{
        total_completed: "0",
        total_pending: "0",
        total_vehicles: "0"
      }];
    }

    this.completedVehicles = response.records[0].total_completed;
    this.pendingVehicles = response.records[0].total_pending;
    this.totalVehicles = response.records[0].total_vehicles;

    this.view.flxSummary.lblTotalCount.text = this.totalVehicles;
    this.view.flxSummary.lblCompletedCount.text = this.completedVehicles;
    this.view.flxSummary.lblPendingCount.text = this.pendingVehicles;

    this.view.lblPendingCount.text = this.pendingVehicles;
    this.view.lblCompletedCount.text = this.completedVehicles;

    this.addToSegment(response);
  },

  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  invokePhotoCompleted: function() {
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

      var serviceName = "fry_int_inspection";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "get-photo-vehicle";

      var data = {
        "lot_no": self.lot || "",
        "model": self.title || "",
        "chassis_number": "",
        "location": "",
        "is_photo_done": "1",
        "days": "7",
        "page": "1",
        "page_size": self.pageSize || 10
      };

      // Headers
      var headers = {
        "user_token": voltmx.store.getItem("getUserAccesstoken") 
      };

      integrationObj.invokeOperation(
        operationName,
        headers,
        data,
        self.operationSuccessCompleted.bind(self),
        self.operationFailureCompleted.bind(self)
      );
    });
  },

  operationSuccessCompleted: function(response)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(response);
    
    
    if (!response.records || response.records.length === 0) {
      response.records = [{
        total_completed: "0",
        total_pending: "0",
        total_vehicles: "0"
      }];
    }

    this.completedVehicles = response.records[0].total_completed;
    this.pendingVehicles = response.records[0].total_pending;
    this.totalVehicles = response.records[0].total_vehicles;

    this.view.flxSummary.lblTotalCount.text = this.totalVehicles;
    this.view.flxSummary.lblCompletedCount.text = this.completedVehicles;
    this.view.flxSummary.lblPendingCount.text = this.pendingVehicles;

    this.view.lblPendingCount.text = this.pendingVehicles;
    this.view.lblCompletedCount.text = this.completedVehicles;
    
    this.addToSegment(response);
  },

  operationFailureCompleted: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },


  addToSegment: function(response) {
    var self = this;
    self.fullData = this.fullData || [];
    var records = response && response.records ? response.records : [];
    this.fullData = records;
    if(records.length > 0)
    {
      // self.view.lblNorecords.setVisibility(false);
      self.view.segImagesLIst.setVisibility(true);
    }
    else{
      // self.view.lblNorecords.setVisibility(true);
      self.view.segImagesLIst.setVisibility(false);
    }
    var newRecords = records.slice(self.currentOffset);
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";


    self.view.segImagesLIst.widgetDataMap = {
      "flxLotModel": "flxLotModel",
      "flxVehicleIcon":"flxVehicleIcon",
      "flxModelAndNumber": "flxModelAndNumber",
      "flxLocation": "flxLocation",
      "flxDate": "flxDate",
      "flxViewDetailsInwardEntry": "flxViewDetailsInwardEntry",
      "lblLotAndModel": "lblLotAndModel",
      "lblVehicleNumber": "lblVehicleNumber",
      "lblLocation": "lblLocation",
      "lblDate": "lblDate",
      "lblViewDetailsInwardEntry": "lblViewDetailsInwardEntry"
    };

    var data = [];

    if (newRecords.length > 0) {
      //         self.view.lblNorecords.setVisibility(false);
      //         self.view.segInwardEntryList.setVisibility(true);
      newRecords.forEach(function(record) {

        data.push({
          "flxVehicleIcon": 
          {
            "left": isArabic ? "" : "5%",
            "right": isArabic ? "4%": ""
          },
          "flxLotModel":
          {
            "reverseLayoutDirection": isArabic
          },
          "flxModelAndNumber":{
            "left": isArabic ? "" : "2%",
            "right": isArabic ? "2%": ""
          },
          "lblLotAndModel":{
            "text": (record.lot_no || "") + " " + (record.model || ""),
            "left": isArabic ? "" : "0dp",
            "right": isArabic ? "0dp": ""
          }, 
          "lblVehicleNumber":{
            "text": record.chassis_number || "",
            "left": isArabic ? "" : "0dp",
            "right": isArabic ? "0dp": ""
          }, 
//           "lblVehicleNumber": record.chassis_number || "",
          "lblLocation": record.location || "",
          "lblDate": record.created_on
          || "",
          
          
          "flxLocation": {
            // "isVisible": !self.isPending,
            "reverseLayoutDirection": isArabic
          },
          "flxViewDetailsInwardEntry":
          {
            "left": isArabic ? "5%" : "",
            "right": isArabic ? "" : "5%"
          },
          "flxDate": {
            // "isVisible": !self.isPending,
            "reverseLayoutDirection": isArabic
          },
          "lblViewDetailsInwardEntry":  voltmx.i18n.getLocalizedString("View Details"),

          "flxViewDetailsInwardEntry": {
            "isVisible": self.isPending,
            "left": isArabic ? "5%" : "",
            "right": isArabic ? "" : "5%",
            "onClick": function() {
              self.openDetails(record);
            }
          }
        });

      });

    }
    else
    {
      //         self.view.lblNorecords.setVisibility(true);
      //         self.view.segInwardEntryList.setVisibility(false);
    }

    if (records.length < self.pageSize) {
      self.view.btnLoadMore.setVisibility(false);
    } else {
      self.view.btnLoadMore.setVisibility(true);
    }
    self.currentOffset += newRecords.length;

    self.view.segImagesLIst.addAll(data);
  },

  openDetails: function(record)
  {
    var self = this;

    NavigationManager.push("frmImageCatageory", {
      "record": record
    })
  },

  adjustRTL: function()
  {
    var self = this;
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    var flx = self.view.flxHeading;
    flx.reverseLayoutDirection = isArabic;
    self.view.flxULSummary.reverseLayoutDirection = isArabic;

    if(isArabic)
    {
      self.view.flxSummary.lblActivityName.left = "";
      self.view.flxSummary.lblActivityName.right = "5%";

      self.view.flxSummary.lblTotalVehicles.left = "";
      self.view.flxSummary.lblTotalVehicles.right = "0dp";

      self.view.flxSummary.lblCompletedVehicles.left = "";
      self.view.flxSummary.lblCompletedVehicles.right = "0dp";

      self.view.flxSummary.lblPendingVehicles.left = "";
      self.view.flxSummary.lblPendingVehicles.right = "0dp";

      self.view.flxSummary.lblTotalCount.left = "0dp";
      self.view.flxSummary.lblTotalCount.right = "";

      self.view.flxSummary.lblCompletedCount.left = "0dp";
      self.view.flxSummary.lblCompletedCount.right = "";

      self.view.flxSummary.lblPendingCount.left = "0dp";
      self.view.flxSummary.lblPendingCount.right = "";

      self.view.lblSummaryOfVehicleInspection.left = "";
      self.view.lblSummaryOfVehicleInspection.right = "0dp";
    }
    else
    {
      self.view.flxSummary.lblActivityName.left = "5%";
      self.view.flxSummary.lblActivityName.right = "";

      self.view.flxSummary.lblTotalVehicles.left = "0dp";
      self.view.flxSummary.lblTotalVehicles.right = "";

      self.view.flxSummary.lblCompletedVehicles.left = "0dp";
      self.view.flxSummary.lblCompletedVehicles.right = "";

      self.view.flxSummary.lblPendingVehicles.left = "0dp";
      self.view.flxSummary.lblPendingVehicles.right = "";

      self.view.flxSummary.lblTotalCount.left = "";
      self.view.flxSummary.lblTotalCount.right = "0dp";

      self.view.flxSummary.lblCompletedCount.left = "";
      self.view.flxSummary.lblCompletedCount.right = "0dp";

      self.view.flxSummary.lblPendingCount.left = "";
      self.view.flxSummary.lblPendingCount.right = "0dp";

      self.view.lblSummaryOfVehicleInspection.left = "0dp";
      self.view.lblSummaryOfVehicleInspection.right = "";
    }

    self.view.flxHeading.lblImages.text =voltmx.i18n.getLocalizedString("Images");
    self.view.flxSummary.lblActivityName.text =voltmx.i18n.getLocalizedString("Images");
    self.view.flxSummary.lblTotalVehicles.text =voltmx.i18n.getLocalizedString("Total Vehicles");
    self.view.flxSummary.lblCompletedVehicles.text =voltmx.i18n.getLocalizedString("Completed Vehicles");
    self.view.flxSummary.lblPendingVehicles.text = voltmx.i18n.getLocalizedString("Pending Vehicles");
    // self.view.lblSummaryOfVehicleInspection.text =voltmx.i18n.getLocalizedString("SummaryofvehicleImages");
    self.view.lblPendingVehicles.text =voltmx.i18n.getLocalizedString("Pending Vehicles");
    self.view.lblCompletedVehicles.text =voltmx.i18n.getLocalizedString("Completed Vehicles");

    self.view.btnLoadMore.text = voltmx.i18n.getLocalizedString("Load More");
     this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
    this.view.flxfooter.lblHome.text =voltmx.i18n.getLocalizedString("Dashboard");

    this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");

    this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");

    this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");

    this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");

    this.view.flxSearchComponent.tbxSearchBy.placeholder = voltmx.i18n.getLocalizedString("Search by Make, Model, or Vehicle ID");
    
    this.view.lblSummaryOfVehicleInspection.text = voltmx.i18n.getLocalizedString("Summary of Vehicle Images");

  }




});