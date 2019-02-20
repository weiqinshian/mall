/*
 * @Author: xw
 * @Date:   2017-06-16 13:22:53
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-23 08:55:18
 */

'use strict';
require('./index.css');

var _util = require('util/util.js');
var header = {

    init: function() {
        this.bindEvent();
        return this;
    },
    onLoad: function() {
        var keyword = _util.getUrlParam('keyword');
        //keyword存在,则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        var _this = this;
        //提交
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        //由于不是submit按钮的提交,键盘回车无法触发搜索,故而为提交按钮绑定一个keyup事件
        $('#search-input').keyup(function(e) {
            if (e.keyCode == 13) {
            	_this.searchSubmit();
            }

        });
    },
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有关键字，正常跳转list页面
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            //如果没有关键字，则跳转首页	
            _util.goHome();
        }

    }
}
module.exports = header.init();
