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
                this._createProductsAggregation();
                oView.bindElement(sObjectPath);
            },

            /**
            * Binds the view to the object path.
            *
            * @function
            * @param {string} sObjectPath path to the object to be bound
            * @private
            */

            _createProductsAggregation: function () {

                var oTable = this.getView().byId("table");

                oTable.bindAggregation("items", "Products", function (sId, oContext) {

                    var sAllergens = oContext.getProperty("Allergens");
                    var oColumnListItem = new sap.m.ColumnListItem(sId);

                    oColumnListItem.addCell(new sap.m.ObjectIdentifier({
                        text: "{ID}"
                    }));

                    if (sAllergens) {
                        //we have found allergens, so we provide a VerticalLayout instead
                        //of just displaying the product name.The VerticalLayout then takes
                        //the product name plus the allergens into its own content aggregation
                        oColumnListItem.addCell(new VerticalLayout({
                            content: [
                                new sap.m.Text({
                                    text: "{Name}"
                                }),
                                new sap.m.Text({
                                    text: "{Allergens}"
                                })
                            ]
                        }));
                    } else {
                        // no allergens there, we display the name as usual
                        oColumnListItem.addCell(new sap.m.ObjectIdentifier({
                            text: "{Name}"
                        }));
                    }

                    oColumnListItem.addCell(new sap.m.ObjectNumber({
                        number: "{Price}",
                        unit: "USD"
                    }));

                    return oColumnListItem;
                });
            }


        });
});