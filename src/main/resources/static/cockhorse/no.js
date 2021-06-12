//修改地址栏中的地址
// var stateObject = {};
// var title = "清空地址栏";
// var newUrl = '/error/error.html';
// history.pushState(stateObject, title, newUrl);

//禁止鼠标右击
document.oncontextmenu = function () {
    return false;
}

//禁止复制
document.oncopy = function () {
    return false;
}

//禁止alt，F12
document.onkeydown = function () {
    if (event.altKey) {
        return false;
    }
    if(event.ctrlKey){
        return false;
    }
    if (event.keyCode == 123) {
        event.preventDefault();
        window.event.returnValue = false;
    }
}

//禁止手机打开
var system ={};
var p = navigator.platform;
console.log(p)
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
if(system.win||system.mac||system.xll){

}else{
    //如果是手机,跳转到
    window.location.href="../error/phone";
}