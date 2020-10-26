package com.cockhorse.service;

import com.cockhorse.entity.Address;
import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;

import java.util.List;

public interface UserService {

    int upload(Pictures pictures);

    List<Address> address();

    int updateInfo(Sys_user sys_user);
}
