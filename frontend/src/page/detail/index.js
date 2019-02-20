/*
 * @Author: xw
 * @Date:   2017-06-24 14:13:25
 * @Last Modified by:   xw
 * @Last Modified time: 2017-07-11 14:59:22
 */

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _cart = require('service/cart-service.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        productId: _util.getUrlParam('productId') || ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        // 如果没有传productId
        if (!this.data.productId) {
            _util.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function() {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        //数量加减
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 0;
            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);

            } else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        //加入购物车
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg) {
                _util.errorTips(errMsg);
            });
        });
    },
    //加载商品详情的数据
    loadDetail: function() {
        var html = '',
            _this = this,
            $pageWrap = $('.page-wrap');
        //loading
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            _this.data.detailInfo = res;
            html = _util.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了...</p>');
        });
    },
    filter: function(data) {
        data.subImages = data.subImages.split(',');
    }
};
$(function() {
    page.init();
});
