sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5/demo/mvcapp/controller/formatter",
    "sapui5/demo/mvcapp/controller/types",
], function (Controller, formatter, types) {
    "use strict";
    return Controller.extend("sapui5.demo.mvcapp.controller.BaseController",
        {
            formatter: formatter,
            /* ======================================================= */
            /* lifecycle methods */
            /* ======================================================= */
            /**
            * Called when the worklist controller is instantiated.
            * @public
            */

            onInit: function () {
                this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this._oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
            },

            /* ======================================================= */
            /* event handlers
            /* ======================================================= */
            /**
            * Navigates back to the Master
            * @function
            */
            onNavPress: function () {
                this._oRouter.navTo("master");
            },

            /* ======================================================= */
            /* internal methods */
            /* ====================================================== */
            /**
            * Binds the view to the object path.
            *
            * @function
            * @param {sap.ui.base.Event} oEvent pattern match event in route '
            object'
            * @private
            */

            _onObjectMatched: function (oEvent) {
                var sObjectPath = "/Suppliers/" + oEvent.getParameter("arguments").ID;
                var oView = this.getView();
                oView.bindElement(sObjectPath);
            },

            /**
            * Binds the view to the object path.
            *
            * @function
            * @param {string} sObjectPath path to the object to be bound
            * @private
            */


        });
});