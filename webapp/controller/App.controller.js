sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/m/MessageBox', 'sap/m/MessageToast', '../model/models'],
  (Controller, MessageBox, MessageToast, models) => {
    'use strict';
    return Controller.extend('ui5.training.zui5training.controller.App', {
      onInit() {
        const emptyModelData = models.getParametersModel();
        const parametersModel = this.getView().getModel('parameters');
        parametersModel.setData(emptyModelData);

        this.getView()
          .getModel('modelO2')
          .read('/CategorySet', {
            success: data => console.log(data),
            error: error => console.log(error)
          });
      },

      onButtonAddPressed() {
        const parametersModel = this.getView().getModel('parameters');
        parametersModel.oData.counter += 1;
        parametersModel.refresh(true);
      },
    });
  }
);
