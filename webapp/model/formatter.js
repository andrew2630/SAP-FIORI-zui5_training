sap.ui.define(['sap/ui/core/ValueState'], ValueState => {
  'use strict';

  return {
    price(value) {
      return Number(value).toFixed(2);
    },

    date(date) {
      return date.toLocaleDateString();
    },

    dateState(date) {
      // const daysPassed = new Date() - date
      const daysPassed = (Date.now() - date) / 1000 / 3600 / 24;

      if (daysPassed < 30) {
        // return "Success";
        return ValueState.Success;
      } else if (daysPassed < 60) {
        return ValueState.Information;
      } else if (daysPassed < 90) {
        return ValueState.None;
      } else if (daysPassed < 120) {
        return ValueState.Warning;
      }

      return ValueState.Error;
    },
  };
});
