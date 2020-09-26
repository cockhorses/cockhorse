package com.cockhorse.service.Impl;

import com.cockhorse.mapper.MenuMapper;
import com.cockhorse.service.MenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    @Resource
    MenuMapper menuMapper;

}
