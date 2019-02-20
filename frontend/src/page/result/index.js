/*
 * @Author: xw
 * @Date:   2017-06-16 20:17:03
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-26 23:03:02
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _util = require('util/util.js');

$(function() {
    var type = _util.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success'),
        orderNo = _util.getUrlParam('orderNo');
    if (type === 'payment') {
        var $orderNo = $element.find('.orderNo');
        $orderNo.attr('href', $orderNo.attr('href') + orderNo);
    }
    $element.show();
});
