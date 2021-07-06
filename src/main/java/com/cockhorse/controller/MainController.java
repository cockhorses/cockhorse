package com.cockhorse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {

    //跳转主页面
    @RequestMapping("/home")
    public String home(){
        return "main/home";
    }
}
