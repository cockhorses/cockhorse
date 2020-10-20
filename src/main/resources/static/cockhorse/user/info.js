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
        layer.close(index);
    }
    setTimeout(update, 500);
})