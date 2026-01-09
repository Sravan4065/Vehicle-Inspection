define({ 

   onNavigate: function()
  {
    var self = this;
    
    this.view.preShow = this.onPreShow.bind(this);
  
   
  },
  
  onPreShow: function()
  {
    var self = this;
   toggleFooterIcons(this.view, "frmTyres"); 
    
   var i=1;

while (i < 6) {
  this.view["flxStar" + i].onClick =
    this.callRate.bind(this);
  i++;
}
    
    this.createUIBox();
  },
  
 callRate: function (context) {
 
  var widgetId = context.id;

  var rating = parseInt(widgetId.replace("flxStar", ""), 10);

 
  for (var i = 1; i <= 5; i++) {
    if (i <= rating) {
      this.view["imgStar" + i].src = "greenstar.png";
    } else {
      this.view["imgStar" + i].src = "ashstar.png";
    }
  }
},
  
  createUIBox: function()
  {
    this.view.flxItems.removeAll();
    
     var flxItem = new voltmx.ui.FlexContainer({
      
      id: "flxItem",
      height: "230dp",
      width: "48%",
      left: "0%",
      top: "15dp",
      skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
      layoutType: voltmx.flex.FREE_FORM
      
      
    }, {}, {})
        
             var flxImgItem = new voltmx.ui.FlexContainer({
      
      id: "flxImgItem",
       height: "100dp",
      width: "90%",
      centerX: "50%",
      skin: "sknFlxEFEFEFRadius5px",
        top: "10dp",
      layoutType: voltmx.flex.FREE_FORM,
      clipBounds: true
      
      
    }, {}, {})
        
      var imgItem = new voltmx.ui.Image2({
      
      id: "imgItem",
      height: "100%",
      width: "100%",
      centerX: "50%",
      centerY: "50%",
      src: "defaulticon.png"

    }, {imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS}, {})
      
      flxImgItem.add(imgItem);
      
      var lblItemName = new voltmx.ui.Label({
      
      id: "lblItemName",
//       height: "100%",
//       width: "48%",
       centerX: "50%",
       text: "Item",
       top: "120dp",
      skin: "sknLblDubai231f2020pxRegular",
    }, {}, {});
        
           var flxClick = new voltmx.ui.FlexContainer({
      
      id: "flxClick",
      height: "40dp",
      width: "90%",
      centerX: "50%",
      bottom: "12dp",
      skin: "sknFlxFFFFFFBorderCCCCCCRadius8px",
      layoutType: voltmx.flex.FREE_FORM,
//       onClick: this.openUploadPopup.bind(this,i)
    }, {}, {})
           
            var imgCamera = new voltmx.ui.Image2({
      
      id: "imgCamera",
      height: "15dp",
      width: "15dp",
      left: "25%",
      centerY: "50%",
      src: "cameraclick.png"

    }, {}, {})
           
        var lblClick = new voltmx.ui.Label({
      
      id: "lblClick",
//       height: "100%",
//       width: "48%",
        centerY: "50%",
        left: "48%",
       text: "Click",
      skin: "sknLblDubai231f2018pxMedium",
    }, {}, {});
        
        flxClick.add(imgCamera,lblClick); 
        
        flxItem.add(flxImgItem,lblItemName,flxClick);
    
    this.view.flxItems.add(flxItem);
//     this.view.flxFields.removeAt(index);
  }


 });