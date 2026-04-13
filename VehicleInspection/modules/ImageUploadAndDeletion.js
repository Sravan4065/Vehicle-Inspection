var ImageUploadAndDeletion = {
  
  uploadImage: function(objectId,fileDetails,callback)
  {
    var self = this;
voltmx.application.showLoadingScreen(null,"Uploading...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);
    
    var serviceName = "fry_collection";
   var integrationObj =  voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "upload-photos";
    var headers = 
        {
          
        }
    
    var data = 
        {
          "object_id": objectId,
    "user_id": voltmx.store.getItem("userId"),
    "moduleName": "UploadImages",
     "file_details": fileDetails,
      "user_token": voltmx.store.getItem("getUserAccesstoken")
        
        }
    integrationObj.invokeOperation(operationName, headers, data, successCallback, failureCallback)
    
    function successCallback(response)
    {
      voltmx.application.dismissLoadingScreen();
        voltmx.print(response);

        if(callback){
            callback(response);
        }
    }
    
    function failureCallback(error)
    {
      voltmx.application.dismissLoadingScreen();
        voltmx.print(error);

        if(callback){
            callback(null, error);
        }
    }
    },
  
   deleteImage: function(fileDetails,callback)
  {
    var self = this;
voltmx.application.showLoadingScreen(null,"Deleting...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false,true,null);
    
    var serviceName = "fry_collection";
    var integrationObj =  voltmx.sdk.getCurrentInstance().getIntegrationService(serviceName);
    var operationName = "delete-multiple-images";
    var headers = 
        {

        }

    var data = 
        {
          "moduleName": "DeleteMultipleImages",
          "user_id": voltmx.store.getItem("userId"),
          "user_token": voltmx.store.getItem("getUserAccesstoken"),
          "file_details": fileDetails

        }
    integrationObj.invokeOperation(operationName, headers, data, successCallback, failureCallback)

    function successCallback(response)
    {
      voltmx.application.dismissLoadingScreen();
        voltmx.print(response);

        if(callback){
            callback(response);
        }
    }
    
    function failureCallback(error)
    {
      voltmx.application.dismissLoadingScreen();
        voltmx.print(error);

        if(callback){
            callback(null, error);
        }
    }
    }
  
  
};