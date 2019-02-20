/*
 * @Author: xw
 * @Date:   2017-06-20 16:49:54
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-22 23:50:50
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
        this.bindEvent();
    },
    onLoad: function() {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent: function() {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            }
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                //更新用户信息
                _user.updateUserInfo(userInfo, function(res) {
                    _util.successTips(res.msg);
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    _util.errorTips(errMsg);
                });
            } else {
                _util.errorTips(validateResult.msg);
            }
        });
    },
    //表单字段的验证
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_util.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_util.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_util.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    //加载个人信息
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _util.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _util.errorTips(errMsg);
        });
    }
};
$(function() {
    page.init();
});
