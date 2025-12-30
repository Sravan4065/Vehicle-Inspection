function toggleFooterIcons(formObj, formName) {
  if (!formObj || !formObj.flxfooter) return;

  var footer = formObj.flxfooter;
  var activeIndex = -1;


  switch (formName) {
    case "frmDashboard":
      activeIndex = 1; // Home
      break;

    case "frmMyInspectionsSummary":
      activeIndex = 2; // Inspections
      break;

    case "frmInwardEntrySummary":
      activeIndex = 3; // Inward
      break;

    case "frmImagesSummary":
      activeIndex = 4; // Images
      break;

    case "frmProfile":
      activeIndex = 5; // Profile
      break;

    default:
      return;
  }

  
  var labels = [
    footer.lblHome,
    footer.lblinspections,
    footer.lblinward,
    footer.lblimages,
    footer.lblprofile
  ];

  var images = [
    footer.imghome,
    footer.imginspections,
    footer.imginward,
    footer.imgaddimages,
    footer.imgprofile
  ];

  var normalIcons = [
    "home.png",
    "inspections.png",
    "inward.png",
    "images.png",
    "profile.png"
  ];

  var activeIcons = [
    "homered.png",
    "inspectionsred.png",
    "inwardred.png",
    "imagesred.png",
    "profilered.png"
  ];

 
  for (var i = 0; i < 5; i++) {
    var isActive = (i + 1) === activeIndex;

    
    var flx = footer["flxH" + (i + 1)];
    if (flx) {
      flx.setVisibility(isActive);
    }

    
    labels[i].skin = isActive
      ? "sknLblDubaid32437Medium"
      : "sknLblDubai231f20Medium";

    
    images[i].src = isActive
      ? activeIcons[i]
      : normalIcons[i];
  }

  formObj.forceLayout();
}

