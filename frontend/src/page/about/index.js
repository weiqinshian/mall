/*
 * @Author: xw
 * @Date:   2017-06-26 23:09:02
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-26 23:11:48
 */

'use strict';

require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');

//page逻辑部分
var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        //初始化左侧菜单
        navSide.init({
            name: 'about'
        });
    }
};
$(function() {
    page.init();
});
