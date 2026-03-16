function currentEpochTime() {
  const epochMillis = new Date().getTime();
  voltmx.print("=============================");
  voltmx.print(epochMillis);
  voltmx.print("=============================");
}
 
 
function checkTokenValidatity(onSuccessCallback) {
  var epochMillis = new Date().getTime();
  var expires_in = Number(voltmx.store.getItem("userAccessTokenExp")); // stored expiry time in ms
 
  voltmx.print("Token expiration time: " + expires_in);
  voltmx.print("Current epoch time: " + epochMillis);
 
  if (expires_in > epochMillis) {
    voltmx.print("Token still valid. Proceeding with callback.");
    onSuccessCallback(); // token is valid, proceed
  } else {
    voltmx.print("Token expired. Refreshing...");
    calling_service(onSuccessCallback); // refresh and then proceed
  }
}
 
// Function to call the token refresh service
function calling_service(onRefreshComplete) {
  var refreshtoken = voltmx.store.getItem("refreshtoken");
 
  var get_refresh_token_inputparam = {
    "serviceID": "ms_user$get-refresh-token",
    "platform": "mobile",
    "httpheaders": {
      "refresh_token": refreshtoken
    },
    "httpconfig": {}
  };
 
  mfintegrationsecureinvokerasync(
    get_refresh_token_inputparam,
    "ms_user",
    "get-refresh-token",
    function(status, response) {
      get_refresh_token_callback(status, response, onRefreshComplete);
    }
  );
}
 
// Properly defined callback function working but doesnt give network errors
// function get_refresh_token_callback(status, response, onRefreshComplete) {
//   if (!response || !response.rawResponse || !response.rawResponse.data || !response.rawResponse.data.access_token) {
//     voltmx.print("Token refresh failed.");
//     return;
//   }
 
//   var newToken = response.rawResponse.data.access_token;
//     var newExpiry = Number(response.rawResponse.data.expires_in);
 
//   voltmx.store.setItem("getUserAccesstoken", newToken);
//   voltmx.store.setItem("userAccessTokenExp", newExpiry); // update stored expiry
  
  
  
//   voltmx.print("New token stored. Proceeding...");
//   onRefreshComplete(); // continue the original request
// }

function get_refresh_token_callback(status, response, onRefreshComplete) {
  var currentForm = voltmx.application.getCurrentForm();
  
  // Handle error: network or service issue
  if (!response || response.opstatus !== 0 || !response.rawResponse || !response.rawResponse.data || !response.rawResponse.data.access_token) {
    voltmx.print("Token refresh failed.");

    // Show flexError if available in the current form
    if (currentForm && currentForm.flxError) {
      if(response && response.opstatus === 1011){
        voltmx.application.dismissLoadingScreen();

      currentForm.flxError.setVisibility(true);
        return;
      }
      else{
         currentForm.flxError.setVisibility(false);
      }
    }
      
        if(currentForm && currentForm.SmthngWentWrong)
          {
            if(response && response.opstatus !== 0){
              voltmx.application.dismissLoadingScreen();
              
              
              if (response && response.httpStatusCode === 400 || response.httpStatusCode === 401) {
   logoutSessionModule()
  return;
}

              
              
              
            currentForm.SmthngWentWrong.setVisibility(true);
            
              var errMsg = "Something went wrong";

    if (response && response.rawResponse && response.rawResponse.error && response.rawResponse.error.message) {
      errMsg = response.rawResponse.error.message;
    }
              currentForm.SmthngWentWrong.lblSomethingWentWrong.text = errMsg;
            return;
          }
        else{
          currentForm.SmthngWentWrong.setVisibility(false);
        }
      
    }
     
    
  }

  // Success path
  var newToken = "";
var newExpiry = 0;
 if (
    response &&
    response.rawResponse &&
    response.rawResponse.data &&
    typeof response.rawResponse.data.access_token !== "undefined"
) {
    newToken = response.rawResponse.data.access_token;
}

if (
    response &&
    response.rawResponse &&
    response.rawResponse.data &&
    typeof response.rawResponse.data.expires_in !== "undefined"
) {
    newExpiry = Number(response.rawResponse.data.expires_in);
}

  voltmx.store.setItem("getUserAccesstoken", newToken);
  voltmx.store.setItem("userAccessTokenExp", newExpiry);

  voltmx.print("New token stored. Proceeding...");
  
  // Hide error if shown
  if (currentForm && currentForm.flxError) {
    currentForm.flxError.setVisibility(false);
  }

  onRefreshComplete(); // continue after refreshing token
}


 


  function logoutSessionModule() {
      try {
        voltmx.application.showLoadingScreen(
          null,
          "Logging out..No session Found",
          constants.LOADING_SCREEN_POSITION_ONLY_CENTER,
          false,
          true,
          {
            shouldShowLabelInBottom: "true",
            separatorHeight: 45,
            progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
            progressIndicatorColor: "Gray"
          }
        );

        var serviceName = "AzureB2C";
        var client = voltmx.sdk.getCurrentInstance();
        var identitySvc = client.getIdentityService(serviceName);

        var options = {
          slo: true,
          browserWidget: voltmx.application.getCurrentForm().browserLogoutWidget
        };

        identitySvc.logout(
          function(response) {
            voltmx.print("Logout success: " + JSON.stringify(response));

            voltmx.net.clearCookies();

            voltmx.store.setItem("isLogin", false);
            voltmx.store.removeItem("refreshtoken");
            voltmx.store.removeItem("expon");
            voltmx.store.removeItem("userAccessTokenExp");
            voltmx.store.setItem("isUserCreated", false);
            voltmx.store.removeItem("accesstoken");
            voltmx.store.removeItem("userObject");
            voltmx.store.removeItem("getUserAccesstoken");
            voltmx.store.removeItem("userId");
            voltmx.store.removeItem("userEmail");

            voltmx.application.dismissLoadingScreen();

            var nav = new voltmx.mvc.Navigation("frmLoginScreen");
            nav.navigate();
          },
          function(error) {
            voltmx.print("Logout failure: " + JSON.stringify(error));

            // Handle session already expired
            if (
              error &&
              error.message &&
              error.message.indexOf("sessions is not active") !== -1
            ) {
              voltmx.net.clearCookies();
              voltmx.store.setItem("isLogin", false);
              voltmx.store.removeItem("refreshtoken");
              voltmx.store.removeItem("expon");
              voltmx.store.removeItem("userAccessTokenExp");
              voltmx.store.setItem("isUserCreated", false);
              voltmx.store.removeItem("accesstoken");
              voltmx.store.removeItem("userObject");
              voltmx.store.removeItem("getUserAccesstoken");
              voltmx.store.removeItem("userId");
              voltmx.store.removeItem("userEmail");
            }

            voltmx.application.dismissLoadingScreen();

            var nav = new voltmx.mvc.Navigation("frmLoginScreen");
            nav.navigate();
          },
          options
        );
      } catch (e) {
        voltmx.print("Logout exception: " + e.message);
        voltmx.application.dismissLoadingScreen();

        var nav = new voltmx.mvc.Navigation("frmLoginScreen");
        nav.navigate();
      }
    }


