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