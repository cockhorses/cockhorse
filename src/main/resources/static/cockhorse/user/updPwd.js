layui.use(['jquery', 'layer', 'element', 'form', 'table'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var laydate = layui.laydate;
    var element = layui.element;
    $ = layui.$;
    form.verify({
        inptext: function(value){
            var reg = new RegExp("^([a-z]|[A-Z]|\\d){6,24}$");
            if(!reg.test(value))
            {
                return '提示：请输入6位以上数字或字母。';
            }
        }
    });
    form.on("submit(btn-sub)", function (obj) {
        if($("input[name='newpwd']").val()!=$("input[name='relpwd']").val()){
            layer.msg('确认密码与新密码不一致！', {icon: 2, time: 1500, shade: 0.8});
        }else{
            //创建遮罩层
            var index = layer.msg('密码修改中，请稍候', {icon: 16, time: false, shade: 0.8});
            //序列化表单数据
            var params = $("#frm").serialize();
            $.post('../user/relupdpwd', params, function (obj) {
                setTimeout(function(){
                    layer.close(index);
                    if(obj==1){
                        parent.layer.confirm('密码修改成功,请重新登录。', {
                            btn: ['确定']
                        },function(index){
                            parent.layer.close(index);
                            parent.location.href="../login/toLogin";
                        });
                    }else if(obj==2){
                        layer.msg('原密码错误', {icon: 2});
                        $("input[name='oldpwd']").select();
                    }else{
                        layer.msg('密码修改失败', {icon: 2});
                    }
                },2000);
            });
        }
        return false;
    });
});