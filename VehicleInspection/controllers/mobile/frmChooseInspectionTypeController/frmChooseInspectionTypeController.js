define({ 

 onNavigate: function(context)
  {
    var self = this;
    this.serviceId = context.type_service_id;
    this.objectId = context.object_id;
    this.object_service_id = context.object_service_id;
    this.name = context.description;
    this.view.preShow = this.onPreShow.bind(this);
    this.view.segInspectionItems.onRowClick = this.onRowClickAction.bind(this);
  },
  
  onPreShow: function()
  {
//     this.insertIntoSegInspectionItems();
    this.invokeSelectedInspectionPackages();
    this.view.flxHeading.lblImages.text = this.name;
    voltmx.store.setItem("fromSignature",false);
    this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
  },
  
  invokeSelectedInspectionPackages: function()
  {
    var self = this;
voltmx.application.showLoadingScreen(null,"LoadingScreen",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);
    
    var serviceName = "fry_int_admin";
   var integrationObj =  voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "get-selected-inspection-packages";
    var headers = 
        {
          "user_token": voltmx.store.getItem("getUserAccesstoken")
        }
    
    var data = 
        {
         "service_id": self.serviceId,
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
              self.insertIntoSegInspectionItems(response.records);
            }
          else
            {
              self.view.segInspectionItems.setData([]);
              voltmx.print("no records");
            }
        }
      else
        {
          self.view.segInspectionItems.setData([]);
          voltmx.print("Invalid response");
        }
    }
    
    function failureCallback(error)
    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);
    }
  },
  
  insertIntoSegInspectionItems: function (records) {
  var self = this;

  if (self.view && self.view.segInspectionItems) {

    self.view.segInspectionItems.widgetDataMap = {
      lblServiceType: "lblServiceType",
      imgRight: "imgRight",
      key: "key"
    };
     var data = [];
//     var data = [
//       { key: "VEHICLE_DETAILS", lblServiceType: "Vehicle Details", imgRight: "imgchevronright.png" },
//       { key: "ENGINE_CONDITION", lblServiceType: "Engine Condition", imgRight: "imgchevronright.png" },
//       { key: "TRANSMISSION", lblServiceType: "Transmission", imgRight: "imgchevronright.png" },
//       { key: "ELECTRICAL_SYSTEM", lblServiceType: "Electrical System Condition", imgRight: "imgchevronright.png" },
//       { key: "SUSPENSION", lblServiceType: "Suspension Condition", imgRight: "imgchevronright.png" },
//       { key: "BRAKE_SYSTEM", lblServiceType: "Brake System Condition", imgRight: "imgchevronright.png" },
//       { key: "RIMS", lblServiceType: "Rims Condition", imgRight: "imgchevronright.png" },
//       { key: "TYRES", lblServiceType: "Tyres Condition", imgRight: "imgchevronright.png" },
//       { key: "CHASSIS_DAMAGE", lblServiceType: "Chassis Damage Report", imgRight: "imgchevronright.png" },
//       { key: "EXTERIOR", lblServiceType: "Exterior", imgRight: "imgchevronright.png" },
//       { key: "INTERIORS", lblServiceType: "Interiors", imgRight: "imgchevronright.png" },
//       { key: "VEHICLE_SUMMARY", lblServiceType: "Vehicle Summary Report", imgRight: "imgchevronright.png" },
//       { key: "SERVICE_HISTORY", lblServiceType: "Service History & Manuals", imgRight: "imgchevronright.png" },
//       { key: "PAINT_CONDITION", lblServiceType: "Paint Condition", imgRight: "imgchevronright.png" },
//       { key: "ENGINE_BAY_PHOTOS", lblServiceType: "Engine Bay & Undercarriage Photos", imgRight: "imgchevronright.png" },
//       { key: "MISCELLANEOUS", lblServiceType: "Miscellaneous", imgRight: "imgchevronright.png" }

//     ];

    records.forEach( (record) =>
                    {
      data.push(
      {
        "key": record.id,
        "lblServiceType": 
        {
         "text": record.value_en,
          "skin": record.is_data_saved === "0"
      ? "sknLblDubai231f2020pxMedium"
      : "sknLblDubai63b15c20pxBold"
        },
        "imgRight": "imgchevronright.png",
        "lov_id": record.master_lov_id,
        "services_id": record.services_id,
//         "is_data_saved": record.is_data_saved
      }
      )
                    });
    
//     data.push(
//     {
//       "key": "21",
//        "lblServiceType": "Miscellaneous",
//         "imgRight": "imgchevronright.png",
//         "lov_id": "36"
//     }
//     )

    self.view.segInspectionItems.setData(data);
  }
},
  
  onRowClickAction: function()
  {
    var self = this;
    var selectedRow = self.view.segInspectionItems && 
        self.view.segInspectionItems.selectedRowItems;
    var navObj = {
      "object_id" : self.objectId,
      "lovId": selectedRow[0].lov_id || "",
      "services_id": selectedRow[0].services_id || "",
      "object_service_id": self.object_service_id
    }
    if(selectedRow && selectedRow[0].lov_id)
      {
        switch(selectedRow[0].lov_id)
          {
            case "21":
//               NavigationManager.push("frmVehicledetailsInspectionType",selectedRow[0].lov_id);
                NavigationManager.push("frmVehicledetailsInspectionType",navObj);
              break;
              case "22":
//               new voltmx.mvc.Navigation("frmEngineInspectionType").navigate();
               NavigationManager.push("frmEngineInspectionType",navObj);
              break;
              case "23":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmTransmission",navObj);
              break;
              case "24":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmElectricalSystemCondition",navObj);
              break;
              case "25":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmSuspensionCondition",navObj);
              break;
              case "26":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmBrakeSystemCondition",navObj);
              break;
              case "27":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmRimsCondition",navObj);
              break;
              case "28":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmTyres",navObj);
              break;
              case "29":
//               new voltmx.mvc.Navigation("frmChassisDamageReport").navigate();
               NavigationManager.push("frmChassisDamageReport",navObj);
              break;
               case "30":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmInspectionExterior",navObj);
              break;
              case "31":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmInspectionInterior",navObj);
               break;
               case "32":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmVehicleSummaryreport",navObj);
              break;
               case "33":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmServiceHistoryandManuals",navObj);
              break;
               case "34":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmPaintCondition",navObj);
              break;
               case "35":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmEngineBayAndUnderCarriagePhotos",navObj);
              break;
               case "44":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmMiscellaneous",navObj);
              break;
            default:
              return;
          }
      }
  }


 });