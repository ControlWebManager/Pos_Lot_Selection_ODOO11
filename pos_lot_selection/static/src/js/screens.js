odoo.define('pos_lot_selection.screens', function (require) {
"use strict";

var screens = require('point_of_sale.screens');
var PosBaseWidget = require('point_of_sale.BaseWidget');
var gui = require('point_of_sale.gui');
var models = require('point_of_sale.models');
var core = require('web.core');
var rpc = require('web.rpc');
var utils = require('web.utils');
var field_utils = require('web.field_utils');
var BarcodeEvents = require('barcodes.BarcodeEvents').BarcodeEvents;

var QWeb = core.qweb;
var _t = core._t;

var round_pr = utils.round_precision;

screens.ActionpadWidget.include({

    renderElement: function() {
        var self = this;
        this._super();
        this.$('.pay').click(function(){
            var order = self.pos.get_order();
            var has_valid_product_lot = _.every(order.orderlines.models, function(line){
                return line.has_valid_product_lot();
            });
            if(!has_valid_product_lot){
                self.gui.show_popup('confirm',{
                    'title': _t('Empty Serial/Lot Number'),
                    'body':  _t('One or more product(s) required serial/lot number.'),
                    confirm: function(){
                        self.gui.show_screen('products');
                    },
                });
            }else{
                self.gui.show_screen('payment');
            }
        });
        this.$('.set-customer').click(function(){
            self.gui.show_screen('clientlist');
        });
    }
});


});
