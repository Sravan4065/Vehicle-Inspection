var NavigationManager = {
  stack: [],

   init: function (formId, data) {
    this.stack = [{
      formId: formId,
      data: data || null
    }];
  },
  
  push: function (formId, data) {
    
    var isLoggedIn = voltmx.store.getItem("isLogin");
    
    if (formId === "frmProfile" && !isLoggedIn) {

      // Navigate to Login instead
      this.stack.push({
        formId: "frmLogin",
        data: null
      });

      new voltmx.mvc.Navigation("frmLogin").navigate();
      return;
    }

    
    var last = this.stack[this.stack.length - 1];

    if (!last || last.formId !== formId) {
      this.stack.push({
        formId: formId,
        data: data || null
      });
    }

    new voltmx.mvc.Navigation(formId).navigate(data);
  },

  pop: function () {
    if (this.stack.length <= 1) {
      return;
    }

    this.stack.pop();
    var prev = this.stack[this.stack.length - 1];
    new voltmx.mvc.Navigation(prev.formId).navigate(prev.data);
  },
  
popTo: function(formId) {
  while (this.stack.length > 0) {
    var last = this.stack[this.stack.length - 1];

    if (last.formId === formId) {
      break;
    }

    this.stack.pop();
  }

  var target = this.stack[this.stack.length - 1];

  if (target) {
    new voltmx.mvc.Navigation(target.formId).navigate(target.data);
  }
}
};
