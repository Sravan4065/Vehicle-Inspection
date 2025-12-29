define({ 

 //Type your controller code here 
onNavigate: function(){
this.view.preShow =this.OnpreShow.bind(this);
},
  OnpreShow: function(){
   
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

this.view.details.Segment0j5d01d22ad6d41.setData(data);

   
  }
 });