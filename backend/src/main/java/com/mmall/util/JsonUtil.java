package com.mmall.util;
import java.text.SimpleDateFormat;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;
import org.codehaus.jackson.type.JavaType;
import org.codehaus.jackson.type.TypeReference;

import com.mmall.pojo.TestPojo;

import lombok.extern.slf4j.Slf4j;

/**
 * Created by XW
 */
@Slf4j
public class JsonUtil {

    private static ObjectMapper objectMapper = new ObjectMapper();
      static{
    	  /*1.下面这些参数，会影响对象序列化的行为*/
        //对象的所有字段全部序列化为字符串，不管是否有字段为null
        objectMapper.setSerializationInclusion(Inclusion.ALWAYS);
        //取消默认转换timestamps形式，带时间戳
        objectMapper.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS,false);
        //忽略空Bean转json的错误，当user对象转json时，user对象中所有属性为null，转化为json对象也不报异常
        objectMapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS,false);
        //所有的日期格式都统一为以下的样式，即yyyy-MM-dd HH:mm:ss，实体类user中有属性为Date类型，使用此设置能格式化这种类型的格式。
        objectMapper.setDateFormat(new SimpleDateFormat(DateTimeUtil.STANDARD_FORMAT));
       
        /*2.下面这些参数，会影响对象反序列化的行为*/
        //忽略 在json字符串中存在，但是在java对象中不存在对应属性的情况。防止转换抛出错误
        objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,false);
    }

    /**
     * 对象转换为字符串
     * @param obj
     * @return
     */
    public static <T> String obj2String(T obj){
        if(obj == null){
            return null;
        }
        try {
            return obj instanceof String ? (String)obj :  objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            log.warn("Parse Object to String error",e);
            return null;
        }
    }

    /**
     * 返回格式化好的字符串
     * @param obj
     * @return
     */
    public static <T> String obj2StringPretty(T obj){
        if(obj == null){
            return null;
        }
        try {
            return obj instanceof String ? (String)obj :  objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
        } catch (Exception e) {
            log.warn("Parse Object to String error",e);
            return null;
        }
    }

    /**
     * 反序列化方法
     * 将字符串转换为T类型对象
     * 注意：此方法不能反序列化，集合+泛型类型的字符串，如： List<User> 
     * @param str
     * @param clazz
     * @return
     */
    public static <T> T string2Obj(String str,Class<T> clazz){
        if(StringUtils.isEmpty(str) || clazz == null){
            return null;
        }
        try {
            return clazz.equals(String.class)? (T)str : objectMapper.readValue(str,clazz);
        } catch (Exception e) {
            log.warn("Parse String to Object error",e);
            return null;
        }
    }
    /**
     *  反序列化方法
     * 将字符串转换为T类型对象
     * 注意：此方法比上一个强大，能反序列化，集合+泛型类型的字符串，如： List<User> 
     * List<User> userListObj1 = JsonUtil.string2Obj(userListStr, new TypeReference<List<User>>()
     * @param str
     * @param typeReference
     * @return
     */
    public static <T> T string2Obj(String str, TypeReference<T> typeReference){
        if(StringUtils.isEmpty(str) || typeReference == null){
            return null;
        }
        try {
            return (T)(typeReference.getType().equals(String.class)? str : objectMapper.readValue(str,typeReference));
        } catch (Exception e) {
            log.warn("Parse String to Object error",e);
            return null;
        }
    }


    /**
     *  反序列化方法
     * 将字符串转换为T类型对象
     * 注意：此方法比上一个强大，能反序列化，集合+泛型类型的字符串，如： List<User> 
     * List<User> userListObj2 = JsonUtil.string2Obj(userListStr,List.class,User.class);
     * @param str
     * @param collectionClass
     * @param elementClasses
     * @return
     */
    public static <T> T string2Obj(String str,Class<?> collectionClass,Class<?>... elementClasses){
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(collectionClass,elementClasses);
        try {
            return objectMapper.readValue(str,javaType);
        } catch (Exception e) {
            log.warn("Parse String to Object error",e);
            return null;
        }
    }

    public static void main(String[] args) {
        TestPojo testPojo = new TestPojo();
        testPojo.setName("XW");
        testPojo.setId(666);
        //{"name":"XW","id":666}
        String json = "{\"name\":\"XW\",\"color\":\"blue\",\"id\":666}";
        TestPojo testPojoObject = JsonUtil.string2Obj(json,TestPojo.class);
//        String testPojoJson = JsonUtil.obj2String(testPojo);
//        log.info("testPojoJson:{}",testPojoJson);
        log.info("end");
//        User user = new User();
//        user.setId(2);
//        user.setEmail("XW@xwld.site");
//        user.setCreateTime(new Date());
//        String userJsonPretty = JsonUtil.obj2StringPretty(user);
//        log.info("userJson:{}",userJsonPretty);
//        User u2 = new User();
//        u2.setId(2);
//        u2.setEmail("XWu2@xwld.site");
//
//
//        String user1Json = JsonUtil.obj2String(u1);
//
//        String user1JsonPretty = JsonUtil.obj2StringPretty(u1);
//
//        log.info("user1Json:{}",user1Json);
//
//        log.info("user1JsonPretty:{}",user1JsonPretty);
//
//
//        User user = JsonUtil.string2Obj(user1Json,User.class);
//
//
//        List<User> userList = Lists.newArrayList();
//        userList.add(u1);
//        userList.add(u2);
//
//        String userListStr = JsonUtil.obj2StringPretty(userList);
//
//        log.info("==================");
//
//        log.info(userListStr);
//
//
//        List<User> userListObj1 = JsonUtil.string2Obj(userListStr, new TypeReference<List<User>>() {
//        });
//
//
//        List<User> userListObj2 = JsonUtil.string2Obj(userListStr,List.class,User.class);
          System.out.println("end");
    }





}
