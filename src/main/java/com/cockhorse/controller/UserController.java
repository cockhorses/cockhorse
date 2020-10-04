package com.cockhorse.controller;

import com.cockhorse.entity.Sys_user;
import com.cockhorse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/info")
    public String info(HttpServletRequest request, Model model){
        Sys_user user= (Sys_user) request.getSession().getAttribute("user");
        model.addAttribute("user",user);
        return "user/info";
    }

}
