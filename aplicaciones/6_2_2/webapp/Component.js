sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/json/JSONModel",
    "sapui5/demo/mvcapp/model/AppModel",
    "sap/ui/Device"
], function (UIComponent, ResourceModel, JSONModel, AppModel, Device) {
    "use strict";
    return UIComponent.extend("sapui5.demo.mvcapp.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // create the device model here
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            this.setModel(oModel, "device");
            var oAppModel = new AppModel();
            jQuery.ajax({
                contentType: "application/json",
                url: "/Suppliers",
                dataType: "json",
                success: function (oData) {
                    oAppModel.setData(oData);
                },
                error: function () {
                    console.log("an error occurred retrieving the Data");
                }
            });
            this.setModel(oAppModel);
            // create the views based on the url/hash
            this.getRouter().initialize();

        }
    });
});