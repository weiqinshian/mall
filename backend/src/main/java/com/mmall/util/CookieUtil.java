package com.mmall.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by XW
 */
@Slf4j
public class CookieUtil {

    private static String cookieDomain = PropertiesUtil.getProperty("sso.cookie.domain");
    private static String isTestEnvironment = PropertiesUtil.getProperty("sso.login.test");//是否测试环境

    private final static String COOKIE_NAME = "mmall_login_token";


    /**
     * 读取cookie
     * @param request
     * @return
     */
    public static String readLoginToken(HttpServletRequest request){
        Cookie[] cks = request.getCookies();
        if(cks != null){
            for(Cookie ck : cks){
                log.info("read cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
                if(StringUtils.equals(ck.getName(),COOKIE_NAME)){
                    log.info("return cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
                    return ck.getValue();
                }
            }
        }
        return null;
    }

    //X:domain=".xwld.site"
    //a:A.xwld.site            cookie:domain=A.xwld.site;path="/"
    //b:B.xwld.site            cookie:domain=B.xwld.site;path="/"
    //c:A.xwld.site/test/cc    cookie:domain=A.xwld.site;path="/test/cc"
    //d:A.xwld.site/test/dd    cookie:domain=A.xwld.site;path="/test/dd"
    //e:A.xwld.site/test       cookie:domain=A.xwld.site;path="/test"

    /**
     * 视频13
     * 1.a-e，的所有选项，都能获取到X，中设置的cookie。
     * 
     * 
     * /
	/**
	 * 写入cookie
	 * @param response
	 * @param token
	 */
    public static void writeLoginToken(HttpServletResponse response,String token){
        Cookie ck = new Cookie(COOKIE_NAME,token);
        if(!"true".equals(isTestEnvironment)){
            ck.setDomain(cookieDomain);//非测试环境才指定cookiedomain=.xwld.site
        }
        ck.setPath("/");//代表设置在根目录。如果修改为test，那么表示只有test子目录下面的页面代码才能获取到这个cookie
        /*防止脚本攻击带来的信息泄露风险，设置之后规定不允许通过脚本访问cookie，浏览器也不会将cookie发送到任何第三方*/
        ck.setHttpOnly(true);
        /* 单位是秒。60 * 60 * 24 * 365 表示一年
         * 如果这个MaxAge不设置的话，cookie就不会写入硬盘，而是写在内存，只在当前页面有效，关闭浏览器失效。
         * 如果是-1，代表永久
         * */       
        ck.setMaxAge(60 * 60 * 24 * 365);
        log.info("write cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
        response.addCookie(ck);
    }


    /**
     * 注销登录，删除cookie
     * @param request
     * @param response
     */
    public static void delLoginToken(HttpServletRequest request,HttpServletResponse response){
        Cookie[] cks = request.getCookies();
        if(cks != null){
            for(Cookie ck : cks){
                if(StringUtils.equals(ck.getName(),COOKIE_NAME)){
                	if(!"true".equals(isTestEnvironment)){
                         ck.setDomain(cookieDomain);//非测试环境才指定cookiedomain=.xwld.site
                     }
                    ck.setPath("/");
                    ck.setMaxAge(0);//设置成0，代表删除此cookie。
                    log.info("del cookieName:{},cookieValue:{}",ck.getName(),ck.getValue());
                    response.addCookie(ck);
                    return;
                }
            }
        }
    }







}
