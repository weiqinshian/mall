package com.mmall.common;

import com.mmall.util.PropertiesUtil;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * 单个redis ，连接池配置
 * @author XW
 *
 */
public class RedisPool {
	/*jedis连接池，申明为静态类型，保证tomcat，一启动就加载连接池，后面使用静态代码块初始化*/
    private static JedisPool pool;
    /*此属性用来，控制redis连接池里面redisserver中的最大连接数*/
    private static Integer maxTotal = Integer.parseInt(PropertiesUtil.getProperty("redis.max.total","20")); 
    private static Integer maxIdle = Integer.parseInt(PropertiesUtil.getProperty("redis.max.idle","20"));//在jedispool中最大的idle状态(空闲的)的jedis实例的个数
    private static Integer minIdle = Integer.parseInt(PropertiesUtil.getProperty("redis.min.idle","20"));//在jedispool中最小的idle状态(空闲的)的jedis实例的个数

    private static Boolean testOnBorrow = Boolean.parseBoolean(PropertiesUtil.getProperty("redis.test.borrow","true"));//在borrow一个jedis实例的时候，是否要进行验证操作，如果赋值true。则得到的jedis实例肯定是可以用的。
    private static Boolean testOnReturn = Boolean.parseBoolean(PropertiesUtil.getProperty("redis.test.return","true"));//在return一个jedis实例的时候，是否要进行验证操作，如果赋值true。则放回jedispool的jedis实例肯定是可以用的。

    private static String redisIp = PropertiesUtil.getProperty("redis.ip");
    private static Integer redisPort = Integer.parseInt(PropertiesUtil.getProperty("redis.port"));


    /**
     * 初始化连接池
     */
    private static void initPool(){
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(maxTotal);
        config.setMaxIdle(maxIdle);
        config.setMinIdle(minIdle);
        config.setTestOnBorrow(testOnBorrow);
        config.setTestOnReturn(testOnReturn);
        config.setBlockWhenExhausted(true);//连接耗尽的时候，是否阻塞，false会抛出异常，true阻塞直到超时。默认为true。 xwredis_123456789;
        /**
         * 超时时间2s
         */
 
        //      pool = new JedisPool(config,"47.106.172.105",6379,1000*20);
        pool= new JedisPool(config,redisIp,6379,1000*2, "xw_redis_123456789");//指定redis密码
   
    }
    //静态代码块初始化连接池。
    static{
        initPool();
    }

    public static Jedis getJedis(){
        return pool.getResource();
    }
    
    /**
     * 将异常的jedis连接，放回连接池
     * @param jedis
     */
    public static void returnBrokenResource(Jedis jedis){
        pool.returnBrokenResource(jedis);
    }
    
    /**
     * 将jedis放回连接池
     * @param jedis
     */
    public static void returnResource(Jedis jedis){
        pool.returnResource(jedis);
    }
    public static void main(String[] args) {
        try {
            Jedis jedis = pool.getResource();
            jedis.set("xwkey","xwvalue");
            returnResource(jedis);
            pool.destroy();//临时调用，销毁连接池中的所有连接
            System.out.println("program is end");
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
}
