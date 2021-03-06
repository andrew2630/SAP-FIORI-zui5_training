sap.ui.define(
  ['sap/ui/core/UIComponent', 'sap/ui/Device', 'ui5/training/zui5training/model/models'],
  (UIComponent, Device, models) => {
    'use strict';
    return UIComponent.extend('ui5.training.zui5training.Component', {
      metadata: {
        manifest: 'json',
      },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), 'device');
      },
    });
  }
);
