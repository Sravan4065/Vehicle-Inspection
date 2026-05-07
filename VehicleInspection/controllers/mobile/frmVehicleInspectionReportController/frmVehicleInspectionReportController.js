define({ 

 //Type your controller code here 

  onNavigate: function(context){
    this.context = context;
    this.objectId = context.objectId;
  this.adjustRTL();
    
    this.view.preShow = this.onPreShow.bind(this);
},
  
  
  onPreShow: function()
  {
    var self = this;
    this.setData();
    
    //#ifdef android
    this.view.flxDownloadReport.onClick = this.onDownloadButtonClick.bind(this);
     //#endif
    
    //#ifdef iphone
    this.view.flxDownloadReport.onClick = this.testPDFNFIDownload.bind(this);
     //#endif 
    
//       //#ifdef android
//           self.onDownloadButtonClick(response.file_url);
//           //#endif
//           //#ifdef iphone
//           self.testPDFNFIDownload(response.file_url);
//           //#endif 
    
    
  },
  
  setData: function()
  {
   var self = this;
    self.file_url = "";
   if(self.context && self.context.vehicleDetails)
     {
       if(self.context.vehicleDetails.file_url){
       self.file_url = self.context.vehicleDetails.file_url
       }
       self.view.lblVehicleNumberdata.text = self.context.vehicleDetails.chassis_number || "-";
       self.view.lblInspectednamedata.text = self.context.vehicleDetails.inspected_by || "-";
       self.view.lblMakemodeldata.text = self.context.vehicleDetails.description || "-";
       self.view.lblInspectiondatedata.text = self.context.vehicleDetails.updated_on || "-";
       self.view.lblPackagedata.text = self.context.vehicleDetails.service_type || "-";
       self.view.lblOverallsstatusData.text = self.context.vehicleDetails.status || "-";
     }
    
  },
  
  adjustRTL: function(){

    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";

    var labelAlignment = isArabic ?constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;

    var textAlign =  isArabic ? constants.TEXT_ALIGN_RIGHT : constants.TEXT_ALIGN_LEFT;

    var direction = isArabic;
    
    if(isArabic)
    {
      this.view.lblVehicleNumber.right = "5%";
      this.view.lblVehicleNumberdata.right = "5%";

      this.view.lblMakemodel.right = "5%";
      this.view.lblMakemodeldata.right = "5%";

      this.view.lblPackage.right = "5%";
      this.view.lblPackagedata.right = "5%";
      this.view.lblVehicleNumber.left = null;
      this.view.lblVehicleNumberdata.left = null;

      this.view.lblMakemodel.left = null;
      this.view.lblMakemodeldata.left = null;

      this.view.lblPackage.left = null;
      this.view.lblPackagedata.left = null;



      this.view.lblInspectername.left ="5%";
      this.view.lblInspectednamedata.left ="5%";

      this.view.lblInspectiondate.left ="5%";
      this.view.lblInspectiondatedata.left ="5%";

      this.view.lbloverallstatus.left ="5%";
      this.view.lblOverallsstatusData.left ="5%";


      this.view.lblInspectername.right = null;
      this.view.lblInspectednamedata.right = null;

      this.view.lblInspectiondate.right = null;
      this.view.lblInspectiondatedata.right = null;

      this.view.lbloverallstatus.right = null;
      this.view.lblOverallsstatusData.right = null;
    
    }
    else{
    
    this.view.lblInspectername.right ="5%";
    this.view.lblInspectednamedata.right ="5%";

    this.view.lblInspectiondate.right ="5%";
    this.view.lblInspectiondatedata.right ="5%";

    this.view.lbloverallstatus.right ="5%";
    this.view.lblOverallsstatusData.right ="5%";

    this.view.lblInspectername.left =null;
    this.view.lblInspectednamedata.left =null;

    this.view.lblInspectiondate.left =null;
    this.view.lblInspectiondatedata.left =null;

    this.view.lbloverallstatus.left =null;
    this.view.lblOverallsstatusData.left =null;




    this.view.lblVehicleNumber.left = "5%";
    this.view.lblVehicleNumberdata.left = "5%";

    this.view.lblMakemodel.left = "5%";
    this.view.lblMakemodeldata.left = "5%";

    this.view.lblPackage.left = "5%";
    this.view.lblPackagedata.left = "5%";
    this.view.lblVehicleNumber.right = null;
    this.view.lblVehicleNumberdata.right = null;

    this.view.lblMakemodel.right = null;
    this.view.lblMakemodeldata.right = null;

    this.view.lblPackage.right = null;
    this.view.lblPackagedata.right = null;

    }
    
     this.view.lblVehicleNumber.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
     this.view.lblVehicleNumberdata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblMakemodel.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
    this.view.lblMakemodeldata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblPackage.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    this.view.lblPackagedata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    
    this.view.lblInspectername.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblInspectednamedata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblInspectiondate.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblInspectiondatedata.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lbloverallstatus.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    this.view.lblOverallsstatusData.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_LEFT : constants.CONTENT_ALIGN_MIDDLE_RIGHT;
    
    this.view.lblInspectiondate.text = voltmx.i18n.getLocalizedString("Inspection Date");
     this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
    this.view.flxHeading.lblImages.text = voltmx.i18n.getLocalizedString("Back");
    this.view.lblVehicleInspectionReport.text = voltmx.i18n.getLocalizedString("Vehicle Inspection Report");
    this.view.lblofficaldocument.text = voltmx.i18n.getLocalizedString("Official Inspection Documentation");
    this.view.lblVehicleNumber.text = voltmx.i18n.getLocalizedString("Chassis Number");
    this.view.lblInspectername.text = voltmx.i18n.getLocalizedString("Inspected By");
    this.view.lblMakemodel.text = voltmx.i18n.getLocalizedString("Make & Model");
    this.view.lblInspectiondatedata.text = voltmx.i18n.getLocalizedString("Inspection Date");
    this.view.lblPackage.text = voltmx.i18n.getLocalizedString("Package");
    this.view.lbloverallstatus.text = voltmx.i18n.getLocalizedString("Overall Status");
  },
  
  generateReport: function()
  {
    var self = this;
   var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    //     self.view.flxVehicleReceived.setVisibility(true);
    voltmx.application.showLoadingScreen(null, "Generating Report..",     constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {         shouldShowLabelInBottom: "true",         separatorHeight: 45,         progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,         progressIndicatorColor: "Gray"     });

    var serviceName = "fry_collection";

    var integrationObj = voltmx.sdk.getCurrentInstance()

    .getIntegrationService(serviceName);

    var operationName = "GenerateTechnicalReport";

    var data = {

      "moduleName": "GenerateTechnicalReport",
      "user_token": voltmx.store.getItem("getUserAccesstoken"),
      "moduleType": "Fleet",
      "user_id": voltmx.store.getItem("userId"),
      "object_id": self.objectId,
      "language": isArabic ? "AR" : "EN"

    };

    // Headers

    var headers = {

      //       "user_token": voltmx.store.getItem("getUserAccesstoken") 

    };
    //  integrationObj.invokeOperation
    integrationObj.invokeOperation(

      operationName,

      headers,

      data,

      operationSuccessCompleted,  

      operationFailureCompleted

    );


    function operationSuccessCompleted(response)

    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(response);

      if(response && response.message === "Success")
      {
        if(response.file_url)
        {

          //#ifdef android
          self.onDownloadButtonClick(response.file_url);
          //#endif
          //#ifdef iphone
          self.testPDFNFIDownload(response.file_url);
          //#endif            
        }
      }
      else if(response.dam_response)
      {
        var damResponseStr = response.dam_response || response.dam_response_s;

        if (damResponseStr && damResponseStr.indexOf("409") !== -1) {
          alert("File already exists")
        }
      }
      else if (response.file_url && response.file_name && response.file_id) {
        
        // Store file details (you can store in variable / state / local storage)
        var fileDetails = {
            image_url: response.file_url,
            file_name: response.file_name,
            image_id: response.file_id,
            object_id: self.objectId
        };
        
         var alertConfig = {
            message: "Do you want to delete old report?",
            alertType: constants.ALERT_TYPE_CONFIRMATION,
            alertTitle: "Confirmation",
            yesLabel: "Yes",
            noLabel: "No",
            alertHandler: function(response) {

                if (response) {
                    ImageUploadAndDeletion.deleteFile(fileDetails, function(res, err) {

                        if (!err && res && res.opstatus === 0) {

                           
//                          alert("Old Report Deleted Successfully");   
                   
                            var alertConfig = {
            message: "Do you want to download report?",
            alertType: constants.ALERT_TYPE_CONFIRMATION,
            alertTitle: "Confirmation",
            yesLabel: "Yes",
            noLabel: "No",
            alertHandler: function(response) {

                if (response) {

                   self.generateReport();
                   

                } else {
                    
                }
            }
        };

        voltmx.ui.Alert(alertConfig, {});
                          

                        } else {
                        }
                    });

                } else {
                    
                }
            }
        };

        voltmx.ui.Alert(alertConfig, {});
       }
      else
      {
        self.showToast(response.message);
      }



    }

    function operationFailureCompleted(error)

    {
      voltmx.application.dismissLoadingScreen();
      voltmx.print(error);

    }
  },

  onDownloadButtonClick: function () {
    var self = this;
     var fileUrl;
     if(self.file_url){
      fileUrl = self.file_url;
     }
      else
      {
        return;
      }

    try {


      //           var fileUrl = self.fileUrl;
      //           var fileName = thirdPartyFile.file_name;
      var fileName = "Inspection Report_" + Date.now()+".pdf";

      try {
        // Proceed to download using Java interop
        var DownloadClass = java.import("com.example.pdffiledownload.FileDownloadHandler");
        var ActivityContext = java.import("com.konylabs.android.KonyMain").getActivityContext();

        DownloadClass.downloadFile(ActivityContext, fileUrl, fileName);
        // Optionally show confirmation to user
        // voltmx.ui.Alert("Download started for: " + fileName);
      } catch (downloadError) {
        self.showToast("Download failed: " + downloadError.message);
      }
    } 
    catch (e) {
      self.showToast("Unexpected error while checking files: " + e.message);
    }

  },

  showToast: function(message) {
    var platform = voltmx.os.deviceInfo().name.toLowerCase();

    if (platform === "android") {
      var toast = new voltmx.ui.Toast({
        text: message,
        duration: constants.TOAST_LENGTH_SHORT,
        alignConfig: {
          widget: voltmx.application.getCurrentForm(),
          position: constants.TOAST_POS_BOTTOM // or TOAST_POS_TOP / CENTER
        }
      });
      toast.show();
    } else if (platform === "iphone" || platform === "ipad") {
      alert(message);
    } else {
      // Fallback for other platforms (optional)
      voltmx.print("Toast not supported on this platform: " + platform);
    }
  },


  testPDFNFIDownload: function()
  {
    
    var self = this;
    var fileUrl;
    if(self.file_url){
     fileUrl = self.file_url;
    }
    else
      {
        return;
      }


    try {
      // Find the first file with type "3rd-Party"

      //            var fileUrl = self.fileUrl;
      //           var fileName = thirdPartyFile.file_name;
      var  fileName = "Inspection Report_" + Date.now()+".pdf";

      // Proceed to download
      var FileDownloadHandlerNFI = objc.import("PDFDownloadNFI");
      var DownloadPDFViewController = objc.import("DownloadPDFViewController");
         
      if (!DownloadPDFViewController) {
        voltmx.print("Error: Failed to import PDFDownloadNFI");
      }
      else{
        var downloadObject = DownloadPDFViewController.alloc().jsinit();
        downloadObject.downloadAndPreviewPDFFileName(fileUrl,fileName);
      }


    } catch (e) {
      alert("Download error: " + e.message);
    }



  },

  
  
  
  
  
 });