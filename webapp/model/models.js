sap.ui.define(['sap/ui/model/json/JSONModel', 'sap/ui/Device'], (JSONModel, Device) => {
  'use strict';
  return {
    createDeviceModel() {
      let oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode('OneWay');
      return oModel;
    },

    getParametersModel() {
      return {
        priceFirstValue: 50,
        priceSecondValue: 100,
      };
    },

    getServiceV4() {
      return '/sap/opu/odata4/sap/zap_ui5_training/default/sap/zap_ui5_trainig_v4/0001/';
    },

    getNewProductModel() {
      return {
        ProductName: '',
        SupplierID: 0,
        CategoryID: 0,
        UnitPrice: '0.0'
      }
    },
  };
});
