package com.cockhorse.service;

import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;

public interface UserService {

    Pictures selImage(Sys_user user);

    int upload(Pictures pictures);
}
