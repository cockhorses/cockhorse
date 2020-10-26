package com.cockhorse.service.Impl;

import com.cockhorse.entity.Address;
import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.mapper.UserMapper;
import com.cockhorse.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Resource
    UserMapper userMapper;

    @Override
    public int upload(Pictures pictures) {
        return userMapper.upload(pictures);
    }

    @Override
    public List<Address> address() {
        return userMapper.address();
    }

    @Override
    public int updateInfo(Sys_user sys_user) {
        return userMapper.updateInfo(sys_user);
    }

    @Override
    public List<Pictures> delsurplus() {
        return userMapper.delsurplus();
    }

    @Override
    public int delPath(Pictures pictures) {
        return userMapper.delPath(pictures);
    }
}
