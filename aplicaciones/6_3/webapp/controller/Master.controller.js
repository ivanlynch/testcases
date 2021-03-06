sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("sapui5.demo.mvcapp.controller.Master", {

        onInit: function () {
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        },

        onListPress: function (oEvent) {
            // also possible:
            // var oRouter = this.getOwnerComponent().getRouterFor(this);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource();
            oRouter.navTo("detail", {
                ID: oItem.getBindingContext().getProperty("ID")
            });
        },
        onAddSupplier: function () {
            this._oRouter.navTo("edit");
        }

    });
});