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
        laydate = layui.laydate,
        address = layui.address;
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

    //获取地址信息
    $(".province .area .city").ck
})