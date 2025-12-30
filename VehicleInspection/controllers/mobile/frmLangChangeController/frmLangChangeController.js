define({ 


  onNavigate: function()
  {
    this.view.postShow = this.onPostShow.bind(this);
  },
  onPostShow: function()
  {
    this.destroyCurrentFromAndNavigateBackToCurrentForm();
  },
destroyCurrentFromAndNavigateBackToCurrentForm: function () 
  {
  var ntf; 
  var previousForm=voltmx.application.getPreviousForm().id;
   voltmx.print('previous form is '+ previousForm);
    //alert('previous form is '+ previousForm);
       voltmx.application.destroyForm(previousForm);
         ntf = new voltmx.mvc.Navigation(previousForm);
        ntf.navigate();
}
 });