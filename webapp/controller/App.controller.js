sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/m/MessageBox', 'sap/m/MessageToast'],
  (Controller, MessageBox, MessageToast) => {
    'use strict';
    return Controller.extend('ui5.training.zui5training.controller.App', {
      onInit() {
        MessageBox.alert(`Hello there!`, {
          onClose: () => MessageToast.show(`General Kenobi`),
        });
      },
    });
  }
);
