layui.config({
    base : "../cockhorse/user/"
}).extend({
    "address" : "address"
})
layui.use(['form','layer','upload','laydate',"address"],function(){
    var form = layui.form;
    var $ = layui.jquery;
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        upload = layui.upload,
        laydate = layui.laydate,
        address = layui.address;
    //获取省市信息
    address.provinces();
})