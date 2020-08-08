package com.cockhorse.mapper;

import com.cockhorse.entity.Sys_user;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuMapper {

    Sys_user loginname(String loginname);
}
