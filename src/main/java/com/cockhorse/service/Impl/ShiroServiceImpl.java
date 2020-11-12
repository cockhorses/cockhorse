package com.cockhorse.service.Impl;

import com.cockhorse.entity.Menu;
import com.cockhorse.service.MenuService;
import com.cockhorse.service.ShiroService;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShiroServiceImpl implements ShiroService {

    @Autowired
    MenuService menuService;

    @Override
    public Map<String, String> loadFilterChainDefinitions() {
        List<Menu> menus = menuService.selAuthority();
        Map<String, String> filtermap = new LinkedHashMap<>();
        if (menus.size() > 0) {
            for (Menu menu : menus) {
                filtermap.put(menu.getHref(), menu.getAuthority());
            }
        }
        //登陆验证
        filtermap.put("/login/login", "anon");
        //配置退出过滤器,退出代码Shiro已经替我们实现
        filtermap.put("/logout", "logout");
        //获取验证码
        filtermap.put("/login/getCode", "anon");
        //验证码验证
        filtermap.put("/login/vrify", "anon");
        //登陆页面
        filtermap.put("/login/toLogin", "anon");
        //手机登陆拦截界面
        filtermap.put("/error/phone", "anon");
        //未认证可以访问静态资源
        filtermap.put("/layui/**", "anon");
        filtermap.put("/cockhorse/**", "anon");
        filtermap.put("/images/**", "anon");
        filtermap.put("*.png", "anon");
        filtermap.put("*jpg", "anon");
        //未认证都不允许通过
        filtermap.put("/**", "authc");
        return filtermap;
    }


    //刷新权限
    @Override
    public void updatePermission(ShiroFilterFactoryBean shiroFilterFactoryBean, Long roleId, Boolean isRemoveSession) {
//        synchronized (this) {
//            AbstractShiroFilter shiroFilter;
//            try {
//                shiroFilter = (AbstractShiroFilter) shiroFilterFactoryBean.getObject();
//            } catch (Exception e) {
//                throw new RuntimeException("get ShiroFilter from shiroFilterFactoryBean error!");
//            }
//            PathMatchingFilterChainResolver filterChainResolver = (PathMatchingFilterChainResolver) shiroFilter.getFilterChainResolver();
//            DefaultFilterChainManager manager = (DefaultFilterChainManager) filterChainResolver.getFilterChainManager();
//            // 清空老的权限控制
//            manager.getFilterChains().clear();
//            shiroFilterFactoryBean.getFilterChainDefinitionMap().clear();
//            shiroFilterFactoryBean.setFilterChainDefinitionMap(loadFilterChainDefinitions());
//            // 重新构建生成
//            Map<String, String> chains = shiroFilterFactoryBean.getFilterChainDefinitionMap();
//            for (Map.Entry<String, String> entry : chains.entrySet()) {
//                String url = entry.getKey();
//                String chainDefinition = entry.getValue().trim().replace(" ", "");
//                manager.createChain(url, chainDefinition);
//            }
//            List<Sys_user> users = userMapper.findUsersByRoleId(roleId);
//
//            if (users.size() > 0) {
//                for (Sys_user user : users) {
//                    ShiroUtil.kickOutUser(user.getUsername(), isRemoveSession);
//                }
//            }
//        }
    }
}
