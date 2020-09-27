package com.cockhorse.mapper;

import com.cockhorse.entity.Menu;
import com.cockhorse.entity.Sys_user;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuMapper {

    List<Menu> selAllMenus(Sys_user user);
}
