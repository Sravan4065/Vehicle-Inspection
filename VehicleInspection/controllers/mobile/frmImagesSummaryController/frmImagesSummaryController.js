define({ 

  onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmImagesSummary");
    
//      this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    
    this.view.segInwardEntryList.onRowClick = () =>
    {
      NavigationManager.push("frmImageCatageory");
    }
  },

 });