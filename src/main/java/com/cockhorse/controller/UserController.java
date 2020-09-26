package com.cockhorse.controller;

import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/info")
    public String info(Sys_user sys_user){
        System.out.println(sys_user.toString());
        return "login/index";
    }

    @RequestMapping("/image")
    public void image(Sys_user user, HttpServletRequest request, HttpServletResponse response){
        Pictures pictures = userService.selImage(user);
        FileInputStream fis = null;
        OutputStream os = null;
        try {
            fis = new FileInputStream(System.getProperty("user.dir")+"\\src\\main\\resources\\static\\images\\"+pictures.getPath());
            os = response.getOutputStream();
            int count = 0;
            byte[] buffer = new byte[1024 * 8];
            while ((count = fis.read(buffer)) != -1) {
                os.write(buffer, 0, count);
                os.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                fis.close();
                os.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
