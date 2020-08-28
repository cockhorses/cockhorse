package com.cockhorse.config;

import com.cockhorse.entity.Sys_user;
import com.cockhorse.service.LoginService;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;


public class UserRealm extends AuthorizingRealm {

    @Autowired
    private LoginService loginService;

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken){
        //获取前台登陆loginname
        String loginname= (String) authenticationToken.getPrincipal();
        Sys_user sys_user=null;
        try {
            sys_user=loginService.loginname(loginname);
        }catch (Exception e){
            e.printStackTrace();
        }
        //判断是否有值
        if(sys_user==null){
            return null;
        }
        //密码不需要我们对比，shiro会自动对比
        SimpleAuthenticationInfo info=new SimpleAuthenticationInfo(sys_user,sys_user.getLoginpwd(), ByteSource.Util.bytes(sys_user.getSalt()),getName());
        return info;
    }

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }
}
