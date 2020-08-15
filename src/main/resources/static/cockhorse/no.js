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