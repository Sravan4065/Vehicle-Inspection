define({ 

   onNavigate: function(context)
  {
    this.context = context
    this.view.preShow = this.onPreShow.bind(this);
  },
  onPreShow: function()
  {
    this.generate();
  },
    generate: function() {
      var self = this;
        this.view.barcodegenerator.dataToEncode = self.context.objectId,
       this.view.barcodegenerator.barcodeFormat = "CODE128",
        this.view.barcodegenerator.displayValue = true,
        this.view.barcodegenerator.generate();
       // this.view.barcodegenerator.displayValue = true;
    },
 });