package com.cockhorse.service;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;

import java.util.Map;

public interface ShiroService {

    Map<String, String> loadFilterChainDefinitions();

    void updatePermission(ShiroFilterFactoryBean shiroFilterFactoryBean, Long roleId, Boolean isRemoveSession);
}
