sap.ui.define([], function () {
    "use strict";
    return {
        /**
        * Formats a given string to uppercase.
        *
        * @function
        * @param {string} sName string to be formatted
        * @public
        */
        toUpperCase: function (sName) {
            return sName && sName.toUpperCase();
        }
    };
});