define({ 

 //Type your controller code here 
  
 onNavigate: function() {
        this.view.btnGenerate.onClick = this.generate,
        this.view.lstData.expandListItemToParentWidth = !0,
        this.view.lstData.inputAccessoryViewType = "DONE"
    },
  
 generate: function() {
        this.view.barcodegenerator.dataToEncode = this.view.txtName.text,
       this.view.barcodegenerator.barcodeFormat = this.view.lstData.selectedKeyValue[0],
        this.view.barcodegenerator.displayValue = true,
        this.view.barcodegenerator.generate()
       // this.view.barcodegenerator.displayValue = true;
    }

 });