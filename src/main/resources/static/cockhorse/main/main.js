layui.config({
    base: "../cockhorse/main/"
})
var $, tab, dataStr;
layui.use(['bodyTab', 'jquery', 'layer', 'element', 'form', 'table'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var laydate = layui.laydate;
    var element = layui.element;
    $ = layui.$;
    //隐藏左侧导航
    $(".hideMenu").click(function(){
        if($(".topLevelMenus li.layui-this a").data("url")){
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
    })

    //显示当前时间
    function timeNow() {
        var myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth() + 1;
        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours();       //获取当前小时数(0-23)
        var m = myDate.getMinutes();     //获取当前分钟数(0-59)
        var s = myDate.getSeconds();
        var now = year + '年' + getNow(month) + '月' + getNow(date) + "日     " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
        // 赋值给展示时间
        $('#time').text(now);
    }

    // 获取当前时间
    function getNow(s) {
        return s < 10 ? '0' + s : s;
    }

    //一秒执行一次
    setInterval(function () {
        timeNow()
    }, 1000);
});