sap.ui.define([], () => {
  'use strict';

  return class Product {
    constructor(controller) {
      this.controller = controller;
      // this.controller = JSON.parse(JSON.stringify(controller));
    }

    // constructor({ model, confirmhandler, var3, var4 }) {
    //   // this.controller = controller;
    //   // this.controller = JSON.parse(JSON.stringify(controller));
    // }

    // new Product(nodel, handler, var3)
    // new Product({ var3 })
    // new Product({ var3, handler })

    create() {
      //
    }
  };
});
