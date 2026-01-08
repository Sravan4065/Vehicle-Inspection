define({ 


   onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmImageCatageory");
    
    this.view.Segimagcatageory.onRowClick =  () =>
    {
      NavigationManager.push("frmImageCategorySub");
    }
  }

 });