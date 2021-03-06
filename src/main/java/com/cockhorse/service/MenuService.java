package com.cockhorse.service;

import com.cockhorse.entity.Menu;
import com.cockhorse.entity.Sys_user;

import java.util.List;

public interface MenuService {

    List<Menu> selMenus(Sys_user user);
    List<Menu> selAuthority();
    List<Menu> selAllMenus();
}
