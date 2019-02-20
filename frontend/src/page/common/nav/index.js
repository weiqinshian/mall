/*
 * @Author: xw
 * @Date:   2017-06-15 17:52:47
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-19 19:13:35
 */

'use strict';
require('./index.css');
var _util = require('util/util.js'),
    _user = require('service/user-service.js'),
    _cart = require('service/cart-service.js');

var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function() {
        //登陆点击事件
        $('.js-login').click(function() {
            _util.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function() {
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(function() {
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _util.errorTips(errMsg);
            });
        });
    },
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide()
                .siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg) {
            //do nothing
        });
    },
    loadCartCount: function() {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        });

    }

}
module.exports = nav.init();
