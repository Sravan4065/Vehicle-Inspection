define({ 

 onNavigate: function()
  {
    var self = this;
    this.view.preShow = this.onPreShow.bind(this);
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
      key: "key" // for future use (language / navigation)
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
}


 });