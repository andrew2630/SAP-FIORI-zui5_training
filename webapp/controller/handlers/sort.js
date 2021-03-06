sap.ui.define(['sap/ui/model/Sorter'], Sorter => {
  'use strict';

  return {
    async onSortButonPressed() {
      const fragment = await this.getDialog('ui5.training.zui5training.view.popups.SortDialog');
      fragment.open();
    },

    onSortDialogConfirm(e) {
      const parameters = e.getParameters();

      const key = parameters.sortItem.getKey();
      const isDescending = parameters.sortDescending;

      this.byId('productsTable').getBinding('items').sort([new Sorter(key, isDescending)]);
    },
  };
});
