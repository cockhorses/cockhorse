package com.cockhorse.controller;

import com.cockhorse.entity.Sys_user;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/info")
    public String info(Sys_user sys_user){
        System.out.println(sys_user.toString());
        return "login/index";
    }
}
