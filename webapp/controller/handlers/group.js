sap.ui.define(['sap/ui/model/Sorter'], Sorter => {
  'use strict';
  
  return {
    _isReseted: false,
    _functionsLib: {
      CategoryID: context => ({
        key: context.getProperty('CategoryID'),
        text: `Category ${ context.getProperty('CategoryID') }`
      }),
      SupplierID: context => ({
        key: context.getProperty('SupplierID'),
        text: `Supplier ${ context.getProperty('SupplierID') }`
      }),
    },

    async onGroupButonPressed() {
      const fragment = await this.getViewSettingDialog('ui5.training.zui5training.view.popups.GroupDialog');
      fragment.open();
    },

    onGroupDialogConfirm(e) {
      const parameters = e.getParameters();
      const items = this.byId('productsTable').getBinding('items');

      if (parameters.groupItem) {
        const key = parameters.groupItem.getKey();
        const isDescending = parameters.groupDescending;
        const groupFunction = this.group._functionsLib[key];

        items.sort([new Sorter(key, isDescending, groupFunction)]);
      } else if (this.group._isReseted) {
        items.sort();
        this.group._isReseted = false;
      }
    },

    resetGroupDialog() {
      this.group._isReseted = true;
    }
  }
});