/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['./ListItemBaseRenderer', 'sap/ui/core/Renderer', 'sap/ui/core/library'],
	function(ListItemBaseRenderer, Renderer, coreLibrary) {
	"use strict";


	// shortcut for sap.ui.core.TextDirection
	var TextDirection = coreLibrary.TextDirection;


	/**
	 * InputListItem renderer.
	 * @namespace
	 */
	var InputListItemRenderer = Renderer.extend(ListItemBaseRenderer);

	/**
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager}
	 *          oRenderManager the RenderManager that can be used for writing to the
	 *          Render-Output-Buffer
	 * @param {sap.ui.core.Control}
	 *          oControl an object representation of the control that should be
	 *          rendered
	 */
	InputListItemRenderer.renderLIAttributes = function(rm, oLI) {
		rm.addClass("sapMILI");
	};

	InputListItemRenderer.renderLIContent = function(rm, oLI) {

		var sLabel = oLI.getLabel();

		// List item label
		if (sLabel) {
			var sLabelId = oLI.getId() + "-label",
				sLabelDir = oLI.getLabelTextDirection();

			rm.write('<label id="' + sLabelId + '" class="sapMILILabel"');

			if (sLabelDir !== TextDirection.Inherit) {
				rm.writeAttribute("dir", sLabelDir.toLowerCase());
			}

			rm.write('>');
			rm.writeEscaped(sLabel);
			rm.write('</label>');
		}

		// List item input content
		rm.write('<div class="sapMILIDiv sapMILI-CTX">');

		oLI.getContent().forEach(function(oContent) {

			// if not already exists add the label as a labelledby association whenever possible
			if (sLabelId &&
				oContent.addAriaLabelledBy &&
				oContent.getAriaLabelledBy().indexOf(sLabelId) == -1) {
				oContent.addAssociation("ariaLabelledBy", sLabelId, true);
			}

			rm.renderControl(oContent);
		});

		rm.write('</div>');
	};


	return InputListItemRenderer;

}, /* bExport= */ true);
