package com.cockhorse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RunController {
    @RequestMapping("/")
    public String run(){
        return "login/index";
    }
}
