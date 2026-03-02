define({ 

  onNavigate: function()
  {
    this.login1();
    this.view.preShow = this.onPreShow.bind(this);
    
  },
  
  onPreShow: function()
  {

    
  },
  

  
  login1: function() {
    var self = this;

    function SHOW_ALERT_fd10b6306969472cbdf6f91575f6f820_True() {}

    function INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Success(response) {
        if (self.view.defaultBrowserWidgetForOauth2) {
            self.view.remove(self.view.defaultBrowserWidgetForOauth2);
        }

        var instance = voltmx.sdk.getCurrentInstance();
        if (instance.tokens && instance.tokens.AzureB2C && instance.tokens.AzureB2C.provider_token && instance.tokens.AzureB2C.provider_token.params) {
            var accesstoken = instance.tokens.AzureB2C.provider_token.params.access_token;
            var refreshtoken = instance.tokens.AzureB2C.provider_token.params.refresh_token;
            var expon = instance.tokens.AzureB2C.provider_token.params.expires_on;

            voltmx.store.setItem("accesstoken", accesstoken);
            voltmx.store.setItem("refreshtoken", refreshtoken);
            voltmx.store.setItem("expon", expon);
        } else {
            voltmx.print("Provider tokens missing after login!");
        }

        self.getUserObject();
    }

    function INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Failure(error) {
        if (self.view.defaultBrowserWidgetForOauth2) {
            self.view.remove(self.view.defaultBrowserWidgetForOauth2);
        }
        voltmx.print("Login failed: " + JSON.stringify(error));
    }

    var login_inputparam = login_inputparam || {};
    login_inputparam["serviceID"] = "AzureB2C$login";
    login_inputparam["operation"] = "login";

    // Optional: clear cookies to ensure fresh Azure B2C session
    voltmx.net.clearCookies();

    // --- Create browser widget if missing ---
    if (!self.view.defaultBrowserWidgetForOauth2) {
        self.view.add(new voltmx.ui.Browser({
            "id": "defaultBrowserWidgetForOauth2",
            "left": "0dp",
            "top": "0dp",
            "width": "100%",
            "height": "100%"
        }, {}, {}));
    }

    // --- ✅ Always rebind the onPageFinished event ---
    if (self.view.defaultBrowserWidgetForOauth2) {
        voltmx.print("Rebinding onPageFinished for Browser Widget");
//         self.view.defaultBrowserWidgetForOauth2.handleRequest = self.handlePageFinished.bind(self);
     self.view.defaultBrowserWidgetForOauth2.handleRequest=  function(b, params) {
    var url = (params.originalURL || "");
    voltmx.print("handleRequest → " + url);

     if (url.indexOf("CombinedSigninAndSignup/unified") !== -1 &&
        url.indexOf("local=signup") !== -1) {

        voltmx.print("Detected Signup URL, navigating to frmRegister1");
        if (!self._navigatedToRegister) {
            self._navigatedToRegister = true;
            new voltmx.mvc.Navigation("frmRegister1").navigate();
        }
        return; // stop further processing for this event
    }

    // --- Handle Forgot Password Flow ---
    if (( url.indexOf("CombinedSigninAndSignup/forgotPassword") !== -1) || ( url.indexOf("The+user+has+forgotten+their+password") !== -1) ){

        voltmx.print("Detected Forgot Password URL, redirecting to password reset policy");
        
//         var passwordResetURL = "https://etuatconsumeraccess.b2clogin.com/etuatconsumeraccess.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_PASSWORDRESET&client_id=c8a59cb7-040d-441a-b358-56e2a1d7a829&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fuat-hcltx.et.ae%2FauthService%2F100000002%2Foauth2%2Fcallback&scope=openid&response_type=id_token&prompt=login";
        var passwordResetURL = "https://etdevconsumeraccess.b2clogin.com/etdevconsumeraccess.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_PasswordReset&client_id=f1e16048-d97b-4423-ab95-049ad21fdfa2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fdev-hcltx.et.ae%2FauthService%2F100000002%2Foauth2%2Fcallback&scope=openid&response_type=id_token&prompt=login";
        // Option 1: Open externally (for quick testing)
//         voltmx.application.openURL(passwordResetURL);
      
       if (self.view.defaultBrowserWidgetForOauth2) {
        self.view.defaultBrowserWidgetForOauth2.isVisible = false;
        // Defer removal slightly to avoid breaking identity flow
        voltmx.timer.schedule(
            "removeLoginBrowserTimer",
            function() {
                try {
                    if (self.view.defaultBrowserWidgetForOauth2) {
                        self.view.remove(self.view.defaultBrowserWidgetForOauth2);
                        self.view.defaultBrowserWidgetForOauth2 = null;
                        voltmx.print("Login browser widget removed safely");
                    }
                } catch (err) {
                    voltmx.print("Error removing login browser: " + err);
                }
            },
            0.5, // half-second delay
            false
        );
    }
      
      
          self.callForgotPasswordIdentity();
        // Option 2 (later): If you want it inside same browser widget
        // browserWidget.requestURLConfig = { URL: passwordResetURL };
        // browserWidget.requestURLConfig.method = constants.BROWSER_REQUEST_METHOD_GET;
        // browserWidget.reload();
        
        return;
    }

    return false; // allow normal navigation
};
    }

    self._navigatedToRegister = false;

    // --- Attach browser widget to identity flow ---
    login_inputparam["browserWidget"] = self.view.defaultBrowserWidgetForOauth2;

    // --- Invoke identity service ---
    AzureB2C$login = mfidentityserviceinvoker(
        "AzureB2C",
        login_inputparam,
        INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Success,
        INVOKE_IDENTITY_SERVICE_gaa8c1b9dbdc47888f6ce42aa0f7d793_Failure
    );
},

  
  
  //--


 
  
  
  getUserObject: function() {
  var self = this;
   var serviceName = "AzureB2C";
      var client = voltmx.sdk.getCurrentInstance();
      var identitySvc = client.getIdentityService(serviceName);

      var options = {
        slo: true,
        browserWidget: self.view.browserLogoutWidget // use self instead of this
      };

  function invoke_service_callback(status, get_user_object) {
  //  Success path first
  if (
get_user_object &&
  get_user_object.opstatus === 0 &&
  get_user_object.httpresponse &&
  get_user_object.httpresponse.responsecode === 200 &&
  get_user_object.rawResponse
  ) {
    voltmx.print("User object received successfully.");

    try {
      var rawResponse = get_user_object.rawResponse || {};
      var getUserAccesstoken = rawResponse.access_token || "";
      var userId = rawResponse.user_id || "";
      var userAccessTokenExp = rawResponse.expires_in || "";
      var jobtitle = rawResponse.job_title || "";
      var securityDeposit = rawResponse.security_deposit || "";
      var nick = rawResponse.nick || "";
      var name = rawResponse.name || "";
      var user_code = rawResponse.user_code || "";
      var regDate = rawResponse.reg_date || "";
      var email = rawResponse.email || "";
      var monthYear;
      if(regDate){
         monthYear = new Date(regDate).toLocaleString("en-US", { month: "long", year: "numeric" });
      }

      voltmx.store.setItem("isLogin", true);
      voltmx.store.setItem("isUserCreated", true);
      voltmx.store.setItem("userObject", get_user_object);
      voltmx.store.setItem("userId", userId);
      voltmx.store.setItem("getUserAccesstoken", getUserAccesstoken);
      voltmx.store.setItem("userAccessTokenExp", userAccessTokenExp);
      voltmx.store.setItem("jobTitle", jobtitle);
      voltmx.store.setItem("securityDeposit", securityDeposit);
      voltmx.store.setItem("username", nick);
      voltmx.store.setItem("fullnameuo", name);
      voltmx.store.setItem("user_code", user_code);
      voltmx.store.setItem("regDate",monthYear);
      voltmx.store.setItem("email", email);
      voltmx.store.setItem("userEmail", email);
      
      var roles = jobtitle
        ? jobtitle.split(";").map(function(r) {
            return r.trim().toLowerCase();
          })
        : [];

      var defaultMode = roles.indexOf("buyer") !== -1 ? "buyer" : "seller";
      voltmx.store.setItem("mode", defaultMode);
    } catch (e) {
      voltmx.print("Error while setting user session: " + e.message);
    }

    new voltmx.mvc.Navigation("frmDashboard").navigate();
    return;
  }

  //  Anything else = error → logout
  voltmx.print("User object missing or invalid. Logging out...");
  identitySvc.logout(
    function(response) {
      voltmx.print("Logout success: " + JSON.stringify(response));
      voltmx.net.clearCookies();
      self.clearUserSession();
    },
    function(error) {
      if (error && error.message && error.message.indexOf("sessions is not active") !== -1) {
        voltmx.print("Session expired. Clearing stored tokens...");
        voltmx.net.clearCookies();
        self.clearUserSession();
      } else {
        voltmx.print("Logout failure: " + JSON.stringify(error));
      }
    },
    options
  );

  new voltmx.mvc.Navigation("frmLoginScreen").navigate();
}


 var get_user_object_inputparam = get_user_object_inputparam || {};
  var currentLocale = voltmx.store.getItem("currentLocale");
  get_user_object_inputparam["serviceID"] = "ms_user$get-user-object";
  get_user_object_inputparam["session_language"] = currentLocale || "en";
  var get_user_object_httpheaders = {
    jwt_azure_token: voltmx.store.getItem("accesstoken")
  };

  get_user_object_inputparam["httpheaders"] = get_user_object_httpheaders;
  get_user_object_inputparam["httpconfig"] = {};

  ms_user$get_user_object = mfintegrationsecureinvokerasync(
    get_user_object_inputparam,
    "ms_user",
    "get-user-object",
    invoke_service_callback
  );
},
  
   clearUserSession: function() {
  voltmx.store.setItem("isLogin", false);
  voltmx.store.setItem("isUserCreated", false);
  voltmx.store.removeItem("refreshtoken");
  voltmx.store.removeItem("expon");
  voltmx.store.removeItem("userAccessTokenExp");
  voltmx.store.removeItem("accesstoken");
  voltmx.store.removeItem("userObject");
  voltmx.store.removeItem("getUserAccesstoken");
  voltmx.store.removeItem("userId");
  voltmx.store.removeItem("userEmail");
},


  
  handlePageFinished: function(browserWidget, params) {
    var self = this;
    var url = params && (params.originalURL || params.url);
    voltmx.print("Page finished loading with URL: " + url);

    if (!url) return;

    // --- Handle Signup Flow ---
    if (url.indexOf("CombinedSigninAndSignup/unified") !== -1 &&
        url.indexOf("local=signup") !== -1) {

        voltmx.print("Detected Signup URL, navigating to frmRegister1");
        if (!self._navigatedToRegister) {
            self._navigatedToRegister = true;
            new voltmx.mvc.Navigation("frmRegister1").navigate();
        }
        return; // stop further processing for this event
    }

    // --- Handle Forgot Password Flow ---
    if (( url.indexOf("CombinedSigninAndSignup/forgotPassword") !== -1) || ( url.indexOf("The+user+has+forgotten+their+password") !== -1) ){

        voltmx.print("Detected Forgot Password URL, redirecting to password reset policy");
        
//         var passwordResetURL = "https://etuatconsumeraccess.b2clogin.com/etuatconsumeraccess.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_PASSWORDRESET&client_id=c8a59cb7-040d-441a-b358-56e2a1d7a829&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fuat-hcltx.et.ae%2FauthService%2F100000002%2Foauth2%2Fcallback&scope=openid&response_type=id_token&prompt=login";
        var passwordResetURL = "https://etdevconsumeraccess.b2clogin.com/etdevconsumeraccess.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_PasswordReset&client_id=f1e16048-d97b-4423-ab95-049ad21fdfa2&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fdev-hcltx.et.ae%2FauthService%2F100000002%2Foauth2%2Fcallback&scope=openid&response_type=id_token&prompt=login";
        // Option 1: Open externally (for quick testing)
//         voltmx.application.openURL(passwordResetURL);
      
       if (self.view.defaultBrowserWidgetForOauth2) {
        self.view.defaultBrowserWidgetForOauth2.isVisible = false;
        // Defer removal slightly to avoid breaking identity flow
        voltmx.timer.schedule(
            "removeLoginBrowserTimer",
            function() {
                try {
                    if (self.view.defaultBrowserWidgetForOauth2) {
                        self.view.remove(self.view.defaultBrowserWidgetForOauth2);
                        self.view.defaultBrowserWidgetForOauth2 = null;
                        voltmx.print("Login browser widget removed safely");
                    }
                } catch (err) {
                    voltmx.print("Error removing login browser: " + err);
                }
            },
            0.5, // half-second delay
            false
        );
    }
      
      
          self.callForgotPasswordIdentity();
        // Option 2 (later): If you want it inside same browser widget
        // browserWidget.requestURLConfig = { URL: passwordResetURL };
        // browserWidget.requestURLConfig.method = constants.BROWSER_REQUEST_METHOD_GET;
        // browserWidget.reload();
        
        return;
    }
},
  
  callForgotPasswordIdentityBrowser: function() {
     var self = this;

    function INVOKE_SERVICE_ad56f7e76182486cba3cc7b29818868a_Success(response) {}
    function INVOKE_SERVICE_ad56f7e76182486cba3cc7b29818868a_Failure(error) {}
    if (login_inputparam == undefined) {
        var login_inputparam = {};
    }
    login_inputparam["serviceID"] = "ForgetPassword$login";
    login_inputparam["operation"] = "login";
    login_inputparam["UseDeviceBrowser"] = true;
    //#ifdef preview
    //#ifdef iphone
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#ifdef android
    login_inputparam['success_url'] = "https://www.hclvoltmx.com/marketplace/app_preview";
    //#endif
    //#ifdef androidwear
    login_inputparam['success_url'] = "https://www.hclvoltmx.com/marketplace/app_preview";
    //#endif
    //#ifdef ipad
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#ifdef winphone8
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif                        
    //#ifdef windows8
    login_inputparam['success_url'] = "konyfunctionalpreview://";
    //#endif
    //#else
    //#ifdef iphone
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#ifdef android
    login_inputparam['success_url'] = encodeURIComponent("intent://com.orgname.Alwataneya2/#Intent;scheme=alwataneya2;package=com.orgname.Alwataneya2;end");
    //#endif
    //#ifdef androidwear
    login_inputparam['success_url'] = encodeURIComponent("intent://com.orgname.Alwataneya2/#Intent;scheme=alwataneya2;package=com.orgname.Alwataneya2;end");
    //#endif
    //#ifdef ipad
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#ifdef winphone8
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif                        
    //#ifdef windows8
    login_inputparam['success_url'] = "alwataneya2://";
    //#endif
    //#endif
    ForgetPassword$login = mfidentityserviceinvoker("ForgetPassword", login_inputparam, INVOKE_SERVICE_ad56f7e76182486cba3cc7b29818868a_Success, INVOKE_SERVICE_ad56f7e76182486cba3cc7b29818868a_Failure);

  },
  
  callForgotPasswordIdentity: function() {
//     try {
//         // Just navigate to the browser form
//         var navObj = new voltmx.mvc.Navigation("frmForgotBrowser");
//         navObj.navigate();
//         voltmx.print("Navigated to frmForgotBrowser for forgot password flow");
//     } catch (e) {
//         voltmx.print("callForgotPasswordIdentity error: " + e);
//     }
    
    try {
   // voltmx.application.destroyForm("frmForgotBrowser");
    voltmx.print("Destroyed frmForgotBrowser (if it existed)");
} catch (e) {
    voltmx.print("Error destroying frmForgotBrowser: " + e);
}

new voltmx.mvc.Navigation("frmForgotBrowser").navigate();

}

// callForgotPasswordIdentity: function() {
//     var self = this;

//     function onSuccess(response) {
//         voltmx.print("Forgot password success: " + JSON.stringify(response));
//     }

//     function onFailure(error) {
//         voltmx.print("Forgot password failed: " + JSON.stringify(error));
//     }

//     var login_inputparam = {
//         "serviceID": "ForgetPassword$login",
//         "operation": "login",
//         "UseDeviceBrowser": false // 🚫 don’t use system browser
//     };

//     // Navigate to our in-app browser form
//     var navObj = new voltmx.mvc.Navigation("frmForgotBrowser");
//     navObj.navigate({
//         onForgot: function(browserWidget) {
//             // attach browser widget to the identity flow
//             login_inputparam["browserWidget"] = browserWidget;

//             // invoke identity service once browser is ready
//             mfidentityserviceinvoker(
//                 "ForgetPassword",
//                 login_inputparam,
//                 onSuccess,
//                 onFailure
//             );
//         }
//     });
// },
  
  
// callForgotPasswordIdentity: function() {
//     var self = this;

//     function onSuccess(response) {
//         voltmx.print("Forgot password success: " + JSON.stringify(response));
//         // Optionally, remove the browser after success
//         if (self.view.defaultBrowserWidgetForOauth2) {
//             self.view.remove(self.view.defaultBrowserWidgetForOauth2);
//         }
//     }

//     function onFailure(error) {
//         voltmx.print("Forgot password failed: " + JSON.stringify(error));
//         if (self.view.defaultBrowserWidgetForOauth2) {
//             self.view.remove(self.view.defaultBrowserWidgetForOauth2);
//         }
//     }

//     var login_inputparam = {
//         "serviceID": "ForgetPassword$login",
//         "operation": "login",
//         "UseDeviceBrowser": false // keep in-app
//     };

//     // ---  Remove any existing browser first ---
//     if (self.view.defaultBrowserWidgetForOauth2) {
//         voltmx.print("Removing existing browser widget");
//         self.view.remove(self.view.defaultBrowserWidgetForOauth2);
//         self.view.defaultBrowserWidgetForOauth2 = null;
//     }

//     // ---  Create a fresh browser for the forgot password flow ---
//     voltmx.print("Creating new browser widget for Forgot Password");
//     var forgotBrowser = new voltmx.ui.Browser({
//         "id": "defaultBrowserWidgetForOauth2",
//         "left": "0dp",
//         "top": "0dp",
//         "width": "100%",
//         "height": "100%"
//     }, {}, {});

//     // ---  Add browser to current form ---
//     self.view.add(forgotBrowser);

//     // ---  Rebind onPageFinished for this new browser ---
//     forgotBrowser.onPageFinished = function(browserWidget, params) {
//         var url = params && (params.originalURL || params.url);
//         voltmx.print("Forgot browser page finished loading: " + url);

//         // Example: detect confirmation page or redirect
//         if (url && url.indexOf("passwordresetconfirmation") !== -1) {
//             voltmx.print("Password reset completed successfully");
//             // Optionally remove the browser
//             self.view.remove(forgotBrowser);
//         }
//     };

//     // ---  Attach browser to input params ---
//     login_inputparam["browserWidget"] = forgotBrowser;

//     // ---  Call identity service ---
//     voltmx.print("Invoking ForgetPassword identity service");
//     mfidentityserviceinvoker(
//         "ForgetPassword",
//         login_inputparam,
//         onSuccess,
//         onFailure
//     );
// }


  
 

 });