function toggleFooterIcons(formObj, formName) {
  if (!formObj || !formObj.flxfooter) return;

  var footer = formObj.flxfooter;
  var activeIndex = -1;


  switch (formName) {
    case "frmDashboard":
      activeIndex = 1; // Home
      break;

    case "frmMyInspectionsSummary":
      activeIndex = 2; // Inspections
      break;

    case "frmInwardEntrySummary":
      activeIndex = 3; // Inward
      break;

    case "frmImagesSummary":
      activeIndex = 4; // Images
      break;

    case "frmProfile":
      activeIndex = 5; // Profile
      break;
      
    case "frmEngineInspectionType":
      activeIndex = 2; 
      break;
      
    case "frmMyinspectionVehicleDetails":
      activeIndex = 2; 
      break;
      
    case "frmVehicledetailsInspectionType":
      activeIndex = 2;
      break;
      
      case "frmChassisDamageReport":
      activeIndex = 2; 
      break;
      
    case "frmVehicleSummaryreport":
      activeIndex = 2; 
      break;
      
    case "frmImageCatageory":
       activeIndex = 4; 
      break;
      
       case "frmImageCategorySub":
       activeIndex = 4; 
      break;
      
    case  "frmActivityist":
      resetFooterToNormal(footer);
    formObj.forceLayout();
    return;
 
    case  "frmWashingSummary":
      resetFooterToNormal(footer);
    formObj.forceLayout();
    return;
      
    case "frmCompletedInspections":
      resetFooterToNormal(footer);
    formObj.forceLayout();
    return;
      
    default:
      return;
  }

  
  var labels = [
    footer.lblHome,
    footer.lblinspections,
    footer.lblinward,
    footer.lblimages,
    footer.lblprofile
  ];

  var images = [
    footer.imghome,
    footer.imginspections,
    footer.imginward,
    footer.imgaddimages,
    footer.imgprofile
  ];

  var normalIcons = [
    "home.png",
    "inspections.png",
    "inward.png",
    "images.png",
    "profile.png"
  ];

  var activeIcons = [
    "homered.png",
    "inspectionsred.png",
    "inwardred.png",
    "imagesred.png",
    "profilered.png"
  ];

 
  for (var i = 0; i < 5; i++) {
    var isActive = (i + 1) === activeIndex;

    
    var flx = footer["flxH" + (i + 1)];
    if (flx) {
      flx.setVisibility(isActive);
    }

    
    labels[i].skin = isActive
      ? "sknLblDubaid32437Medium"
      : "sknLblDubai231f20Medium";

    
    images[i].src = isActive
      ? activeIcons[i]
      : normalIcons[i];
  }

  formObj.forceLayout();
}

