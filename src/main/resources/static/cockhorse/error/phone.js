var obj = $(".box");
var x = obj.offset().left;//盒子距离左部的位置
var y = obj.offset().top;//盒子距离顶部的位置
var objwid = obj.width();//盒子的宽
var objhei = obj.height();
var winwid = $(window).width();//页面的宽
var winhei = $(window).height();
var max = 10;//设置最大视觉差，就是感觉这个距离刚好碰到
var winx = winwid - objwid - max;//盒子x轴最远达到的距离
var winy = winhei - objhei - max;//盒子y轴最远达到的距离
var sx = 0;//x轴是否返回的状态，0是值++即正向移动，1是值--即返回
var sy = 0;
time1 = setInterval(function () {
    if (sx == 0) {
        obj.css("left", x++);
    } else if (sx == 1) {
        obj.css("left", x--);
    }
    if (x <= 0) {
        sx = 0;
    } else if (x >= winx) {
        sx = 1;
    }
    if (sy == 0) {
        obj.css("top", y++);
    } else if (sy == 1) {
        obj.css("top", y--);
    }
    if (y <= 0) {
        sy = 0;
    } else if (y >= winy) {
        sy = 1;
    }
}, 100)