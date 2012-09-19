/*global Aloha, GENTICS*/
define(function (require) {
	"use strict";

	/**
	 * Module dependencies.
	 */
	var Ui = require('ui/ui'),
		Button = require('ui/button'),
		Dialog = require('ui/dialog'),
		plugin = require('aloha/plugin'),
		htmlBeautifier = require('./htmlbeautifier'),
		$ = require('jquery');

	/**
	 * Plugin CSS dependencies.
	 */
	require('css!htmlsource/css/htmlsource');

	/**
	 * Create & register the plugin.
	 */
	return plugin.create('htmlsource', {

		/**
		 * Executed on plugin initialization.
		 */
		init: function () {
			this.editable = null;
			this.element = $('<div class="aloha-plugin-htmlsource">');
			this.createEditor();
			this.createDialog();
			this.createButton();
		},

		/**
		 * Create the editor.
		 */
		createEditor: function () {
			this.container = $('<div class="aloha-plugin-htmlsource-container">').appendTo(this.element);
			this.editor = $('<textarea dir="ltr" wrap="soft">').appendTo(this.container);
		},

		/**
		 * Create the jQuery UI dialog.
		 */
		createDialog: function () {
			this.dialog = this.element.dialog({
				title: 'HTML Source Editor',
				modal: true,
				width: 600,
				height: 370,
				autoOpen: false,
				create: $.proxy(this.onCreate, this),
				open: $.proxy(this.onOpen, this),
				close: $.proxy(this.onClose, this),
				buttons: {
					'Save': $.proxy(this.onSave, this)
				}
			});
		},

		/**
		 * Create button to display the dialog.
		 */
		createButton: function () {
			var self = this;

			Ui.adopt("htmlsource", Button, {
				tooltip: 'Open HTML Source Editor',
				icon: 'aloha-icon aloha-plugin-htmlsource-button',
				scope: 'Aloha.continuoustext',
				click: function () {
					self.dialog.dialog('open');
				}
			});
		},

		/**
		 * Called when the dialog is created.
		 * @param  {jQuery.Event} e
		 * @param  {Object} ui
		 */
		onCreate: function (e, ui) {
			var self = this;

			$('<input type="checkbox" name="wraped" id="wraped" checked="checked" /><label for="wraped">Word wrap</label>').click(function () {
				self.editor.attr('wrap', $(this).is(':checked') ? 'soft' : 'off');
			}).appendTo($(e.target).parent().find('.ui-dialog-buttonpane'));
		},

		/**
		 * Called when opening the dialog.
		 * @param  {jQuery.Event} e
		 * @param  {Object} ui
		 */
		onOpen: function (e, ui) {
			// scroll fix
			this.overflow = $('body').css('overflow');
			$('body').css('overflow', 'hidden');

			this.editable = Aloha.getActiveEditable();
			var content = this.editable.getContents();
			this.editor.focus().val(htmlBeautifier(content));
		},

		/**
		 * Called when closing the dialog.
		 * @param  {jQuery.Event} e
		 * @param  {Object} ui
		 */
		onClose: function (e, ui) {
			$('body').css('overflow', this.overflow);
		},

		/**
		 * Called when saving editor content.
		 */
		onSave: function () {
			this.editable.activate();
			this.editable.setContents(this.editor.val());
			this.dialog.dialog('close');
		}

	});

});