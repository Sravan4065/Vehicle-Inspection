define({ 

 onNavigate: function()
  {
    var self = this;
    self.selectedChecks = ""; 
    self.createCheckBoxes(21);
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmChassisDamageReport");
  },
  
  createCheckBoxes: function (totalItems) {
    var self = this;
    self.view.flxCheckBoxes.removeAll();
//     self.view.flxCheckBoxes.zIndex = "10";
    var screenWidth = voltmx.os.deviceInfo().screenWidth - 10;
    var itemSize = 30; // flxItem width
    var margin = 10;
    var itemsPerRow = Math.floor(screenWidth / (itemSize + margin));

    var currentLeft = 6;
    var currentTop = 10;
    var countInRow = 0;

    for (var i = 1; i <= totalItems; i++) {

        if (countInRow >= itemsPerRow) {
            currentLeft = 5;
            currentTop += 44; // next row
            countInRow = 0;
        }

        let index = i; // important for closure

        var flxItem = new voltmx.ui.FlexContainer({
            id: "flxItem" + index,
            width: "35dp",
            height: "35dp",
            left: currentLeft + "dp",
            top: currentTop + "dp",
            layoutType: voltmx.flex.FLOW_HORIZONTAL,
            clipBounds: true,
            isVisible: true,
            skin: "sknFlxBasic",
            onClick: self.onCheckClick.bind(self, index)
        }, {}, {});

        var flxCheck = new voltmx.ui.FlexContainer({
            id: "flxCheck" + index,
            width: "12dp",
            height: "12dp",
            centerY: "50%",
            skin: "sknFlxFFFFFFBorder383838Radius4px"
        }, {}, {});

        var imgTick = new voltmx.ui.Image2({
            id: "imgTick" + index,
            src: "imgtickblack.png",
            centerX: "50%",
            centerY: "50%",
            width: "110%",
            height: "110%",
            isVisible: false
        }, {
            imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS
        }, {});

        flxCheck.add(imgTick);

        var lblNo = new voltmx.ui.Label({
            id: "lblCheckNo" + index,
            text: index.toString(),
            left: "5dp",
            centerY: "50%",
            skin: "sknlblDubai231f2016pxMedium",
            width: voltmx.flex.USE_PREFERRED_SIZE
        }, {}, {});

        flxItem.add(flxCheck, lblNo);
        self.view.flxCheckBoxes.add(flxItem);

        currentLeft += itemSize + margin;
        countInRow++;
    }
},
  
  onCheckClick: function (index) {
    var self = this;
    var imgTick = self.view.flxCheckBoxes["flxItem" + index]["flxCheck" + index]["imgTick" + index];

    var selectedArr = self.selectedChecks ? self.selectedChecks.split(",") : [];

    if (imgTick.isVisible) {
        // UNCHECK
        imgTick.isVisible = false;
        selectedArr = selectedArr.filter(function (item) {
            return item !== index.toString();
        });
    } else {
        // CHECK
        imgTick.isVisible = true;
        selectedArr.push(index.toString());
    }

    self.selectedChecks = selectedArr.join(",");

    voltmx.print("Selected Checks: " + self.selectedChecks);
}



 });