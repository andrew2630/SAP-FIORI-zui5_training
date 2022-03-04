sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    '../model/models',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
  ],
  (Controller, MessageBox, MessageToast, models, Filter, FilterOperator) => {
    'use strict';
    return Controller.extend('ui5.training.zui5training.controller.App', {
      onInit() {
        this.getView().getModel('parameters').setData(models.getParametersModel());

        this.getView().getModel('modelO2').read('/CategorySet', {
          // filters: [new Filter('CategoryID', FilterOperator.EQ, 2)],
          urlParameters: {
            $expand: 'Products'
          },
          success: data => {
            const emptyModelData = models.getEmptyModelCopyO2();
            emptyModelData.Categories = data.results;
            emptyModelData.Categories.forEach(category => category.Products = category.Products.results);
            this.getView().getModel('modelCopyO2').setData(emptyModelData);
          },
          error: error => console.log(error),
        });

        const today = new Date();
        this.getView().getModel('modelO2').read('/ProductsSet', {
          filters: [
            new Filter(
              'DateAdded',
              FilterOperator.BT,
              new Date(2021, 10, 24),
              new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
            ),
          ],
          success: data => console.table(data.results.sort((a, b) => a.DateAdded - b.DateAdded)),
          error: error => console.log(error),
        });

        $.get(`${models.getServiceV4()}SupplierSet?$filter=Country eq 'UK'`)
          .done(data => console.log(data));

        fetch(`${models.getServiceV4()}SupplierSet?$filter=Country eq 'USA'`)
          .then(response => response.json())
          .then(data => console.log(data));
      },

      onButtonAddPressed() {
        const parametersModel = this.getView().getModel('parameters');
        parametersModel.oData.counter += 1;
        parametersModel.refresh(true);
      },
    });
  }
);
