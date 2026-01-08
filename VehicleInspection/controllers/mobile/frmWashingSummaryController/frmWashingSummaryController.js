define({ 

  onNavigate: function()
  {
    this.adjustRTL();
    this.view.preShow = this.onPreShow.bind(this);
  
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmWashingSummary");
    
//      this.view.flxHeading.flxBack.onClick = () =>
//     {
//       NavigationManager.pop();
//     }
    
  },
  
  adjustRTL: function()
  {
    var isArabic = voltmx.i18n.getCurrentLocale() === "ar_AE";
    
    this.view.flxHeading.reverseLayoutDirection = isArabic;
    this.view.flxULSummary.reverseLayoutDirection = isArabic;
    
    this.view.flxSearchComponent.tbxSearchBy.contentAlignment = isArabic ? constants.CONTENT_ALIGN_MIDDLE_RIGHT : constants.CONTENT_ALIGN_MIDDLE_LEFT;
    if(isArabic)
      {
        
        this.view.flxHeading.flxBack.right = "5%";
        this.view.flxHeading.flxBack.left = "";
        
         this.view.flxHeading.lblImages.right = "3%";
        this.view.flxHeading.lblImages.left = "";
        
        this.view.flxSummary.lblActivityName.right = "5%";
        this.view.flxSummary.lblActivityName.left = "";
        
        this.view.flxSummary.lblTotalVehicles.right = "0dp";
        this.view.flxSummary.lblTotalVehicles.left = "";
        
        this.view.flxSummary.lblTotalCount.left = "0dp";
        this.view.flxSummary.lblTotalCount.right = "";
        
        this.view.flxSummary.lblCompletedVehicles.right = "0dp";
        this.view.flxSummary.lblCompletedVehicles.left = "";
        
        this.view.flxSummary.lblCompletedCount.left = "0dp";
        this.view.flxSummary.lblCompletedCount.right = "";
        
        this.view.flxSummary.lblPendingVehicles.right = "0dp";
        this.view.flxSummary.lblPendingVehicles.left = "";
        
         this.view.flxSummary.lblPendingCount.left = "0dp";
        this.view.flxSummary.lblPendingCount.right = "";
        
        this.view.lblSummaryOfVehicleInspection.right = "0dp";
        this.view.lblSummaryOfVehicleInspection.left = "";
        
        this.view.flxULDark.right = "0dp";
        this.view.flxULDark.left = "";
        
        this.view.flxULLight.right = "2%";
        this.view.flxULLight.left = "";
        
        this.view.flxPendingVehicles.right = "0dp";
        this.view.flxPendingVehicles.left = "";
        
        this.view.flxCompletedVehicles.right = "50%";
        this.view.flxCompletedVehicles.left = "";
        
        this.view.flxULPending.right = "0dp";
        this.view.flxULPending.left = "";
        
        this.view.flxULCompleted.right = "50%";
        this.view.flxULCompleted.left = "";
        
        this.view.flxSearchComponent.tbxSearchBy.right = "4%";
        this.view.flxSearchComponent.tbxSearchBy.left = "";
        
        this.view.flxSearchComponent.flxSearch.left = "4%";
        this.view.flxSearchComponent.flxSearch.right = "";
        var flipTransform = voltmx.ui.makeAffineTransform();
    flipTransform.scale(-1, 1); // horizontal flip
    this.view.flxHeading.imgBack.transform = flipTransform;
      }
    else
      {
        this.view.flxHeading.flxBack.left = "5%";
        this.view.flxHeading.flxBack.right = "";
        
        this.view.flxHeading.lblImages.left = "3%";
        this.view.flxHeading.lblImages.right = "";
        
        this.view.flxSummary.lblActivityName.left = "5%";
        this.view.flxSummary.lblActivityName.right = "";
        
        this.view.flxSummary.lblTotalVehicles.left = "0dp";
        this.view.flxSummary.lblTotalVehicles.right = "";
        
        this.view.flxSummary.lblTotalCount.right = "0dp";
        this.view.flxSummary.lblTotalCount.left = "";
        
        this.view.flxSummary.lblCompletedVehicles.left = "0dp";
        this.view.flxSummary.lblCompletedVehicles.right = "";
        
        this.view.flxSummary.lblCompletedCount.right = "0dp";
        this.view.flxSummary.lblCompletedCount.left = "";
        
        this.view.flxSummary.lblPendingVehicles.left = "0dp";
        this.view.flxSummary.lblPendingVehicles.right = "";
        
        this.view.flxSummary.lblPendingCount.right = "0dp";
        this.view.flxSummary.lblPendingCount.left = "";
        
        this.view.lblSummaryOfVehicleInspection.left = "0dp";
        this.view.lblSummaryOfVehicleInspection.right = "";
        
        this.view.flxULDark.left = "0dp";
        this.view.flxULDark.right = "";
        
        this.view.flxULLight.left = "2%";
        this.view.flxULLight.right = "";
        
        this.view.flxPendingVehicles.left = "0dp";
        this.view.flxPendingVehicles.right = "";
        
        this.view.flxCompletedVehicles.left = "50%";
        this.view.flxCompletedVehicles.right = "";
        
        this.view.flxULPending.left = "0dp";
        this.view.flxULPending.right = "";
        
        this.view.flxULCompleted.left = "50%";
        this.view.flxULCompleted.right = "";
        
        this.view.flxSearchComponent.tbxSearchBy.left = "4%";
        this.view.flxSearchComponent.tbxSearchBy.right = "";
        
        this.view.flxSearchComponent.flxSearch.right = "4%";
        this.view.flxSearchComponent.flxSearch.left = "";
        this.view.flxHeading.imgBack.transform = voltmx.ui.makeAffineTransform();
      }
  }
 });