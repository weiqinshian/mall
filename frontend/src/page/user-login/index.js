/*
 * @Author: xw
 * @Date:   2017-06-12 22:34:54
 * @Last Modified by:   xw
 * @Last Modified time: 2017-06-18 19:40:41
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _util = require('util/util.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.error-msg').text('');
    }
};

//page逻辑部分
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        //登陆按钮的点击
        $('#submit').click(function() {
            _this.submit();
        });
        //如果按下回车，也进行提交
        $('.user-content').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //提交表单
    submit: function() {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            _user.login(formData, function(res) {
                window.location.href = _util.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            });
            //验证失败
        } else {
            formError.show(validateResult.msg);
        }

    },
    //表单字段的验证
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }

};
$(function() {
    page.init();
});
