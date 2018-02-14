sap.ui.define([
    "sapui5/demo/mvcapp/controller/BaseController",
    "sapui5/demo/mvcapp/controller/formatter",
    "sapui5/demo/mvcapp/controller/types",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController, formatter, types, JSONModel, MessageToast) {
    "use strict";
    return BaseController.extend("sapui5.demo.mvcapp.controller.Edit", {
        formatter: formatter,
        types: types,

        onInit: function () {
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oTarget = this._oRouter.getTarget("edit");
            var oViewModel = new JSONModel({
                "createMode": false
            });
            this.getView().setModel(oViewModel, "viewModel");
            this._oRouter.attachRoutePatternMatched(this._onRouteMatched, this);
        },

        onNavPress: function () {
            this._oRouter.navTo("master");
        },

        _onRouteMatched: function (oEvent) {

            var oEventData = oEvent.getParameter("arguments");

            if(oEvent.getParameter("name")==="master"){
                return;
            }

            if(oEventData && oEventData.id){
                this.sObjectPath = "/Suppliers/" + oEventData.id;
            }else{
                this.getView().getModel("viewModel").setProperty("/createMode", true);
                this.getOwnerComponent().getModel().createEntry("/");
                this.sObjectPath = "/createEntry";
            }
            this._bindView();
        },

        _bindView: function () {
            var oView = this.getView();
            oView.bindElement(this.sObjectPath);
        },
        onSave: function () {
            var sLocalPath,
                sUrl = "/api/v1",
                oRouter =  this._oRouter,
                sPath = this.getView().getElementBinding().getPath(),
                oModel = this.getView().getModel(),
                oObject = oModel.getProperty(sPath),
                oBundle = this.getView().getModel("i18n").getResourceBundle();
            sUrl = sUrl + "/suppliers/" + (typeof oObject._id === "undefined" ? "" : oObject._id);
            sLocalPath = sPath;
            oModel.attachEventOnce("requestCompleted", function () {
                oRouter.navTo("master");
            }, this);
            oModel.attachEventOnce("requestFailed", function () {
                MessageToast.show(oBundle.getText("updateFailed"));
            });
            oModel.saveEntry(oObject, sUrl, sLocalPath);
        }

    });
});