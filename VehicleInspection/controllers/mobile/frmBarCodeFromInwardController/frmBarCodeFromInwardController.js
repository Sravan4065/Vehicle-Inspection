// define({ 
// onNavigate: function(context) {
//   this.context = context;
//   this.view.postShow = this.onPostShow.bind(this);
// },

// onPostShow: function() {
//   var self = this;
//   this.view.flxHeading.flxBack.onClick = () =>
//   {
//     NavigationManager.popTo("frmInwardEntrySummary");
//   }
//   voltmx.timer.schedule("barcodeTimer", function() {
//     self.generate();
//   }, 0.8, false); // delay in seconds
// },

// generate: function() {
//   var barcodeWidget = this.view.barcodegenerator;

//   var value = String(this.context.lotno || "123456");

//   voltmx.print("Generating barcode for: " + value);

//   barcodeWidget.setVisibility(true);
//   barcodeWidget.dataToEncode = value;
//   barcodeWidget.barcodeFormat = "CODE128";
//   barcodeWidget.displayValue = true;

//   barcodeWidget.generate();

//   // second trigger (important)
//   voltmx.timer.schedule("barcodeTimer2", function() {
//     barcodeWidget.generate();
//   }, 0.3, false);
// }
  
 
//  });


 
define({ 

onNavigate: function(context) {

  this.context = context;

  this.view.postShow = this.onPostShow.bind(this);

},

onPostShow: function() {

  var self = this;

  this.view.flxHeading.flxBack.onClick = () =>

  {

    NavigationManager.popTo("frmInwardEntrySummary");

  }

  voltmx.timer.schedule("barcodeTimer", function() {

    self.generate();

  }, 0.8, false); // delay in seconds
  
  this.setLabelsWithData();

},
  
  setLabelsWithData: function()
  {
    var self = this;
    this.view.lblVehicleNumberValue.text = self.context.record.chassis_number;
    this.view.lblVehicleValue.text = self.context.record.model;
    this.view.lblReceivedByValue.text = voltmx.store.getItem('username');
    this.view.lblReceivedAtValue.text = self.currentTimeFormat(Date.now());
  },

   currentTimeFormat: function(ts)
  {
    var d = new Date(ts);

var day = String(d.getDate()).padStart(2, '0');
var month = String(d.getMonth() + 1).padStart(2, '0');
var year = String(d.getFullYear()).slice(-2);

var hours = String(d.getHours()).padStart(2, '0');
var minutes = String(d.getMinutes()).padStart(2, '0');

var formatted = day + "/" + month + "/" + year + " " + hours + ":" + minutes;

return formatted;
  },
  
generate: function() {
 
  var self = this;
 
  // ADD HERE (FIRST LINE)

  if (!this.view.brsrGenerator) {  

    alert("Browser widget not found ");  

    return;  

  }
 
  var value = String(this.context.lotno || "123456");
 
  voltmx.print("Generating barcode for: " + value);
 
  //  Call HTML function

  var js = "createBarcode('" + value + "', '{}');";
 
  this.view.brsrGenerator.evaluateJavaScript(js);

// this.view.brsrGenerator

  //  Poll for Base64

  voltmx.timer.schedule("barcodePoll", function() {
 
    self.view.brsrGenerator.evaluateJavaScriptAsync(

      "(function(){ return window.BARCODE_READY ? window.BARCODE_DATA : null; })();",

      function(result) {
 
        if (result) {
          
          var cleanBase64;

try {
    cleanBase64 = JSON.parse(result);
} catch (e) {
    cleanBase64 = result.replace(/^['"]+|['"]+$/g, "");
}
 
          voltmx.timer.cancel("barcodePoll");
           self.fileDetails = [];
      self.fileDetails.push({
          "is_thumbnail":"false",
          "inspection_category": "Barcode",
          "inspection_subcategory":"BarcodeInwardEnry",
        "filename": "Barcode"+ Date.now() + detectFileType(cleanBase64) || ".jpg",
        "base64": cleanBase64
      });
         
 
//           alert("BASE64:\n" + result);
          ImageUploadAndDeletion.uploadImage(
    self.context.objectId,
    self.fileDetails,
    function (response, error) {

      if (error) {
        alert("Image upload failed");
        return;
      }

      if (response) {

        if (response.message === "Success") {
             alert('Uploaded');
          }

        }
        else {
          if (response.response) {
            var parsed = JSON.parse(response.response || "[]");
            var errCode = parsed[0] && parsed[0].error_code;

            if (errCode === 409) {
              alert(voltmx.i18n.getLocalizedString("File already exists"));
            } else {
              alert("Failed");
            }
          }
        }
      }
     
    
  );

          voltmx.print("BARCODE BASE64: " + result);
 
        } else {

          voltmx.print("Waiting for barcode...");

        }

      }

    );
 
  }, 1, true);

}

});
 