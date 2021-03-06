layui.config({
    base: "../cockhorse/main/"
}).extend({
    "bodyTab": "bodyTab"
})
var $, tab, dataStr, cacheStr = window.sessionStorage.getItem("cache"),
    oneLoginStr = window.sessionStorage.getItem("oneLogin"),
    changeRefreshStr = window.sessionStorage.getItem("changeRefresh");
;
layui.use(['bodyTab', 'jquery', 'layer', 'element', 'form', 'table'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var laydate = layui.laydate;
    var element = layui.element;
    $ = layui.$;

    tab = layui.bodyTab({
        openTabNum: "50",//最大可打开窗口数量
        url: "../main/getMenus"//获取菜单的地址
    });

    function getMenus() {
        $.getJSON(tab.tabConfig.url, function (data) {
            dataStr = data;
            //重新渲染左侧菜单
            tab.render();
        })
    }

    getMenus();

    //页面加载时判断左侧菜单是否显示
    //通过顶部菜单获取左侧菜单
    $(".topLevelMenus li,.mobileTopLevelMenus dd").click(function () {
        if ($(this).parents(".mobileTopLevelMenus").length != "0") {
            $(".topLevelMenus li").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
        } else {
            $(".mobileTopLevelMenus dd").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
        }
        $(".layui-layout-admin").removeClass("showMenu");
        $("body").addClass("site-mobile");
        getMenu($(this).data("menu"));
        //渲染顶部窗口
        tab.tabMove();
    })

    // 添加新窗口
    $("body").on("click", ".layui-nav .layui-nav-item a:not('.mobileTopLevelMenus .layui-nav-item a')", function () {
        //如果不存在子级
        if ($(this).siblings().length == 0) {
            addTab($(this));
            $('body').removeClass('site-mobile');  //移动端点击菜单关闭菜单层
        }
        $(this).parent("li").siblings().removeClass("layui-nav-itemed");
    })

    //刷新后还原打开的窗口
    if (cacheStr == "true") {
        if (window.sessionStorage.getItem("menu") != null) {
            menu = JSON.parse(window.sessionStorage.getItem("menu"));
            curmenu = window.sessionStorage.getItem("curmenu");
            var openTitle = '';
            for (var i = 0; i < menu.length; i++) {
                openTitle = '';
                if (menu[i].icon) {
                    if (menu[i].icon.split("-")[0] == 'icon') {
                        openTitle += '<i class="seraph ' + menu[i].icon + '"></i>';
                    } else {
                        openTitle += '<i class="layui-icon">' + menu[i].icon + '</i>';
                    }
                }
                openTitle += '<cite>' + menu[i].title + '</cite>';
                openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + menu[i].layId + '">&#x1006;</i>';
                element.tabAdd("bodyTab", {
                    title: openTitle,
                    content: "<iframe src='" + menu[i].href + "' data-id='" + menu[i].layId + "'></frame>",
                    id: menu[i].layId
                })
                //定位到刷新前的窗口
                if (curmenu != "undefined") {
                    if (curmenu == '' || curmenu == "null") {  //定位到后台首页
                        element.tabChange("bodyTab", '');
                    } else if (JSON.parse(curmenu).title == menu[i].title) {  //定位到刷新前的页面
                        element.tabChange("bodyTab", menu[i].layId);
                    }
                } else {
                    element.tabChange("bodyTab", menu[menu.length - 1].layId);
                }
            }
            //渲染顶部窗口
            tab.tabMove();
        }
    } else {
        window.sessionStorage.removeItem("menu");
        window.sessionStorage.removeItem("curmenu");
    }

    //打开新窗口
    function addTab(_this) {
        tab.tabAdd(_this);
    }

    //公告层
    function showNotice() {
        layer.open({
            type: 1,
            title: "系统公告",
            area: '300px',
            shade: 0.8,
            id: 'cockhorse',
            btn: ['火速围观'],
            moveType: 1,
            content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p class="layui-red">此系统只是试用版本，具体问题请联系QQ:2141256373</p></pclass></p><p>本网站的各个项目均来自网络。在此郑重提示各位：<span class="layui-red">本网站的各种项目均不负任何责任。</span></p></div>',
            success: function (layero) {
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                btn.on("click", function () {
                    tipsShow();
                });
            },
            cancel: function (index, layero) {
                tipsShow();
            }
        });
    }

    function tipsShow() {
        window.sessionStorage.setItem("showNotice", "true");
        if ($(window).width() > 432) {  //如果页面宽度不足以显示顶部“系统公告”按钮，则不提示
            layer.tips('系统公告躲在了这里', '#userInfo', {
                tips: 3,
                time: 1000
            });
        }
    }

    if (window.sessionStorage.getItem("lockcms") != "true" && window.sessionStorage.getItem("showNotice") != "true") {
        showNotice();
    }

    $(".showNotice").on("click", function () {
        showNotice();
    })

    //锁屏
    function lockPage() {
        layer.open({
            title: false,
            type: 1,
            content: '<div class="admin-header-lock" id="lock-box">' +
                '<div class="admin-header-lock-img"><img src=" class="userAvatar" id="lockImg"/></div>' +
                '<div class="admin-header-lock-name" id="lockUserName"></div>' +
                '<div class="input_btn">' +
                '<input type="password" class="admin-header-lock-input layui-input" autocomplete="off" placeholder="请输入密码解锁..." name="lockPwd" id="lockPwd" />' +
                '<button class="layui-btn" id="unlock">解锁</button>' +
                '</div>' +
                '</div>',
            closeBtn: 0,
            shade: 0.9,
            success: function () {
                $("#lockUserName").html($(".userName").html());
                $("#lockImg").prop("src", $("#userAvatar").prop("src"));
            }
        })
        $(".admin-header-lock-input").focus();
    }

    $(".lockcms").on("click", function () {
        window.sessionStorage.setItem("lockcms", true);
        lockPage();
    })

    // 判断是否显示锁屏
    if (window.sessionStorage.getItem("lockcms") == "true") {
        lockPage();
    }

    // 解锁
    $("body").on("click", "#unlock", function () {
        if ($(this).siblings(".admin-header-lock-input").val() == '') {
            layer.msg("请输入解锁密码！");
            $(this).siblings(".admin-header-lock-input").focus();
        } else {
            //把前台解锁密码输入后台进行判定
            $.post("../user/relpwd", {pwd:$(this).siblings(".admin-header-lock-input").val()}, function (obj) {
                if(obj){
                    window.sessionStorage.setItem("lockcms", false);
                    $("#unlock").siblings(".admin-header-lock-input").val('');
                    layer.closeAll("page");
                }else{
                    layer.msg("密码错误，请重新输入！");
                    $("#unlock").siblings(".admin-header-lock-input").val('').focus();
                }
            })
        }
    });
    $(document).on('keydown', function (event) {
        var event = event || window.event;
        if (event.keyCode == 13) {
            $("#unlock").click();
        }
    });

    //隐藏左侧导航
    $(".hideMenu").click(function () {
        if ($(".topLevelMenus li.layui-this a").data("url")) {
            layer.msg("此栏目状态下左侧菜单不可展开");  //主要为了避免左侧显示的内容与顶部菜单不匹配
            return false;
        }
        $(".layui-layout-admin").toggleClass("showMenu");
        //渲染顶部窗口
        tab.tabMove();
    })

    //清除缓存
    $(".clearCache").click(function () {
        window.sessionStorage.clear();
        window.localStorage.clear();
        var index = layer.msg('清除缓存中，请稍候', {icon: 16, time: false, shade: 0.8});
        setTimeout(function () {
            layer.close(index);
            layer.msg("缓存清除成功！");
        }, 1000);
        // var index = layer.msg('正在清除多余文件，请稍候', {icon: 16, time: false, shade: 0.8});
        // $.post("../user/delsurplus", null, function (obj) {
        //     setTimeout(function () {
        //         layer.close(index);
        //         if(obj==0){
        //             layer.msg("没有多余文件",{icon:0})
        //         }else if(obj==1){
        //             layer.msg("删除成功",{icon:1})
        //         }else if(obj==2){
        //             layer.msg("删除失败",{icon:2})
        //         }
        //     }, 2000);
        // });
    })

    //功能设定
    $(".functionSetting").click(function () {
        layer.open({
            title: "功能设定",
            area: ["400px", "300px"],
            type: "1",
            content: '<div class="functionSrtting_box">' +
                '<form class="layui-form">' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">开启Tab缓存</label>' +
                '<div class="layui-input-block">' +
                '<input type="checkbox" name="cache" lay-skin="switch" lay-text="开|关">' +
                '<div class="layui-word-aux">开启后刷新页面不关闭打开的Tab页</div>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">Tab切换刷新</label>' +
                '<div class="layui-input-block">' +
                '<input type="checkbox" name="changeRefresh" lay-skin="switch" lay-text="开|关">' +
                '<div class="layui-word-aux">开启后切换窗口刷新当前页面</div>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">单一登陆</label>' +
                '<div class="layui-input-block">' +
                '<input type="checkbox" name="oneLogin" lay-filter="multipleLogin" lay-skin="switch" lay-text="是|否">' +
                '<div class="layui-word-aux">开启后不可同时多个地方登录</div>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item skinBtn">' +
                '<a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-normal" lay-submit="" lay-filter="settingSuccess">设定完成</a>' +
                '<a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-primary" lay-submit="" lay-filter="noSetting">朕再想想</a>' +
                '</div>' +
                '</form>' +
                '</div>',
            success: function (index, layero) {
                //如果之前设置过，则设置它的值
                $(".functionSrtting_box input[name=cache]").prop("checked", cacheStr == "true" ? true : false);
                $(".functionSrtting_box input[name=changeRefresh]").prop("checked", changeRefreshStr == "true" ? true : false);
                $(".functionSrtting_box input[name=oneLogin]").prop("checked", oneLoginStr == "true" ? true : false);
                //设定
                form.on("submit(settingSuccess)", function (data) {
                    window.sessionStorage.setItem("cache", data.field.cache == "on" ? "true" : "false");
                    window.sessionStorage.setItem("changeRefresh", data.field.changeRefresh == "on" ? "true" : "false");
                    window.sessionStorage.setItem("oneLogin", data.field.oneLogin == "on" ? "true" : "false");
                    window.sessionStorage.removeItem("menu");
                    window.sessionStorage.removeItem("curmenu");
                    location.reload();
                    return false;
                });
                //取消设定
                form.on("submit(noSetting)", function () {
                    layer.closeAll("page");
                });
                //单一登陆提示
                form.on('switch(multipleLogin)', function (data) {
                    layer.tips('温馨提示：此功能暂时没有开发，所以没有功能演示，敬请谅解', data.othis, {tips: 1})
                });
                form.render();  //表单渲染
            }
        })
    })

    //判断是否修改过系统基本设置，去显示底部版权信息
    if (window.sessionStorage.getItem("systemParameter")) {
        systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
        $(".footer p span").text(systemParameter.powerby);
    }

    //更换皮肤
    function skins() {
        var skin = window.sessionStorage.getItem("skin");
        if (skin) {  //如果更换过皮肤
            if (window.sessionStorage.getItem("skinValue") != "自定义") {
                $("body").addClass(window.sessionStorage.getItem("skin"));
            } else {
                $(".layui-layout-admin .layui-header").css("background-color", skin.split(',')[0]);
                $(".layui-bg-black").css("background-color", skin.split(',')[1]);
                $(".hideMenu").css("background-color", skin.split(',')[2]);
            }
        }
    }

    skins();
    $(".changeSkin").click(function () {
        layer.open({
            title: "更换皮肤",
            area: ["310px", "280px"],
            type: "1",
            content: '<div class="skins_box">' +
                '<form class="layui-form">' +
                '<div class="layui-form-item">' +
                '<input type="radio" name="skin" value="默认" title="默认" lay-filter="default" checked="">' +
                '<input type="radio" name="skin" value="橙色" title="橙色" lay-filter="orange">' +
                '<input type="radio" name="skin" value="蓝色" title="蓝色" lay-filter="blue">' +
                '<input type="radio" name="skin" value="自定义" title="自定义" lay-filter="custom">' +
                '<div class="skinCustom">' +
                '<input type="text" class="layui-input topColor" name="topSkin" placeholder="顶部颜色" />' +
                '<input type="text" class="layui-input leftColor" name="leftSkin" placeholder="左侧颜色" />' +
                '<input type="text" class="layui-input menuColor" name="btnSkin" placeholder="顶部菜单按钮" />' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item skinBtn">' +
                '<a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-normal" lay-submit="" lay-filter="changeSkin">确定更换</a>' +
                '<a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-primary" lay-submit="" lay-filter="noChangeSkin">朕再想想</a>' +
                '</div>' +
                '</form>' +
                '</div>',
            success: function (index, layero) {
                var skin = window.sessionStorage.getItem("skin");
                if (window.sessionStorage.getItem("skinValue")) {
                    $(".skins_box input[value=" + window.sessionStorage.getItem("skinValue") + "]").attr("checked", "checked");
                }
                ;
                if ($(".skins_box input[value=自定义]").attr("checked")) {
                    $(".skinCustom").css("visibility", "inherit");
                    $(".topColor").val(skin.split(',')[0]);
                    $(".leftColor").val(skin.split(',')[1]);
                    $(".menuColor").val(skin.split(',')[2]);
                }
                ;
                form.render();
                $(".skins_box").removeClass("layui-hide");
                $(".skins_box .layui-form-radio").on("click", function () {
                    var skinColor;
                    if ($(this).find("div").text() == "橙色") {
                        skinColor = "orange";
                    } else if ($(this).find("div").text() == "蓝色") {
                        skinColor = "blue";
                    } else if ($(this).find("div").text() == "默认") {
                        skinColor = "";
                    }
                    if ($(this).find("div").text() != "自定义") {
                        $(".topColor,.leftColor,.menuColor").val('');
                        $("body").removeAttr("class").addClass("main_body " + skinColor + "");
                        $(".skinCustom").removeAttr("style");
                        $(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
                    } else {
                        $(".skinCustom").css("visibility", "inherit");
                    }
                })
                var skinStr, skinColor;
                $(".topColor").blur(function () {
                    $(".layui-layout-admin .layui-header").css("background-color", $(this).val() + " !important");
                })
                $(".leftColor").blur(function () {
                    $(".layui-bg-black").css("background-color", $(this).val() + " !important");
                })
                $(".menuColor").blur(function () {
                    $(".hideMenu").css("background-color", $(this).val() + " !important");
                })

                form.on("submit(changeSkin)", function (data) {
                    if (data.field.skin != "自定义") {
                        if (data.field.skin == "橙色") {
                            skinColor = "orange";
                        } else if (data.field.skin == "蓝色") {
                            skinColor = "blue";
                        } else if (data.field.skin == "默认") {
                            skinColor = "";
                        }
                        window.sessionStorage.setItem("skin", skinColor);
                    } else {
                        skinStr = $(".topColor").val() + ',' + $(".leftColor").val() + ',' + $(".menuColor").val();
                        window.sessionStorage.setItem("skin", skinStr);
                        $("body").removeAttr("class").addClass("main_body");
                    }
                    window.sessionStorage.setItem("skinValue", data.field.skin);
                    layer.closeAll("page");
                });
                form.on("submit(noChangeSkin)", function () {
                    $("body").removeAttr("class").addClass("main_body " + window.sessionStorage.getItem("skin") + "");
                    $(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
                    skins();
                    layer.closeAll("page");
                });
            },
            cancel: function () {
                $("body").removeAttr("class").addClass("main_body " + window.sessionStorage.getItem("skin") + "");
                $(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
                skins();
            }
        })
    })
});
//如果是电脑则禁止打开控制台
// var threshold = 160;
// window.setInterval(function () {
//     if (window.outerWidth - window.innerWidth > threshold ||
//         window.outerHeight - window.innerHeight > threshold) {
//         window.location.reload();
//     }
// }, 1e3);