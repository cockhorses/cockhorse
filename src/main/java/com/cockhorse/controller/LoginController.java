package com.cockhorse.controller;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

@Controller
@RequestMapping("/login")
public class LoginController {

    @RequestMapping("/index")
    public String logins(){
        return "login/index";
    }

    //验证码工具
    @Autowired
    DefaultKaptcha defaultKaptcha;

    @RequestMapping("/login")
    public String login() {
        return "login/login";
    }

    //生成验证码
    @RequestMapping("/getCode")
    public void getCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        byte[] bytes = null;
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        //生成验证码
        String code = defaultKaptcha.createText();
        request.getSession().setAttribute("code", code);
        //使用生成的验证码字符串放回一个BufferedImage对象并转为byte写入byte数组
        BufferedImage image = defaultKaptcha.createImage(code);
        ImageIO.write(image, "jpg", outputStream);
        // 定义response输出类型为image/jpeg类型，使用response输出流输出图片的byte数组
        bytes = outputStream.toByteArray();
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        ServletOutputStream responseOutputStream = response.getOutputStream();
        responseOutputStream.write(bytes);
        responseOutputStream.flush();
        responseOutputStream.close();
    }

    //校对验证码
    @RequestMapping("/vrify")
    @ResponseBody
    public Object vrify(HttpServletResponse response, HttpServletRequest request) {
        boolean rel = false;
        String code = (String) request.getSession().getAttribute("code");
        String input = request.getParameter("code");
        System.out.println(code+"+"+input);
        if (code.equals(input)) {
            rel = true;
        }
        return rel;
    }

}
