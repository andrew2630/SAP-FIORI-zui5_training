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

    getServiceV4() {
      return '/sap/opu/odata4/sap/zap_ui5_training/default/sap/zap_ui5_trainig_v4/0001/';
    }
  };
});
