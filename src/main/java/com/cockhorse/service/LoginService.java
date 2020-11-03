package com.cockhorse.service;

import com.cockhorse.entity.Sys_role;
import com.cockhorse.entity.Sys_user;

public interface LoginService {

    Sys_user loginname(String loginname);

    Sys_role selRoleName(Sys_user sys_user);
}
