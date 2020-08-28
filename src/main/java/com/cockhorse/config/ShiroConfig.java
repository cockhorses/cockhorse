package com.cockhorse.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {
    @Bean(name = "userRealm")
    public UserRealm getUserRealm(@Qualifier("hashedCredentialsMatcher") HashedCredentialsMatcher hashedCredentialsMatcher) {
        UserRealm userRealm = new UserRealm();
        userRealm.setCredentialsMatcher(hashedCredentialsMatcher);
        return userRealm;
    }

    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    @Bean(name = "shiroFilterFactoryBean")
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager") DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);

        Map<String, String> filtermap = new LinkedHashMap<String, String>();
        //menu/login界面可以未认证直接访问
        //登陆验证
        filtermap.put("/login/login", "anon");
        //获取验证码
        filtermap.put("/login/getCode", "anon");
        //验证码验证
        filtermap.put("/login/vrify", "anon");
        //登陆页面
        filtermap.put("/login/toLogin", "anon");
        //未认证可以访问静态资源
        filtermap.put("/css/**", "anon");
        filtermap.put("/layui/**", "anon");
        filtermap.put("/js/**", "anon");
        filtermap.put("/cockhorse/**", "anon");
        filtermap.put("/images/**", "anon");
        filtermap.put("*.png", "anon");
        filtermap.put("*jpg", "anon");



        //未认证都不允许通过
        filtermap.put("/**", "authc");

        shiroFilterFactoryBean.setFilterChainDefinitionMap(filtermap);
        //如果访问的页面未认证   跳转到登陆页面
        shiroFilterFactoryBean.setLoginUrl("/login/index");

        return shiroFilterFactoryBean;
    }

    //用来跟加密的密码进行比对的bean

    @Bean(name = "hashedCredentialsMatcher")
    public HashedCredentialsMatcher getHashedCredentialsMatcher() {
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        //设置比较规则
        hashedCredentialsMatcher.setHashAlgorithmName("MD5");
        //迭代2次
        hashedCredentialsMatcher.setHashIterations(2);
        return hashedCredentialsMatcher;
    }

    //shiro 与thymeleaf的整合
    @Bean
    public ShiroDialect getShiroDialect() {
        return new ShiroDialect();
    }
}
