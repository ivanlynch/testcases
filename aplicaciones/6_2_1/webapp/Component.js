sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (UIComponent, ResourceModel, JSONModel, Device) {
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
            this.setModel(oModel, "Device");

            // create the views based on the url/hash
            this.getRouter().initialize();
        }
    });
});