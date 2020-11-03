package com.cockhorse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/system")
public class SystemController {

    @RequestMapping("/menus")
    public String menus(){
        return "system/menus";
    }
    @RequestMapping("/users")
    public String users(){
        return "system/users";
    }
    @RequestMapping("/roles")
    public String roles(){
        return "system/roles";
    }
    @RequestMapping("/icons")
    public String icons(){
        return "system/icons";
    }
}
