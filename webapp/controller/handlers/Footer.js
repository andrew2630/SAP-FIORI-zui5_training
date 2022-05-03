sap.ui.define(['sap/ui/base/Object', '../lib/Product'], (UI5Object, Product) => {
  'use strict';

  return UI5Object.extend('ui5.training.zui5training.controller.handlers.Footer', {
    constructor: function() {
      this.dialogName = 'ui5.training.zui5training.view.popups.ProductDialog';
      this.product = null;
    },

    async onAddProductPressed() {
      this.footer.product = new Product({
        productModel: this.getView().getModel('newProduct'),
        serviceModel: this.getView().getModel('modelO2'),
      });

      const dialog = await this.getDialog(this.footer.dialogName);
      dialog.open();
    },

    closeDialog() {
      this._dialogs.find(({ name }) => name === this.footer.dialogName).fragment.close();
    },

    onProductDialogCancel() {
      this.footer.closeDialog.call(this);
    },

    async onProductDialogConfirm() {
      const proceed = await this.footer.product.create();

      if (proceed) {
        this.byId('productsTable').getBinding('items').refresh();
        this.footer.closeDialog.call(this);
      }
    },
  });
});
