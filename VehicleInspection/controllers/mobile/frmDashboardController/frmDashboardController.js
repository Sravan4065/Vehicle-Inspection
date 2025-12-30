define({ 

  onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmDashboard");
  },

  changeApplicationCurrentLocale: function() 
      { 
        var currentLocale = voltmx.i18n.getCurrentLocale();
      //var selectedLang= this.view.btnChangeLang.text;
//         alert("currentLocale :"+currentLocale);
      var currentLocalToSet;
      if(currentLocale === 'en_IN'){
       // this.view.btnChangeLang.text ="Eng";
        voltmx.store.setItem("currentLocale","ar");
        
        currentLocalToSet = 'ar_AE';
//         alert("currentLocalToSet :"+currentLocalToSet);
      }
      else{
        // this.view.btnChangeLang.text ="عربي";
        voltmx.store.setItem("currentLocale","en");
        currentLocalToSet = 'en_IN';
        
        // alert("currentLocalToSet :"+currentLocalToSet);
      }
      voltmx.i18n.setCurrentLocaleAsync(currentLocalToSet, currentLocaleChangeSuccess, currentLocaleChangeFailure);
      function currentLocaleChangeSuccess () {
        var ntf = new voltmx.mvc.Navigation("frmLangChange");
        ntf.navigate();
      }
      function currentLocaleChangeFailure () {
//         alert("Error while changing the current application locale");
      }
    }
 });