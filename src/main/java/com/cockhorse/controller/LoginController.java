package com.cockhorse.controller;

import com.cockhorse.entity.Sys_user;
import com.cockhorse.service.LoginService;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    //验证码工具
    @Autowired
    DefaultKaptcha defaultKaptcha;
    @Autowired
    LoginService loginService;

    @RequestMapping("/index")
    public String index(){
        return "login/index";
    }

    @RequestMapping("/toLogin")
    public String toLogin() {
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
        if (code.equals(input)) {
            rel = true;
        }
        return rel;
    }


    //登陆验证
    @RequestMapping("/login")
    public String login(Model model, HttpServletRequest request, String loginname, String loginpwd){
        if(loginname==null){
            model.addAttribute("msg","请勿直接访问路径！");
            return "login/login";
        }else{
            //建立subject
            Subject subject= SecurityUtils.getSubject();
            //封装token凭证
            UsernamePasswordToken token=new UsernamePasswordToken(loginname,loginpwd);
            //登陆
            try{
                subject.login(token);
                Sys_user user=loginService.loginname(loginname);
                request.getSession().setAttribute("user",user);
                return "main/main";
            }catch (UnknownAccountException e){
                model.addAttribute("msg","用户不存在！");
                return "login/login";
            }catch (IncorrectCredentialsException e){
                model.addAttribute("msg","密码输入错误！");
                return "login/login";
            }
        }
    }

}
