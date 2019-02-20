<%@ page language="java"  contentType="text/html; charset=UTF-8" %>

<html>
<body>
<h2>Tomcat1!</h2>
<h2>Tomcat1!</h2>
<h2>Tomcat1!</h2>
<h2>Hello World!</h2>



springmvc上传文件
<form name="form1" action="/mmall/manage/product/upload.do" method="post" enctype="multipart/form-data">
    <input type="file" name="upload_file" />
    <input type="submit" value="springmvc上传文件" />
</form>


富文本图片上传文件
<form name="form2" action="/mmall/manage/product/richtext_img_upload.do" method="post" enctype="multipart/form-data">
    <input type="file" name="upload_file" />
    <input type="submit" value="富文本图片上传文件" />
</form>


简易登录功能：
<form name="form3" action="/mmall/user/login.do" method="post"  >
    <input type="text" name="username" value="" />
    <input type="text" name="password" value="" />
    <input type="submit" value="登录" />
</form>
<form name="form4" action="/mmall/user/logout.do" method="post"  >
    <input type="submit" value="退出登录" />
</form>
<form name="form4" action="/mmall/user/get_user_info.do" method="post"  >
    <input type="submit" value="获取用户信息" />
</form>
</body>
</html>
