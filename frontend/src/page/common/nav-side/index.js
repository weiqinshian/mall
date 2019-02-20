/*
 * @Author: xw
 * @Date:   2017-06-16 17:52:03
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-22 12:47:29
 */

'use strict';

require('./index.css');
var _util = require('util/util.js');
var templateIndex = require('./index.string');

//侧边导航
var nav_side = {
    option: {
        name: '',
        navList: [
            { name: 'user-center', desc: '个人中心', href: './user-center.html' },
            { name: 'order-list', desc: '我的订单', href: './order-list.html' },
            { name: 'update-password', desc: '修改密码', href: './user-password-reset.html' },
            { name: 'about', desc: '关于MMALL', href: './about.html' }

        ]
    },
    init: function(option) {
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function() {
        //计算active数据
        for (var i = 0, size = this.option.navList.length; i < size; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        };
        //渲染list数据
        var navHtml = _util.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        //html放入容器
        $('.nav-side').html(navHtml);
    }
}
module.exports = nav_side;
