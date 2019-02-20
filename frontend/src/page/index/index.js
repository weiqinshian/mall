/*
 * @Author: xw
 * @Date:   2017-06-09 13:26:38
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-22 23:36:17
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _util = require('util/util.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./index.string');

$(function() {
    // 渲染banner的html
    var bannerHtml = _util.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    //向前向后操作的事件绑定
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
