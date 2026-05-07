define({ 

   onNavigate: function()
  {
    this.adjustRtl();
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    toggleFooterIcons(this.view, "frmActivityist");
    this.view.flxInspection.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
        if(voltmx.store.getItem("jobTitle").includes("inspection_executive") || voltmx.store.getItem("jobTitle").includes("admin"))
          {
      NavigationManager.push("frmMyInspectionsSummary");
          }
          else
            {
              alert('You are not allowed to do this operation');
            }
        }
      else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxIInward.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
          if(voltmx.store.getItem("jobTitle").includes("yard_assistant") || voltmx.store.getItem("jobTitle").includes("inspection_executive") || voltmx.store.getItem("jobTitle").includes("admin"))
          {
      NavigationManager.push("frmInwardEntrySummary");
          }
          else
            {
              alert('You are not allowed to do this operation');
            }
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxWashing.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
          if(voltmx.store.getItem("jobTitle").includes("washing_assistant") || voltmx.store.getItem("jobTitle").includes("admin"))
          {
      NavigationManager.push("frmWashingSummary");
          }
          else
            {
              alert('You are not allowed to do this operation');
            }
          
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxImages.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
           if(voltmx.store.getItem("jobTitle").includes("yard_assistant") || voltmx.store.getItem("jobTitle").includes("washing_assistant") || voltmx.store.getItem("jobTitle").includes("admin"))
          {
      NavigationManager.push("frmImagesSummary");
          }
           else
            {
              alert('You are not allowed to do this operation');
            }
          
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
    this.view.flxCompletedInspections.onClick = () =>
    {
      if(voltmx.store.getItem("isLogin"))
        {
          if(voltmx.store.getItem("jobTitle").includes("inspection_executive") || voltmx.store.getItem("jobTitle").includes("admin"))
          {
      NavigationManager.push("frmCompletedInspections");
          }
              else
            {
              alert('You are not allowed to do this operation');
            }
          
        }
       else
        {
         NavigationManager.push("frmLogin"); 
        }
    }
  },
  
  adjustRtl: function(){

    this.view.lblActivitylist.text =voltmx.i18n.getLocalizedString("Activity List");

    this.view.lblCarinspection.text =voltmx.i18n.getLocalizedString("Inspections");

      this.view.lblcarinward.text=voltmx.i18n.getLocalizedString("Inward");

    this.view.lblcarwashing.text =voltmx.i18n.getLocalizedString("Washing");

    this.view.lblcarimageupload.text =voltmx.i18n.getLocalizedString("Images");

    this.view.lblCompletedinspections.text =voltmx.i18n.getLocalizedString("Completed Inspections");
    this.view.flxHeader.lblInspectionIQ.text = voltmx.i18n.getLocalizedString("InspectioniQ");
    this.view.flxfooter.lblinspections.text =voltmx.i18n.getLocalizedString("Inspections");
 
      this.view.flxfooter.lblinward.text =voltmx.i18n.getLocalizedString("Inward");
 
      this.view.flxfooter.lblimages.text =voltmx.i18n.getLocalizedString("Images");
 
      this.view.flxfooter.lblprofile.text =voltmx.i18n.getLocalizedString("Profile");

    this.view.flxfooter.lblHome.text =voltmx.i18n.getLocalizedString("Dashboard");

  }

 

 });