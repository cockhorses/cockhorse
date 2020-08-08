package com.cockhorse.service.Impl;

import com.cockhorse.entity.Sys_user;
import com.cockhorse.mapper.MenuMapper;
import com.cockhorse.service.MenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    @Resource
    MenuMapper menuMapper;

    //查询账号密码
    @Override
    public Sys_user loginname(String loginname) {
        return menuMapper.loginname(loginname);
    }
}
