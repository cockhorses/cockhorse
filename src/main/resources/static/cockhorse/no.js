//禁止鼠标右击
document.oncontextmenu = function () {
    return false;
}
//禁止复制
document.oncopy = function () {
    return false;
}
//禁止ctrl，alt，F12
document.onkeydown = function () {
    if (event.ctrlKey) {
        return false;
    }
    if (event.altKey) {
        return false;
    }
    if (event.keyCode == 123) {
        event.preventDefault();
        window.event.returnValue = false;
    }
}
//如果打开控制台，每秒刷新
var threshold = 160;
window.setInterval(function () {
    if (window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold) {
        window.location.reload();
    }
}, 1e3);
//禁止手机打开
var system ={};
var p = navigator.platform;
console.log(p)
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
if(system.win||system.mac||system.xll){
    //如果是电脑则无响应
}else{
    //如果是手机,跳转到
    window.location.href="../error/phone";
}