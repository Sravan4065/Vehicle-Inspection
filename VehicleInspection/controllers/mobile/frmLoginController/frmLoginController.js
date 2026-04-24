define({ 

 onNavigate: function()
  {
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
var serviceURL = "https://dev2-hcltx.et.ae/authService/100000002/appconfig";

var client = new voltmx.sdk();
//set Pragma Header to disable the use of response cache in browsers.
client.setGlobalRequestParam("Pragma", "no-cache", client.globalRequestParamType.headers);
client.init(appkey, appsecret, serviceURL, function(response) {
// console.log("Init success");
}, function(error) {
// console.log("Init Failure");
});
}

 });