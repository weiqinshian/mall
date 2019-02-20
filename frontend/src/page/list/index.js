/*
 * @Author: xw
 * @Date:   2017-06-22 23:46:42
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-24 15:20:38
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _util = require('util/util.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data: {
        listParam: {
            keyword: _util.getUrlParam('keyword') || '',
            categoryId: _util.getUrlParam('categoryId') || '',
            orderBy: _util.getUrlParam('orderBy') || 'default',
            pageNum: _util.getUrlParam('pageNum') || 1,
            pageSize: _util.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList();
    },
    bindEvent: function() {
        var _this = this;
        //排序的点击事件
        $('.sort-item').click(function() {
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            //点击默认排序
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
                //点击价格排序    
            } else if ($this.data('type') === 'price') {
                //active class 的处理
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                $this.addClass('active');
                //升序、降序
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    //加载list数据
    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        //删除参数中不必要的
        listParam.keyword ? (delete listParam.categoryId) : (delete listParam.keyword)
        _product.getProductList(listParam, function(res) {
            listHtml = _util.renderHtml(templateIndex, {
                list: res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            _util.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }

};
$(function() {
    page.init();
});
