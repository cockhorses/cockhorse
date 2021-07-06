layui.use(['jquery', 'layer', 'form', 'table'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var laydate = layui.laydate;
    // form.verify({
    //     inptext: function(value){
    //         var reg = new RegExp("^([a-z]|[A-Z]|\\d){6,24}$");
    //         if(!reg.test(value))
    //         {
    //             return '提示：请输入6位以上数字或字母。';
    //         }
    //     }
    // });
    form.on("submit(login)", function (obj) {
        //序列化表单数据
        var params = $("#frm").serialize();
        //效验验证码
        $.post('../login/vrify', params, function (obj) {
            if (obj) {
                //刷新验证码并且登陆
                $("#code").attr("src", "../login/getCode?d=" + new Date() * 1);
                $("#time").html("60");
                $(".btn-sub").text("登陆中...").attr("disabled", "disabled").addClass("layui-disabled");
                setTimeout(function () {
                    //跳转登陆方法
                    $("#frm").attr("action", "../login/login");
                    $("#frm").submit();
                }, 1000);
            } else {
                $("#code").attr("src", "../login/getCode?d=" + new Date() * 1);
                $("#time").html("60");
                $("input[name='code']").val("").select();
                layer.msg("验证码错误！");
            }
        });
        return false;
    });

    $("#code").bind('click',function(){
        this.src = '../login/getCode?d=' + new Date() * 1;
        $("#time").text(30);
    })

    //定时刷新验证码
    setInterval(function () {
        var time = $("#time").html();
        if (time == 0) {
            $("#code").attr("src", "../login/getCode?d=" + new Date() * 1);
            time = 31;
        }
        $("#time").html(time - 1);
    }, 1000);

    //错误下滑
    var text = $(".text-error").html();
    if (text != null || text != "") {
        $(".text-error").slideDown(1000);
        //3秒后错误上滑
        setTimeout(function () {
            $(".text-error").slideUp(1000)
        }, 4000);
        //5秒后错误删除
        setTimeout(function () {
            $(".text-error").html("")
        }, 5000);
    }
    ;

    //表单输入效果
    $(".input-item").click(function (e) {
        e.stopPropagation();
        $(".xian").addClass("solid");
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".layui-form-item .layui-input").focus(function () {
        $(".xian").addClass("solid");
        $(this).parent().addClass("layui-input-focus");
    })
    $(".layui-form-item .layui-input").blur(function () {
        $(".xian").removeClass("solid");
        $(this).parent().removeClass("layui-input-focus");
        if ($(this).val() != '') {
            $(".xian").addClass("solid");
            $(this).parent().addClass("layui-input-active");
        } else {
            $(".xian").removeClass("solid");
            $(this).parent().removeClass("layui-input-active");
        }
    })
    if (window.sessionStorage.getItem("show")) {
        $("#index").slideUp(2000);
        window.sessionStorage.removeItem("show");
    } else {
        $("#index").css("display", "none");
    }
});
//启动看板娘
initModel();
//粒子特效
!function () {
    function o(w, v, i) {
        return w.getAttribute(v) || i
    }

    function j(i) {
        return document.getElementsByTagName(i)
    }

    function l() {
        var i = j("script"), w = i.length, v = i[w - 1];
        return {
            l: w,
            z: o(v, "zIndex", -1),
            o: o(v, "opacity", 0.9),
            c: o(v, "color", "54,54,54"),
            n: o(v, "count", 199)
        }
    }

    function k() {
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }

    function b() {
        e.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        t.forEach(function (i) {
            i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i.y < 0 ? -1 : 1, e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
                }
            }
            w.splice(w.indexOf(i), 1)
        }), m(b)
    }

    var u = document.createElement("canvas"), s = l(), c = "c_n" + s.l, e = u.getContext("2d"), r, n,
        m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
            window.setTimeout(i, 1000 / 45)
        }, a = Math.random, f = {x: null, y: null, max: 20000};
    u.id = c;
    u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
    j("body")[0].appendChild(u);
    k(), window.onresize = k;
    window.onmousemove = function (i) {
        i = i || window.event, f.x = i.clientX, f.y = i.clientY
    }, window.onmouseout = function () {
        f.x = null, f.y = null
    };
    for (var t = [], p = 0; s.n > p; p++) {
        var h = a() * r, g = a() * n, q = 2 * a() - 1, d = 2 * a() - 1;
        t.push({x: h, y: g, xa: q, ya: d, max: 6000})
    }
    setTimeout(function () {
        b()
    }, 100)
}();
//如果是电脑则禁止打开控制台
var threshold = 160;
window.setInterval(function () {
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
        window.location.reload();
    }
}, 1e3);