define({ 


   onNavigate: function(context)
  {
    this.view.preShow = this.onPreShow.bind(this);
    this.context = context.record
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmImageCatageory");
    
    this.view.Segimagcatageory.onRowClick =  this.onRowClickAction.bind(this);
   
    
    this.view.lblSelectedvaluedata.text = this.context.model;
    this.view.lblStatusNumber.text = this.context.lot_no;
    
    this.setDataToSeg();
  },
  
  setDataToSeg: function()
  {
    var self = this;
    self.view.Segimagcatageory.widgetDataMap = 
    {
         flxInwardIcon: "flxInwardIcon",
    imgInwardIcon: "imgInwardIcon",
    flxInwardEntryRightTop: "flxInwardEntryRightTop",
    lblInwardEntry: "lblInwardEntry",
    flxInwardCount: "flxInwardCount",
    lblInwardCount: "lblInwardCount",
    lblVehicleInspectionAndBarCode: "lblVehicleInspectionAndBarCode",
    flxViewDetailsInwardEntry: "flxViewDetailsInwardEntry",
    lblStatrCapturing: "lblStatrCapturing",
    imgFArrowIE: "imgFArrowIE",
    flxInwardEntry: "flxInwardEntry"
    }
    
    var data = [

      {
    flxInwardIcon:{skin: "sknFlxDBFCE7Radius5px"},
    lblInwardEntry: { text: "Exterior Photos" },
    lblInwardCount: { text: "4 photos" },
    key: 1,
    lblVehicleInspectionAndBarCode: { text: "Document Interior Condition" },
    lblStatrCapturing: { text: "Start Capturing" },
    imgInwardIcon: { src: "inwardentrygreen.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
//     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmInwardEntrySummary")}
},
      {
    flxInwardIcon:{skin: "sknFlxffd5daRadius5px"},
    lblInwardEntry: { text: "Damage Documentation" },
    lblInwardCount: { text: "7 pending" },
      key: 2,
    lblVehicleInspectionAndBarCode: { text: "Close-up photos of any damage" },
    lblStatrCapturing: { text: "Start Capturing" },
    imgInwardIcon: { src: "viicon.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
//     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmMyInspectionsSummary")}

},
       {
    flxInwardIcon:{skin: "sknFlxDBFCE7Radius5px"},
    lblInwardEntry: { text: "Engine & Mechanical" },
    lblInwardCount: { text: "4 pending" },
      key: 3,
    lblVehicleInspectionAndBarCode: { text: "Engine bay and mechanical components" },
    lblStatrCapturing: { text: "Start Capturing" },
    imgInwardIcon: { src: "imagesicon.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
//     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmImagesSummary")}

},
       {
    flxInwardIcon:{skin: "sknFlxe0e7ffRadius5px"},
    lblInwardEntry: { text: "Documents" },
    lblInwardCount: { text: "3 pending" },
     key: 4,
    lblVehicleInspectionAndBarCode: { text: "Vehicle Documents and papers" },
    lblStatrCapturing: { text: "Start Capturing" },
    imgInwardIcon: { src: "carwashicon.png" },
    imgFArrowIE: { src: "frontarrowwhite.png" },
//     flxViewDetailsInwardEntry: { onClick: self.navToRelatedActivity.bind(self,"frmWashingSummary")}
}
    ];

    self.view.Segimagcatageory.setData(data);
  },

  
    onRowClickAction: function()
  {
    var self = this;
    var selectedRow = self.view.Segimagcatageory && 
        self.view.Segimagcatageory.selectedRowItems;
  
    if(selectedRow && selectedRow[0].key)
      {
        switch(String(selectedRow[0].key))
          {
            case "1":
//               NavigationManager.push("frmVehicledetailsInspectionType",selectedRow[0].lov_id);
                NavigationManager.push("frmImageCategorySub",{
      record: self.context,
      subCat: "Exterior Images"
    });
              break;
              case "2":
//               new voltmx.mvc.Navigation("frmEngineInspectionType").navigate();
                 NavigationManager.push("frmImageCategorySub",{
      record: self.context,
      subCat: "Damage Documentation"
    });
              break;
              case "3":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
                  NavigationManager.push("frmImageCategorySub",{
      record: self.context,
      subCat: "Engine and Mechanical"
    });
              break;
              case "4":
//               new voltmx.mvc.Navigation("frmVehicledetailsInspectionType").navigate();
                 NavigationManager.push("frmImageCategorySub",{
      record: self.context,
      subCat: "Documents"
    });
              break;
            default:
              return;
          }
      }
  }
 });