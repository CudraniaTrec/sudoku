var words = ["Sudoku", "makes", "me", "happy!", "❤"]
var index = 0;
window.onclick = function(event) {
    var heart = document.createElement("b");
    heart.onselectstart = new Function('event.returnValue=false');
    document.body.appendChild(heart).innerHTML = words[index];
    index += 1;
    if (index >= 5) {
        index = 0;
    }
    heart.style.cssText = "position: fixed;left:-100%;";
    var f = 12,
        x = event.clientX - f / 2,
        y = event.clientY - f,
        c = randomColor(),
        a = 1,
        s = 1.0;
    var timer = setInterval(function() {
        if (a <= 0) {
            document.body.removeChild(heart);
            clearInterval(timer);
        } else {
            var cssStr = `font-size:${f}px;position: fixed;color:${c};left:${x}px;top:${y}px;opacity:${a};transform:scale(${s});`;
            heart.style.cssText = cssStr;
            y--;
            a -= 0.01;
            s += 0.005;
        }
    }, 10)
}

function randomColor() {
    var a = ~~(Math.random() * 255);
    var b = ~~(Math.random() * 255);
    var c = ~~(Math.random() * 255);
    return `rgb(${a},${b},${c})`;
}