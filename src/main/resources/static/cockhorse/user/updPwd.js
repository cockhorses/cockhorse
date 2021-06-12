layui.use(['bodyTab', 'jquery', 'layer', 'element', 'form', 'table'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var laydate = layui.laydate;
    var element = layui.element;
    $ = layui.$;

    form.on("submit(btn-sub)", function (obj) {
        alert("true");
        // //创建遮罩层
        // var index = layer.msg('密码修改中，请稍候', {icon: 16, time: false, shade: 0.8});
        // //序列化表单数据
        // var params = $("#frm").serialize();
        // $.post('../user/updPwd', params, function (obj) {
        //     setTimeout(function(){
        //         layer.close(index);
        //         if(obj){
        //             layer.msg('提交成功', {icon: 1},function(){
        //                 parent.location.reload();
        //             });
        //         }else{
        //             layer.msg('提交失败', {icon: 2});
        //         }
        //     },2000);
        // });
        return false;
    });
})