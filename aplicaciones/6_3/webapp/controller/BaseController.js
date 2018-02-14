sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sapui5/demo/mvcapp/controller/formatter",
    "sapui5/demo/mvcapp/controller/types",
    "sap/m/MessageToast"
], function (Controller, formatter, types, MessageToast) {
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

            onPageUp: function (oEvent) {
                var sID = oEvent.getSource().getBindingContext().sPath;
                sID = parseInt(sID.substr(sID.lastIndexOf("/") + 1));
                sID = sID - 1;
                this._oRouter.navTo("detail", { ID: sID });
            },
            onPageDown: function (oEvent) {
                var sID = oEvent.getSource().getBindingContext().sPath;
                sID = parseInt(sID.substr(sID.lastIndexOf("/") + 1));
                sID += 1;
                this._oRouter.navTo("detail", { ID: sID });
            },

            _onObjectMatched: function (oEvent) {
                var sObjectPath = "/Suppliers/" + oEvent.getParameter("arguments").ID;
                var oView = this.getView();
                this._createProductsAggregation();
                oView.bindElement(sObjectPath);
            },

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
            },
            onEdit: function (oEvent) {
                var sObjectPath = this.getView().getElementBinding().getPath().substr(11);
                var oSupplier = this.getView().getModel().getData().Suppliers[sObjectPath];

                this._oRouter.navTo("edit", {
                    id: sObjectPath,
                }, false);
            },

            onDelete: function () {
                var oModel = this.getOwnerComponent().getModel(),
                    sLocalPath = this.getView().getElementBinding().getPath(),
                    oObject = oModel.getProperty(sLocalPath),
                    that = this;
                    var ErrorMsg = this.getView().getModel("i18n").getResourceBundle().getText("deleteFailed");
                    var sUrl = "/api/v1/suppliers/" + oObject._id;
                oModel.deleteEntry(sUrl, sLocalPath);
                oModel.attachEventOnce("requestCompleted", function () {
                    that._oRouter.navTo("master");
                }, this);
                oModel.attachEventOnce("requestFailed", function () {
                    MessageToast.show(ErrorMsg);
                });

            }


        });
});