define({ 

  onNavigate: function(context){
    this.objectId = context.object_id;
    this.view.preShow =this.onPreShow.bind(this);
  },
  onPreShow: function(){
    this.invokeMasterFleetSpecValues();

    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
    //     this.clearData();
    this.view.flxHeadingWithButton.btnSaveResponse.onClick = this.onSaveResponseClick.bind(this);
    for (let i = 1; i <= 16; i++) {
      this.view["details" + i].flxArrow.onClick =
        this.toggleDetails.bind(this);
    }
    for (let i = 3; i <= 16; i++) {
      this.view["details" + i].segVehicleDetails.onRowClick =
        this.onRowClickAction.bind(this);
    }
    this.view.details4.txbData.setEnabled(false);
     this.view.details6.txbData.setEnabled(false);
     this.view.details9.txbData.setEnabled(false);
     this.view.details10.txbData.setEnabled(false);
     this.view.details12.txbData.setEnabled(false);
    this.invokeGetEditSpecDetails();
    this.view.details1.segVehicleDetails.onRowClick = this.segOnRowClickActionCategory.bind(this);
    this.view.details2.segVehicleDetails.onRowClick = this.segOnRowClickSubCategoryAction.bind(this);
    this.view.details1.txbData.setEnabled(false);
    this.view.details2.txbData.setEnabled(false);
    this.view.details3.txbData.setEnabled(false);
    this.view.details5.txbData.setEnabled(false);
    this.view.details8.txbData.setEnabled(false);
    this.view.details11.txbData.setEnabled(false);
    this.view.details15.txbData.setEnabled(false);
//     4,6,9,10,12
  },

  toggleDetails: function (context) {
    var detailsId = context.parent.parent.id;
    var details = this.view[detailsId];
    var transform = voltmx.ui.makeAffineTransform();
    if (details.flxSegment.isVisible) {
      details.flxSegment.isVisible = false;
      transform.rotate(0);
      details.imgarrow.transform = transform;
    } else {
      details.flxSegment.isVisible = true;
      transform.rotate(180);
      details.imgarrow.transform = transform;
    }
  },

  setDataToSeg: function(response) {

    var spec = response.data[0];

    function formatData(arr) {
      var result = [];
      if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          result.push({
            lblData: arr[i].value
          });
        }
      }
      return result;
    }

    // Assign data to each segment separately

    //   if (this.view.details1.segVehicleDetails) {
    //     this.view.details1.segVehicleDetails.setData(
    //      formatData("Test")
    //     );
    //   }

    //   if (this.view.details2.segVehicleDetails) {
    //     this.view.details2.segVehicleDetails.setData(
    //       formatData("Test")
    //     );
    //   }

    if (this.view.details3.segVehicleDetails) {
      this.view.details3.segVehicleDetails.setData(
        formatData(spec.body_type)
      );
    }

    if (this.view.details4.segVehicleDetails) {
      this.view.details4.segVehicleDetails.setData(


        formatData(spec.color)
      );
    }

    if (this.view.details5.segVehicleDetails) {
      this.view.details5.segVehicleDetails.setData(
        formatData(spec.trim)
      );
    }

    if (this.view.details6.segVehicleDetails) {
      this.view.details6.segVehicleDetails.setData(

        formatData(spec.color)
      );
    }

    if (this.view.details7.segVehicleDetails) {
      this.view.details7.segVehicleDetails.setData(

        formatData(spec.color)
      );
    }

    if (this.view.details8.segVehicleDetails) {
      this.view.details8.segVehicleDetails.setData(

        formatData(spec.transmission_type)
      );
    }

    if (this.view.details9.segVehicleDetails) {
      this.view.details9.segVehicleDetails.setData(

        formatData(spec.mileage_type)
      );
    }

    if (this.view.details10.segVehicleDetails) {
      this.view.details10.segVehicleDetails.setData(

        formatData(spec.branch)
      );
    }

    if (this.view.details11.segVehicleDetails) {
      this.view.details11.segVehicleDetails.setData(

        formatData(spec.fuel_type)
      );
    }
    if (this.view.details12.segVehicleDetails) {
      this.view.details12.segVehicleDetails.setData(

        formatData(spec.keys)
      );
    }
    //        if (this.view.details13.segVehicleDetails) {
    //     this.view.details13.segVehicleDetails.setData(
    //    formatData("Test")
    //     );
    //   }
    if (this.view.details14.segVehicleDetails) {
      this.view.details14.segVehicleDetails.setData(
        formatData(spec.technical_features)
      );
    }
    if (this.view.details15.segVehicleDetails) {
      this.view.details15.segVehicleDetails.setData(
        formatData(spec.year_make)
      );
    }


  },

  onRowClickAction: function (seg, sectionIndex, rowIndex) {
    var rowData = seg.selectedRowItems[0];
    var lblValue = rowData.lblData;
    var details = seg.parent.parent;
    details.txbData.text = lblValue;
    details.flxSegment.setVisibility(false);
    var transform = voltmx.ui.makeAffineTransform();
    transform.rotate(0); 
    details.imgarrow.transform = transform;
  },


  invokeMasterFleetSpecValues: function() {
    var self = this;
    checkTokenValidatity(function() {
      voltmx.application.showLoadingScreen(null, "Loading..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });
      var serviceName = "fry_int_fleet";
      var integrationObj = voltmx.sdk.getCurrentInstance()
      .getIntegrationService(serviceName);
      var operationName = "master-fleet-spec-values";

      var data ={
        "spec_list": "name;size;year_make;roles;customer_rating;horsepower;branch;location;emirates;body_condition;mechanical_condition;body_type;doors;no_of_cylinders;color;transmission_type;warranty;fuel_type;extra;technical_features;investment_center;mileage_type;media;type_of_wheels;seats;general_items;vehicle_source;documents;ownership;administrative_fees;keys;0;Media;Type of wheels;Seats;General items;Vehicle Source;Administrative fees;trim",

        "widget_name": "fleet_specs_details;fleet_insp_details;users;add_request",

        "asset_definitions": "false",
        "auction_types": "false"
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
    var self = this;
    voltmx.application.dismissLoadingScreen();

    voltmx.print(response);
    self.specValues = response;
    self.setDataToSeg(response);  
  },
  operationFailurePending: function(error)
  {
    voltmx.application.dismissLoadingScreen();
    voltmx.print(error);
  },

  invokeGetEditSpecDetails: function()
  {
    var self = this;

    var serviceName = "fry_int_fleet";
    var integrationObj = voltmx.sdk.getCurrentInstance()
    .getIntegrationService(serviceName);
    var operationName = "get-edit-spec-details";

    var data ={
      "object_id": self.objectId
    };


    // Headers
    var headers = {
      "user_token": voltmx.store.getItem("getUserAccesstoken") 
    };

    integrationObj.invokeOperation(
      operationName,
      headers,
      data,
      successCallback,
      failureCallback
    );

    function successCallback(response)
    {
      voltmx.print(response);
      if(response.records && response.records.length > 0)
      {
        self.preFillFields(response.records[0]);
      }
    }

    function failureCallback(error)
    {
      voltmx.print(error);
    }
  },

  preFillFields: function(record) {
    var self = this;
    self.recordData = record;
    var master = self.specValues.data[0];
 
    
    voltmx.store.setItem("categoriesSelectedRowId",record.category_id);
    voltmx.store.setItem("SubCategorySelectedRowId",record.sub_category_id);
    
    // Mapping values
    var bodyType        = self.getValueFromList(master.body_type, record.body_type);
    var color           = self.getValueFromList(master.color, record.colors);
    var transmission    = self.getValueFromList(master.transmission_type, record.transmission_type);
    var mileageType     = self.getValueFromList(master.mileage_type, record.milage_type);
    var branch          = self.getValueFromList(master.branch, record.branch);
    var fuel            = self.getValueFromList(master.fuel_type, record.fuel);
    var keys            = self.getValueFromList(master.keys, record.no_of_keys);
    var yearMake        =  record.year_of_making;
    var trim =    self.getValueFromList(master.trim, record.trim);

//         self.getValueFromList(master.year_make, record.year_of_making);

    // technical_features (assuming multiple or single id)
    var technicalFeatures = "";
    if (record.technical_features) {
      var ids = record.technical_features.split(",");
      var values = ids.map(function(id) {
        return self.getValueFromList(master.technical_features, id);
      });
      technicalFeatures = values.join(", ");
    }

    // Assign to UI
    self.view.details3.txbData.text  = bodyType || "";
    self.view.details4.txbData.text  = color || "";
    self.view.details5.flxTextbox.text = "";   // as requested
    self.view.details6.txbData.text  = color || "";
    self.view.details8.txbData.text  = transmission || "";
    self.view.details9.txbData.text  = mileageType || "";
    self.view.details10.txbData.text = branch || "";
    self.view.details11.txbData.text = fuel || "";
    self.view.details12.txbData.text = keys || "";
    //     self.view.details13.txbData.text = "";   // as requested
    self.view.details14.txbData.text = technicalFeatures || "";
    self.view.details15.txbData.text = yearMake || "";
    self.view.details5.txbData.text =trim || "";
    self.getCategories();
  },

  getValueFromList: function(list, id) {
    if (!list || !id) return "";
    var item = list.find(function(obj) {
      return obj.id === id;
    });
    return item ? item.value.trim() : "";
  },

  //    onSaveResponseClick: function () {

  //     var self = this;

  //     var baseURL = voltmx.store.getItem("BASE_URL");

  //     if (baseURL && !baseURL.endsWith("/")) {

  //       baseURL += "/";

  //     }

  //     var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");

  //     var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");

  //     var encodeVal = base64Encode(appkey + ":" + appsecret);

  //     var endUrl = "services/ms_fleet/api/v1/add-fleet-specifications";

  //     var url = baseURL + endUrl;

  //     var request = new voltmx.net.HttpRequest();

  //     request.open("POST", url);

  //     request.setRequestHeader("Authorization", "Basic " + encodeVal);

  //     request.setRequestHeader("Content-Type", "application/json");

  //     request.setRequestHeader("user_token", voltmx.store.getItem("getUserAccesstoken"));

  //     request.onReadyStateChange = function () {

  //       if (request.readyState === 4) {

  //         try {

  //           var response = JSON.parse(request.responseText);

  //           voltmx.print("API Response: " + JSON.stringify(response));

  //           if (response && response.error) {

  //             var errMsg = response.error.message || "Request failed";

  //             if (response.error.details) {
  //               var details = response.error.details;
  //               for (var key in details) {
  //                 errMsg = details[key];
  //                 break; // first validation error
  //               }
  //             }

  //             alert(errMsg);
  //             return;
  //           }

  //           // -------- SUCCESS HANDLING ----------
  //           if (response) {


  //           }

  //         } catch (e) {

  //           voltmx.print("API Error: " + e);

  //         }

  //       }

  //     };



  //         var data = 
  //             {
  //     "object_id": "CB8C38E7-5DFA-4BDE-B8D1-C223552501CF",
  //     "is_technical": 1,
  //     "is_washed": 1,
  //     "milage": 5000,
  //     "milage_type": 265,
  //     "chassis_number": "87236188861878BRT",
  //     "oracle_number": "",
  //     "motor_no": "", 
  //     "no_of_keys": 574,
  //     "vat_applied": true,
  //     "user_id": "7646fea1-2eeb-468f-ab5c-e916dcb533f6",
  //     "commission": 12345,
  //     "category_id": 198,
  //     "sub_category_id": 268,
  //     "target_selling_price": 100000,
  //     "location": 141,
  //     "year_of_making": 2025,
  //     "country_origin": "UAE",
  //     "body_type": 15,
  //     "no_of_doors": 25,
  //     "no_of_cylinders": 29,
  //     "color": 37,
  //     "transmission_type": 52,
  //     "fuel": 64,
  //     "horse_power": 55,
  //     "ownership": "Abu Dabhi",
  //     "branch": 90,
  //     "document": 438,
  //     "is_minimum_commission_applied": true,
  //     "details": []
  // }


  //     request.send(JSON.stringify(data));



  //   },

  onSaveResponseClick: function () {
    var self = this;

    var baseURL = voltmx.store.getItem("BASE_URL");
    if (baseURL && !baseURL.endsWith("/")) {
      baseURL += "/";
    }

    var appkey    = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
    var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
    var encodeVal = base64Encode(appkey + ":" + appsecret);

    var endUrl = "services/ms_fleet/api/v1/add-fleet-specifications";
    var url    = baseURL + endUrl;
    var record = self.recordData;
    // ────────────────────────────────────────────────
    // Collect dynamic values from UI fields
    // ────────────────────────────────────────────────

    var payload = {
      "object_id": self.objectId,

      "is_technical": Number(record.is_technical),
      "is_washed": Number(record.is_washed),

      "milage": parseInt(self.view.details9.txbData.text.trim() || "0", 10) || 0,

      // ✅ FIXED
      "milage_type": Number(self.getIdFromList(self.specValues.data[0].mileage_type, self.view.details9.txbData.text.trim())) || null,

      "chassis_number": record.chassis_number || "",
      "oracle_number": record.oracle_number || "",
      "motor_no": record.motor_no || "",

      // ✅ FIXED
      "no_of_keys": Number(self.getIdFromList(self.specValues.data[0].keys, self.view.details12.txbData.text.trim())) || null,

      "vat_applied": record.vat_apply === "true" || record.vat_apply === true,

      "user_id": voltmx.store.getItem("userId") || "",
      "commission": parseInt(record.commission || "0", 10),

      "category_id": Number(voltmx.store.getItem("categoriesSelectedRowId")) || null,
      "sub_category_id": Number(voltmx.store.getItem("SubCategorySelectedRowId")) || null,

      "target_selling_price": parseInt(record.target_selling_price || "0", 10),

      // ✅ FIXED
      "location": Number(record.locations) || null,

      // ✅ FIXED
//       "year_of_making": Number(self.getIdFromList(self.specValues.data[0].year_make, self.view.details15.txbData.text.trim())) || null,
     "year_of_making": Number(self.view.details15.txbData.text.trim()),
      "country_origin": record.country_origin || "UAE",

      // ✅ FIXED
      "body_type": Number(self.getIdFromList(self.specValues.data[0].body_type, self.view.details3.txbData.text.trim())) || null,

      // ✅ FIXED
      "no_of_doors": Number(record.no_of_doors) || null,
      "no_of_cylinders": Number(record.no_of_cylinders) || null,

      // ✅ FIXED
      "color": Number(
        self.getIdFromList(self.specValues.data[0].color, self.view.details4.txbData.text.trim()) || 
        self.getIdFromList(self.specValues.data[0].color, self.view.details6.txbData.text.trim())
      ) || null,

      // ✅ FIXED
      "transmission_type": Number(self.getIdFromList(self.specValues.data[0].transmission_type, self.view.details8.txbData.text.trim())) || null,

      // ✅ FIXED
      "fuel": Number(self.getIdFromList(self.specValues.data[0].fuel_type, self.view.details11.txbData.text.trim())) || null,

      // ✅ FIXED
      "horse_power": Number(record.horse_power) || null,

      "ownership": record.ownership || "",

      // ✅ FIXED
      "branch": Number(self.getIdFromList(self.specValues.data[0].branch, self.view.details10.txbData.text.trim())) || null,

      // ✅ FIXED
      "document": Number(record.document) || null,

      "is_minimum_commission_applied": record.min_commission === "true" ? true : false,

      "details": []
    };

    //     var data = {
    //     "object_id": self.objectId,
    //     "is_technical": 1,
    //     "is_washed": 1,
    //     "milage": 5000,
    //     "milage_type": 265,
    //     "chassis_number": "87236188861878BRT",
    //     "oracle_number": "",
    //     "motor_no": "", 
    //     "no_of_keys": 574,
    //     "vat_applied": true,
    //     "user_id": "7646fea1-2eeb-468f-ab5c-e916dcb533f6",
    //     "commission": 12345,
    //     "category_id": 198,
    //     "sub_category_id": 268,
    //     "target_selling_price": 100000,
    //     "location": 141,
    //     "year_of_making": 2025,
    //     "country_origin": "UAE",
    //     "body_type": 15,
    //     "no_of_doors": 25,
    //     "no_of_cylinders": 29,
    //     "color": 37,
    //     "transmission_type": 52,
    //     "fuel": 64,
    //     "horse_power": 55,
    //     "ownership": "Abu Dabhi",
    //     "branch": 90,
    //     "document": 438,
    //     "is_minimum_commission_applied": true,
    //     "details": []
    // }


    // ────────────────────────────────────────────────
    // HTTP Request
    // ────────────────────────────────────────────────

    var request = new voltmx.net.HttpRequest();
    request.open("PUT", url);

    request.setRequestHeader("Authorization", "Basic " + encodeVal);
    request.setRequestHeader("Content-Type",   "application/json");
    request.setRequestHeader("user_token",     voltmx.store.getItem("getUserAccesstoken"));

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

          // SUCCESS HANDLING
          alert(response.message);
          voltmx.print("Save successful → " + JSON.stringify(response));
          // → you can add navigation / toast / refresh here

        } catch (e) {
          voltmx.print("API Error: " + e);
          alert("Failed to parse server response");
        }
      }
    };

    voltmx.print("Sending payload:\n" + JSON.stringify(payload, null, 2));
    request.send(JSON.stringify(payload));
  },
  getIdFromList: function(list, displayValue) {
    if (!list || !displayValue) return null;
    var item = list.find(function(obj) {
      return (obj.value || "").trim().toLowerCase() === displayValue.trim().toLowerCase();
    });
    return item ? item.id : null;
  },
  getCategories: function() {
    var self = this;

    var input = {
      serviceID: "fry_int_fleet$asset-categories-master-values",
      category_id: 1,
      asset_name: "fleet",
      httpheaders: {},
      httpconfig: {}
    };

    mfintegrationsecureinvokerasync(input, "fry_int_fleet", "asset-categories-master-values",
                                    function(status, response) {

      if (response.opstatus !== 0) return;

      var cat_array = [];
      var selectedCategoryName = "";

      response.records.forEach(function(res) {
        cat_array.push({
          lblData: res.cat_name,
          lblId: res.cat_id
        });

        if (self.recordData && res.cat_id == self.recordData.category_id) {
          selectedCategoryName = res.cat_name;
        }
      });

      self.view.details1.segVehicleDetails.setData(cat_array);
      self.catarray = cat_array;

      self.view.details1.txbData.text = selectedCategoryName || "";

      if (self.recordData && self.recordData.category_id) {
        self.getSubCategories(self.recordData.category_id);
      }
    });
  },

  getSubCategories: function(categoryId) {
    var self = this;

    var input = {
      serviceID: "fry_int_fleet$asset-categories-master-values",
      category_id: categoryId,
      asset_name: "fleet",
      httpheaders: {},
      httpconfig: {}
    };

    mfintegrationsecureinvokerasync(input, "fry_int_fleet", "asset-categories-master-values",
                                    function(status, response) {

      if (response.opstatus !== 0) return;

      var subcat_array = [];
      var selectedSubCategoryName = "";

      response.records.forEach(function(res) {

        subcat_array.push({
          lblData: res.cat_name,
          lblId: res.cat_id
        });

        // ✅ match with record
        if (self.recordData && res.cat_id == self.recordData.sub_category_id) {
          selectedSubCategoryName = res.cat_name;
        }
      });

      self.view.details2.segVehicleDetails.setData(subcat_array);
      self.subcatarray = subcat_array;

      // ✅ Prefill subcategory
      self.view.details2.txbData.text = selectedSubCategoryName || "";
    });
  },

  segOnRowClickActionCategory: function(){
    var catSelectedRow = this.view.details1.segVehicleDetails.selectedRowItems;

    if (catSelectedRow && catSelectedRow.length > 0 && catSelectedRow[0]) {
      var selectedItem = catSelectedRow[0];

      if (selectedItem.lblData && selectedItem.lblId) {
        voltmx.store.setItem("categoriesSelectedRowName", selectedItem.lblData);
        voltmx.store.setItem("categoriesSelectedRowId", selectedItem.lblId);

        this.view.details1.txbData.text  = selectedItem.lblData;
        this.view.details1.flxSegment.setVisibility(false);

        this.getSubCategories(selectedItem.lblId);
      } else {
        kony.print("Selected category row missing lblData or lblId");
      }
    } else {
      kony.print("No item selected in SegCatageoryList");
    }


  },

  segOnRowClickSubCategoryAction: function(){
    var self = this;
    var selectedSubCategory = this.view.details2.segVehicleDetails.selectedRowItems;

    if (selectedSubCategory && selectedSubCategory.length > 0 && selectedSubCategory[0]) {
      var selectedItem = selectedSubCategory[0];

      if (selectedItem.lblData && selectedItem.lblId) {
        this.view.details2.txbData.text = selectedItem.lblData;
        this.view.details2.flxSegment.setVisibility(false);

        voltmx.store.setItem("subCategorySelected", selectedItem.lblData);
        voltmx.store.setItem("SubCategorySelectedRowId", selectedItem.lblId);
      } else {
        kony.print("Selected item does not contain expected keys: lblData or lblId");
      }
    } else {
      kony.print("No item selected in segSubcatageory");
    }
  },



});