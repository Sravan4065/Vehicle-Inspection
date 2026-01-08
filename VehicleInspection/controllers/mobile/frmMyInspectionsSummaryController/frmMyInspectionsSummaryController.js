define({ 

  onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmMyInspectionsSummary");
    
//      this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    
    this.view.segInwardEntryList.onRowClick = this.onRowClickAction.bind(this);
  },
  
  onRowClickAction: function()
  {
    NavigationManager.push("frmMyinspectionVehicleDetails");
  }

 });