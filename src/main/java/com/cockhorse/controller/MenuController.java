package com.cockhorse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/main")
public class MenuController {

    @RequestMapping("/menu")
    public String menu(){
        return "main/main";
    }

}
