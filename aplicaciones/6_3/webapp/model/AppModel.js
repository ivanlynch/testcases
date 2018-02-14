sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";
    return JSONModel.extend("sapui5.demo.mvcapp.model.AppModel", {

        saveEntry: function (oObject, sUrl, sLocalPath) {
            var sType,
                that = this,
                oData;
            sLocalPath = sLocalPath == "/createEntry" ? "" : sLocalPath;
            if (sLocalPath) {
                sType = "PUT";
            } else {
                sType = "POST";
            }

            // local path indicates whether we are updating an existing object
            // or creating a new one

            oData = JSON.stringify(oObject);

            jQuery.ajax({
                type: sType,
                contentType: "application/json",
                data: oData,
                url: sUrl,
                dataType: "json",
                success: function () {
                    //store the new/updated entry in the model
                    that._updateModel(sLocalPath, oObject);
                    //call createEntry to reset the dummy property to empty values
                    that.fireRequestCompleted();
                },
                error: function () {
                    that.fireRequestFailed();
                }
            });
        },
        createEntry: function () {
            this.setProperty("/createEntry",
                {
                    "ID": "",
                    "Name": "",
                    "Address": {
                        "Street": "",
                        "City": "",
                        "State": "",
                        "ZipCode": "",
                        "Country": "",
                        "PhoneNumber": ""
                    }
                });
        },
        _updateModel: function (sLocalPath, data, bDelete) {

            var aData = this.getData();

            function valuesToArray(object) {
                var result = [];
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        result.push(object[key]);
                    }
                }
                return result;
            }

            var arrayData = valuesToArray(aData);

            if (sLocalPath && bDelete) {

                arrayData.splice(sLocalPath.substr(1), 1);
                this.setData(arrayData);
                this.refresh();

            } else if (sLocalPath) {

                this.setProperty(sLocalPath, data);
            } else {
                arrayData.push(data);
                this.setData(aData);
            }
        },

        deleteEntry: function (sUrl, sLocalPath) {
            var that = this;
            jQuery.ajax({
                type: "DELETE",
                contentType: "application/json",
                url: sUrl,
                dataType: "json",
                async: true,
                success: function () {
                    that.fireRequestCompleted();
                },
                error: function () {
                    that.fireRequestFailed();
                }
            });
        }

    });
});