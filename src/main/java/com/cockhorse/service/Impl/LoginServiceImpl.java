package com.cockhorse.service.Impl;

import com.cockhorse.entity.Sys_role;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.mapper.LoginMapper;
import com.cockhorse.service.LoginService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Resource
    LoginMapper loginMapper;

    @Override
    public Sys_user loginname(String loginname) {
        return loginMapper.loginname(loginname);
    }

    @Override
    public Sys_role selRoleName(Sys_user sys_user) {
        return loginMapper.selRoleName(sys_user);
    }
}
