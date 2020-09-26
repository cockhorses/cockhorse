package com.cockhorse.mapper;

import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    Pictures selImage(Sys_user user);
}
