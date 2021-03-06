package com.cockhorse.service.Impl;

import com.cockhorse.entity.Menu;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.mapper.MenuMapper;
import com.cockhorse.service.MenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    @Resource
    MenuMapper menuMapper;

    @Override
    public List<Menu> selMenus(Sys_user user) {
        return menuMapper.selMenus(user);
    }

    @Override
    public List<Menu> selAuthority() {
        return menuMapper.selAuthority();
    }

    @Override
    public List<Menu> selAllMenus() {
        return menuMapper.selAllMenus();
    }
}
