/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
  'use strict';

  sap.ui.require(['ui5training./zui5_training/test/unit/AllTests'], function() {
    QUnit.start();
  });
});
