define({ 

 onNavigate: function(context)
  {
    var self = this;
    this.serviceId = context;
    this.view.preShow = this.onPreShow.bind(this);
    this.view.segInspectionItems.onRowClick = this.onRowClickAction.bind(this);
  },
  
  onPreShow: function()
  {
//     this.insertIntoSegInspectionItems();
    this.invokeSelectedInspectionPackages();
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
         "service_id": self.serviceId
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
        "lblServiceType": record.value_en,
        "imgRight": "imgchevronright.png",
        "lov_id": record.master_lov_id
      }
      )
                    });

    self.view.segInspectionItems.setData(data);
  }
},
  
  onRowClickAction: function()
  {
    var self = this;
    var selectedRow = self.view.segInspectionItems && 
        self.view.segInspectionItems.selectedRowItems;
    
    if(selectedRow && selectedRow[0].key)
      {
        switch(selectedRow[0].key)
          {
            case "6":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              NavigationManager.push("frmVehicledetailsInspectionType",selectedRow[0].lov_id);
              break;
              case "7":
//               new voltmx.mvc.Navigation("frmEngineInspectionType").navigate();
               NavigationManager.push("frmEngineInspectionType",selectedRow[0].lov_id);
              break;
              case "8":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmTransmission",selectedRow[0].lov_id);
              break;
              case "9":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmElectricalSystemCondition",selectedRow[0].lov_id);
              break;
              case "10":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmSuspensionCondition",selectedRow[0].lov_id);
              break;
              case "11":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmBrakeSystemCondition",selectedRow[0].lov_id);
              break;
              case "12":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmRimsCondition",selectedRow[0].lov_id);
              break;
              case "13":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmTyres",selectedRow[0].lov_id);
              break;
              case "14":
//               new voltmx.mvc.Navigation("frmChassisDamageReport").navigate();
               NavigationManager.push("frmChassisDamageReport",selectedRow[0].lov_id);
              break;
               case "15":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmInspectionExterior",selectedRow[0].lov_id);
              break;
              case "16":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmInspectionInterior",selectedRow[0].lov_id);
               break;
               case "17":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmVehicleSummaryreport",selectedRow[0].lov_id);
              break;
               case "18":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmServiceHistoryandManuals",selectedRow[0].lov_id);
              break;
               case "19":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmPaintCondition",selectedRow[0].lov_id);
              break;
               case "20":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmEngineBayAndUnderCarriagePhotos",selectedRow[0].lov_id);
              break;
               case "21":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
               NavigationManager.push("frmMiscellaneous",selectedRow[0].lov_id);
              break;
            default:
              return;
          }
      }
  }


 });