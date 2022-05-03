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

            data.results.forEach(({ CategoryID: key, CategoryName: text }) =>
              categoryFilter.addItem(new ViewSettingsItem({ key, text }))
            );
          },
          error: error => console.log(error),
        });
      },

      async onFilterButonPressed() {
        if (!this.filter._wasDialogOpened) {
          this.filter.fetchCategories.apply(this);
        }

        const fragment = await this.getDialog('ui5.training.zui5training.view.popups.FilterDialog');
        fragment.open();
      },

      onFilterDialogConfirm(e) {
        const parameters = e.getParameters();
        const products = this.byId('productsTable').getBinding('items');

        const category = 'CategoryID';
        const price = 'UnitPrice';

        const filters = parameters.filterItems
          .filter(item => item.getParent().getKey() === category)
          .map(item => new Filter(category, FilterOperator.EQ, item.getKey()));

        const priceFilter = parameters.filterItems.find(item => item.getParent().getKey() === price);
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
