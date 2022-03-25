sap.ui.define(
  ['sap/ui/model/Filter', 'sap/ui/model/FilterOperator', 'sap/m/ViewSettingsItem'],
  (Filter, FilterOperator, ViewSettingsItem) => {
    'use strict';

    return {
      _wasDialogOpened: false,

      fetchCategories() {
        this.getView().getModel('modelO2').read('/CategorySet', {
          success: data => {
            this.filter._wasDialogOpened = true;
            const categoryFilter = this.byId('filterItemCategory');

            // data.results.forEach(result => {
            //   categoryFilter.addItem(new ViewSettingsItem({
            //     key: result.CategoryID,
            //     text: result.CategoryName
            //   }))
            // });

            data.results.forEach(({ CategoryID: key, CategoryName: text }) =>
              categoryFilter.addItem(new ViewSettingsItem({ key, text }))
            );
          },
          error: error => console.log(error),
        });
      },

      async onFilterButonPressed() {
        // if (this.filter._wasDialogOpened === false) {
        // if (this.filter._wasDialogOpened !== true) {
        if (!this.filter._wasDialogOpened) {
          // this.filter.fetchCategories.call(this, param1, param2);
          // this.filter.fetchCategories.apply(this, [param1, param2]);
          this.filter.fetchCategories.apply(this);
        }

        const fragment = await this.getViewSettingDialog('ui5.training.zui5training.view.popups.FilterDialog');
        fragment.open();
      },

      onFilterDialogConfirm(e) {
        const parameters = e.getParameters();
        const products = this.byId('productsTable').getBinding('items');

        const category = 'CategoryID';
        const price = 'UnitPrice';

        // const filters = [];

        // parameters.filterItems
        //   .filter(item => item.getParent().getKey() === category)
        //   .map(item => ({ key: item.getKey() }))
        //   .forEach(item => filters.push(new Filter(category, FilterOperator.EQ, item.key)));

        const filters = parameters.filterItems
          .filter(item => item.getParent().getKey() === category)
          .map(item => new Filter(category, FilterOperator.EQ, item.getKey()));

        // function getIsPriceFilter(item) {
        //   let result = item.getParent().getKey() === price;
        //   return result;
        // }

        // const priceFilter = parameters.filterItems.find(getIsPriceFilter);

        const priceFilter = parameters.filterItems.find(item => item.getParent().getKey() === price);
        // if (priceFilter !== undefined) {
        if (priceFilter) {
          const params = this.getView().getModel('parameters').getData();

          switch (priceFilter.getKey()) {
            case 'priceFirstOption':
              let newFilter = new Filter(price, FilterOperator.LT, params.priceFirstValue);
              filters.push(newFilter);
              break;
            case 'priceSecondOption':
              filters.push(new Filter(price, FilterOperator.BT, params.priceSecondValue, params.priceSecondValue));
              break;
            case 'priceThirdOption':
              filters.push(new Filter(price, FilterOperator.GT, params.priceSecondValue));
          }
        }

        products.filter(filters);
      },
    };
  }
);
