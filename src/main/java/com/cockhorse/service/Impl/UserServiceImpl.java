package com.cockhorse.service.Impl;

import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.mapper.UserMapper;
import com.cockhorse.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Resource
    UserMapper userMapper;

    @Override
    public Pictures selImage(Sys_user user) {
        return userMapper.selImage(user);
    }

    @Override
    public int upload(Pictures pictures) {
        return userMapper.upload(pictures);
    }
}
