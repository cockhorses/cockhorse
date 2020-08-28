package com.cockhorse.mapper;

import com.cockhorse.entity.Sys_user;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    Sys_user loginname(String loginname);
}