function resetFooterToNormal(footer) {

  var labels = [
    footer.lblHome,
    footer.lblinspections,
    footer.lblinward,
    footer.lblimages,
    footer.lblprofile
  ];

  var images = [
    footer.imghome,
    footer.imginspections,
    footer.imginward,
    footer.imgaddimages,
    footer.imgprofile
  ];

  var normalIcons = [
    "home.png",
    "inspections.png",
    "inward.png",
    "images.png",
    "profile.png"
  ];

  for (var i = 0; i < 5; i++) {

    // hide active underline / highlight flex
    var flx = footer["flxH" + (i + 1)];
    if (flx) {
      flx.setVisibility(false);
    }

    // reset label skin
    labels[i].skin = "sknLblDubai231f20Medium";

    // reset icon
    images[i].src = normalIcons[i];
  }
}

function detectFileType(base64) {
  if (!base64) return ".bin";
 
  if (base64.startsWith("data:image/jpeg") || base64.startsWith("/9j/")) {
    return ".jpg";
  } else if (base64.startsWith("data:image/png") || base64.startsWith("iVBORw0KGgo")) {
    return ".png";
  } else if (base64.startsWith("data:image/webp") || base64.startsWith("UklG")) {
    return ".webp";
  } else if (
    base64.startsWith("data:application/pdf") || 
    base64.startsWith("JVBER")
  ) {
    return ".pdf";
  } else {
    return ".bin";
  }
}

function base64Encode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var encoded = '';
    var i = 0;
 
    while (i < str.length) {
        var c1 = str.charCodeAt(i++);
        var c2 = str.charCodeAt(i++);
        var c3 = str.charCodeAt(i++);
 
        var e1 = c1 >> 2;
        var e2 = ((c1 & 3) << 4) | (c2 >> 4);
        var e3 = ((c2 & 15) << 2) | (c3 >> 6);
        var e4 = c3 & 63;
 
        if (isNaN(c2)) {
            e3 = e4 = 64;
        } else if (isNaN(c3)) {
            e4 = 64;
        }
 
        encoded += chars.charAt(e1) + chars.charAt(e2) + chars.charAt(e3) + chars.charAt(e4);
    }
 
    return encoded;
}

function fetchClientProperties() {
  var client = voltmx.sdk.getCurrentInstance();
  if (!client) {
  voltmx.print("SDK not initialized yet. Retrying after 500ms...");
 
  try {
    voltmx.timer.cancel("fetchClientRetry");
  } catch (e) {
  }
 
  voltmx.timer.schedule("fetchClientRetry", function() {
    fetchClientProperties();
  }, 0.5, false);
 
  return;
}
 

  var configurationSvc = client.getConfigurationService();
  configurationSvc.getAllClientAppProperties(function(response) {
//     voltmx.store.setItem("BASE_URL", response.BASE_URL);
    voltmx.store.setItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY", response.ALWATANEYA_DEVELOPMENT_PUBLIC_APP_KEY);
    voltmx.store.setItem("ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET", response.ALWATANEYA_DEVELOPMENT_PUBLIC_APP_SECRET);
//     voltmx.store.setItem("PAYMENT_ACCESS_TOKEN", response.PAYMENT_ACCESS_TOKEN);
//     voltmx.store.setItem("PAYMENT_ACCESS_URL", response.PAYMENT_ACCESS_URL);
//     voltmx.store.setItem("PAYMENT_ORDER_ID", response.PAYMENT_ORDER_ID);
//     voltmx.store.setItem("DAM_USER_NAME",response.DAM_USER_NAME);
//     voltmx.store.setItem("DAM_PASSWORD",response.DAM_PASSWORD);
    
    
    if (response.PAYMENT_ACCESS_TOKEN) {
    voltmx.store.setItem("PAYMENT_ACCESS_TOKEN", response.PAYMENT_ACCESS_TOKEN);
}

if (response.PAYMENT_ACCESS_URL) {
    voltmx.store.setItem("PAYMENT_ACCESS_URL", response.PAYMENT_ACCESS_URL);
}

if (response.PAYMENT_ORDER_ID) {
    voltmx.store.setItem("PAYMENT_ORDER_ID", response.PAYMENT_ORDER_ID);
}

if (response.DAM_USER_NAME) {
    voltmx.store.setItem("DAM_USER_NAME", response.DAM_USER_NAME);
}

if (response.DAM_PASSWORD) {
    voltmx.store.setItem("DAM_PASSWORD", response.DAM_PASSWORD);
}


  }, function(error) {
    voltmx.print("Failed to retrieve client app properties: " + JSON.stringify(error));
  });
}