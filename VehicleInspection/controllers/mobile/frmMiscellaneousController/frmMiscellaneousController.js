define({ 

  onNavigate: function(){
    this.view.preShow =this.onPreShow.bind(this);
  },
  onPreShow: function(){
    toggleFooterIcons(this.view, "frmVehicledetailsInspectionType");
    this.clearData();
    this.setDataToSeg();  
    for (let i = 1; i <= 16; i++) {
  this.view["details" + i].flxArrow.onClick =
    this.toggleDetails.bind(this);
}
  for (let i = 1; i <= 16; i++) {
  this.view["details" + i].segVehicleDetails.onRowClick =
    this.onRowClickAction.bind(this);
}
  },

  toggleDetails: function (context) {
  var detailsId = context.parent.parent.id;
  var details = this.view[detailsId];
    var transform = voltmx.ui.makeAffineTransform();
    if (details.flxSegment.isVisible) {
    details.flxSegment.isVisible = false;
    transform.rotate(0);
    details.imgarrow.transform = transform;
  } else {
    details.flxSegment.isVisible = true;
    transform.rotate(180);
    details.imgarrow.transform = transform;
  }
},

  setDataToSeg: function()
  {
    var data = [
      { lblData: "Vehicle ID : VH-10234" },
      { lblData: "Auction Date : 25 Dec 2025" },
      { lblData: "Base Price : AED 45,000" },
      { lblData: "Current Bid : AED 52,000" },
      { lblData: "Vehicle ID : VH-10234" },
      { lblData: "Auction Date : 25 Dec 2025" },
      { lblData: "Base Price : AED 45,000" },
      { lblData: "Current Bid : AED 52,000" }
    ];

      for (var i = 1; i <= 16; i++) {
    var details = this.view["details" + i];
    if (details && details.segVehicleDetails) {
      details.segVehicleDetails.setData(data);
    }
  }
  },
  
  onRowClickAction: function (seg, sectionIndex, rowIndex) {
  var rowData = seg.selectedRowItems[0];
  var lblValue = rowData.lblData;
 var details = seg.parent.parent;
  details.txbData.text = lblValue;
  details.flxSegment.setVisibility(false);
    var transform = voltmx.ui.makeAffineTransform();
  transform.rotate(0); 
  details.imgarrow.transform = transform;
}

});