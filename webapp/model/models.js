sap.ui.define(['sap/ui/model/json/JSONModel', 'sap/ui/Device'], (JSONModel, Device) => {
  'use strict';
  return {
    createDeviceModel() {
      let oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode('OneWay');
      return oModel;
    },

    getParametersModel() {
      return { counter: 0 };
    },

    getEmptyModelCopyO2() {
      return { Categories: [] };
    },
  };
});
