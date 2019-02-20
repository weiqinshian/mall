/*
 * @Author: xw
 * @Date:   2017-06-23 22:34:05
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-24 00:05:08
 */

'use strict';
require('./index.css');
var _util = require('util/util.js');
var templatePagination = require('./index.string');

var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    //事件处理
    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function'?
        _this.option.onSelectPage($this.data('value')):null;

    });
};

//渲染分页组件
Pagination.prototype.render = function(userOption) {
    //ps:不会影响defaultOption的值
    this.option = $.extend({}, this.defaultOption, userOption);
    //判断容器是否为合法的jQuery对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    //只有一页
    if (this.option.pages <= 1) {
        return;
    }
    //渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};

//获取分页html，|上一页|1 2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function() {
    var html = '',
        option = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
    //上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: option.prePage,
        disabled: !option.hasPreviousPage
    });
    // 数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        });
    }
    //上一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disabled: !option.hasNextPage
    });
    html = _util.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
};

module.exports = Pagination;
