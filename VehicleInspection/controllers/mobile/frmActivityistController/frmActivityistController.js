define({ 

   onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmActivityist");
    this.view.flxInspection.onClick = () =>
    {
      NavigationManager.push("frmMyInspectionsSummary");
    }
    this.view.flxIInward.onClick = () =>
    {
      NavigationManager.push("frmInwardEntrySummary");
    }
    this.view.flxWashing.onClick = () =>
    {
      NavigationManager.push("frmWashingSummary");
    }
    this.view.flxImages.onClick = () =>
    {
      NavigationManager.push("frmImagesSummary");
    }
    this.view.flxCompletedInspections.onClick = () =>
    {
      NavigationManager.push("frmCompletedInspections");
    }
  },

 });