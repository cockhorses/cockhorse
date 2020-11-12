package com.cockhorse.controller;

import com.cockhorse.entity.Menu;
import com.cockhorse.entity.Sys_user;
import com.cockhorse.entity.TreeNode;
import com.cockhorse.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/main")
public class MenuController {

    @Autowired
    MenuService menuService;

    @RequestMapping("/menu")
    public String menu(){
        return "main/main";
    }

    @RequestMapping("/menus")
    public String menus(){
        return "system/menus";
    }

    @RequestMapping("/getMenus")
    @ResponseBody
    public List<TreeNode> getMenus(HttpServletRequest request){
        Sys_user user = (Sys_user) request.getSession().getAttribute("user");
        List<Menu> list=menuService.selMenus(user);
        //创建list集合，把list放到nodes
        List<TreeNode> nodes=new ArrayList<>();
        for(Menu menus:list){
            Integer id = menus.getId();
            Integer pid = menus.getPid();
            String title = menus.getTitle();
            String icon = menus.getIcon();
            String href = menus.getHref();
            Boolean spread = menus.getSpread() == true;
            String target = menus.getTarget();
            nodes.add(new TreeNode(id, pid, title, icon, href, spread, target));
        }
        //组装菜单
        List<TreeNode> treeNodes=new ArrayList<>();
        //n1.getPid() == 1 为父级菜单
        for (TreeNode n1 : nodes) {
            if (n1.getPid() == 1) {
                treeNodes.add(n1);
            }
            //将n2放入n1的子级中   id为子级
            for (TreeNode n2 : nodes) {
                if (n2.getPid() == n1.getId()) {
                    n1.getChildren().add(n2);
                }
            }
        }
        return treeNodes;
    }


    @RequestMapping("/getAllMenus")
    @ResponseBody
    public Object getAllMenus(){
        List<Menu> menus = menuService.selAllMenus();
        System.out.println(menus);
        return null;
    }
}
