define({ 

 //Type your controller code here 
onNavigate: function(){
  this.view.preShow =this.onPreShow.bind(this);
 this._objectId= "08E68EB8-1A8D-48A9-8B68-357A4E49A3FE";
},
  
  onPreShow : function(){
    this.view.Button0bdf3c77a898246.onClick = this.comp.bind(this);
    this.view.Button0bbdb1f8c464448.onClick = this.onSubmitClick.bind(this);
  },
 comp: function(){
  this.view.signaturecapture.setVisibility(true);
},
  
  onSubmitClick: function(){
  var signature = voltmx.store.getItem("signature");

  alert(signature);
          var filefullname = "signature" + new Date().getTime() + ".png";

  this.fileDetails = [{
    "is_thumbnail": "false",
    "inspection_category": "inspection",
    "inspection_subcategory": "inspectionsignature",
    "filename": filefullname,
    "base64": signature
  }];

  // ✅ Call existing upload function
  this.uploadImages();


},
        uploadImages: function() {
    var self = this;

    ImageUploadAndDeletion.uploadImage(
      self._objectId,
      self.fileDetails,
      function(response, error){

        if(error){
          alert("Image upload failed");
          return;
        }

        if(response && response.message === "Success"){
          alert("Upload Successful");
        }
      }
    );
  },
  
  
  
 });