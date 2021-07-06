package com.cockhorse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class ErrorController {

    //如果是手机登录
    @RequestMapping("/phone")
    public String phone(){
        return "error/phone";
    }
}
