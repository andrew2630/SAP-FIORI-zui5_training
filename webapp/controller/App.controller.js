sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    // 'ui5.training.zui5training/model/models'
    '../model/models',
    '../model/formatter',
    './handlers/sort',
    './handlers/group',
    './handlers/filter',
    './handlers/Footer',
    'sap/ui/core/Fragment',
  ],
  (Controller, models, formatter, sort, group, filter, Footer, Fragment) => {
    'use strict';

    return Controller.extend('ui5.training.zui5training.controller.App', {
      formatter,
      sort,
      group,
      filter,
      footer: new Footer(),
      _dialogs: [],

      onInit() {
        this.getView().getModel('parameters').setData(models.getParametersModel());
      },

      async getDialog(fragmentName) {
        let fragment = (this._dialogs.find(({ name }) => name === fragmentName) || {}).fragment;

        if (!fragment) {
          fragment = await Fragment.load({
            id: this.getView().getId(),
            name: fragmentName,
            controller: this,
          });

          this._dialogs.push({
            name: fragmentName,
            fragment: fragment,
          });

          this.getView().addDependent(fragment);
        }

        return fragment;
      },
    });
  }
);
