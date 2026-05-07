define({ 

 onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
{
  this.view.btnSignIn.onClick = () => {
    new voltmx.mvc.Navigation("frmLoginBrowser").navigate();
  }
},
  
   onInit: function()
  {
  //Sample code to initialize Volt MX Foundry Client
var appkey = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY");
var appsecret = voltmx.store.getItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET");
var serviceURL = voltmx.store.getItem("SERVICE_URL");

var client = new voltmx.sdk();
//set Pragma Header to disable the use of response cache in browsers.
client.setGlobalRequestParam("Pragma", "no-cache", client.globalRequestParamType.headers);
client.init(appkey, appsecret, serviceURL, function(response) {
// console.log("Init success");
}, function(error) {
// console.log("Init Failure");
});
},
  
  adjustRTL: function()
  {
    var self = this;
    
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    this.view.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
    this.view.lblWelcomeBack.text = voltmx.i18n.getLocalizedString("Welcome back");
    this.view.btnSignIn.text = voltmx.i18n.getLocalizedString("Sign In");
  }

 });