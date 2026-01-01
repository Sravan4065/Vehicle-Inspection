define({ 

 onNavigate: function()
  {
    var self = this;
    this.view.preShow = this.onPreShow.bind(this);
    this.view.segInspectionItems.onRowClick = this.onRowClickAction.bind(this);
  },
  
  onPreShow: function()
  {
    this.insertIntoSegInspectionItems();
  },
  
  insertIntoSegInspectionItems: function () {
  var self = this;

  if (self.view && self.view.segInspectionItems) {

    self.view.segInspectionItems.widgetDataMap = {
      lblServiceType: "lblServiceType",
      imgRight: "imgRight",
      key: "key" 
    };

    var data = [
      { key: "VEHICLE_DETAILS", lblServiceType: "Vehicle Details", imgRight: "imgchevronright.png" },
      { key: "ENGINE_CONDITION", lblServiceType: "Engine Condition", imgRight: "imgchevronright.png" },
      { key: "TRANSMISSION", lblServiceType: "Transmission", imgRight: "imgchevronright.png" },
      { key: "ELECTRICAL_SYSTEM", lblServiceType: "Electrical System Condition", imgRight: "imgchevronright.png" },
      { key: "SUSPENSION", lblServiceType: "Suspension Condition", imgRight: "imgchevronright.png" },
      { key: "BRAKE_SYSTEM", lblServiceType: "Brake System Condition", imgRight: "imgchevronright.png" },
      { key: "RIMS", lblServiceType: "Rims Condition", imgRight: "imgchevronright.png" },
      { key: "TYRES", lblServiceType: "Tyres Condition", imgRight: "imgchevronright.png" },
      { key: "CHASSIS_DAMAGE", lblServiceType: "Chassis Damage Report", imgRight: "imgchevronright.png" },
      { key: "EXTERIOR", lblServiceType: "Exterior", imgRight: "imgchevronright.png" },
      { key: "INTERIORS", lblServiceType: "Interiors", imgRight: "imgchevronright.png" },
      { key: "VEHICLE_SUMMARY", lblServiceType: "Vehicle Summary Report", imgRight: "imgchevronright.png" },
      { key: "SERVICE_HISTORY", lblServiceType: "Service History & Manuals", imgRight: "imgchevronright.png" },
      { key: "PAINT_CONDITION", lblServiceType: "Paint Condition", imgRight: "imgchevronright.png" },
      { key: "ENGINE_BAY_PHOTOS", lblServiceType: "Engine Bay & Undercarriage Photos", imgRight: "imgchevronright.png" }
    ];

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
            case "VEHICLE_DETAILS":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "ENGINE_CONDITION":
              new voltmx.mvc.Navigation("frmEngineInspectionType").navigate();
              break;
              case "TRANSMISSION":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "VEHICLE_DETAILS":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "ELECTRICAL_SYSTEM":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "SUSPENSION":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "BRAKE_SYSTEM":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "RIMS":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "TYRES":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
              case "CHASSIS_DAMAGE":
              new voltmx.mvc.Navigation("frmChassisDamageReport").navigate();
              break;
               case "EXTERIOR":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
               case "VEHICLE_SUMMARY":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
               case "SERVICE_HISTORY":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
               case "PAINT_CONDITION":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
               case "ENGINE_BAY_PHOTOS":
              new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
              break;
            default:
              return;
          }
      }
  }


 });