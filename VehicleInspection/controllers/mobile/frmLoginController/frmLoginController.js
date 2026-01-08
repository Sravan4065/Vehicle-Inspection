define({ 

 onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
{
  this.view.btnSignIn.onClick = () => {
    new voltmx.mvc.Navigation("frmDashboard").navigate();
  }
}

 });