/*
 * @Author: xw
 * @Date:   2017-06-19 23:20:07
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-23 08:39:17
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    //加载个人信息
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _util.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _util.errorTips(errMsg);
        });
    }
};
$(function() {
    page.init();
});
