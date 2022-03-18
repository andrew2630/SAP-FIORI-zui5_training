sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    // 'ui5.training.zui5training/model/models'
    '../model/models',
    '../model/formatter',
    './handlers/sort',
    './handlers/Footer',
    'sap/ui/core/Fragment',
  ],
  (Controller, models, formatter, sort, Footer, Fragment) => {
    'use strict';

    return Controller.extend('ui5.training.zui5training.controller.App', {
      formatter,
      // sort: sort,
      sort,
      footer: new Footer(),
      _dialogs: [],

      onInit() {
        this.getView().getModel('parameters').setData(models.getParametersModel());

        // this.sort.onSortButonPressed.call(this)
        // this.sort.onSortButonPressed()
      },

      async getViewSettingDialog(fragmentName) {
        // let dialog = this._dialogs.find(dialog => dialog.name === name);
        // let fragment = this._dialogs.find(dialog => dialog.name === name)?.fragment;
        // let fragment = (this._dialogs.find(dialog => dialog.name === name) || {}).fragment;
        let fragment = (this._dialogs.find(({ name }) => name === fragmentName) || {}).fragment;
        // let fragment = (this._dialogs.find(isDialogWithSameName) || {}).fragment;

        // function isDialogWithSameName(dialog) {
        //   return dialog.name === fragmentName;
        // }

        // let dialog = this._dialogs[0];
        // let name = dialog.name;

        // let { name } = this._dialogs[0];

        // let [dialog] = this._dialogs;

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

          return fragment;

          // Fragment.load({
          //   id: this.getView().getId(),
          //   name: 'ui5.training.zui5training.view.popups.SortDialog',
          //   controller: this
          // }).then(fragment => {
          //   this._dialogs.push(fragment);
          //   fragment.open();
          // });
        }

        return fragment;
      },

      onFilterButonPressed() {},

      onGroupButonPressed() {},

      onAddProductPressed() {
        // sth, idk
      },

      onFilterDialogConfirm() {},

      onGroupDialogConfirm() {},

      resetGroupDialog() {},
    });
  }
);
