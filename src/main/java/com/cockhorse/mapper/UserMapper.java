package com.cockhorse.mapper;

import com.cockhorse.entity.Address;
import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    int upload(Pictures pictures);

    List<Address> address();

    int updateInfo(Sys_user sys_user);
}
