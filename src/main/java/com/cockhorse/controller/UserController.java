package com.cockhorse.controller;

import com.cockhorse.entity.Address;
import com.cockhorse.entity.Pictures;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/info")
    public String info(HttpServletRequest request, Model model) {
        Sys_user user = (Sys_user) request.getSession().getAttribute("user");
        model.addAttribute("user", user);
        return "user/info";
    }

    @ResponseBody
    @RequestMapping("/upload")
    public Map upload(MultipartFile file, HttpServletRequest request) {
        String path = "";
        Pictures pictures = new Pictures();
        try {
            if (file != null) {
                String originalName = file.getOriginalFilename();
                //获取后缀
                String prefix = originalName.substring(originalName.lastIndexOf(".") + 1);
                Date date = new Date();
                //生成唯一识别码
                String uuid = (UUID.randomUUID() + "").replace("-", "");
                //获取当前日期
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String dateStr = simpleDateFormat.format(date);
                //储存的路径
                String realPath = "C:/Users/liao/Desktop/cockhorse/" + dateStr + "/" + uuid + "." + prefix;
                //访问路径
                path = "../" + dateStr + "/" + uuid + "." + prefix;
                System.out.println(path);
                File files = new File(realPath);
                if (!files.getParentFile().exists()) {
                    files.getParentFile().mkdirs();
                }
                //上传文件
                file.transferTo(files);
                //把路径放到数据库
                pictures.setPath(path);
                userService.upload(pictures);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String, Object> map = new HashMap<>();
        map.put("pid", pictures.getPid());
        return map;
    }

    //编写三级菜单
    @ResponseBody
    @RequestMapping("/address")
    public Object address(){
        List<Address> address = userService.address();
        List<Address> list=new ArrayList<>();
        for(Address ads1:address){
            if(ads1.getParentid()==0){
                list.add(ads1);
            }
            for(Address ads2:address){
                if(ads2.getParentid()==ads1.getBase_areaid()){
                    ads1.getChildren().add(ads2);
                }
            }
        }
        return list;
    }

    //个人资料更新
    @ResponseBody
    @RequestMapping("/updateInfo")
    public Object updateInfo(Sys_user sys_user){
        Map<String,Object> map=new HashMap<>();
        System.out.println();
        return map;
    }
}