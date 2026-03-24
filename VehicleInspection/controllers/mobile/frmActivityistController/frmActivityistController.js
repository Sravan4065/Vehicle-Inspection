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
      if(voltmx.store.getItem("isLogin"))
        {
      NavigationManager.push("frmMyInspectionsSummary");
        }
      else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxIInward.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
      NavigationManager.push("frmInwardEntrySummary");
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxWashing.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
      NavigationManager.push("frmWashingSummary");
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxImages.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
      NavigationManager.push("frmImagesSummary");
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxCompletedInspections.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
      NavigationManager.push("frmCompletedInspections");
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
  },

 });