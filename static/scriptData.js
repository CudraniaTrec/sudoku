var board = new Array(9);
var error_exists = false;
var success = false;
var selected = false;
var selected_i = 0,
    selected_j = 0;

for (var i = 0; i < 9; i++) { //一维长度为3
    board[i] = new Array(9).fill(0);
}

function getBoard(i, j) {
    var name = `table .r${i+1} .c${j+1}`;
    return document.querySelector(name);
}

function checkBoard() {
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ret = true;
    for (var i = 0; i < 9; ++i)
        for (var j = 0; j < 9; ++j) {
            $(`table .r${i+1} .c${j+1}`).removeClass('error');
        }
    for (var i = 0; i < 9; ++i) {
        var invalid = false;
        count.fill(0);
        for (var j = 0; j < 9; ++j) {
            var str = $(`table .r${i+1} .c${j+1}`).html();
            var num = 0;
            if (str != "") num = parseInt(str);

            if (num == 0) continue;
            if (count[num - 1] > 0) {
                invalid = true;
                break;
            } else {
                count[num - 1] = 1;
            }
        }
        if (invalid == true) {
            ret = false;
            for (var j = 0; j < 9; ++j)
                $(`table .r${i+1} .c${j+1}`).addClass('error');
        }
    }
    for (var j = 0; j < 9; ++j) {
        var invalid = false;
        count.fill(0);
        for (var i = 0; i < 9; ++i) {
            var str = $(`table .r${i+1} .c${j+1}`).html();
            var num = 0;
            if (str != "") num = parseInt(str);
            if (num == 0) continue;
            if (count[num - 1] > 0) {
                invalid = true;
                break;
            } else {
                count[num - 1] = 1;
            }
        }
        if (invalid == true) {
            ret = false;
            for (var i = 0; i < 9; ++i)
                $(`table .r${i+1} .c${j+1}`).addClass('error');
        }
    }
    success = true;
    for (var u = 0; u < 3; u++)
        for (var v = 0; v < 3; v++) {
            var invalid = false;
            count.fill(0);
            for (var i = 3 * u; i < 3 * u + 3; ++i)
                for (var j = 3 * v; j < 3 * v + 3; ++j) {
                    var str = $(`table .r${i+1} .c${j+1}`).html();
                    var num = 0;
                    if (str != "") num = parseInt(str);
                    if (num == 0) continue;
                    if (count[num - 1] > 0) {
                        invalid = true;
                        break;
                    } else {
                        count[num - 1] = 1;
                    }
                }
            for (var key = 0; key < 9; ++key) {
                if (count[key] == 0) success = false;
            }
            if (invalid == true) {
                ret = false;
                success = false;
                for (var i = 3 * u; i < 3 * u + 3; ++i)
                    for (var j = 3 * v; j < 3 * v + 3; ++j)
                        $(`table .r${i+1} .c${j+1}`).addClass('error');
            }
        }
    return ret;
}

function inputNum(event) {
    selected = true;
    $(`table .r${selected_i+1} .c${selected_j+1}`).removeClass('select');
    selected_i = event.data.i;
    selected_j = event.data.j;
    $('.container .inputTable').addClass('select');
    $(this).addClass('select');
}

function input(event) {
    if (selected == false) {
        return;
    }
    selected = false;
    var num = parseInt(event.data.i);
    if (!(num >= 0 && num <= 9)) {
        alert('incorrect input');
        return;
    }
    var str = num.toString();
    if (num == 0) str = "";
    $('.container .inputTable').removeClass('select');
    $(`table .r${selected_i+1} .c${selected_j+1}`).html(str);
    $(`table .r${selected_i+1} .c${selected_j+1}`).removeClass('select');
    checkBoard();
    board2string();
}

function restart() {
    initBoard();
    showBoard();
    checkBoard();
}

function initBoard() {
    for (var i = 0; i < 9; i++) {
        board[i] = new Array(9).fill(0);
    }
    selected = false;
    for (var i = 0; i < 9; ++i) {
        for (var j = 0; j < 9; ++j) {
            $(`table .r${i+1} .c${j+1}`).unbind();
            $(`table .r${i+1} .c${j+1}`).removeClass('select');
            if (board[i][j] != 0) {
                $(`table .r${i+1} .c${j+1}`).addClass('fix')
            } else {
                $(`table .r${i+1} .c${j+1}`).click({ 'i': i, "j": j }, inputNum);
                $(`table .r${i+1} .c${j+1}`).removeClass('fix');
            }
        }
    }
    for (var i = 0; i <= 9; ++i) {
        $(`table .input${i}`).unbind();
        $(`table .input${i}`).click({ 'i': i }, input);
        $(`table .input${i}`).removeClass('select');
    }
}

function showBoard() {
    for (var i = 0; i < 9; ++i) {
        for (var j = 0; j < 9; ++j) {
            var content = board[i][j] != 0 ? board[i][j].toString() : "";
            var point = getBoard(i, j);
            point.innerHTML = content;
        }
    }
}

function board2string() {
    var str = "";
    for (var i = 0; i < 9; ++i)
        for (var j = 0; j < 9; ++j) {
            var s = $(`table .r${i+1} .c${j+1}`).html();
            var num = 0;
            if (s != "") {
                num = parseInt(s);
            }
            str += num.toString();
            board[i][j] = num;
        }
    $('.strSudoku').val(str);
}

function string2board() {
    var str = $('.strSudoku').attr('value');
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; ++j) {
            board[i][j] = parseInt(str[9 * i + j]);
            var content = board[i][j] == 0 ? "" : board[i][j].toString();
            $(`table .r${i+1} .c${j+1}`).html(content);
        }
    checkBoard();
}

function main() {
    initBoard();
    showBoard();
}
main();