/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.IconTabBar control
sap.ui.define([],
	function () {
		"use strict";

		return {
			aggregations: {
				items: {
					domRef: ":sap-domref > .sapMITH > .sapMITBScrollContainer > .sapMITBHead",
					actions: {
						move: "moveControls"
					}
				},
				content: {
					domRef: ":sap-domref > .sapMITBContainerContent > .sapMITBContent",
					actions: {
						move: "moveControls"
					}
				}
			}
		};

	}, /* bExport= */ false);
