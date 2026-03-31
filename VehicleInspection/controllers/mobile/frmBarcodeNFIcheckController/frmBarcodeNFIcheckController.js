define({ 

//  //Type your controller code here 

// excCheck: function () {
//     try {
//         var VoltMXMain = java.import("com.konylabs.android.KonyMain");
//         var Intent = java.import("android.content.Intent");

//         // ✅ Import your activity separately
//         var ScannerActivity = java.import("com.example.barcodescanner.BarcodeScannerActivity");

//         var activityContext = VoltMXMain.getActivityContext();

//         // ✅ Correct Intent creation
//         var intentObj = new Intent(activityContext, ScannerActivity.class);

//         activityContext.startActivityForResult(intentObj, 1234);

//     } catch (e) {
//         alert("Error: " + e.message);
//     }
// },
  
//  onActivityResult: function (requestCode, resultCode, data) {

//     if (requestCode == 1234) {

//         if (!data) {
//             alert("No data received");
//             return;
//         }

//         var result = data.getStringExtra("SCAN_RESULT");

//         if (!result || result === "SCAN_CANCELLED") {
//             alert("Scan cancelled");
//             return;
//         }

//         alert("Scanned Data: " + result);

//         var car = result.split("|");

//         if (car.length >= 4) {
//             alert(
//                 "Car ID: " + car[0] +
//                 "\nBrand: " + car[1] +
//                 "\nYear: " + car[2] +
//                 "\nColor: " + car[3]
//             );
//         } else {
//             alert("Invalid barcode format");
//         }
//     }
// }
  
  
  
  
  
  
  
 startBarcodeScan: function () {
    try {
        var VoltMXMain = java.import("com.konylabs.android.KonyMain");
        var BarcodeHelper = java.import("com.example.barcodetest.BarcodeScannerHelper");

        // ✅ Set callback directly (IMPORTANT)
        BarcodeHelper.scanCallback = this.scanSuccess.bind(this);

        var activityContext = VoltMXMain.getActivityContext();

        var helper = new BarcodeHelper();

        helper.startScanner(activityContext);

        this._barcodeHelper = helper;

    } catch (e) {
        alert("Error: " + e.message);
    }
},
  
 scanSuccess: function (data) {
    try {
        var result = JSON.parse(data);

        if (result.barcode_data) {
           // this.view.lblResult.text = result.barcode_data;
          alert(result.barcode_data);
        } else if (result.error) {
            alert(result.error);
        }

    } catch (e) {
        //this.view.lblResult.text = data;
      alert(data);
    }
}
  
//   scanError: function (error) {
//     alert("Scan Error: " + error);
// },
 });