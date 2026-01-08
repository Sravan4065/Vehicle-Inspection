var NavigationManager = {
  stack: [],

   init: function (formId, data) {
    this.stack = [{
      formId: formId,
      data: data || null
    }];
  },
  
  push: function (formId, data) {
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
  }
};
