define({ 

   onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmActivityist");
  },

 });