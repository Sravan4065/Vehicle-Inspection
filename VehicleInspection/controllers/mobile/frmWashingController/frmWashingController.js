define({ 

 onNavigate: function()
  {
    this.view.preShow = this.onPreShow.bind(this);
  },
  
  onPreShow: function()
  {
    this.view.flxStarted.setVisibility(false);
    this.view.flxEnded.setVisibility(false);
    this.view.btnCompleteAndSubmit.setVisibility(false);
    this.view.btnStart.onClick = this.onStartWashing.bind(this);
  },
  
  onStartWashing: function()
  {
    if(this.view.btnStart.text === "Start")
    {
    this.view.btnStart.text = "Complete";
    this.view.imgIcon.src = "playicon.png";
    this.view.flxStarted.setVisibility(true);
    }
    else
      {
        this.view.btnStart.setVisibility(false);
//     this.view.imgIcon.src = "playicon.png";
    this.view.flxEnded.setVisibility(true);
    this.view.btnCompleteAndSubmit.setVisibility(true);
      }
  }

 });