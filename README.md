# mall
## 项目概述

此电商项目为本人学习项目，项目后端有使用nginx做负载均衡，转发请求到多台tomcat服务器，有使用多台 redis服务器分布式 缓存用户登录信息。

项目已经部署到阿里云服务器，从阿里云linux服务器租用，到项目前后台代码的完善，前后花费了3个月左右的时间。

关于此项目更详细内容可以参考本人博客：https://www.cnblogs.com/weiqinshian/p/10361599.html

## 项目地址

本人已经部署该项目，租用的阿里云服务器的ip地址为：47.106.172.105，购买的域名地址为：[www.xwld.site](http://www.xwld.site/)，

商城地址为：[http://www.xwld.site](http://www.xwld.site/)

大部分商品详情图片还没有上传，暂时只上传了一个商品用于演示。

地址：<http://www.xwld.site/list.html?categoryId=100006>

## 后端所用技术

- Spring
- SpringMVC
- MyBatis
- MySQL
- Lombok：省去手动创建setter和getter方法
- Mycat：数据库分库分表中间件
- Redis：缓存
- Jedis：Redis的Java Client
- Nginx
- Tomcat
- Maven
- 第三方接口
  - 支付宝沙箱测试接口，实现订单支付

## 前端所用技术

- Html
- Css
- JavaScript
- Node.js
- Npm
- Webpack
- Charles

## 项目架构及功能模块图



![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100032412-2000024815.jpg)

## 项目完整购买流程展示

### 首页

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100027118-547430761.png)

### 商品列表页面

暂时只上传了一个商品。

地址：<http://www.xwld.site/list.html?categoryId=100006> ![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100027861-922927238.png)

 

### 商品详情页面 

地址：<http://www.xwld.site/detail.html?productId=27>

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100028475-75555546.png)

 

### 登录页面

地址：<http://www.xwld.site/user-login.html?redirect=http%3A%2F%2Fwww.xwld.site%2Forder-detail.html%3ForderNo%3D1549504659738>

测试账号：admin

密码：123456

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100028956-276379330.png)

 

### 购物车页面

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100029415-1058565657.png)

 

### 订单确认页面

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100030301-730227045.png)

 

### 生成支付二维码页面

本人手机安装了沙箱测试版支付宝，使用沙箱测试版支付宝扫码支付。

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100030915-1552842393.png)

 

### 手机扫码支付成功之后

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100031394-1012221140.png)

 

### 查看订单详情

![img](https://img2018.cnblogs.com/blog/793368/201902/793368-20190212100031951-1442074654.png)

 



 