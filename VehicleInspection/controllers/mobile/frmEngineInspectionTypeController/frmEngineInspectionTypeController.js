define({ 

 onNavigate: function()
  {
    this.createUI();
  },
  
  createUI: function()
  {
    for(var i=0;i<5;i++){
    var basicProperties = {
  id: "flxItem"+i,
  isVisible: true,
    width: "90%",
  height: "preferred",
  left: "0dp",
  top: "0dp",
  centerX: "50%",
  layoutType: voltmx.flex.FLOW_VERTICAL,
  clipBounds: true,
  skin: "sknFlxFFFFFFd2d5daBorderRadius8px"
};

var layoutProperties = {

};

var platformSpecificProperties = {};

var flxItem = new voltmx.ui.FlexContainer(
  basicProperties,
  layoutProperties,
  platformSpecificProperties
);
    
    
    var lblSubType = new voltmx.ui.Label(
  {
    id: "lblSubType"+i,
    isVisible: true,
    text: "Engine Upper Cover",
      left: "10%",
    top: "10dp",
    width: voltmx.flex.USE_PREFERRED_SIZE,
    skin: "sknLblDubai00000014pxMedium"
  },
  {
  
  },
  {}
);


var lblSelectCondition = new voltmx.ui.Label(
  {
    id: "lblSelectCondition"+i,
    isVisible: true,
    text: "Select Condition",
    skin: "sknLblDubai00000012pxRegular",
    left: "10%",
    top: "5dp",
    width: voltmx.flex.USE_PREFERRED_SIZE
  },
  {
    
  },
  {}
);


var flxSelectOptions = new voltmx.ui.FlexContainer(
  {
    id: "flxSelectOptions"+i,
    isVisible: true,
    clipBounds: true,
    width: "90%",
    height: "80dp",
    centerX: "50%",
    top: "10dp",
    layoutType: voltmx.flex.FREE_FORM,
    skin: "sknFlxBasic"
  },
  {
    
  },
  {}
);


var flxAddDetails = new voltmx.ui.FlexContainer(
  {
    id: "flxAddDetails"+i,
    isVisible: true,
    clipBounds: true,
    layoutType: voltmx.flex.FREE_FORM,
    skin: "sknFlxFFFFFFd2d5daBorderRadius8px",
      width: "90%",
    height: "60dp",
    centerX: "50%",
    top: "10dp",
    bottom: "10dp"
  },
  {
  
  },
  {}
);


flxItem.add(
  lblSubType,
  lblSelectCondition,
  flxSelectOptions,
  flxAddDetails
);
    
    this.view.flxInspectionSubTypes.add(flxItem);

  }
  }

 });