layui.config({
    base: "../cockhorse/user/"
}).extend({
    "address": "address"
})
layui.use(['form', 'layer', 'upload', 'laydate', "address"], function () {
    var form = layui.form;
    var $ = layui.jquery;
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        upload = layui.upload,
        address = layui.address;
    var index=layer.load(2);
    //获取省市信息
    address.provinces();
    //上传头像
    upload.render({
        elem: '.img-upload',
        url: '../user/upload',
        method: "post",
        before: function (obj) {
            //预读本地文件
            obj.preview(function (index, file, result) {
                $('#userFace').attr('src', result);
            });
        },
        done: function (res) {
            $("input[name='pid']").val(res.pid);
        }
    });

    //加载男女信息
    if($("#sex").val()==1){
        $("input[name=sex][value='1']").click();
        form.render();
    }

    //加载地址信息
    var address = $("input[name=address]").val();
    function update() {
        $("textarea[name=dizhi]").html(address.substr(address.indexOf(",") + 1));
        var select='dd[lay-value=' + address.substr(0, address.indexOf(",")).substr(0, 2) + ']';
        $(".province").siblings("div.layui-form-select").find('dl').find(select).click();
        select='dd[lay-value=' + address.substr(0, address.indexOf(",")).substr(0, 4) + ']';
        $(".city").siblings("div.layui-form-select").find('dl').find(select).click();
        select='dd[lay-value=' + address.substr(0, address.indexOf(",")) + ']';
        $(".area").siblings("div.layui-form-select").find('dl').find(select).click();
        $("input[name=address]").val("");
        form.render();
        layer.close(index);
    }
    setTimeout(update, 1000);

    //提交信息
    form.on("submit(btn-sub)", function (obj) {
        //拼接地址信息
        $("input[name=address]").val($(".area").val()+","+$("textarea[name=dizhi]").html());
        //创建遮罩层
        var index = layer.msg('信息提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        //序列化表单数据
        var params = $("#frm").serialize();
        $.post('../user/updateInfo', params, function (obj) {
            setTimeout(function(){
                layer.close(index);
                if(obj){
                    layer.msg("提交成功");
                }else{
                    layer.msg("提交失败");
                }
            },2000);
        });
        return false;
    });
})