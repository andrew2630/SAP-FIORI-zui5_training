sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    // 'ui5.training.zui5training/model/models'
    '../model/models',
    '../model/formatter'
  ],
  (Controller, models, formatter) => {
    'use strict';

    return Controller.extend('ui5.training.zui5training.controller.App', {
      formatter,

      onInit() {
        this.getView().getModel('parameters').setData(models.getParametersModel());

      
      },

      onSortButonPressed() {

      },

      onFilterButonPressed() {

      },

      onGroupButonPressed() {

      },

      onAddProductPressed() {
        // sth, idk
      },

      onSortDialogConfirm() {

      },

      onFilterDialogConfirm() {

      },

      onGroupDialogConfirm() {

      },

      resetGroupDialog() {
        
      }
    });
  }
);
