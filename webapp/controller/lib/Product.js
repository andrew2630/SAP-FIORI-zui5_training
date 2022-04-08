sap.ui.define(['../../model/models', 'sap/m/MessageToast', 'sap/m/MessageBox'], (models, MessageToast, MessageBox) => {
  'use strict';

  return class Product {
    productModel = null;
    serviceModel = null;

    constructor({ productModel, serviceModel }) {
      productModel.setData(models.getNewProductModel());
      this.productModel = productModel;
      this.serviceModel = serviceModel;
    }

    async create() {
      const product = this.productModel.getData();

      // product.CategoryID = +product.CategoryID;
      // product.SupplierID = +product.SupplierID;
      // product['CategoryID'] = +product['CategoryID'];
      // product['SupplierID'] = +product['SupplierID'];
      ['CategoryID', 'SupplierID'].forEach(key => (product[key] = +product[key]));

      if (Object.values(product).some(value => !value)) {
        MessageToast.show('Please fill all required fields!');
        return false;
      }

      try {
        const { response } = await this.sendCreateRequest(product);
        const sapMessage = JSON.parse(response.headers['sap-message']);
        const allMessages = [...sapMessage.details, sapMessage];

        const messageText = allMessages.reduce((acc, item) => `${acc}${acc ? '. ' : ''}${item.message}`, '') + '.';

        let messageMethod = 'success';
        if (allMessages[0].severity !== 'success') {
          messageMethod = 'warning';
        }
        
        MessageBox[messageMethod](messageText);
      } catch (error) {
        MessageBox.error(JSON.parse(error.responseText).error.message.value, { title: error.statusText });
      }

      return true;
    }

    sendCreateRequest(requestData) {
      return new Promise((resolve, reject) => {
        this.serviceModel.create('/ProductsSet', requestData, {
          success: (createdData, response) => resolve({ createdData, response }),
          error: error => reject(error),
        });
      });
    }
  };
});
