package com.cockhorse.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import com.cockhorse.service.ShiroService;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    @Bean
    public UserRealm getUserRealm() {
        UserRealm userRealm = new UserRealm();
        userRealm.setCredentialsMatcher(hashedCredentialsMatcher());
        return userRealm;
    }

    @Bean
    public DefaultWebSecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(getUserRealm());
        return securityManager;
    }

    @Bean
    public HashedCredentialsMatcher hashedCredentialsMatcher() {
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        hashedCredentialsMatcher.setHashAlgorithmName("MD5");//散列算法:这里使用MD5算法;
        hashedCredentialsMatcher.setHashIterations(1024);//散列的次数;
//        SimpleHash md5=new SimpleHash("MD5","542633","4f3a20",1024);
        return hashedCredentialsMatcher;
    }

    @Bean
    public ShiroFilterFactoryBean shiroFilter(ShiroService shiroService) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager());
        Map<String, Filter> filterMap = new LinkedHashMap<>(1);
        filterMap.put("roles", rolesAuthorizationFilter());
        shiroFilter.setFilters(filterMap);
        shiroFilter.setFilterChainDefinitionMap(shiroService.loadFilterChainDefinitions());
        shiroFilter.setLoginUrl("/login/index");
        return shiroFilter;
    }

    @Bean
    public CustomRolesAuthorizationFilter rolesAuthorizationFilter() {
        return new CustomRolesAuthorizationFilter();
    }

    //shiro 与thymeleaf的整合
    @Bean
    public ShiroDialect getShiroDialect() {
        return new ShiroDialect();
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager());
        return authorizationAttributeSourceAdvisor;
    }
}
