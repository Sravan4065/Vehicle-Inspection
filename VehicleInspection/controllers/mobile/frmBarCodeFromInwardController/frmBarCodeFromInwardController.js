define({ 
onNavigate: function(context) {
  this.context = context;
  this.view.postShow = this.onPostShow.bind(this);
},

onPostShow: function() {
  var self = this;

  voltmx.timer.schedule("barcodeTimer", function() {
    self.generate();
  }, 0.8, false); // delay in seconds
},

generate: function() {
  var barcodeWidget = this.view.barcodegenerator;

  var value = String(this.context.objectId || "123456");

  voltmx.print("Generating barcode for: " + value);

  barcodeWidget.setVisibility(true);
  barcodeWidget.dataToEncode = value;
  barcodeWidget.barcodeFormat = "CODE128";
  barcodeWidget.displayValue = true;

  barcodeWidget.generate();

  // second trigger (important)
  voltmx.timer.schedule("barcodeTimer2", function() {
    barcodeWidget.generate();
  }, 0.3, false);
}
 });